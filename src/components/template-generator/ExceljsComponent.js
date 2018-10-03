import React, {Component} from 'react';
import {saveAs} from 'file-saver';
import {Button} from 'semantic-ui-react';
import { makeAllWorkSheets, fillRows, reshapeSheetFillouts } from './utils';
// import _ from 'lodash';
const Excel = require('exceljs/dist/es5/exceljs.browser');

/**
 * 1. Create Headers from Fields json and create all the tabs for now - DONE
 * 2. when this.download is invoked, it fetches this.props.data and plugs those rows together excel sheet - DONE
 * 3. READ user filled excel sheet : https://github.com/guyonroche/exceljs/issues/592
 */

class ExceljsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    download = () => {
        if (this.props.data.length === 0) {
            alert('Nothing to download. Please select options.');
            return
        }
        const workbook = new Excel.Workbook();
        
        const newWorkbook = makeAllWorkSheets(workbook);
        const standardizedData = reshapeSheetFillouts(this.props.data);
        const workBookWithRows = fillRows(newWorkbook, standardizedData);

        workBookWithRows
            .xlsx
            .writeBuffer()
            .then(buffer => saveAs(new Blob([buffer]), `${Date.now()}_feedback.xlsx`))
            .catch(err => console.log('Error writing excel export', err))
    }

    render() {
        return (
            <div className="flex justify-center">
                <Button
                    color='blue'
                    icon='download'
                    label='Download Excel template'
                    onClick={this.download}/>
            </div>

        );
    }
}

export default ExceljsComponent;
