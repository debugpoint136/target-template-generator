import React, {Component} from 'react';
import {Input} from 'semantic-ui-react';
import {getDropdownOptions} from './utils';
import ExcelDownloadFlat from './ExcelDownloadFlat';

const SHEETNAMES = [ 'treatment', 'litter', 'mouse', 'biosample','assay', 'file', 'diet' ];
const metadataOptions = {
    'mouse': getDropdownOptions('mouse'),
    'biosample': getDropdownOptions('biosample'),
    'assay': getDropdownOptions('assay'),
    'treatment': getDropdownOptions('treatment'),
    'diet': getDropdownOptions('diet'),
    'reagent': getDropdownOptions('reagent'),
    'litter': getDropdownOptions('litter'),
    'file': getDropdownOptions('file')
};


class FlatTemplate extends Component {
    state = {}
    handleChange = (e, {name, value}) => {
        let tmp = {};
        tmp[name] = value;
        this.setState(tmp);
    }
    render() {
        return (
            <div className="m-4 p-4 border-2 border-dotted">
                <h4>Please specify number of rows for each</h4>
                { SHEETNAMES
                    .map((sheetname, index) => 
                        <InputMetadataRowCount 
                            key={index} name={sheetname} 
                            handleChange={this.handleChange}/>)}   
                <div className="bg-teal-lightest border-2 border-blue m-4 p-4 w-1/3">
                    {(Object.values(this.state).length > 0) ?
                    <ExcelDownloadFlat data={formatMetadataOptionsForFlatLayout(metadataOptions, this.state)}/>
                    : <h4>Please fill out values above</h4>}
                </div>
            </div>
        );
    }
}

export default FlatTemplate;

const InputMetadataRowCount = (props) => (
    <Input
        className="m-4"
        icon='tags'
        iconPosition='left'
        label={{
            tag: true,
            content: `${props.name}`
        }}
        name={props.name}
        onChange={props.handleChange}
        labelPosition='right'
        placeholder='Number of rows for'/>
)


function formatMetadataOptionsForFlatLayout(input, numberOfRows) {
    const result = {};
    Object.keys(input).forEach(sheetName => {
        const metadataOptions = input[sheetName];
        const tmp = {};
        metadataOptions.forEach(entry => {
            const { key, options } = entry;
            tmp[key] = options[0].text;
        });
        const sheetRowCount = numberOfRows[sheetName];
        let sheetRows = [];
        for (let index = 0; index < sheetRowCount; index++) {
            sheetRows.push(tmp);
        }
        result[sheetName] = sheetRows;
    })

    return result;
}