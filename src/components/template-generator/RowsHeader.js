import React, {Component} from 'react';
import {Label} from 'semantic-ui-react';

class RowsHeader extends Component {
    state = {}
    render() {
        return (
            <div className="bg-grey-darker m-2 p-2 flex justify-between">
                <div className="text-white text-center">Id</div>
                {this.props.data
                    .map((d, i) => <Label key={`${this.props.item}-${i}`}>{d.field}</Label>
                    )}
                <div className="for-close-icon"></div>
            </div>
        );
    }
}

export default RowsHeader;