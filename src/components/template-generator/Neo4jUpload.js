import React, {Component} from 'react';
import {Button,Icon, Loader, Dimmer} from 'semantic-ui-react';
import axios from 'axios';
import _ from 'lodash';
import Notifications, {notify} from 'react-notify-toast';
import { createNeo4jUploadQuery } from './utils';
const neo4jUrl = process.env.REACT_APP_NEO4J_API;
const AUTHORIZATION = process.env.REACT_APP_NEO4J_PASSWORD;
// const QUESTIONS = require('./questions.json');
// const simple_DATA = require('./simple_upload.json');
// const UPLOAD_DATA = require('./testupload.json');
class Neo4jUpload extends Component {
    state = { error: null, loader: false }

    handleUpload = () => {
        this.setState({ loader: true })
/*
        axios.post(neo4jUrl, {
            statements: [
                {
                    statement: query,
                    parameters: { json: UPLOAD_DATA }
                }
            ]
        }, { headers: { Authorization: AUTHORIZATION }} )
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
*/
        const { data, user, lab } = this.props;
        const queryList = createNeo4jUploadQuery(data, user, lab);
        // console.log(JSON.stringify(queryList));
        if (!queryList) {
            this.setState({ error: "No data to upload" });
            return
        }
        const allAxiosPosts = queryList.map(entry => {
            const { query, sheetname } = entry;
            const _data = {};
            _data[sheetname] = data[sheetname];

            return axios.post(neo4jUrl, {
                statements: [
                    {
                        statement: query,
                        parameters: { json: _data }
                    }
                ]
            }, { headers: { Authorization: AUTHORIZATION }} )
        });

        axios.all(allAxiosPosts)
            .then(res => {
                const errorsArray = res.map(r => (r.data.errors.length > 0) ? r.data.errors: null);
                let errorsList = [];
                if (errorsArray.length > 0) {
                    errorsList = _.flattenDeep(errorsArray.filter(d => d));
                }
                if (errorsList.length > 0) {
                    this.setState({ error: errorsList.map(err => err.message).join('<br/>'), loader: false });
                    notify.show('Transmission errored out 👨🏼‍🚀', 'error');
                } else {
                    notify.show('Submitted successfully! ✅', 'success');
                    this.setState({ loader: false })
                }
                
            })
            .catch(err => {
                notify.show('Transmission errored out 👨🏼‍🚀', 'error');
                this.setState({ loader: false, error: err })
            });
        
    }

    handleErrorBoxClose = () => {
        this.setState({ error: null });
    }

    render() {
        return ( 
            <div className="m-4 p-4">
            { (this.state.loader) ? 
                <div className="h-screen">
                <Dimmer active>
                    <Loader size='mini'>Transmitting...</Loader>
                </Dimmer>
                </div> : null
            }
            <Notifications />
            {(this.state.error)? 
                <div className="m-4 p-4 border-2 border-red-light text-red flex justify-between">
                <h4> <span role="img" aria-label="error">❗️</span> Error encountered: </h4>
                {this.state.error}
                <Button icon='close' onClick={this.handleErrorBoxClose}/>
                </div>: null }
                <Button size='tiny' color='purple' onClick={this.handleUpload}>Commit changes {'  '} <Icon name=''/><Icon name='external'/></Button>
            </div>
        );
    }
}

export default Neo4jUpload;

/*
const query = `WITH {json} as data
UNWIND data.assay as row
MATCH (assay:assay {accession: row.accession})
WITH assay, row
MATCH (assay_recruits_reagent:reagent {accession:row.recruits})
MERGE (assay)-[:recruits]->(assay_recruits_reagent)

    WITH assay, row
    
MATCH (assay_assay_input_biosample:biosample {accession:row.assay_input})
MERGE (assay)-[:assay_input]->(assay_assay_input_biosample)

    WITH assay, row
    
MATCH (assay_pooled_from_assay:assay {accession:row.pooled_from})
MERGE (assay)-[:pooled_from]->(assay_pooled_from_assay)`;
*/


/*
const query = `WITH {json} as data  
UNWIND data.mouse as m
MERGE (mouse:mouse {accession: m.accession})
SET 
    mouse.user_accession = m.user_accession,
    mouse.organism = m.organism,
    mouse.source = m.source,
    mouse.strain = m.strain,
    mouse.sex = m.sex,
    mouse.internal_id = m.internal_id,
    mouse.mouse_age_collection = m.mouse_age_collection,
    mouse.life_stage_collection = m.life_stage_collection,
    mouse.animal_weight_sac = m.animal_weight_sac,
    mouse.perfusion = m.perfusion,
    mouse.fasted = m.fasted,
    mouse.fasted_hours = m.fasted_hours,
    mouse.liver_tumors = m.liver_tumors,
    mouse.tumor_organs = m.tumor_organs,
    mouse.technicians = m.technicians,
    mouse.comments = m.comments
    WITH m, CASE  WHEN (m.born_to) <> "" THEN ['ok'] ELSE [] END as array1
    FOREACH (el1 in array1 | MERGE (litter:litter {accession:m.born_to}))
    
    WITH m, CASE  WHEN (m.fed) <> "" THEN ['ok'] ELSE [] END as array2
    FOREACH (el2 in array2 | MERGE (diet:diet {accession:m.fed}))
    
    WITH m, CASE  WHEN (m.undergoes) <> "" THEN ['ok'] ELSE [] END as array3
    FOREACH (el3 in array3 | MERGE (treatment:treatment {accession:m.undergoes}))
    
    WITH m, CASE  WHEN (m.part_of) <> "" THEN ['ok'] ELSE [] END as array4
    FOREACH (el4 in array4 | MERGE (bioproject:bioproject {accession:m.part_of}))`
    */
/* -- don't delete yet
const query = `WITH {json} as data 
UNWIND data.items as q 
MERGE (question:Question {id:q.question_id}) 
    ON CREATE SET 
        question.title = q.title, 
        question.share_link = q.share_link, 
        question.favorite_count = q.favorite_count 
MERGE (owner:User {id:q.owner.user_id}) 
    SET 
    owner.display_name = q.owner.display_name 
MERGE (owner)-[:ASKED]->(question) 
FOREACH (tagName IN q.tags | MERGE (tag:Tag {name:tagName}) 
    MERGE (question)-[:TAGGED]->(tag)) 
FOREACH (a IN q.answers | MERGE (question)<-[:ANSWERS]-(answer:Answer {id:a.answer_id}) 
    MERGE (answerer:User {id:a.owner.user_id}) 
    ON CREATE SET 
        answerer.display_name = a.owner.display_name 
        MERGE (answer)<-[:PROVIDED]-(answerer))`;
*/

/*
const mousequery = `WITH {json} as data 
UNWIND data.mice as m 
MERGE (mouse:Mouse {accession:m.accession}) 
    SET 
        mouse.animal_weight_sac = m.animal_weight_sac,
        mouse.fasted = m.fasted,
        mouse.life_stage_collection = m.life_stage_collection,
        mouse.liver_tumors = m.liver_tumors,
        mouse.strain = m.strain        
MERGE (treatment:Treatment {accession:m.undergoes}) 
MERGE (mouse)-[:undergoes]->(treatment) 
MERGE (litter:Litter {accession:m.born_to}) 
MERGE (mouse)-[:born_to]->(litter) 
`;
*/