import { generateAccession } from '../../helpers';
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
const ALL_SCHEMA = {};
const ALL_CONNECTIONS = {};

const SHEETNAMES = [ 'treatment', 'diet', 'litter', 'mouse', 'biosample','assay', 'reagent', 'file' ];
SHEETNAMES.forEach(name => ALL_SCHEMA[name] = require(`../../json/fields/${name}.js`));
const ALL_VALUES = SHEETNAMES.map(name => getValues(name));

SHEETNAMES.forEach(name => ALL_CONNECTIONS[name] = require(`../../json/metadata_objects/${name}.js`));
const CONNECTION_OPTIONS = {};
SHEETNAMES.forEach(name => {
    CONNECTION_OPTIONS[name] = getConnectionOptions(name);
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
        key: 'system_accession',
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

export function fillRows(WORKBOOK, DATATOFILL) {

    Object.keys(DATATOFILL).forEach((ROWNAME) => {
        const ROW_DATA = DATATOFILL[ROWNAME];
        const worksheet = WORKBOOK.getWorksheet(ROWNAME);
        const header = worksheet.getRow(1);
        const headerCellNames = header.values;

        const VALUES_ARRAY = getValueRanges(headerCellNames, ROWNAME);

        ROW_DATA.forEach(ROW => {
            
            const SYSTEM_ACCSN = generateAccession(PREFIX[ROWNAME]);
        
            let rowEntry = Object.assign({ system_accession: SYSTEM_ACCSN }, ROW);

            const createdRow = worksheet.addRow(rowEntry);

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