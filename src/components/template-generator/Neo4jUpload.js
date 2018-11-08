import React, {Component} from 'react';
import {Button,Icon, Loader, Dimmer} from 'semantic-ui-react';
import axios from 'axios';
import _ from 'lodash';
import Notifications, {notify} from 'react-notify-toast';
import { createNeo4jUploadQuery } from './utils';
const neo4jUrl = process.env.REACT_APP_NEO4J_API;
const AUTHORIZATION = process.env.REACT_APP_NEO4J_PASSWORD;

class Neo4jUpload extends Component {
    state = { error: null, loader: false, errorState: false, errorCount: 0, errorMessages: [] }

    handleSessionError = (err) => {
        this.setState({ errorMessages: this.state.errorMessages.concat(err) });
    }

    handleUpload = async () => {
        this.setState({ loader: true })

        const { data, user, lab } = this.props;
        const queryList = createNeo4jUploadQuery(data, user, lab);
        if (!queryList) {
            this.setState({ error: "No data to upload" });
            return
        }
        const dataBatches = makeBatchesToDispatch(data);
        await this.start(queryList, dataBatches, 'node'); 
        await this.start(queryList, dataBatches, 'remove'); 
        await this.start(queryList, dataBatches, 'add'); 
    }

    start = async (queryList, alldata, mode) => {
        try {
            await asyncForEach(alldata, async (entry, index) => {
                const { data, sheetname, batchNum } = entry;
                const relatedQueries = queryList.filter(item => item.sheetname === sheetname && item.type === mode);
                console.log(relatedQueries);
                try {
                    await asyncForEach(relatedQueries, async (bit) => {
                        try {
                            console.log(data);
                            console.log("Dispatching request : " + sheetname + '==' + (batchNum + 1) + '==' + (index + 1));
                            await this.neo4jPost(bit.query, data[0], sheetname, batchNum);
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
                } else {
                    notify.show('Houston we have a problem 👨🏼‍🚀', 'error');
                    this.setState({ loader: false, error: this.state.errorMessages.map(err => err.message).join(',') });
                }
            }
            
        } catch (error) {
            notify.show('Transmission errored out 👨🏼‍🚀', 'error');
            this.setState({ loader: false, error: error.map(err => err.message).join('<br/>') });
        }
        
    }

    neo4jPost = async (query, data, sheetname, batchNum) => {
        try {
            const res = await axios.post(neo4jUrl, {
                statements: [
                    {
                        statement: query,
                        parameters: { json: data }
                    }
                ]
            }, { headers: { Authorization: AUTHORIZATION }} )
            console.log('processing request ..');
            if (res.data.errors.length > 0) {
                this.handleSessionError(`${sheetname} : ${res.data.errors[0].message}`);
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



