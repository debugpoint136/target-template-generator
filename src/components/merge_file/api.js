import axios from 'axios';

const neo4jUrl = process.env.REACT_APP_NEO4J_API;
const AUTHORIZATION = process.env.REACT_APP_NEO4J_PASSWORD;
const queryCore = `MATCH (f:file)-[*0..5]->(n) WHERE f.submission_id=$submission`
const SUBMISSION_API = 'https://5dum6c4ytb.execute-api.us-east-1.amazonaws.com/dev/submission/'

/*
const fetchPromises = SHEETNAMES.map(sheetname => axios.post(neo4jUrl, {
    statements: [
            {
                statement: setupQuery(sheetname),
                parameters: params
            }
        ]
    }, { headers: { Authorization: AUTHORIZATION }} ))
    axios.all(fetchPromises)
    .then((res) => {
        const results = formatResultsForState(res);
        console.log(results);
        // excelSimpleDownload(this.props.id, results);
    })
    .catch(err => {
        console.log(err);
    });
*/

export async function createNeo4jManifestQuery(DATA, USER, LAB) {
    try {
        const { submission } = JSON.parse(DATA[0]); // grabbing first item for building <-- FIXME

        const res = await axios.get(`${SUBMISSION_API}${submission}`);
        console.log(res);
    } catch (error) {
        console.error(error); // 💩
    }
}

/*
async function neo4jPost(filesPayload) {

    const QUERY = (MODE === "nodesonly") ? justCreateQuery : (MODE === "notest") ? query: update;

    const neo4jRes = await axios.post(NEO4J_API, {
        statements: [
            {
                statement: QUERY,
                parameters: { json: { files: filesPayload } }
            }
        ]
    }, { headers: { Authorization: AUTHORIZATION }} )
    console.log("=============================");
    console.log(neo4jRes.data)
    console.log("=============================");
    console.log("You can double check it on http://104.248.120.152:7474/browser/ using");
    if (MODE === "nodesonly") {
        console.log(`MATCH (f:file { submission_id: "${SUBMISSION}" }) WITH collect(f.file_uuid) as fileUUIDs UNWIND fileUUIDs as q MATCH (tag:filetag { uuid: q }) RETURN tag.score, tag.uuid`);
        console.log(`MATCH (f:file { submission_id: "${SUBMISSION}" })-[:tagged]->(tag:filetag) RETURN f,tag`);
    }

    if (MODE === "notest" || MODE === 'update') {
        console.log(`MATCH (f:file { submission_id: "${SUBMISSION}" })-[:tagged]->(tag:filetag) RETURN f.accession, tag.score, f.file_uuid`);
    }
}
*/