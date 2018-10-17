import React, {Component} from 'react';
import axios from 'axios';
import {saveAs} from 'file-saver';
import {Button} from 'semantic-ui-react';
import { makeAllWorkSheets, fillOnlyFileRows, getDropdownOptions } from './utils';
import Notifications, {notify} from 'react-notify-toast';

const Excel = require('exceljs/dist/es5/exceljs.browser');
const SUBMISSION_API = 'https://5dum6c4ytb.execute-api.us-east-1.amazonaws.com/dev/submission';

class FileSheetDownload extends Component {
    state = { files: [] }

    componentDidMount() {
        const { id } = this.props;
        axios.get(`${SUBMISSION_API}/${id}`)
        .then(res => {
            let filesList = [];
            if (res.data.body[0].hasOwnProperty('validated_files')) {
                const files = res.data.body[0].validated_files;
                if (files.length > 0) {
                    filesList = files.map(file => ({
                        submission_id: id,
                        pilot: res.data.body[0].data_phase,
                        file_uuid: file.uuid,
                        filename: file.filename,
                        md5sum: file.md5sum,
                        run_type: (res.data.body[0].read_type === 'Paired-end' || res.data.body[0].read_type === 'paired-end') ? 'paired-end': 'single-end'
                    }))
                } 
            } 
            if (filesList.length > 0) {
                this.setState({ files : filesList })
            }
        })
        .catch(err => console.log(err));
    }

    handleFileSheetDownload = () => {
        if (this.state.files.length === 0) {
            notify.show('⚠️ No files found. Please contact admin', 'error')
        }
        const workbook = new Excel.Workbook();
        const newWorkbook = makeAllWorkSheets(workbook);
        const formattedFiles = formatMetadataOptionsForFiles(this.state.files);
        const workBookWithRows = fillOnlyFileRows(newWorkbook, formattedFiles); 
    
        workBookWithRows
            .xlsx
            .writeBuffer()
            .then(buffer => saveAs(new Blob([buffer]), `${this.props.id}_files_sheet_only_${Date.now()}.xlsx`))
            .catch(err => console.log('Error writing excel export', err)); 
    }

    render() {
        if (this.state.files.length > 0) {
            return (
                <div className="sdf">
                    <Notifications/>
                    <Button basic size='tiny' name={this.props.id} className="mx-4" icon='file' onClick={this.handleFileSheetDownload}/>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default FileSheetDownload;

function formatMetadataOptionsForFiles(files) {
    const metadataOptions = getDropdownOptions('file');
    const result = [];
    files.forEach(file => {
        const tmp = {};
        metadataOptions.forEach(entry => {
            const { key, options } = entry;
            tmp[key] = options[0].text;
        });
        const fileObjWithRemainingDefaultKeys = Object.assign(tmp, file);
        result.push(fileObjWithRemainingDefaultKeys);
    });
    
    return result;
}