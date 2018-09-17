import React, {Component} from 'react'
import {Dropdown, Grid, Segment, Label} from 'semantic-ui-react'

export default class DropdownComponent extends Component {
    state = { }

    render() {
        const { item, field, selection } = this.props;
        let valueArray = selection.filter(d => d.item === item && d.field === field);
        let value = '';
        if (valueArray.length > 0) {
            value = valueArray[0].value
        } 
        return (
            <div className="m-4 p-8">
                <Grid columns={2}>
                    <Grid.Column>
                        <Label>{field}</Label>
                        <Dropdown
                            onChange={this.props.handleChange}
                            options={this.props.options}
                            placeholder='Choose an option'
                            selection
                            name={`${item}]-[${field}`}
                            value={value}/>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment secondary>
                            <pre>Current value: {value}</pre>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}
