import React, {Component} from 'react';

class ListAddedRows extends Component {
    state = {}
    render() {
        return (
            <div>
                Added Rows
                {this.props.children}
            </div>
        );
    }
}

export default ListAddedRows;