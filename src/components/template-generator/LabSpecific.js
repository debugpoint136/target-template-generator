import React, {Component} from 'react';
import {Dropdown, Label} from 'semantic-ui-react';
import fire from '../../fire';
import { Object } from 'core-js';
const LAB = require('../../json/fields/lab.js');
const PIs = {
    "Aylor Lab": "David Aylor",
    "Biswal Lab": "Shyam Biswal",
    "Bartolomei Lab": "Marisa Bartolomei",
    "Dolinoy Lab": "Dana Dolinoy",
    "Mutlu Lab": "Gokhan Mutlu, MD",
    "Walker Lab": "Cheryl Walker",
    "Zhibin Lab": "Zhibin Wang",
    "Tang Lab": "Winnie Tang",
    "Wang Lab": "Ting Wang"
};
class LabSpecific extends Component {
    state = {
        labinfo: {},
        labs: [],
        bioprojects: [], user: null, lab: null, uid: null
    }
    componentWillMount = () => {
        fire.auth()
            .onAuthStateChanged(user => {
                if (user) {
                    this.setState({user: user.displayName, lab: user.photoURL, uid: user.uid });

                    let labsRef = fire.database().ref('labs').orderByKey().limitToLast(10);
                    labsRef.on('value', snapshot => {
                        let labsInFirebase = [];
                        snapshot.forEach(data => {
                            labsInFirebase.push({text: data.val(),id: data.key})
                        });
                        const LABindex = labsInFirebase.findIndex(item => item.text.lab === user.photoURL);
                        if (LABindex !== -1) {
                            let labExisting = labsInFirebase[LABindex];
                            this.setState({ labinfo: labExisting.text, labs: labsInFirebase });
                        }                        
                    }, (errorObject) => {
                        console.log("The read failed: " + errorObject.code);
                    });
                }
            });
    }
    
    handleChange = (e, {name, value}) => {
        let tmp = this.state.labinfo;
        tmp[name] = value;
        this.setState({labinfo : tmp});
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const LABindex = this.state.labs.findIndex(item => item.text.principal_investigator === PIs[this.state.lab]);
        Object.assign(this.state.labinfo, {principal_investigator: PIs[this.state.lab], lab: this.state.lab});

        if (LABindex === -1) {
            fire.database().ref('labs').push(this.state.labinfo); // adding new record
            console.log('Added new record!')
        } else {
            const lab = this.state.labs[LABindex];
            fire.database().ref('labs/' + lab.id).set(this.state.labinfo);
            console.log('Updated existing record!')
        }
    }
    render() {
        return (
            <div className='flex justify-center '>
                <div className="border-2 border-dotted border-teal-dark w-1/2 p-4">
                <form onSubmit={this.handleSubmit}>
                <div className="text-center font-bold text-teal-darkest">Lab Info</div>
                {LAB.filter(item => item.hasOwnProperty('values')).map((elem, index) => {
                    if (elem.name === 'principal_investigator') {
                        return <div className='m-4 flex justify-start' key={elem.name}>
                            <Label>{elem.text}</Label>
                            <Label color='teal' basic>{PIs[this.state.lab]}</Label>
                        </div>
                    } else {
                        return <div className='m-4 flex justify-start' key={elem.name}>
                        <Label>{elem.text}</Label>
                        <Dropdown
                            onChange={this.handleChange}
                            options={elem.values.map((d,i) => ({ key: i, text: d, value: d }))}
                            placeholder={elem.placeholder}
                            selection
                            fluid
                            name={elem.name}
                            value={this.state.labinfo[elem.name]}
                        />
                    </div>
                    }
                })}
                    <div className="text-center">
                        <input className='bg-blue p-4 m-2 rounded text-white font-bold' type="submit" value="Save changes" />
                    </div>
                </form>
                </div>
            </div>
        );
    }
}

export default LabSpecific;


