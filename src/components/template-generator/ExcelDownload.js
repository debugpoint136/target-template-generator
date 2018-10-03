import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';
import fire from '../../fire';
import {saveAs} from 'file-saver';
import { makeAllWorkSheets, restructureSheetFillouts, fillRows } from './utils';
const Excel = require('exceljs/dist/es5/exceljs.browser');

class ExcelDownload extends Component {
    state = {}

    handleClick = (e, {name}) => {
        fire.database().ref(`uploads/${name}`).once('value', downloadedObj => {
            if (Object.keys(downloadedObj).length === 0) {
                alert('Nothing to download. Please select other options');
                return
            } else {
                const workbook = new Excel.Workbook();
                const newWorkbook = makeAllWorkSheets(workbook);
                const standardizedData = restructureSheetFillouts(newWorkbook, JSON.stringify(downloadedObj));
                const workBookWithRows = fillRows(newWorkbook, standardizedData, 'data');

                workBookWithRows
                    .xlsx
                    .writeBuffer()
                    .then(buffer => saveAs(new Blob([buffer]), `${Date.now()}_feedback.xlsx`))
                    .catch(err => console.log('Error writing excel export', err))
                    }
                })
    }

    render() {
        return (
            <div className="m-4 p-2 bg-grey-lighter flex justify-between w-1/3">
                {this.props.id}
                <Button name={this.props.id} onClick={this.handleClick}>Download</Button>
            </div>
        );
    }
}

export default ExcelDownload;