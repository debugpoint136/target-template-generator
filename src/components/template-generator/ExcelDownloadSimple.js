import React, {Component} from 'react';
// import {Button} from 'semantic-ui-react';
import {saveAs} from 'file-saver';
import { makeAllWorkSheets, fillRows } from './utils';
const Excel = require('exceljs/dist/es5/exceljs.browser');

class ExcelDownloadSimple extends Component {
    state = {}

    //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.id, this.props.id)
        if (nextProps.id !== this.props.id) {
            const workbook = new Excel.Workbook();
            const newWorkbook = makeAllWorkSheets(workbook);
            const workBookWithRows = fillRows(newWorkbook, nextProps.data, 'data'); // coming from Neo4j
    
            workBookWithRows
                .xlsx
                .writeBuffer()
                .then(buffer => saveAs(new Blob([buffer]), `${nextProps.id}_${Date.now()}.xlsx`))
                .catch(err => console.log('Error writing excel export', err));    
        }
    }

    render() {
        return (
            <div className="m-4 p-2 bg-grey-lighter flex justify-between w-1/3">
                Downloaded.
            </div>
        );
    }
}

export default ExcelDownloadSimple;