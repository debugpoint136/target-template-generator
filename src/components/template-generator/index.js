import React, {Component} from 'react';
import RowComponent from './RowComponent';
import LookupComponent from './LookupComponent';
import {getDropdownOptions} from './utils';
import DropdownComponent from '../common/DropdownComponent';
const metadataOptions = { 'Mice': getDropdownOptions('mouse'), 'Biosample': getDropdownOptions('biosample') };

class TemplateGenerator extends Component {
    state = {
        lab: "Dolinoy Lab",
        selection: []
    }

    handleChange = (e, {name, value}) => {
        const stateCopy = {
            ...this.state
        };

        let item = '';
        let field = '';
        if (name) {
            const splitValues = name.split(']-[');
            item = splitValues[0];
            field = splitValues[1];
        }

        if (item !== '' && field !== '') {
            let tmp = {
                item: item,
                field: field,
                value: value
            }
            let update = stateCopy.selection.filter(d => !(d.item === item && d.field === field));
            update.push(tmp);
            this.setState({selection: update});
        }
    }

    render() {
        return (
            <div className="bg-grey-light p-8">

            {Object.keys(metadataOptions).map((item, index) => {
                const values = metadataOptions[item];
                return <RowComponent key={index} name={item}>
                    { Object.keys(values).map((field, i) => {
                        const options = values[field];
                        return <DropdownComponent
                                    key={`${item}-${index}-${field}=${i}`}
                                    item={item}
                                    field={field}
                                    handleChange={this.handleChange}
                                    selection={this.state.selection}
                                    options={options}
                                />
                    })}
                </RowComponent>
            })}
            <LookupComponent lab={this.state.lab}/> 
            </div>
        );
    }
}

export default TemplateGenerator;