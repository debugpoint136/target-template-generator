import React, {Component} from 'react'
// import logo from './logo.svg';
// import './css/tailwind.css'
import {SUBMISSION_API} from './config.json'
import { Icon, Step, Container, Loader, Segment } from 'semantic-ui-react'
import { BrowserRouter, Route, Switch, Link, NavLink, Redirect } from 'react-router-dom';
import BasicQuestions from './BasicQuestions'
import FilesMd5sum from './FilesMd5sum'
import DetailsFiller from './DetailsFiller'
import TableEditable from './approval/TableEditable'
import FileTable from './FileTable'
import PROCESS from './process.json'
import axios from 'axios'
import Instructions from './Instructions'
import Notifications, {notify} from 'react-notify-toast';
import './index.css';
import fire from '../../fire';
// TODO: TOASTY msg for : Check number of files registered should match: notify.show('Number of files incorrect', 'error');
// TODO: TOASTY msg for : Check if files have been named properly: notify.show('Problems with File naming', 'error');

const StepsComponent = () => (
  <Step.Group size='small' fluid>
    {Object.keys(PROCESS).map(elem => <Step key={elem} title={PROCESS[elem].title} icon={PROCESS[elem].icon} active={PROCESS[elem].active} completed={PROCESS[elem].completed} disabled={PROCESS[elem].disabled}/>)}
  </Step.Group>
)

function getCurrentStage(stages) {
  return Object.keys(stages).filter(num => stages[num].active)[0]
}

class ExperimentDesigner extends Component {
  state = { 
    stages: PROCESS, 
    activeIndex: getCurrentStage(PROCESS), 
    basicInfo: {}, 
    filesMd5sum: [],
    filesInfo: [], // added to save what is already saved in DB
    submissionId: null,
    dccPassword: null,
    loading: true,
    notFound: false,
    fromDB: [],
    user: null, lab: null, uid: null
  }
  componentWillMount = () => {
    fire.auth()
        .onAuthStateChanged(user => {
            if (user) {
                this.setState({user: user.displayName, lab: user.photoURL, uid: user.uid });
            }
        });
}
  
  componentDidMount() {
    /*
    if (this.props.match.params.id) {
      //update scenario
      axios
            .get(SUBMISSION_API + "/" + this.props.match.params.id)
            .then(response => {
                let data = response.data.body[0]

                if (data) {
                  // check if the files have _id field. if not, add them
                  data.files = checkAndUpdateId(data.files)
                  if (data.files.length === 0) {
                    this.setState({ notFound: true })
                  }
                  let tmpbasicInfo = {}
                  tmpbasicInfo['read-type'] = data.read_type
                  tmpbasicInfo['data-phase'] = data.data_phase
                  tmpbasicInfo['assay'] = data.assay
                  tmpbasicInfo['lab'] = data.lab
                  tmpbasicInfo['quantity'] = data.files.length
                  tmpbasicInfo['username'] = data.username
                  tmpbasicInfo['registered'] = data.registered
                  tmpbasicInfo['data_wrangler'] = data.data_wrangler // TODO: needs to added to schema
                  tmpbasicInfo['validated_files'] = data.validated_files // TODO: needs to added to schema
                  tmpbasicInfo['validated_message'] = data.validated_message // TODO: needs to added to schema
                  tmpbasicInfo['comments'] = data.comments
                  if (data.experiment_design.data) {
                    if (data.experiment_design.data.length > 0) {
                      this.setState({
                        fromDB: data, 
                        stages: modifyForUpdate(PROCESS), 
                        basicInfo: tmpbasicInfo,
                        filesMd5sum: data.files,
                        filesInfo: data.experiment_design.data,
                        activeIndex: '4', 
                        loading: false
                      })
                    } else {
                      this.setState({
                        fromDB: data, 
                        stages: modifyForUpdate(PROCESS), 
                        basicInfo: tmpbasicInfo,
                        filesMd5sum: data.files,
                        filesInfo: data.experiment_design.data,
                        activeIndex: '3', 
                        loading: false
                      })
                    }
                  } else {
                      this.setState({
                        fromDB: data, 
                        stages: modifyForUpdate(PROCESS), 
                        basicInfo: tmpbasicInfo,
                        filesMd5sum: data.files,
                        filesInfo: data.experiment_design.data,
                        activeIndex: '3', 
                        loading: false
                      })
                  }
                    
                } else {
                    this.setState({notFound: true, loading: false})
                }
            })
            .catch(error => {
                console.log(error)
                this.setState({notFound: true, loading: false})
            })
    } else {
      */
      // new submission
      this.setState({ activeIndex: getCurrentStage(this.state.stages), loading: false })
    }
  
  

  handleResetExperimentDesign = () => {
    this.setState({ activeIndex: '3' })
  }

  processSubmissionStep1 = (data) => {    
    let _stages = {...this.state.stages}

    let step1 = _stages['1']
    step1.active = false
    step1.completed = true
    step1.disabled = false
    _stages['1'] = step1

    let step2 = _stages['2']
    step2.active = true
    step2.completed = false
    step2.disabled = false
    _stages['2'] = step2

    this.setState({
      basicInfo: data,
      stages: _stages,
      activeIndex: '2',
      filesInfo: []
    })
  }

  processSubmissionStep2 = (data) => {    
    
    let _stages = {...this.state.stages}
    let result = null
    let { basicInfo } = this.state
    
    result = parseFilesMd5str(data['filenames-md5sum'], this.state.basicInfo.quantity, this.state.basicInfo['read-type'])
    
    if (result === 'number of files error' || result === 'naming error') {
      this.setState({ filesNumberMismatch: true })
    } else {
      this.setState({ filesNumberMismatch: false })
      let step2 = _stages['2']
      step2.active = false
      step2.completed = true
      step2.disabled = false
      _stages['2'] = step2

      let step3 = _stages['3']
      step3.active = true
      step3.completed = false
      step3.disabled = false
      _stages['3'] = step3

      if (this.state.basicInfo['data-phase'] === 'production') {
        this.setState({
          stages: _stages,
          activeIndex: '5'
        })
        let submissionRecord = {}
        submissionRecord.files = result 
        submissionRecord.assay = basicInfo.assay;
        submissionRecord.lab = this.state.lab;
        // submissionRecord.description = basicInfo.description; // still not added in React
        submissionRecord.comments = basicInfo.comments;
        submissionRecord.experiment_design = []; 
        submissionRecord.files_count = basicInfo.quantity;
        submissionRecord.last_modified = getCST(new Date());
        submissionRecord.username = this.state.user;
        submissionRecord.read_type = basicInfo['read-type'];
        submissionRecord.data_phase = basicInfo['data-phase'];
        submissionRecord.data_wrangler = basicInfo['data_wrangler'];
        submissionRecord.submission_status = basicInfo['submission_status'];
        submissionRecord.validated_message = basicInfo['validated_message'];
        submissionRecord.validated_files = basicInfo['validated_files'];
        submissionRecord.comments = basicInfo['comments'];

        this.postRequest(submissionRecord) // process gets short 
      } else {
        this.setState({
          stages: _stages,
          activeIndex: '3',
          filesMd5sum: result
        })
      }
      
    }
    
  }

  processSubmissionStep3 = (data) => {        
    let _stages = {...this.state.stages}

    let step3 = _stages['3']
    step3.active = false
    step3.completed = true
    step3.disabled = false
    _stages['3'] = step3

    let step4 = _stages['4']
    step4.active = true
    step4.completed = false
    step4.disabled = false
    _stages['4'] = step4

    this.setState({
      stages: _stages,
      activeIndex: '4',
      filesInfo: data
    })
  }

  processSubmissionStep4 = (data) => {        
    let _stages = {...this.state.stages}
    let { filesInfo, basicInfo, filesMd5sum } = this.state

    let step4 = _stages['4']
    step4.active = false
    step4.completed = true
    step4.disabled = false
    _stages['4'] = step4

    let filesInfoClean = cleanUp(filesInfo)

    let submissionRecord = {}
      submissionRecord.files = filesMd5sum 
      submissionRecord.assay = basicInfo.assay;
      submissionRecord.lab = basicInfo.lab;
      // submissionRecord.description = basicInfo.description; // still not added in React
      submissionRecord.comments = basicInfo.comments;
      submissionRecord.experiment_design = filesInfoClean; 
      submissionRecord.files_count = basicInfo.quantity;
      submissionRecord.registered = (basicInfo.hasOwnProperty('registered')) ? basicInfo.registered : getCST(new Date())
      submissionRecord.data_wrangler = (basicInfo.hasOwnProperty('data_wrangler')) ? basicInfo.data_wrangler : ''
      submissionRecord.submission_status = (basicInfo.hasOwnProperty('submission_status')) ? basicInfo.submission_status : 'INCOMPLETE'
      submissionRecord.username = basicInfo.username;
      submissionRecord.read_type = basicInfo['read-type'];
      submissionRecord.data_phase = basicInfo['data-phase'];

      this.postRequest(submissionRecord)
    /*
    const SUBMIT_URL = 'http://target.wustl.edu:7002/submission/new/v2'  // TODO: productionize this

    axios.post(SUBMIT_URL, { submission: submissionRecord })
      .then(res => this.setState({ submissionId: res.data.submission_id, activeIndex: '5', dccPassword: res.data.dccpassword  }))
      .catch(err => console.log(err))
    */
  }

  postRequest(submissionData) {
    let SUBMIT_URL = ''
    // if (!this.props.match) {  dpuru: 26 Apr, 2019: Deprecating this temporarily
    //   if (this.props.match.params.id) {
    //     // TODO: first ping and see if a valid JSON is returned
    //     SUBMIT_URL = 'https://5dum6c4ytb.execute-api.us-east-1.amazonaws.com/dev/submission/' + this.props.match.params.id
    //     let updated_experiment_design = { data: submissionData.experiment_design }
    //     axios.post(SUBMIT_URL, { experiment_design: updated_experiment_design } )
    //     .then(res => this.setState({ activeIndex: '6' }))
    //     .catch(err => console.log(err))
    //   } 
    // } else {
      SUBMIT_URL = 'https://submit.target.wustl.edu/submission/new/v2'  // TODO: productionize this: best that can be done for now
      axios.post(SUBMIT_URL, { submission: submissionData })
      .then(res => this.setState({ submissionId: res.data.submission_id, activeIndex: '5', dccPassword: res.data.dccpassword  }))
      .catch(err => console.log(err))
    // }
  }

  handleRangeChange = e => this.setState({ activeIndex: e.target.value })
  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex })

  render() {
      if (this.state.notFound) {
        return (
            <Container>
                <Segment>
                    <span className="inline-flex">
                    <div className="mr-4 mt-1">Submission Id </div>
                    <div><h3>{this.props.match.params.id}</h3></div>
                    <div className="ml-4 mt-1">not found</div>
                    </span>
                </Segment>
            </Container>
        )
    }
    if (this.state.loading) {
        return (
            <div className="mt-6">
                <Loader>
                    Loading ...
                </Loader>
            </div>
        )
    }
    const renderComponents = () => {
      let { activeIndex } = this.state;
        switch(activeIndex) {
          case '1':
              return <BasicQuestions onSubmit={this.processSubmissionStep1}/>
          case '2':
              return <FilesMd5sum onError={this.state.filesNumberMismatch} onSubmit={this.processSubmissionStep2} read_type={this.state.basicInfo['read-type']}/>
          case '3':
              return <DetailsFiller files={this.state.filesMd5sum} onSubmit={this.processSubmissionStep3} />
          case '4':
              return <TableEditable data={this.state.filesInfo} onSubmit={this.processSubmissionStep4} handleResetClick={this.handleResetExperimentDesign} update={this.props.path}/>
          case '5':
              return <Instructions submissionId={this.state.submissionId} dccPassword={this.state.dccPassword} data_phase={this.state.basicInfo['data-phase']} />
          case '6':
              return <div>{this.props.match.params.id} updated successfully</div>
          default:
              return null
      } 
    }

    // TODO: print and email option for instructions
    const { activeIndex } = this.state
    return (
      <div>
        
        {(this.state.activeIndex <=4 && this.state.basicInfo['data-phase'] === 'pilot') ? <StepsComponent/> : null}
        
        <Container>
        {renderComponents()}
        </Container>
        
      </div>
    );
  }
}

export default ExperimentDesigner;


function parseFilesMd5str(str, numOfFiles, read_type) {  
  let error = 0
  let result = []
  let fileCnt = 0
  let fileNames = {}
  let rows = str.split('\n')
  rows.forEach(row => {
    let items = row.split(',')
    
    if (items[0] !== '') {
      fileCnt++
    }
  })

  if (numOfFiles != fileCnt) {    
    return 'number of files error'
  }
  rows.forEach(row => {
    let items = row.split(',')
    
    if (items[0] !== '') {
      if (!checkFileNameConvention(items[1], read_type)) {
        error++
      } else {
        // extension is OK, 
        // if read_type = PE, 
        if (read_type === 'paired-end') {
          let s = items[1]
          let fileStr = s.substring(0, s.indexOf(".PE.R1.fastq.gz")) || s.substring(0, s.indexOf(".PE.R2.fastq.gz"))
          if (fileStr !== '') {
            if (fileNames.hasOwnProperty(fileStr)) {
              fileNames[fileStr] = fileNames[fileStr] + 1
            } else {
              fileNames[fileStr] = 1
            }
          }
        } 
      }
    }
  })  

  let namingFormatError = 0
  
  Object.keys(fileNames).forEach(index => {
    let cnt = fileNames[index]

    if (cnt != 2) {
      namingFormatError++
      // TODO: notify.show('paired-end files not same', 'error')
    }
  })

  if (namingFormatError > 0) {
    return 'naming error'
  }

  if (error > 0) {
    return 'naming error'
  } else {
    rows.forEach(row => {
      let items = row.split(',')
      
      if (items[0] !== '') {
        result.push({ _id: items[0], md5sum: items[0], filename: items[1] })
      } 
    })
  
    return result
  }
}

function checkFileNameConvention(str, read_type) {  

  if (str !== undefined) {
  
    let res = null
    if (read_type === 'single-end') {
      res = str.match(/.SE.fastq.gz/g);      
    }

    if (read_type === 'paired-end') {
      res = str.match(/.PE.R[1|2].fastq.gz/g);
    }
    if (res === null) {
      return false
    }
    
    if (res[0] === '.SE.fastq.gz' || res[0] === '.PE.R1.fastq.gz' || res[0] === '.PE.R2.fastq.gz') {
      return true
    } 
  } 
}


function getCST(date) {
  var months = ['January','February','March','April','May','June','July',
                'August','September','October','November','December'];
  var d = new Date(+date);

  // CST is UTC -0600 so subtract 6 hours and use UTC values
  d.setUTCHours(d.getUTCHours() - 6);

  return months[d.getUTCMonth()] + ' ' +
      d.getUTCDate() + ', ' +
      d.getUTCFullYear() + ' ' +
      ((d.getUTCHours()%12) || 12) + ':' +
      ('0' + d.getUTCMinutes()).slice(-2) + ' ' +
      (d.getUTCHours() < 12? 'AM':'PM');
}

function modifyForUpdate(process) {
  process['1'].active = false
  process['1'].completed = true
  process['1'].disabled = true
  process['2'].active = false
  process['2'].completed = true
  process['2'].disabled = true
  process['3'].active = true  
  process['3'].disabled = false  
  return process
}

function checkAndUpdateId(files) {
  let filesWithId = files.map(file =>  {
    file._id = file.md5sum
    return file
  })
  return filesWithId
}

function cleanUp(data) {
  
  let tmp = Object.keys(data).map(d => {
    let item = data[d]
    if (item.hasOwnProperty('mouse-gender')) {
      item['mouse_gender'] = item['mouse-gender']
      delete item['mouse-gender']
    }
    if (item.hasOwnProperty('detergent-added')) {
      item['detergent_added'] = item['detergent-added']
      delete item['detergent-added']
    }
    if (item.hasOwnProperty('strand-specific')) {
      item['strand_specific'] = item['strand-specific']
      delete item['strand-specific']
    }

    return item
  })

  return tmp
}

/**
 * server.route({
    method: 'POST',
    config: {
      "cors": true
    },
    path: '/submission/new/v2',
    handler: function(request, reply) {

      let submissionId = uuid.v4();

      const { files, username, numberOfFiles, data_phase, assay, lab, description, experiment_design, comments, read_type } = request.payload.submission;
    
      let submissionRecord = {};
      submissionRecord.files = files
      submissionRecord.assay = assay;
      submissionRecord.lab = lab;
      submissionRecord.description = description;
      submissionRecord.comments = comments;
      submissionRecord.experiment_design = { data: experiment_design };
      submissionRecord.numberOfFiles = numberOfFiles;
      submissionRecord.registered = getCST(new Date());
      submissionRecord._id = submissionId;
      submissionRecord.read_type = read_type;
      submissionRecord.username = username
      submissionRecord.data_phase = data_phase


      let errMsg = null;
      let successMsg = null;

      let folderPath = DIR_PATH + submissionId;
      let md5sumFilePath = folderPath + '/details.json';
      let md5sumWWWPath = WWW_DIR + '/' + submissionId;


        mkdirp.sync(folderPath); // needs a Flask API
        fs.writeFileSync(md5sumFilePath, JSON.stringify(submissionRecord))


        Wreck.post(NEW_SUBMISSION, {
              payload: JSON.stringify(submissionRecord),
              json: true
            }, (err, res, payload) => {
                if (err) {
                    throw err;
                }
                

                successMsg = 'Received new submission : ' + submissionId;
                submissionId: submissionId;

                return reply({ message: 'Submitted record successfully', submission_id: submissionId, dccpassword: process.env.DCCPWD })
                
          });
        
    },
    
  });
 */