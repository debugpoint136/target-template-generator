import React, {Component} from 'react';
import RowComponent from './RowComponent';
import ListAddedRows from './ListAddedRows';
import {Button} from 'semantic-ui-react'

import uuid from 'uuid';
// import LookupComponent from './LookupComponent';
import {getDropdownOptions} from './utils';
import DropdownComponent from '../common/DropdownComponent';
const metadataOptions = { 
    'Mice': getDropdownOptions('mouse'), 
    'Biosample': getDropdownOptions('biosample'), 
    'Assay Details': getDropdownOptions('assay'), 
    'Treatment': getDropdownOptions('treatment') 
};


class TemplateGenerator extends Component {
    state = {
        lab: "Dolinoy Lab",
        selection: [],
        rows: [],
        filterView: undefined
    }

    handleFilter = (e, {name}) => this.setState({ filterView: name })

    handleRowAdd = (e, {name, value}) => {
        const fields = this.state.selection.filter(d => d.item === name);
        const count = value;
        let rowsArray = [];

        for (let index = 0; index < count; index++) {
            const UUID = uuid.v4();
            rowsArray.push({ id: UUID, item: name, columns: fields })
        }
        const stateRowsCopy = [...this.state.rows];
        const result = stateRowsCopy.concat(rowsArray);

        this.setState({ rows: result });
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
            name = splitValues[2];
        }

        if (item !== '' && field !== '') {
            let tmp = {
                item: item,
                field: field,
                name: name,
                value: value
            }
            let update = stateCopy.selection.filter(d => !(d.item === item && d.field === field)); // delete that item
            update.push(tmp);
            this.setState({selection: update});
        }
    }

    render() {
        return (
            <div className="sdfd">
                <div className="m-4 text-center p-4">
                    <Button.Group>
                        { Object.keys(metadataOptions).map((elem, index) => 
                                    <Button 
                                        key={elem}
                                        name={elem} 
                                        color='blue'
                                        onClick={this.handleFilter} 
                                        active={this.state.filterView === elem}>
                                        {elem}
                                    </Button>
                                    )}
                    </Button.Group>
                </div>
                <div className='flex'>    
                    <div className="w-1/2 bg-grey-light p-8">
                {Object.keys(metadataOptions)
                    .filter(d => d === this.state.filterView)
                    .map((item, index) => {
                    const values = metadataOptions[item];
                    
                    return <RowComponent key={index} name={item} handleUpdate={this.handleRowAdd}>
                        { values.map((value, i) => {
                            const { key, text, options } = value;
                            return <DropdownComponent
                                        key={`${item}-${index}-${key}=${i}`}
                                        name={key}
                                        item={item}
                                        field={text}
                                        handleChange={this.handleChange}
                                        selection={this.state.selection}
                                        options={options}
                                    />
                        })}
                    </RowComponent>
                })}
                </div>
                    <div className="border-blue-lighter border-2 rounded mx-8 p-8 w-1/2">
                        { (this.state.rows.length > 0 && this.state.filterView !== undefined) ? 
                            <ListAddedRows>
                                { this.state.rows
                                    .filter(d => d.item === this.state.filterView)
                                    .map((row, index) => <p key={index}>{row.id}</p>)}
                            </ListAddedRows>
                            : null 
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default TemplateGenerator;