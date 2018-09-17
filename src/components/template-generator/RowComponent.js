import React, {Component} from 'react';
class RowComponent extends Component {
    state = {}
    render() {
        return (
            <div className="bg-white p-4 m-4 w-1/2 shadow-lg">
                <div className="border-blue border-b-2 text-2xl font-sans text-grey-dark text-center w-1-/4 m-4 p-4">{this.props.name}</div>
                <hr/>
                {this.props.children}
            </div>
        );
    }
}

export default RowComponent;