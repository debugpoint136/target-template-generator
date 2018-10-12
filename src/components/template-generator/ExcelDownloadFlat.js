import React, {Component} from 'react';
import {saveAs} from 'file-saver';
import {Button} from 'semantic-ui-react';
import { makeAllWorkSheets, fillRows } from './utils';
const Excel = require('exceljs/dist/es5/exceljs.browser');

class ExcelDownloadFlat extends Component {
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
        const workBookWithRows = fillRows(newWorkbook, this.props.data, 'template');

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

export default ExcelDownloadFlat;
