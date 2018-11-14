import React, {Component} from 'react';
import {Form} from 'semantic-ui-react';
import fire from '../../fire';
const BIOPROJECT = require('../../json/fields/bioproject.js');

function createBlank() {
    let tmp = {};
    BIOPROJECT.forEach(item => tmp[item.name] = "");
    return tmp;
}
// const PIs = {
//     "Aylor bioproject": "David Aylor",
//     "Biswal bioproject": "Shyam Biswal",
//     "Bartolomei bioproject": "Marisa Bartolomei",
//     "Dolinoy bioproject": "Dana Dolinoy",
//     "Mutlu bioproject": "Gokhan Mutlu, MD",
//     "Walker bioproject": "Cheryl Walker",
//     "Zhibin bioproject": "Zhibin Wang",
//     "Tang bioproject": "Winnie Tang",
//     "Wang bioproject": "Ting Wang"
// };
class Bioproject extends Component {
    state = {
        bioprojectinfo: createBlank(),
        bioprojects: [], user: null, lab: null, uid: null
    }
    
    componentWillMount = () => {
        fire.auth()
            .onAuthStateChanged(user => {
                if (user) {
                    this.setState({user: user.displayName, lab: user.photoURL, uid: user.uid });

                    let bioprojectsRef = fire.database().ref('bioprojects').orderByKey().limitToLast(10);
                    bioprojectsRef.on('value', snapshot => {
                        let bioprojectsInFirebase = [];
                        snapshot.forEach(data => {
                            bioprojectsInFirebase.push({text: data.val(),id: data.key})
                        });
                        const bioprojectindex = bioprojectsInFirebase.findIndex(item => item.id === this.props.id);
                        if (bioprojectindex !== -1) {
                            let bioprojectExisting = bioprojectsInFirebase[bioprojectindex];
                            this.setState({ bioprojectinfo: bioprojectExisting.text, bioprojects: bioprojectsInFirebase });
                        }                        
                    }, (errorObject) => {
                        console.log("The read failed: " + errorObject.code);
                    });
                }
            });
    }
    handleChange = (e, {name, value}) => {
        let tmp = this.state.bioprojectinfo;
        tmp[name] = value;
        this.setState({bioprojectinfo : tmp});
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const bioprojectindex = this.state.bioprojects.findIndex(item => item.id === this.props.id);
        Object.assign(this.state.bioprojectinfo, {lab: this.state.lab});

        if (bioprojectindex === -1) {
            fire.database().ref('bioprojects').push(this.state.bioprojectinfo); // adding new record
            console.log('Added new record!')
        } else {
            const bioproject = this.state.bioprojects[bioprojectindex];
            fire.database().ref('bioprojects/' + bioproject.id).set(this.state.bioprojectinfo);
            console.log('Updated existing record!')
        }
        this.props.handleSave();
    }
    render() {
        return (
            <div className=''>
                <div className="p-4 w-full">
                <Form onSubmit={this.handleSubmit}>
                <div className="text-center font-bold text-teal-darkest">Bioproject: </div>
                
                {BIOPROJECT.map((elem) => {
                    // if (elem.name === 'summary') {
                    //     return <div className='m-4' key={elem.name}>
                    //         <Label>{elem.text}</Label>
                    //         <Form.TextArea
                    //             onChange={this.handleChange}
                    //             placeholder={elem.placeholder}
                    //             name={elem.name}
                    //             value={this.state.bioprojectinfo[elem.name]}
                    //         />
                    //     </div>
                    // } else {
                        return <div className='m-4' key={elem.name}>
                        <Form.TextArea
                            label={elem.text}
                            onChange={this.handleChange}
                            placeholder={elem.placeholder}
                            name={elem.name}
                            value={this.state.bioprojectinfo[elem.name]}
                        />
                    </div>
                    // }
                })}
                    <div className="text-center">
                        <Form.Button content='Save changes' />
                    </div>
                </Form>
                </div>
            </div>
        );
    }
}

export default Bioproject;


