import React, {Component} from 'react';
import {Form} from 'semantic-ui-react';
import fire from '../../fire';
import axios from 'axios';

const neo4jUrl = process.env.REACT_APP_NEO4J_API;
const AUTHORIZATION = process.env.REACT_APP_NEO4J_PASSWORD;
const BIOPROJECT = require('../../json/fields/bioproject.js');

const QUERY = `
WITH {json} as data 
UNWIND data.bioprojectinfo as q 
MERGE (bpr:bioproject {accession: q.accession}) 
    ON CREATE SET 
        bpr.accession = q.accession,
        bpr.cbc_results = q.cbc_results,
        bpr.dam_exposure_level = q.dam_exposure_level,
        bpr.facility_contamination = q.facility_contamination,
        bpr.summary = q.summary,
        bpr.title = q.title
    ON MATCH SET
        bpr.cbc_results = q.cbc_results,
        bpr.dam_exposure_level = q.dam_exposure_level,
        bpr.facility_contamination = q.facility_contamination,
        bpr.summary = q.summary,
        bpr.title = q.title
`;
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
        // fire.auth()
        //     .onAuthStateChanged(user => {
        //         if (user) {
        //             this.setState({user: user.displayName, bpr: user.photoURL, uid: user.uid });
                    let bioprojectsRef = fire.database().ref('bioprojects/' + this.props.id);
                    // let bioprojectsInFirebase = [];
                    bioprojectsRef.on('value', snapshot => {
                        if (snapshot.exists()){
                            this.setState({ bioprojectinfo: snapshot.val() });
                        }
                    }, (errorObject) => {
                        console.log("The read failed: " + errorObject.code);
                    });
                        // console.log(this.props.id);
                        // const bioprojectindex = bioprojectsInFirebase.findIndex(item => item.id === this.props.id);
                        // console.log(bioprojectindex);
                        // if (bioprojectindex !== -1) {
                        //     let bioprojectExisting = bioprojectsInFirebase[bioprojectindex];
                        //     this.setState({ bioprojectinfo: bioprojectExisting.text, bioprojects: bioprojectsInFirebase });
                        // }                        
                    
                // }
            // });
    }
    handleChange = (e, {name, value}) => {
        let tmp = this.state.bioprojectinfo;
        tmp[name] = value;
        this.setState({bioprojectinfo : tmp});
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        // const bioprojectindex = this.state.bioprojects.findIndex(item => item.id === this.props.id);
        Object.assign(this.state.bioprojectinfo, {lab: this.props.lab});

        // if (bioprojectindex === -1) {
        //     fire.database().ref('bioprojects').push(this.state.bioprojectinfo); // adding new record
        //     console.log('Added new record!')
        // } else {
            // const bioproject = this.state.bioprojects[bioprojectindex];
            Object.assign(this.state.bioprojectinfo, { accession: this.props.id });
            fire.database().ref('bioprojects/' + this.props.id).set(this.state.bioprojectinfo);
            console.log('Updated existing record!')
        // }
        this.props.handleSave();
        try {
            await neo4jPost(this.state.bioprojectinfo); 
        } catch (error) {
            console.error(error);
        }
    }
    render() {
        return (
            <div className=''>
                <div className="p-4 w-full">
                <Form onSubmit={this.handleSubmit}>
                <div className="text-center font-bold text-teal-darkest">Bioproject: </div>
                
                {BIOPROJECT.map((elem) => {
                    if (elem.name === 'user_accession') {
                        return null;
                    } else {
                        return <div className='m-4' key={elem.name}>
                        <Form.TextArea
                            label={elem.text}
                            onChange={this.handleChange}
                            placeholder={elem.placeholder}
                            name={elem.name}
                            value={this.state.bioprojectinfo[elem.name]}
                        />
                    </div>
                    }
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


async function neo4jPost(bioprojectinfoPayload) {
    const neo4jRes = await axios.post(neo4jUrl, {
        statements: [
            {
                statement: QUERY,
                parameters: { json: { bioprojectinfo: bioprojectinfoPayload } }
            }
        ]
    }, { headers: { Authorization: AUTHORIZATION }} );

    return neo4jRes;

}