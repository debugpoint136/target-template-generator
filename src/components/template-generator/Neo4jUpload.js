import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';
// import axios from 'axios';
import { createNeo4jUploadQuery } from './utils';
// const neo4jUrl = "https://graph.targetepigenomics.org:7473/db/data/transaction/commit";
// const AUTHORIZATION = "Basic bmVvNGo6cHJvZHVjdGlvbg==";
// const QUESTIONS = require('./questions.json');
// const MICE = require('./simple_upload.json');
const UPLOAD_DATA = require('./testupload.json');
class Neo4jUpload extends Component {
    state = {}

    handleUpload = () => {
        // axios.post(neo4jUrl, {
        //     statements: [
        //         {
        //             statement: mousequery,
        //             parameters: { json: MICE }
        //         }
        //     ]
        // }, { headers: { Authorization: AUTHORIZATION }} )
        // .then(res => console.log(res.data))
        // .catch(err => console.log(err));
        createNeo4jUploadQuery(UPLOAD_DATA);
    }

    render() {
        return (
            <Button onClick={this.handleUpload}>Upload-test</Button>
        );
    }
}

export default Neo4jUpload;

/*
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