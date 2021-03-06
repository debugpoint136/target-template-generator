import React, {Component} from 'react';
import axios from 'axios';
import Notifications, {notify} from 'react-notify-toast';
// import ExcelDownloadSimple from './ExcelDownloadSimple';
import {saveAs} from 'file-saver';
import { makeAllWorkSheets, fillRows } from './utils';
const Excel = require('exceljs/dist/es5/exceljs.browser');
const neo4jUrl = process.env.REACT_APP_NEO4J_API;
const AUTHORIZATION = process.env.REACT_APP_NEO4J_PASSWORD;

// const SHEETNAMES = [ 'treatment', 'diet', 'litter', 'mouse', 'biosample','assay', 'reagent', 'file' ];
const SHEETNAMES = [ 'treatment', 'litter', 'mouse', 'biosample','assay', 'file', 'diet' ];

class Neo4jDownload extends Component {
    state = { noMetadata: false }
    
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
        console.log(setupQuery('mouse'));
        const params = {
            submission_id: id
        };
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
                if (Object.keys(results).length === 0) {
                    notify.show('⚠️ No metadata found', 'error')
                } else {
                    notify.show('Downloading ...⬇️', 'warning');
                    excelSimpleDownload(this.props.id, results);
                }
                
            })
            .catch(err => {
                console.log(err);
            });
}


    render() {

        return (
            <div className="dsfs">
                <Notifications/>
            </div>
        );
    }
}

export default Neo4jDownload;
/**
 * 
 * MATCH (t:treatment)<-[u:undergoes]-(m:mouse)-[pf:part_of]->(p:bioproject)-[w:works_on]
    ->(l:lab),(f:file)-[s:sequenced]->(a:assay)-[i:assay_input]->(b:biosample)-[fr:derived_from]->(m)} type 
    p.accession as part_of, 
    d.accession as fed, 
    lt.accession as born_to`
 */
function setupQuery(type) {
    let queryParams = '';
    const queryCore = `MATCH (f:file)-[s:sequenced]->(a:assay)-[i:assay_input]->(b:biosample)-[fr:derived_from]->(m) `
    
    switch (type) {
        case 'treatment':
            queryParams = `WHERE f.submission_id = $submission_id RETURN DISTINCT t as treatment`;
            return queryCore + queryParams;

        case 'biosample':
            queryParams = `WHERE f.submission_id = $submission_id RETURN DISTINCT b as biosample, m.accession as derived_from`;
            return queryCore + queryParams;

        case 'mouse':
            queryParams = `WHERE f.submission_id = $submission_id 
            OPTIONAL MATCH undergoes_cursor=(m:mouse)-[u:undergoes]-(t:treatment)
            OPTIONAL MATCH fed_cursor=(m:mouse)-[fd:fed]-(d:diet) 
            OPTIONAL MATCH born_to_cursor=(m:mouse)-[bt:born_to]-(lt:litter) 
            OPTIONAL MATCH part_of_cursor=(m:mouse)-[pf:part_of]->(p:bioproject)
            RETURN DISTINCT m as mouse, 
            CASE WHEN undergoes_cursor IS NULL THEN [] ELSE undergoes_cursor as undergoes
            CASE WHEN fed_cursor IS NULL THEN [] ELSE fed_cursor as fed
            CASE WHEN born_to_cursor IS NULL THEN [] ELSE born_to_cursor as born_to
            CASE WHEN part_of_cursor IS NULL THEN [] ELSE part_of_cursor as part_of
            `
            ;
            return queryCore + queryParams;

        case 'file':
            return `MATCH (t:treatment)<-[u:undergoes]-(m:mouse)-[pf:part_of]->(p:bioproject)-[w:works_on]->(l:lab),
            (n:file)<-[pr:paired_file]-(f:file)-[s:sequenced]->(a:assay)-[i:assay_input]->(b:biosample)-[fr:derived_from]->(m) 
                    WHERE f.submission_id = $submission_id 
                    RETURN DISTINCT f as file, 
                    n.accession as paired_file, 
                    a.accession as sequenced`
                    

        case 'assay':
            queryParams = `WHERE f.submission_id = $submission_id RETURN DISTINCT a as assay, b.accession as assay_input`;
            return queryCore + queryParams;

        case 'litter':
            let overridenQuery = `MATCH (t:treatment)<-[u:undergoes]-(m:mouse)-[bt:born_to]-(li:litter)-[pf:part_of]->(p:bioproject)-[w:works_on]
            ->(l:lab),(f:file)-[s:sequenced]->(a:assay)-[i:assay_input]->(b:biosample)-[fr:derived_from]->(m) 
            WHERE f.submission_id = $submission_id OPTIONAL MATCH (msr:mouse)-[sr:sire]-(li:litter), (mdm:mouse)-[dm:dam]-(li:litter) 
            RETURN DISTINCT li as litter, p.accession as part_of, msr.accession as sire, mdm.accession as dam`;
            return overridenQuery;

        case 'diet':
            return `MATCH (t:treatment)<-[u:undergoes]-(m:mouse)-[bt:born_to]-(li:litter)-[pf:part_of]->(p:bioproject)-[w:works_on]
            ->(l:lab),(f:file)-[s:sequenced]->(a:assay)-[i:assay_input]->(b:biosample)-[fr:derived_from]->(m) 
                WHERE f.submission_id = $submission_id 
                OPTIONAL MATCH (m:mouse)-[fd:fed]-(d:diet) RETURN DISTINCT d as diet`;
    
        default:
            break;
    }
}
// const query = 'MATCH (t:treatment)<-[u:undergoes]-(m:mouse)-[pf:part_of]->(p:bioproject)' +
//         '-[w:works_on]->(l:lab),(f:file)-[s:sequenced]->(a:assay)-[i:assay_input]->(b:biosample)' +
//         '-[fr:derived_from]->(m) ' +
//         'WHERE f.submission_id = $submission_id RETURN DISTINCT a as assay'

function formatResultsForState(resArray) {
    const formattedResult = resArray.map(res => {
        const entry = res.data.results;
        if (entry.length > 0) {
            const { columns, data } = entry[0];
            let tmp = {};
            if (data.length > 0) {
                const sheetName = columns[0];
                tmp['sheet'] = sheetName;
                tmp['rows'] = data.map(d => d.row[0]).filter(d => d);
                if (columns.length > 1) { // there are relationships too
                    for (let index = 1; index < columns.length; index++) {
                        const columnName = columns[index];
                        tmp['rows'] = tmp['rows'].map((row, i) => {
                            row[columnName] = data[i].row[index];
                            return row;
                        });
                    }
                }

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
        .then(buffer => saveAs(new Blob([buffer]), `${id}_${Date.now()}.xlsx`))
        .catch(err => console.log('Error writing excel export', err));    
}


