import React, {Component} from 'react';
import {Button, Icon} from 'semantic-ui-react';
import Neo4jUpload from './Neo4jUpload';
import ValidateUpload from './ValidateUpload';
import fire from '../../fire';
import {saveAs} from 'file-saver';
import { makeAllWorkSheets, restructureSheetFillouts, fillRows } from './utils';
import app from "../../fire";

const Excel = require('exceljs/dist/es5/exceljs.browser');

class ExcelDownload extends Component {
    state = {
        data: {}, user: null, lab: null, validationError: 0, uid: null
    }    
    
    componentWillMount() {
        app.auth()
            .onAuthStateChanged(user => {
                if (user) {
                    this.setState({user: user.displayName, lab: user.photoURL, uid: user.uid });
                } else {
                    this.setState({user: null, lab: null, uid: null });
                }
            });
    };


    

    handleValidationStatus = (errorCount) => {
        this.setState({ validationError: errorCount })
    }

    handleClick = (e, {name}) => {
        fire.database().ref(`uploads/${this.state.uid}/${name}`).once('value', downloadedObj => {
            const FIREBASE_DATA_STR = JSON.stringify(downloadedObj);
            const FIREBASE_DATA = JSON.parse(FIREBASE_DATA_STR).data;
            const FIREBASE_USER = JSON.parse(FIREBASE_DATA_STR).user;
            const FIREBASE_LAB = JSON.parse(FIREBASE_DATA_STR).lab;

            if (Object.keys(downloadedObj).length === 0) {
                alert('Nothing to download. Please select other options');
                return
            } else {
                const workbook = new Excel.Workbook();
                const newWorkbook = makeAllWorkSheets(workbook);
                const standardizedData = restructureSheetFillouts(newWorkbook, FIREBASE_DATA);
                this.setState({ data: standardizedData, user: FIREBASE_USER, lab: FIREBASE_LAB })
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
            <div className="m-4 p-2 bg-grey-lighter flex justify-between">
                <div className="">
                    <div className='text-grey-light text-xs font-mono'>{this.props.id}</div>
                    <div className='text-grey-darker text-sm font-mono'>{this.props.name}</div>
                    <div className='text-grey font-hairline text-grey-dark text-xs flex justify-start'>
                    {this.props.date}
                    <div className='text-blue-light mx-4'>{this.props.user}</div>
                    </div>
                    <hr/>
                    
                    <Button basic color='purple' size='tiny' name={this.props.id} onClick={this.handleClick}>Fetch file <Icon name='download'/></Button>
                    
                </div>
                { (Object.keys(this.state.data).length > 0) ?  
                    <ValidateUpload id={this.props.id} data={this.state.data} user={this.state.user} lab={this.state.lab} handleValidationStatus={this.handleValidationStatus} /> : null }
                
                { (Object.keys(this.state.data).length > 0 && this.state.validationError === 0) ?  
                    <Neo4jUpload data={this.state.data} user={this.state.user} lab={this.state.lab} /> : null }
                
            </div>
        );
    }
}

export default ExcelDownload;