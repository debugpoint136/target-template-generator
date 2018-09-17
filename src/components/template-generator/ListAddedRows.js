import React, {Component} from 'react';

class ListAddedRows extends Component {
    state = {}
    render() {
        return (
            <div className="w-1/3">
                Added Rows
                {this.props.children}
            </div>
        );
    }
}

export default ListAddedRows;