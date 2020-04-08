import _ from 'lodash';
import { generateAccession } from '../../helpers';
const m = require('moment');

const PREFIX = {
    assay: 'AS',
    biosample: 'BS',
    diet: 'DT',
    litter: 'LT',
    mouse: 'MS',
    file: 'FI',
    treatment: 'TR',
    reagent: 'RG'
}
// const PREFIX = {
//     'Assay Details': 'AS',
//     'Biosample': 'BS',
//     'Diet': 'DT',
//     'Litter': 'LT',
//     'Mice': 'MS',
//     'File': 'FI',
//     'Treatment': 'TR',
//     'Reagent': 'RG'
// }
const ALL_SCHEMA = require('../../json/fields.json');
const ALL_CONNECTIONS = require('../../json/connections.json');
const SHEETNAMES = [ 'treatment', 'diet', 'litter', 'mouse', 'biosample','assay', 'reagent', 'file' ];
// SHEETNAMES.forEach(name => ALL_SCHEMA[name] = require(`../../json/fields/${name}.js`));
const ALL_VALUES = SHEETNAMES.map(name => getValues(name));
const ALL_DATES = flatten(SHEETNAMES.map(name => getDateFields(name)).filter(d => d));

// SHEETNAMES.forEach(name => ALL_CONNECTIONS[name] = require(`../../json/metadata_objects/${name}.js`));
const CONNECTION_OPTIONS = {};
SHEETNAMES.forEach(name => {
    CONNECTION_OPTIONS[name] = getConnectionOptions(name);
});

const HEADERDISPLAYTOKEY = {};
SHEETNAMES.forEach(name => {
    HEADERDISPLAYTOKEY[name] = getDisplayNameToKeys(name);
});


// const SHEETID = {
//     'Treatment': 1,
//     'Diet': 2,
//     'Litter': 3,
//     'Mice': 4,
//     'Biosample': 5,
//     'Assay Details': 6,
//     'Reagent': 7,
//     'File': 8
// }

const SHEETNAMEID = {
    'treatment': 1,
    'diet': 2,
    'litter': 3,
    'mouse': 4,
    'biosample': 5,
    'assay': 6,
    'reagent': 7,
    'file': 8
}

const SHEETNAMELOOKUP = {
    'Treatment': 'treatment',
    'Diet': 'diet',
    'Litter': 'litter',
    'Mice': 'mouse',
    'Biosample': 'biosample',
    'Assay Details': 'assay',
    'Reagent': 'reagent',
    'File': 'file'
}

const VALUES_RANGE = [];

export function getDropdownOptions(name) {
    const json = require(`../../json/fields/${name}.js`);
    const options = json.filter(item => item.values_restricted === true)
                        .map(listObj => {
                            let tmp = {
                                name: listObj.name,
                                text: listObj.text,
                                values: listObj.values
                            };
                            
                            return tmp
                        });

    return options.map(elem => ({
            key: elem.name,
            text: elem.text,
            options: formatForDropDown(elem.values)
        }))
}

function formatForDropDown(list) {
    return list.map((d, i) => ({ key: d, text: d, value: d }))
}

/** helper functions for Excel Download */

const style = {
    required: {
        name: 'Arial Black',
        color: { argb: 'FFFF0000' },
        family: 2,
        size: 11,
    },
    notRequired: {
        name: 'Arial Black',
        color: { argb: 'FFFF6600' },
        family: 1,
        size: 10,
        italic: true
    },
    relationshipRequired: {
        name: 'Arial Black',
        color: { argb: 'FF0000FF' },
        family: 2,
        size: 11,
    },
    relationshipNotRequired: {
        name: 'Arial Black',
        color: { argb: 'FF008080' },
        family: 2,
        size: 11,
    }
}
export function makeAllWorkSheets(WORKBOOK) { // in index.js :  var workbook = new Excel.Workbook();
    
    SHEETNAMES.forEach(item => makeOneWorkSheet(WORKBOOK, item));
    const WORKBOOK_WITH_LOOKUPS = fillLookups(WORKBOOK);

    return WORKBOOK_WITH_LOOKUPS;
}

export function makeJustOneWorksheet(WORKBOOK) {
    makeOneWorkSheet(WORKBOOK, 'file');
    const WORKBOOK_WITH_LOOKUPS = fillLookups(WORKBOOK);

    return WORKBOOK_WITH_LOOKUPS;
}


function fillLookups(WORKBOOK) {
    const LOOKUPS = WORKBOOK.addWorksheet('lookups');
    let counter = 1;

    SHEETNAMES.forEach((sheetName, index) => {
        const sheetValues = ALL_VALUES[index];

        let acc = [];
        Object.keys(sheetValues).forEach((fieldName, index) => {
                const fieldListOfValues = sheetValues[fieldName];
                let tmp = {};
                // create column
                LOOKUPS.getColumn(counter).values = fieldListOfValues;
                let columnLetter = '';
                if (counter > 26 && counter < 53) {
                    columnLetter = "A" + (counter - 26 + 9).toString(36).toUpperCase();
                } else if (counter > 52 && counter < 79) {
                    columnLetter = "B" + (counter - 26 + 9).toString(36).toUpperCase();
                } else {
                    columnLetter = (counter + 9).toString(36).toUpperCase();
                }

                const rangeStr = `lookups!${columnLetter}1:${columnLetter}${fieldListOfValues.length}`;
                tmp[fieldName] = rangeStr;
                acc.push(tmp);
                counter = counter + 1;
                
        });
        VALUES_RANGE.push(acc);
    });

    LOOKUPS.state = 'hidden';

    return WORKBOOK;
}
function makeOneWorkSheet(WORKBOOK, NAME) {

    const headerSchema = formatDataForExcel(NAME);
    const connectionsList = CONNECTION_OPTIONS[NAME];

    const createdWorksheet = WORKBOOK.addWorksheet(NAME);
    const headers = headerSchema.map(elem => ({ key: elem.key, header: elem.header, width: elem.header.length + 5 }));
    const relationsHeaders = connectionsList.map(elem => ({ key: elem.name, header: elem.display_name, width: elem.name.length + 5}));
    createdWorksheet.columns = headers.concat(relationsHeaders);
    let HEADER = createdWorksheet.getRow(1);

    // Iterate over all non-null cells in a row
    HEADER.eachCell(function(cell, colNumber) {
        if (colNumber <= headers.length) {
            if (headerSchema[colNumber - 1].required) {
                cell.font = style.required;
            } else {
                cell.font = style.notRequired;
            }
        } else if (colNumber <= headers.length + connectionsList.length) {
            if (connectionsList[colNumber - headers.length - 1].required) {
                cell.font = style.relationshipRequired;
            } else {
                cell.font = style.relationshipNotRequired;
            }
        }
    });
}

function formatDataForExcel(name) {
    const json = require(`../../json/fields/${name}.js`);
    const headers = json.map(listObj => {
                            const { name, text, placeholder, required, values } = listObj;
                            let tmp = {};
                            tmp['key'] = name;
                            tmp['header'] = text;
                            tmp['placeholder'] = placeholder;
                            tmp['required'] = required;
                            if (values) {
                                tmp['values'] = values;
                            }
                            
                            return tmp
                        });
    const system_accession = [{
        key: 'accession',
        header: 'System accession',
        placeholder: '',
        required: false
    }];

    const headerSchema = system_accession.concat(headers);

    return headerSchema;
}

/**
 * FILL UP ROWS
 */

export function fillRows(WORKBOOK, DATATOFILL, TYPE) { // TYPE = 'template' or 'data'

    Object.keys(DATATOFILL).forEach((ROWNAME) => {
        const ROW_DATA = DATATOFILL[ROWNAME];
        const worksheet = WORKBOOK.getWorksheet(ROWNAME);
        const header = worksheet.getRow(1);
        const headerCellNames = header.values;

        const VALUES_ARRAY = getValueRanges(headerCellNames, ROWNAME);

        ROW_DATA.forEach(ROW => {
            
            let createdRow = {};

            if (TYPE === 'template') {
                const SYSTEM_ACCSN = generateAccession(PREFIX[ROWNAME]);
                let rowEntry = Object.assign({ accession: SYSTEM_ACCSN }, ROW);
    
                createdRow = worksheet.addRow(rowEntry);
            }

            if (TYPE === 'data') {
                createdRow = worksheet.addRow(ROW);
            }
            

            createdRow.eachCell(function(cell, colNumber) {
                    cell.fill = {
                        type: 'pattern',
                        pattern:'solid',
                        fgColor:{argb:'cccccc'}
                    }
                    
                    if (VALUES_ARRAY[colNumber]) {
                        cell.dataValidation = {
                            type: 'list',
                            allowBlank: false,
                            formulae: [ VALUES_ARRAY[colNumber] ] // `lookups!A1:A3`;
                        };
                    }
                });
        });
        worksheet.views = [{'state': 'frozen', xSplit: 1 }];
    });
    return WORKBOOK;
}

export function fillOnlyFileRows(WORKBOOK, DATATOFILL) {
    const worksheet = WORKBOOK.getWorksheet('file');
    const header = worksheet.getRow(1);
    const headerCellNames = header.values;

    const VALUES_ARRAY = getValueRanges(headerCellNames, 'file');

    DATATOFILL.forEach(ROW => {
            
        let createdRow = {};

        const SYSTEM_ACCSN = generateAccession(PREFIX['file']);
        let rowEntry = Object.assign({ accession: SYSTEM_ACCSN }, ROW);

        createdRow = worksheet.addRow(rowEntry);
        
        createdRow.eachCell(function(cell, colNumber) {
                cell.fill = {
                    type: 'pattern',
                    pattern:'solid',
                    fgColor:{argb:'cccccc'}
                }
                
                if (VALUES_ARRAY[colNumber]) {
                    cell.dataValidation = {
                        type: 'list',
                        allowBlank: false,
                        formulae: [ VALUES_ARRAY[colNumber] ] // `lookups!A1:A3`;
                    };
                }
            });
    });

    return WORKBOOK;
}

function getValues(sheetname) {
    let tmp = {};
    ALL_SCHEMA[sheetname].forEach(entry => {
        if (entry.values) {
            tmp[entry.text] = entry.values;
        }
    })
    return tmp;
}

function getConnectionOptions(sheetname) {
    const connectionOptions = ALL_CONNECTIONS[sheetname].connections.map(entry => {
        const { name, placeholder, to, display_name } = entry;
        const requiredCondition = (entry.hasOwnProperty('required') ? true: false);
        return {
            name: name,
            display_name: display_name,
            placeholder: placeholder,
            to: to,
            required: requiredCondition
        }
    });

    return connectionOptions;
}

const sheetFillouts = {};
export function reshapeSheetFillouts (ROWS) {

    SHEETNAMES.forEach(s => sheetFillouts[s] = []); // setup

    ROWS.forEach(row => {
        const { item, columns } = row;
        const sheetName = SHEETNAMELOOKUP[item];
        let rowEntry = {};
        columns.forEach((entry, i) => {
            let { name, value } = entry;
            rowEntry[name] = value;
        });
        sheetFillouts[sheetName].push(rowEntry);
    })

    return sheetFillouts;
}


function getValueRanges (headers, sheetname) {

    const sheetid = SHEETNAMEID[sheetname];
    return headers.map(item => {
        if (item) {
            if (VALUES_RANGE[sheetid - 1]) {
                let tmp = VALUES_RANGE[sheetid - 1].filter(d => Object.keys(d)[0] === item)[0];
                if (tmp) {
                    return Object.values(tmp)[0];
                } else {
                    return null;
                }                    
            } else {
                return null;
            }
        } else {
            return null;
        }
    });
}

export function restructureSheetFillouts(WORKBOOK, downloadedJSON) { // for firebase downloads

    const downloadedObj = JSON.parse(downloadedJSON);
    const result = {};

    Object.keys(downloadedObj).forEach(sheetName => {

        const sheetObj = downloadedObj[sheetName];
        const list = Object.values(sheetObj);

        result[sheetName] = list;

    });

    return result;
}

function getDisplayNameToKeys(sheetname) {
    let tmp = {};
    ALL_CONNECTIONS[sheetname].connections.forEach(entry => {
        const { name, display_name } = entry;
        tmp[display_name] = name;
    });

    ALL_SCHEMA[sheetname].forEach(entry => {
        const { name, text } = entry;
        tmp[text] = name;
    });

    return tmp;
}

export function swapDisplayNamesToKeys(sheetName, dataObj) {
    const headerDisplayToKeys = HEADERDISPLAYTOKEY[sheetName];
    
    let updatedObj = dataObj.map(elem => {
        let tmp = {};
        Object.keys(elem).forEach(displayName => {
            const keyName = headerDisplayToKeys[displayName];
            tmp['accession'] = elem['System accession'];
            tmp[keyName] = elem[displayName]
        });
        return tmp;
    })
    
    return updatedObj;
}

export function createNeo4jUploadQuery(DATA, USER, LAB) {
    const keysToIterate = Object.keys(DATA);

    // keysToIterate.forEach(key => console.log(`${key} == ${DATA[key].length}`));

    if (! keysToIterate.length > 0) {
        return null;
    }

    const allFields = keysToIterate.map(key => {
        const fields = ALL_SCHEMA[key];
    
        const templateQueryFields = makeQueryTemplateFields(fields, key, USER, LAB);

        return { sheetname: key, query: templateQueryFields, type: 'node' };
    })

    const allConnectionsAddAoA= keysToIterate.map(key => {
        const connections = CONNECTION_OPTIONS[key];
        if (connections.length > 0) {
            // const templateQueryConnections = makeQueryTemplateConnectionsAdd(connections, key);
            const templateQueryConnections = addNewConnections(connections, key, LAB);
            return templateQueryConnections.map(item => ({ sheetname: key, query: item, type: 'add' }));
            // return { sheetname: key, query: templateQueryConnections, type: 'add' };
        } else {
            return null;
        }
    })

    const allConnectionsAdd = _.flattenDeep(allConnectionsAddAoA);
    // console.log(allConnectionsAdd);
    
    const allConnectionsRemoveAoA = keysToIterate.map(key => {
        const connections = CONNECTION_OPTIONS[key];
        if (connections.length > 0) {
            // const templateQueryConnections = makeQueryTemplateConnectionsRemove(connections, key);
            const removeQueries = removeExistingConnections(connections, key, LAB);
            return removeQueries.map(item => ({ sheetname: key, query: item, type: 'remove' }))
            // return { sheetname: key, query: templateQueryConnections, type: 'remove' };
        } else {
            return null;
        }
    })
    const allConnectionsRemove = _.flattenDeep(allConnectionsRemoveAoA);

    const allConnections = allConnectionsRemove.concat(allConnectionsAdd);
    
    const allQuery = allFields.concat(allConnections.filter(d => d));
    // const allQuery = allConnections;
    // console.log(allQuery);
    return allQuery;
}

function makeQueryTemplateFields(FIELDS, ITEM, USER, LAB) {
    const query = `WITH {json} as data
    UNWIND data.${ITEM} as row
    MERGE (${ITEM}:${ITEM} {accession: row.accession, lab: "${LAB}"})
    ON CREATE SET ${ITEM}.accession = row.accession, ${ITEM}.user = "${USER}", ${ITEM}.created = ${Date.now()}, ${ITEM}.lab = "${LAB}",
        `;
    const queryFieldsArrayFields = FIELDS.map(field => { 
        if (field.name === 'accession' || field.name === undefined || field.name === 'user' || field.name === 'created') {
            return null;
        } else {
            return `${ITEM}.${field.name} = row.${field.name}`;
        }
    });

    const queryFieldsArray = queryFieldsArrayFields.filter(d => d);
    const queryFieldsCreate = queryFieldsArray.join(',\n\t\t');

    // Add user name
    let tmpUser = `${ITEM}.last_updated_by = "${USER}"`;
    queryFieldsArray.push(tmpUser)

    // Add date
    const timeStamp = Date.now();
    // const timeStampReadable = moment(timeStamp).format('lll');
    let tmpDate = `${ITEM}.last_updated = ${timeStamp}`;
    queryFieldsArray.push(tmpDate)

    const queryFieldsMatch = queryFieldsArray.join(',\n\t\t');

    const final = query + queryFieldsCreate + `
    ON MATCH SET
    ` + queryFieldsMatch + 
    `
    RETURN ${ITEM}.accession as ${ITEM}
    `;
    // console.log(final);
    return final;
}

function removeExistingConnections(CONNECTIONS, ITEM, LAB) {

    let header = `
        WITH {json} as data
        UNWIND data.${ITEM} as row
        MATCH (${ITEM}:${ITEM} {accession: row.accession, lab: "${LAB}"})
        `;
    const queryConnectionsArray = CONNECTIONS.map((connection, index) => {
        const connectionName = connection.name;
        const connectionTo = connection.to;
        let body = `
        OPTIONAL MATCH (${ITEM})-[r:${connectionName}]->(${ITEM}_${connectionName}_${connectionTo}:${connectionTo}) 
        WITH ${ITEM}_${connectionName}_${connectionTo}, row, ${ITEM}, r
        FOREACH(x IN (CASE WHEN ${ITEM}_${connectionName}_${connectionTo} IS NULL THEN [] else [1] END) |
        DELETE r
        )
        RETURN ${ITEM}.accession as ${ITEM}, collect(${ITEM}_${connectionName}_${connectionTo}.accession) as deleted_relationship_${connectionName}
        `;

        return header + body;
    })

    return queryConnectionsArray;
}


function addNewConnections(CONNECTIONS, ITEM, LAB) {

    let header = `
        WITH {json} as data
        UNWIND data.${ITEM} as row
        MATCH (${ITEM}:${ITEM} {accession: row.accession, lab: "${LAB}"})
        `;
    const queryConnectionsArray = CONNECTIONS.map((connection, index) => {
        const connectionName = connection.name;
        const connectionTo = connection.to;

        let template = `
        WITH split('TGTASOR0RBNG,TGTASZ04K3W9', ',') AS ASSAYS 
        UNWIND ASSAYS AS q 
            MATCH (a:assay {accession: q}) WITH a 
            MATCH (b:biosample {accession: "TGTBSHPR44EC"}) WITH a, b
                        FOREACH(x IN (CASE WHEN a IS NULL THEN [] else [1] END) |
                                CREATE (a)-[:assay_input]->(b)
                            )`;

        let bodybkup = ` 
        OPTIONAL MATCH (${ITEM}_${connectionName}_${connectionTo}:${connectionTo} {accession:row.${connectionName}})
        WITH ${ITEM}_${connectionName}_${connectionTo}, row, ${ITEM}
        FOREACH(x IN (CASE WHEN ${ITEM}_${connectionName}_${connectionTo} IS NULL THEN [] else [1] END) |
        CREATE (${ITEM})-[:${connectionName}]->(${ITEM}_${connectionName}_${connectionTo})
        )
        RETURN ${ITEM}.accession as ${ITEM}, ${ITEM}_${connectionName}_${connectionTo}.accession as added_relationship_${connectionName}`;

        let body = ` 
        WITH split(toString(row.${connectionName}), ',') AS ${ITEM}_${connectionName}_${connectionTo}_list, ${ITEM}, row
        UNWIND ${ITEM}_${connectionName}_${connectionTo}_list AS q 
            OPTIONAL MATCH (${ITEM}_${connectionName}_${connectionTo}:${connectionTo} {accession:q})
            WITH ${ITEM}_${connectionName}_${connectionTo}, row, ${ITEM}
            FOREACH(x IN (CASE WHEN ${ITEM}_${connectionName}_${connectionTo} IS NULL THEN [] else [1] END) |
            CREATE (${ITEM})-[:${connectionName}]->(${ITEM}_${connectionName}_${connectionTo})
            )
        RETURN ${ITEM}.accession as ${ITEM}, ${ITEM}_${connectionName}_${connectionTo}.accession as added_relationship_${connectionName}`;

        console.log(header+body)

        return  header + body;
    })

    return queryConnectionsArray;
}

export function validateUpload(obj) {
    const { data, 
        // lab, user 
    } = obj;
    let result = {};
    let errorCount = 0;


    Object.keys(data).forEach(sheetname => {
        result[sheetname] = {};
        const rows = data[sheetname];
        const schema = ALL_SCHEMA[sheetname];
        // rows.forEach(row => {
        //     Object.keys(row).forEach(key => {
        //         const value = row[key];
        //         if (schema.filter(d => d.name === key).length > 0) {
        //             const field = schema.filter(d => d.name === key)[0];
        //             if (field.values) {
        //                 if (field.values.filter(val => val === value).length === 0) {
        //                     result[sheetname].push(`${row.accession} : ${field.text} can only have values from list: ${JSON.stringify(field.values)}`);
        //                     errorCount++;
        //                 } 
        //             }
        //         } 
        //     })
        // })

/* one row in rows -
accession: "TRGTMSE0004"
animal_weight_sac: 23.94
born_to: "TRGTLTR0002"
comments: "Weight at weaning (g): 8.9"
fasted: "Yes"
fasted_hours: 6
fed: "TRGTDIET0002"
internal_id: "T101c"
life_stage_collection: "adult (15 to 30 weeks)"
liver_tumors: "TRUE"
mouse_age_collection: "21.7 weeks"
organism: "Mus musculus"
part_of: "TRGTBPR0004"
*/
        rows.forEach(row => {
            const patt = new RegExp("TRGT");
            const BPRpatt = new RegExp("TRGTBPR"); 
            const LABpatt = new RegExp("TRGTLAB"); 

            if (patt.test(row.accession)) {
                if (!BPRpatt.test(row.accession) && !LABpatt.test(row.accession)) {
                    result[sheetname][row.accession] = [` Seems like you are using old format metadata sheet. Not permitted operation --> Please contact ADMIN`];
                    errorCount++;
                    return;
                } 
            }
            Object.values(row).forEach(filledValue => {
                if (patt.test(filledValue)) {
                    if (!BPRpatt.test(filledValue) && !LABpatt.test(filledValue)) {
                        result[sheetname][row.accession] = [`${filledValue} : Seems like you are using old format metadata sheet. Not permitted operation --> Please contact ADMIN`];
                        errorCount++;
                        return;
                    } 
                }
            });
            schema.forEach(field => {
                if (field.text === 'Subcellular fraction') {
                    // console.log(field.required)
                }
                if (field.required) {
                    if (Object.keys(row).filter(d => d === field.name).length > 0) {
                        // exists
                        if (field.values) {
                                if (field.values.filter(val => val === row[field.name]).length === 0) {

                                    if (field.name === 'assay_target' && row['technique'] !== 'ChIP-seq (histone modification, OBI:0002017)') { // putting a special check
                                            console.log('ok'); // assay target should be required only for ChIP-seq
                                    } else {
                                        if (Array.isArray(result[sheetname][row.accession])) {
                                            result[sheetname][row.accession].push(` ${field.text} : can only have values from list: ---> ${JSON.stringify(field.values)} <--`);
                                        } else {
                                            result[sheetname][row.accession] = [` ${field.text} : can only have values from list: --> ${JSON.stringify(field.values)} <--`];
                                        }
                                        errorCount++;
                                }
                            }
                        }
                    } else {
                        // why is a required field missing?
                        if (Array.isArray(result[sheetname][row.accession])) {
                            result[sheetname][row.accession].push(` ${field.text} : is a required field`);
                        } else {
                            result[sheetname][row.accession] = [` ${field.text} : is a required field`];
                        }
                        errorCount++;
                    }
                }

                if (field.type === 'float') {
                    if (isNaN(Number.parseFloat(row[field.name]))) {
                        if (row[field.name] !== undefined && row[field.name] !== '') {
                            if (Array.isArray(result[sheetname][row.accession])) {
                                result[sheetname][row.accession].push(` ${field.text} : should be of data type: Float`);
                            } else {
                                result[sheetname][row.accession] = [` ${field.text} : should be of data type: Float`];
                            }
                        }
                    } 
                }

                if (field.type === 'integer') {
                    if (isNaN(Number.parseInt(row[field.name], 10))) {
                        // console.log(field.text, row[field.name]);
                        if (row[field.name] !== undefined && row[field.name] !== '') {
                            if (Array.isArray(result[sheetname][row.accession])) {
                                result[sheetname][row.accession].push(` ${field.text} : should be of data type: Integer`);
                            } else {
                                result[sheetname][row.accession] = [` ${field.text} : should be of data type: Integer`];
                            }
                        }
                    } 
                }
            })
        })
    })

    return { result: result, error: errorCount };
}

/*
accession: "TGTFIPGK2PE2"
barcode: "AGTTAGC"
date_sequenced: 43373
description: "raw reads"
filename: "Blood-3wks-m17.PE.R2.fastq.gz"
format: "fastq"
instrument: "HiSeq 4000"
md5sum: "f3954f3bf21702d2933c34b2805621ee"
pair: "reverse"
paired_file: "TGTFIA51S36V"
pcr_cycles: 15
pilot: "production"
platform: "Illumina"
read_length: 150
run_number: 367
run_type: "paired-end"
sequenced: "TGTASE654W94"
sequenced_by: "BP"
sequencing_lane: 4
spike_ins: "FALSE"
submission_id: "49ec1f20-ea62-4933-adbd-2dec997c6c2e"
undefined: "TGTFIPGK2PE2"
user_accession: "USRFF0304"
*/

function getDateFields(sheetname) {
    const toReturn = [];
    ALL_SCHEMA[sheetname].forEach(entry => {
        let tmp = {};
        if (entry.type === 'date') {
            tmp[sheetname] = entry.name;
            toReturn.push(tmp);
        }
    })
    if (toReturn.length > 0) {
        return toReturn;
    } else {
        return null;
    }
}

export function cleanUpDate(obj) {
    ALL_DATES.forEach(item => {
        const sheetname = Object.keys(item)[0];
        const column = item[sheetname];
        let rows = item[sheetname];
        if (rows.length > 0) {
            obj[sheetname] = transformDates(obj[sheetname], column);
        }
    })
    return obj;
}

function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}

function transformDates(rows, column) {
    const rowsWithDateTransformed = []
    rows.forEach(row => {
        const fieldValue = row[column];
        if (fieldValue && Number.isInteger(fieldValue)) {
            row[column] = transformDate(fieldValue);
        } 
        rowsWithDateTransformed.push(row)
    })
    return rowsWithDateTransformed;
}

function transformDate(dateStr) {
    const epochStr = (Number.parseInt(dateStr) - 25569) * 86400 * 1000;
    return m(epochStr).format('YYYY-MM-DD');
}