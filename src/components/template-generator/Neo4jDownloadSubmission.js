import React, {Component} from 'react';
import axios from 'axios';
import {saveAs} from 'file-saver';
import { makeAllWorkSheets, fillRows } from './utils';
const Excel = require('exceljs/dist/es5/exceljs.browser');
const neo4jUrl = process.env.REACT_APP_NEO4J_API;
const AUTHORIZATION = process.env.REACT_APP_NEO4J_PASSWORD;


// const SHEETNAMES = [ 'treatment', 'diet', 'litter', 'mouse', 'biosample','assay', 'reagent', 'file' ];

const SHEETNAMES = [ 'treatment', 'litter', 'mouse', 'biosample','assay', 'file', 'diet' ];

class Neo4jDownloadSubmission extends Component {
    state = {  }
    
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

    componentDidMount() {
        this._generateNewSheet(this.props.id);
    }

    componentDidUpdate(prevProps, prevState) {
        this._generateNewSheet(this.props.id);
    }

    _generateNewSheet = (id) => {
        const params = {
            submission: id
        };
        console.log(setupQuery('diet'))
        const fetchPromises = SHEETNAMES.map(sheetname => axios.post(neo4jUrl, {
                                        statements: [
                                            {
                                                statement: setupQuery(sheetname),
                                                parameters: params
                                            }
                                        ]
                                    }, { headers: { Authorization: AUTHORIZATION }} ))
        axios.all(fetchPromises)
            .then((res) => {
                const results = formatResultsForState(res);
                console.log(results);
                excelSimpleDownload(this.props.id, results);
                
            })
            .catch(err => {
                console.log(err);
            });
            
}


    render() {
        // if (!this.props.id) {
        //     return <h5>Looking up..</h5>
        // }
        return (
            <div className="m-8">
                
            </div>
        );
    }
}

export default Neo4jDownloadSubmission;

const CONNECTIONSLIST = [ 'litter', 'mouse', 'treatment','assay', 'biosample', 'file', 'diet', 'bioproject', 'reagent' ];
function setupQuery(type) {
    let queryParams = '';
    // const queryCore = `MATCH (t:treatment)<-[u:undergoes]-(m:mouse)-[pf:part_of]->(p:bioproject)-[w:works_on]
    // ->(l:lab),(f:file)-[s:sequenced]->(a:assay)-[i:assay_input]->(b:biosample)-[fr:derived_from]->(m) `

    const queryCore = `MATCH (f:file)-[*0..5]->(n) WHERE f.submission_id=$submission`
    
    switch (type) {
        case 'treatment':
            queryParams = ` AND "treatment" IN labels(n)
            WITH DISTINCT n
            OPTIONAL MATCH (n)-[r]->(m) WHERE labels(m) IN ${JSON.stringify(CONNECTIONSLIST)}
            RETURN n as treatment, 
            collect({connection:coalesce(type(r),'na'),
            to:coalesce(labels(m),'na'),
            accession:coalesce(m.accession,'na')}) as connections`;
            return queryCore + queryParams;

        case 'biosample':
            queryParams = ` AND "biosample" IN labels(n)
            WITH DISTINCT n
            OPTIONAL MATCH (n)-[r]->(m) WHERE labels(m) IN ${JSON.stringify(CONNECTIONSLIST)}
            RETURN n as biosample, 
            collect({connection:coalesce(type(r),'na'),
            to:coalesce(labels(m),'na'),
            accession:coalesce(m.accession,'na')}) as connections`;
            return queryCore + queryParams;

        case 'mouse':
            queryParams = ` AND "mouse" IN labels(n)
            WITH DISTINCT n
            OPTIONAL MATCH (n)-[r]->(m) WHERE labels(m) IN ${JSON.stringify(CONNECTIONSLIST)}
            RETURN n as mouse, 
            collect({connection:coalesce(type(r),'na'),
            to:coalesce(labels(m),'na'),
            accession:coalesce(m.accession,'na')}) as connections`;
            return queryCore + queryParams;

        case 'file':
            queryParams = ` AND "file" IN labels(n)
            WITH DISTINCT n
            OPTIONAL MATCH (n)-[r]->(m) WHERE labels(m) IN ${JSON.stringify(CONNECTIONSLIST)}
            RETURN n as file, 
            collect({connection:coalesce(type(r),'na'),
            to:coalesce(labels(m),'na'),
            accession:coalesce(m.accession,'na')}) as connections`;
            return queryCore + queryParams;

        case 'assay':
            queryParams = ` AND "assay" IN labels(n)
            WITH DISTINCT n
            OPTIONAL MATCH (n)-[r]->(m) WHERE labels(m) IN ${JSON.stringify(CONNECTIONSLIST)}
            RETURN n as assay, 
            collect({connection:coalesce(type(r),'na'),
            to:coalesce(labels(m),'na'),
            accession:coalesce(m.accession,'na')}) as connections`;
            return queryCore + queryParams;

        case 'litter':
            queryParams = ` AND "litter" IN labels(n)
            WITH DISTINCT n
            OPTIONAL MATCH (n)-[r]->(m) WHERE labels(m) IN ${JSON.stringify(CONNECTIONSLIST)}
            RETURN n as litter, 
            collect({connection:coalesce(type(r),'na'),
            to:coalesce(labels(m),'na'),
            accession:coalesce(m.accession,'na')}) as connections`;
            return queryCore + queryParams;

        case 'diet':
            queryParams =` AND "diet" IN labels(n)
            WITH DISTINCT n
            OPTIONAL MATCH (n)-[r]->(m) WHERE labels(m) IN ${JSON.stringify(CONNECTIONSLIST)}
            RETURN n as diet, 
            collect({connection:coalesce(type(r),'na'),
            to:coalesce(labels(m),'na'),
            accession:coalesce(m.accession,'na')}) as connections`;
            return queryCore + queryParams;
    
        default:
            break;
    }
}
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
                /*
                data.map(d => d.row[0]) // row values   {challenge_life_age_beginning: "NA", comments: "NA", exposure_age_last: "PND21", exposure_specific: "7% corn oil chow diet with control water", created: 1505325536252, …}
                data.map(d => d.row[1]) // connections  {connection: "na", to: "na", accession: "na"}   
                */

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
                })
                } else {
                    return null;
                }

                return tmp;
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

function excelSimpleDownload (id, data) {
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
            // closeLoaderCb();
        })
        .catch(err => console.log('Error writing excel export', err));    
}
