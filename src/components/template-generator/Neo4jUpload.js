import React, {Component} from 'react';
import {Button,Icon, Loader, Dimmer} from 'semantic-ui-react';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import Notifications, {notify} from 'react-notify-toast';
import { createNeo4jUploadQuery } from './utils';
import fire from '../../fire';
const neo4jUrl = process.env.REACT_APP_NEO4J_API;
const AUTHORIZATION = process.env.REACT_APP_NEO4J_PASSWORD;
const fileDownload = require('js-file-download');

class Neo4jUpload extends Component {
    state = { error: null, loader: false, errorState: false, errorCount: 0, errorMessages: [], successMessages: [] }

    handleSessionError = (err) => {
        this.setState({ errorMessages: this.state.errorMessages.concat(err) });
    }

    handleSessionResponse = (val) => {
        this.setState({ successMessages: this.state.successMessages.concat(val) });
    }

    handleUpload = async () => {
        this.setState({ loader: true })

        const { data, user, lab } = this.props;
        const queryList = createNeo4jUploadQuery(data, user, lab);
        if (!queryList) {
            this.setState({ error: "No data to upload" });
            return
        }
        const dataBatches = makeBatchesToDispatch(data); // split rows in excel to batches of 10
        await this.start(queryList, dataBatches, 'node'); 
        await this.start(queryList, dataBatches, 'remove'); 
        await this.start(queryList, dataBatches, 'add'); 
    }
    /**
     * mode can be: 
     *  1. node (create/update nodes, restricted by logged in User's lab)
     *  2. remove (DELETE all relationships, restricted by logged in User's lab)
     *  3. add (MATCH source and target nodes and create new relationship, RESTRICTED by logged in user's lab)
     * This async function runs 3 times - once for each mode, looping on data batches
     */
    start = async (queryList, alldata, mode) => {
        try {
            await asyncForEach(alldata, async (entry, index) => {
                const { data, sheetname, batchNum } = entry;
                const relatedQueries = queryList.filter(item => item.sheetname === sheetname && item.type === mode);
                try {
                    await asyncForEach(relatedQueries, async (bit) => {
                        try {
                            console.log("Dispatching request : mode : ~~" + mode + "~~" + sheetname + '==' + batchNum);
                            await this.neo4jPost(bit.query, data, sheetname, batchNum);
                        } catch (error) {
                            console.log(error);
                            this.handleSessionError(error.message);
                        }
                    })
                } catch (error) {
                    console.log(error);
                    this.handleSessionError(error.message);
                }
                
                
            })
            if (mode === 'add') {
                if (this.state.errorMessages.length === 0) {
                    notify.show('Submitted successfully! ✅', 'success');
                    this.setState({ loader: false });
                    const logFile = generateCommitLog(this.state.successMessages, this.props.user, this.props.lab);
                    const logToStore = { 
                        user: this.props.user, 
                        log: JSON.stringify(logFile), 
                        lab: this.props.lab, 
                        generated: moment(Date.now()).format('lll')
                    };
                    fire.database().ref('logs').push(logToStore); // save in firebase
                } else {
                    const errorString = this.state.errorMessages.map(err => err).join(',')
                    console.log(errorString);
                    notify.show('Houston we have a problem 👨🏼‍🚀', 'error');
                    this.setState({ loader: false, error: errorString });
                }
            }
            
        } catch (error) {
            notify.show('Transmission errored out 👨🏼‍🚀', 'error');
            this.setState({ loader: false, error: _.uniq(error.map(err => err.message).join(',')) });
        }
        
    }

    neo4jPost = async (query, data, sheetname, batchNum) => {
        const courier = {};
        courier[sheetname] = data;
        try {
            const res = await axios.post(neo4jUrl, {
                statements: [
                    {
                        statement: query,
                        parameters: { json: courier }
                    }
                ]
            }, { headers: { Authorization: AUTHORIZATION }} )
            // console.log('processing request ..');
            if (res.data.errors.length > 0) {
                this.handleSessionError(`${sheetname} : ${res.data.errors[0].message}`);
            } else {
                this.handleSessionResponse(res.data.results);
            }
        } catch (error) {
            console.log(error);
            this.handleSessionError(error);
        } 
    }

    handleErrorBoxClose = () => {
        this.setState({ error: null });
    }

    render() {
        if (this.state.errorState) {
            return <p className='m-4 p-4 bg-yellow-dark border-red'>Transmission errored out! Please contact admin</p>
        }
        return ( 
            <div className="m-4 p-4">
            { (this.state.loader) ? 
                <div className="h-screen">
                <Dimmer active>
                    <Loader size='mini'>Transmitting...</Loader>
                </Dimmer>
                </div> : null
            }
            <Notifications />
            {(this.state.error)? 
                <div className="m-4 p-4 border-2 border-red-light text-red flex justify-between">
                <h4> <span role="img" aria-label="error">❗️</span> Error encountered: </h4>
                {this.state.error}
                <Button icon='close' onClick={this.handleErrorBoxClose}/>
                </div>: null }
                <Button size='tiny' color='purple' onClick={this.handleUpload}>Commit changes {'  '} <Icon name=''/><Icon name='external'/></Button>
            {(this.state.successMessages.length > 0) ?
             <Button size='tiny' color='teal' onClick={() => fileDownload(generateCommitLog(this.state.successMessages, this.props.user, this.props.lab).join('\n'), `${Date.now()}_upload_log.txt`)}>Download Upload Log
             <Icon name=''/><Icon name='clipboard'/></Button>
            : null
            }
            </div>
        );
    }
}

export default Neo4jUpload;



async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

function makeBatchesToDispatch(data) {
    const sheetsInFile = Object.keys(data);
    const segmentedRows = sheetsInFile.map(sheetname => {
        const allRows = data[sheetname];
        const batches = _.chunk(allRows, 10);
        const batchedData = batches.map((batch, index) => ({ sheetname: sheetname, data: batch, batchNum: (index + 1)}));
        return batchedData;
    });
    const result = _.flattenDeep(segmentedRows);
    
    return result;
}

/*
// const neo4j = require('neo4j-driver').v1;
// const driver = neo4j.driver(`bolt://68.183.19.248:7687`, neo4j.auth.basic("username", "password"), {maxTransactionRetryTime: 60000});

// neo4jSession = async (query, data, sheetname) => {
        
    //     try {
    //         const session = await driver.session();
    //         const tx = await session.beginTransaction();
    //         const res = await tx.run(query, { json: data })
    //         console.log('all good');
    //         await tx.commit();
    //         session.close();
    //         if (res.data.errors.length > 0) {
    //             this.handleSessionError(`${sheetname} : ${res.data.errors[0].message}`);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         this.handleSessionError(`${sheetname} : ${error.message}`);
    //     } 
    // }

async function go(queryList, data) {
    try {
        const allAxiosPosts = await queryList.map((entry, index) => {
            const { query, sheetname } = entry;
            const _data = {};
            _data[sheetname] = data[sheetname];
            // return neo4jPost(query, _data);
            const res = sessionRun(query, _data);
        });
    } catch (error) {
        console.log(error);
    }
}

async function sessionRun(query, data) {
    try {
        const session = await driver.session();
        const tx = await session.beginTransaction();
        const res = await tx.run(query, { json: data })
        console.log('all good');
        await tx.commit();
        session.close();

    } catch (error) {
        console.log(error)
    }
}
*/

/**
 * 
 * @param [] this.state.successMessages  
 *          columns: [assay, recruits]
            data: [ meta: [], row: ["TGTASMZR8J5N", "TEST001"]]
 */
function generateCommitLog(messages, USER, LAB) {
    let rows = [];
    rows.push(`------Generated : ${moment(Date.now()).format('lll')} -----by ${USER}---from ${LAB}------`);
    messages.forEach(item => {
        const { columns, data } = item;
        data.forEach(line => {
            if (columns.length === 1) {
                rows.push(`${columns[0]} : Created/Updated node : ${line.row[0]}`);
            } else {
                if (line.row[1]) {
                    if (line.row[1].length > 0) {
                        rows.push(`${columns[0]} : ${line.row[0]}-[${columns[1]}]->${line.row[1]}`);
                    } 
                }
            }
        });
    });
    return rows;
}
