import { generateAccession } from '../../helpers';
// const PREFIX = {
//     assay: 'AS',
//     biosample: 'BS',
//     diet: 'DT',
//     litter: 'LT',
//     mouse: 'MS',
//     file: 'FI',
//     treatment: 'TR',
//     reagent: 'RG'
// }
const PREFIX = {
    'Assay Details': 'AS',
    'Biosample': 'BS',
    'Diet': 'DT',
    'Litter': 'LT',
    'Mice': 'MS',
    'File': 'FI',
    'Treatment': 'TR',
    'Reagent': 'RG'
}
const ALL_SCHEMA = {};

const SHEETNAMES = [ 'treatment', 'diet', 'litter', 'mouse', 'biosample','assay', 'file' ];
SHEETNAMES.forEach(name => ALL_SCHEMA[name] = require(`../../json/fields/${name}.js`));
const ALL_VALUES = SHEETNAMES.map(name => getValues(name));


const SHEETID = {
    'Treatment': 1,
    'Diet': 2,
    'Litter': 3,
    'Mice': 4,
    'Biosample': 5,
    'Assay Details': 6,
    'File': 7
}

export function getDropdownOptions(name) {
    const json = require(`../../json/fields/${name}.js`);
    const options = json.filter(item => item.values_restricted === false)
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
    }
}
export function makeAllWorkSheets(WORKBOOK) { // var workbook = new Excel.Workbook();
    
    SHEETNAMES.forEach(item => makeOneWorkSheet(WORKBOOK, item));

    return WORKBOOK;
}

function makeOneWorkSheet(WORKBOOK, NAME) {

    const headerSchema = formatDataForExcel(NAME);
    const createdWorksheet = WORKBOOK.addWorksheet(NAME);
    createdWorksheet.columns = headerSchema.map(elem => ({ key: elem.key, header: elem.header, width: elem.header.length + 5 }));
    let HEADER = createdWorksheet.getRow(1);

    // Iterate over all non-null cells in a row
    HEADER.eachCell(function(cell, colNumber) {
        if (headerSchema[colNumber - 1].required) {
            cell.font = style.required;
        } else {
            cell.font = style.notRequired;
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

export function fillRows(WORKBOOK, ROWS) {

    ROWS.forEach(ROW => {
        const sheetid = SHEETID[ROW.item];
        const VALUES_FOR_THIS_SHEET = ALL_VALUES[sheetid - 1];

        const worksheet = WORKBOOK.getWorksheet(sheetid);
        const header = worksheet.getRow(1);
        const headerCellNames = header.values;

        const VALUES_ARRAY = headerCellNames.map(item => {
            if (item) {
                return VALUES_FOR_THIS_SHEET[item];
            } else {
                return null;
            }
        });

        const { columns } = ROW;
        const SYSTEM_ACCSN = generateAccession(PREFIX[ROW.item]);
        let rowEntry = { system_accession: SYSTEM_ACCSN };
        columns.forEach((entry, i) => {
            let { name, value } = entry;
            rowEntry[name] = value;            
        });

        const createdRow = worksheet.addRow(rowEntry);
        createdRow.eachCell(function(cell, colNumber) {
                cell.fill = {
                    type: 'pattern',
                    pattern:'solid',
                    fgColor:{argb:'cccccc'}
                }

                if (VALUES_ARRAY[colNumber]) {
                    let values = VALUES_ARRAY[colNumber].join(',').toString();
                    let formattedValues = [JSON.stringify(values)];
                    cell.dataValidation = {
                        type: 'list',
                        allowBlank: false,
                        formulae: formattedValues // ['"One,Two,Three,Four"']
                    };
                }
            });

    })

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