import React, {Component} from 'react';
import {Input, Label} from 'semantic-ui-react'

class RowComponent extends Component {
    state = {}
    render() {
        return (
            <div className="flex bg-white p-4 m-4 shadow-lg">
                <div className="border-blue border-b-2 text-2xl font-sans text-grey-dark text-center w-1-/4 m-4 p-4">{this.props.name}</div>
                <hr/>
                <div className="w-2/3">
                    {this.props.children}
                </div>
                {this.props.showRowAddInput ? 
                    <div className="w-1/3 mt-8">
                    <Label color='blue' basic>Enter number</Label>
                    <Input key={this.props.name} name={this.props.name} size='large' icon='question' placeholder='How many records' onChange={this.props.handleUpdate} />
                    </div>
                : null
                }
            </div>
        );
    }
}

export default RowComponent;