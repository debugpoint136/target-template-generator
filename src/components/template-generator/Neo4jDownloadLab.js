import React, {Component} from 'react';
import axios from 'axios';
import {saveAs} from 'file-saver';
import { Form, Radio } from 'semantic-ui-react'
import { makeAllWorkSheets, fillRows } from './utils';
const Excel = require('exceljs/dist/es5/exceljs.browser');
const neo4jUrl = process.env.REACT_APP_NEO4J_API;
const AUTHORIZATION = process.env.REACT_APP_NEO4J_PASSWORD;
const HEADER = [ "File accession",
"File user accession",
"Paired file accession",
"File uuid",
"Filename",
"Submission Id",
"md5sum",
"Score",
"Assay accession",
"Assay user accession",
"Assay technique",
"Biosample accession",
"Biosample user accession",
"Tissue",
"Mouse accession",
"Mouse user accession",
"Mouse internal id",
"Mouse gender",
"Mice life stage at collection",
"Treatment accession",
"Treatment user accession",
"Treatment exposure",
"Treatment dose",
"Diet accession",
"Diet user accession",
"Litter accession",
"Litter user accession"];

// const SHEETNAMES = [ 'treatment', 'diet', 'litter', 'mouse', 'biosample','assay', 'reagent', 'file' ];

const SHEETNAMES = [ 'treatment', 'litter', 'mouse', 'biosample','assay', 'file', 'diet' ];
const CONNECTIONS = [ 'treatment', 'litter', 'mouse', 'biosample','assay', 'file', 'diet', 'bioproject', 'reagent' ];

class Neo4jDownloadLab extends Component {
    state = { mode : 'ALL' }
    handleChange = (e, { value }) => this.setState({ mode: value })

    static getDerivedStateFromProps(nextProps, prevState) {
        // Store prevId in state so we can compare when props change.
        // Clear out previously-loaded data (so we don't render stale stuff).
        if (nextProps.id !== prevState.prevId) {
            return {
                prevId: nextProps.id
            };
        }
    
        // No state update necessary
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.id !== prevProps.id) {
            this.props.handleLoader();
            this._generateNewSheet(this.props.id);
        }
    }

    _generateNewSheet = (id) => {
        const params = {
            lab: id
        };
        // console.log(setupQuery('file'))
        if (this.props.flat) {
            const QUERY = `MATCH (paired_file:file)-[:paired_file]->(f:file {lab: "${this.props.lab}"})-->(a:assay)-->(b:biosample)-->(m:mouse)-->(t:treatment),(f)-[:tagged]->(tag:filetag),(m)-->(d:diet),(m)-->(l:litter) 
            RETURN f.accession,f.user_accession,paired_file.accession,f.file_uuid,f.filename,f.submission_id,f.md5sum,tag.score,a.accession,a.user_accession,a.technique,b.accession,b.user_accession,b.tissue,m.accession,m.user_accession,m.internal_id,m.sex,m.life_stage_collection,t.accession,t.user_accession,t.exposure_specific,t.exposure_dose,d.accession,d.user_accession,l.accession,l.user_accession`;
            
            axios.post(neo4jUrl, {
                statements: [
                    {
                        statement: QUERY,
                        parameters: params
                    }
                ]
            }, { headers: { Authorization: AUTHORIZATION }} )
            .then((res) => {
                const results = neo4jResParser(res);
                csvSimpleDownload(results, this.props.handleLoader);
            })
            .catch(err => {
                console.log(err);
            });
        } else {
        const fetchPromises = SHEETNAMES.map(sheetname => axios.post(neo4jUrl, {
                                        statements: [
                                            {
                                                statement: this.setupQuery(sheetname),
                                                parameters: params
                                            }
                                        ]
                                    }, { headers: { Authorization: AUTHORIZATION }} ))
        axios.all(fetchPromises)
            .then((res) => {
                const results = formatResultsForState(res);
                // console.log(results);
                excelSimpleDownload(this.props.id, results, this.props.handleLoader);
                
            })
            .catch(err => {
                console.log(err);
            });
    }
}

    setupQuery = (type) => {
    const { mode } = this.state;
    let queryParams = '';
    // const queryCore = `MATCH (t:treatment)<-[u:undergoes]-(m:mouse)-[pf:part_of]->(p:bioproject)-[w:works_on]
    // ->(l:lab),(f:file)-[s:sequenced]->(a:assay)-[i:assay_input]->(b:biosample)-[fr:derived_from]->(m) `
    let queryCore = ``;

    if (mode === 'FILTERED') {
    queryCore = queryCore + `
    MATCH p1=(paired_file:file)-[:paired_file]->(f:file)-->(a:assay)-->(b:biosample)-->(m:mouse)-->(t:treatment) 
    MATCH p2 = (m)-->(d:diet) 
    MATCH p3 = (m)-->(l:litter) WITH NODES(p1) AS nodes1, NODES(p2) AS nodes2, NODES(p3) AS nodes3 
    WITH nodes1 + nodes2 + nodes3 as allnodes 
    UNWIND allnodes AS n WITH n WHERE n.lab=$lab`;
    } else { // ALL
        queryCore = queryCore + `MATCH (n) WHERE n.lab=$lab`;
    }
        
    switch (type) {
        case 'treatment':
            queryParams = ` AND "treatment" IN labels(n)
            WITH DISTINCT n
            OPTIONAL MATCH (n)-[r]->(m) WHERE labels(m) IN ${JSON.stringify(CONNECTIONS)}
            RETURN n as treatment, 
            collect({connection:coalesce(type(r),'na'),
            to:coalesce(labels(m),'na'),
            accession:coalesce(m.accession,'na')}) as connections`;
            return queryCore + queryParams;

        case 'biosample':
            queryParams = ` AND "biosample" IN labels(n)
            WITH DISTINCT n
            OPTIONAL MATCH (n)-[r]->(m) WHERE labels(m) IN ${JSON.stringify(CONNECTIONS)}
            RETURN n as biosample, 
            collect({connection:coalesce(type(r),'na'),
            to:coalesce(labels(m),'na'),
            accession:coalesce(m.accession,'na')}) as connections`;
            return queryCore + queryParams;

        case 'mouse':
            queryParams = ` AND "mouse" IN labels(n)
            WITH DISTINCT n
            OPTIONAL MATCH (n)-[r]->(m) WHERE labels(m) IN ${JSON.stringify(CONNECTIONS)}
            RETURN n as mouse, 
            collect({connection:coalesce(type(r),'na'),
            to:coalesce(labels(m),'na'),
            accession:coalesce(m.accession,'na')}) as connections`;
            return queryCore + queryParams;

        case 'file':
            queryParams = ` AND "file" IN labels(n)
            WITH DISTINCT n
            OPTIONAL MATCH (n)-[r]->(m) WHERE labels(m) IN ${JSON.stringify(CONNECTIONS)}
            RETURN n as file, 
            collect({connection:coalesce(type(r),'na'),
            to:coalesce(labels(m),'na'),
            accession:coalesce(m.accession,'na')}) as connections`;
            return queryCore + queryParams;

        case 'assay':
            queryParams = ` AND "assay" IN labels(n)
            WITH DISTINCT n
            OPTIONAL MATCH (n)-[r]->(m) WHERE labels(m) IN ${JSON.stringify(CONNECTIONS)}
            RETURN n as assay, 
            collect({connection:coalesce(type(r),'na'),
            to:coalesce(labels(m),'na'),
            accession:coalesce(m.accession,'na')}) as connections`;
            return queryCore + queryParams;

        case 'litter':
            queryParams = ` AND "litter" IN labels(n)
            WITH DISTINCT n
            OPTIONAL MATCH (n)-[r]->(m) WHERE labels(m) IN ${JSON.stringify(CONNECTIONS)}
            RETURN n as litter, 
            collect({connection:coalesce(type(r),'na'),
            to:coalesce(labels(m),'na'),
            accession:coalesce(m.accession,'na')}) as connections`;
            return queryCore + queryParams;

        case 'diet':
            queryParams =` AND "diet" IN labels(n)
            WITH DISTINCT n
            OPTIONAL MATCH (n)-[r]->(m) WHERE labels(m) IN ${JSON.stringify(CONNECTIONS)}
            RETURN n as diet, 
            collect({connection:coalesce(type(r),'na'),
            to:coalesce(labels(m),'na'),
            accession:coalesce(m.accession,'na')}) as connections`;
            return queryCore + queryParams;
    
        default:
            break;
    }
}

    render() {
        // if (!this.props.id) {
        //     return <h5>Looking up..</h5>
        // }
        return (
            <div className="m-8">
                <Form>
                    <Form.Field>
                    Selected value: <b>{this.state.value}</b>
                    </Form.Field>
                    <Form.Field>
                    <Radio
                        label='Filter by connected only'
                        name='radioGroup'
                        value='FILTERED'
                        checked={this.state.mode === 'FILTERED'}
                        onChange={this.handleChange}
                    />
                    </Form.Field>
                    <Form.Field>
                    <Radio
                        label='ALL'
                        name='radioGroup'
                        value='ALL'
                        checked={this.state.mode === 'ALL'}
                        onChange={this.handleChange}
                    />
                    </Form.Field>
                </Form>
            </div>
        );
    }
}

export default Neo4jDownloadLab;



// const query = 'MATCH (t:treatment)<-[u:undergoes]-(m:mouse)-[pf:part_of]->(p:bioproject)' +
//         '-[w:works_on]->(l:lab),(f:file)-[s:sequenced]->(a:assay)-[i:assay_input]->(b:biosample)' +
//         '-[fr:derived_from]->(m) ' +
//         'WHERE l.principal_investigator = $lab RETURN DISTINCT a as assay'

function formatResultsForState(resArray) {
    const formattedResult = resArray.map(res => {
        const entry = res.data.results;
        if (entry.length > 0) {
            const { columns, data } = entry[0];
            let tmp = {};
            if (data.length > 0) {
                const sheetName = columns[0];
                tmp['sheet'] = sheetName;

                tmp['rows'] = data.map(datum => {
                    const rowValues = datum.row[0];
                    const connections = datum.row[1];

                    connections.forEach(entry => {
                        const { connection, accession } = entry;
                        if (connection !== 'na') {
                            rowValues[connection] = accession;
                            
                        } 
                    });

                    return rowValues;
                });

                return tmp;
            } else {
                return null;
            }
        } else {
            return null;
        }
    });
    const noNullResults = formattedResult.filter(d => d);

    let toReturn = {};
    noNullResults.forEach(item => {
        toReturn[item.sheet] = item.rows;
    })

    return toReturn;
}

function excelSimpleDownload (id, data, closeLoaderCb) {
    if (!id) {
        return
    }
    const workbook = new Excel.Workbook();
    const newWorkbook = makeAllWorkSheets(workbook);
    const workBookWithRows = fillRows(newWorkbook, data, 'data'); // coming from Neo4j

    workBookWithRows
        .xlsx
        .writeBuffer()
        .then(buffer => {
            saveAs(new Blob([buffer]), `${id}_${Date.now()}.xlsx`);
            closeLoaderCb();
        })
        .catch(err => console.log('Error writing excel export', err));    
}


function neo4jResParser(res) {
    const { columns, data } = res.data.results[0];

    const result = data.map((line, index) => {
        const { row } = line;
        let lineResult = {};
        row.forEach((item, index) => {
            lineResult[columns[index]] = item;
        })
        return lineResult;
    });

    return result;
}

function csvSimpleDownload(arrData, closeLoaderCb) {

    let CSV = HEADER + '\r\n';
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);
        
        //add a line break after each row
        CSV += row + '\r\n';
    }

    saveAs(new Blob([CSV]), `${Date.now()}.csv`);
    closeLoaderCb();
}