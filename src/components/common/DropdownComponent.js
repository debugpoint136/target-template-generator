import React, {Component} from 'react'
import {Dropdown, Label} from 'semantic-ui-react'

export default class DropdownComponent extends Component {
    state = { }

    render() {
        const { item, field, selection } = this.props;
        let valueArray = selection.filter(d => d.item === item && d.field === field);
        
        let value = '';
        if (valueArray.length > 0) {
            value = valueArray[0].value;
        } 
        return (
            <div className="m-4 p-8" key={`${item}]-[${this.props.field}]-[${this.props.name}`}>
                <Label>{field}</Label>
                <Dropdown
                    key={`${item}]-[${this.props.field}]-[${this.props.name}`}
                    onChange={this.props.handleChange}
                    options={this.props.options}
                    placeholder='Choose an option'
                    selection
                    name={`${item}]-[${this.props.field}]-[${this.props.name}`}
                    value={value}/>       
            </div>
        )
    }
}
