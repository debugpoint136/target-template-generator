import React, {Component} from 'react';
import {Button,Icon, 
    // Loader, Dimmer
} from 'semantic-ui-react';
import { validateUpload } from './utils';
import { Object } from 'core-js';
const fileDownload = require('js-file-download')

class ValidateUpload extends Component {
    state = { errorCount: 0, result: {} }

    componentDidMount() {
        const { result, error } = validateUpload(this.props);
        this.setState({ errorCount: error, result: result });
        this.props.handleValidationStatus(error);
    }

    render() {
        if (this.state.errorCount > 0) {
            return (
                <div className="fdsf">
    
                    <Button size='tiny' color='teal' onClick={() => fileDownload(createDownloadManifest(this.state.result), `${this.props.id}.validation.report.txt`)}>Download Validation Results
                        <Icon name=''/><Icon name='file'/></Button>
                </div>
            );
        } else {
            return null;
        }
        
    }
}

export default ValidateUpload;

function createDownloadManifest(obj) {
    console.log(obj);
    let rows = [];

    Object.keys(obj).forEach(sheet => {
        if (obj[sheet]) {
            rows.push(`
======================`);
            rows.push(`        ${sheet.toUpperCase()}       `)
            rows.push(`======================
            `);
            Object.keys(obj[sheet]).forEach(accession => {
                rows.push(`----------------------`);
                rows.push(`        ${accession}       `)
                
                    obj[sheet][accession].forEach((line, index) => {
                            rows.push(`        ${index + 1}. ${line}       `)
                    })
                rows.push(``);
            })
        }
    })
    
    return rows.join('\n');
}