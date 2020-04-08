import React, {Component} from 'react'
import AutoForm from 'react-auto-form'
import ReactJson from 'react-json-view'
import PILOT_FIELDS from './pilot.fields.json'
import ConfirmationModal from './ConfirmationModal'
import { Container, Button, Header, Icon, Modal, Divider, Segment } from 'semantic-ui-react'
const PROTOCOLS = ['NA', 'Omni-ATAC', 'FAST-ATAC']

class FileInformation extends Component {
    state = {
        lastOnChange: null,
        lastOnSubmit: null,
        modalOpen: false
    }
    handleClose = () => {
        this.setState({ modalOpen: false })
    }

    handleModalSubmit = () => {        
        this.setState({ modalOpen: false })
        this.props.onUpdated({files: this.props.files, info: this.state.lastOnSubmit.data})
    }

    _onChange = (event, name, data, change) => {
        console.log(data);
        
        this.setState({
            lastOnChange: {
                name,
                data,
                change
            }
        })
    }

    _onSubmit = (event, data) => {
        this.setState({lastOnSubmit: {
                data
            }, modalOpen: true})
        event.preventDefault()
    }


    render() {
        let {lastOnChange, lastOnSubmit} = this.state

        return (
            <div>
                <Container>
                {lastOnSubmit ?
                    <ConfirmationModal handleClose={this.handleClose} open={this.state.modalOpen} onSubmit={this.handleModalSubmit}>
                    <div>
                        <br/>
                        <h5>Selected Files : </h5>
                        {this.props.files.map(file => <p key={file}>{file}</p>)}
                        <br/>
                        <Divider/>
                        <br/>
                        <ReactJson displayDataTypes={false} enableClipboard={false} name={false} src={ lastOnSubmit.data } />
                    </div>
                    </ConfirmationModal>
                    : null }
                </Container>
                <div className='form-body'>
                <AutoForm className='ui form' onSubmit={this._onSubmit} onChange={this._onChange}>
                    <Segment className="py-6 my-4" raised padded>
                    <div className="py-6 my-4 field">
                        <h2 htmlFor="biosample">Biosample:</h2>
                        <p>{PILOT_FIELDS.biosample[0].placeholder} (press Cmd + click to select multiple)</p> 
                        <select name="biosample" id="biosample" size="3" defaultValue={'Liver'}>
                            {PILOT_FIELDS.biosample[0].values.map((sample, i) => <option key={sample} value={sample}>{sample}</option>)}
                        </select>
                    </div>
                    <br/>
                    </Segment>
                    <Divider/>
                    <Segment className="py-6 my-4" raised padded>
                    <div className="pb-16 mb-4 field">
                        <h2>Treatment:</h2> 
                        <p>{PILOT_FIELDS.treatment[0].placeholder}</p>
                        <h5><input className='mx-4' type="radio" name="treatment" value='control'/>CONTROL</h5>
                        <p>OR</p>
                        { PILOT_FIELDS.treatment[0].values.map((treatment, i) => <label key={treatment.toString()} className='float-left'><input className='mx-4' type="radio" name="treatment" value={treatment.toString()}/>{treatment.toString()}</label>)}
                    </div>
                    <br/><br/><br/><br/>
                    </Segment>
                    <br/>
                    <br/>
                    <br/>

                    <Divider/>
                    <div className="flex flex-row justify-between">
                        <div className="field">
                            <label>Mouse gender:</label><br/>
                            <label><input className='mx-4' type="radio" name="mouse_gender" value="Male" defaultChecked/>
                            Male</label>
                            <label><input className='mx-4' type="radio" name="mouse_gender" value="Female"/>
                            Female</label>
                        </div>
                        <div className="field">
                            <label htmlFor="mouse_age_collection">Mouse age at sac:</label>
                            <p>(include units)</p>
                            <input type="text" name="mouse_age_collection" id="mouse_age_collection" placeholder="5 months"/>
                        </div>
                    </div>
                    <br/>

                    <h2>More details</h2>
                    <div className="field">
                        <label>Strand specificity:</label><br/>
                        <label><input className='mx-4' type="radio" name="strand_specific" value="true" />
                        TRUE</label>
                        <label><input className='mx-4' type="radio" name="strand_specific" value="false" defaultChecked/>
                        FALSE</label>
                    </div>
                    <br/>

                    <div className="field">
                        <label htmlFor="starting_cells">Starting amount of cells (mg):</label>
                        <p>Amount of cells input into assay (if applicable)</p>
                        <input type="text" name="starting_cells" id="starting_cells" defaultValue=""/>
                    </div>
                    <br/>

                    <div className="field">
                        <label htmlFor="starting_cell_count">Starting number of cells:</label>
                        <p>Number of cells input into assay (if applicable)</p>
                        <input type="text" name="starting_cell_count" id="starting_cell_count" defaultValue=""/>
                    </div>
                    <br/>

                    <div className="field">
                        <label htmlFor="starting_nucleic_acid">Starting amount of nucleic acid (include units):</label>
                        <p>Amount of nucleic acid input into assay (if applicable)</p>
                        <input type="text" name="starting_nucleic_acid" id="starting_nucleic_acid" defaultValue=""/>
                    </div>
                    <br/>

                    <div className="field">
                        <label>Tissue previously frozen:</label>
                        <p>Was tissue frozen prior to performing assay?</p>
                        <label><input className='mx-4' type="radio" name="previously_frozen_tissue" value="true" />
                        TRUE</label>
                        <label><input className='mx-4' type="radio" name="previously_frozen_tissue" value="false" defaultChecked/>
                        FALSE</label>
                    </div>
                    <br/>

                    <h3>ATAC-seq specific</h3>

                    <div className="field">
                        <label htmlFor="protocol">Assay Protocol (Standard):</label><br/>
                        <select name="protocol" id="protocol" defaultValue="1">
                            {PROTOCOLS.map((protocol, i) => <option key={protocol} value={protocol}>{protocol}</option>)}
                        </select>
                    </div>
                    <br/>
                    
                    <div className="field">
                        <label>Detergent added:</label><br/>
                        <label><input className='mx-4' type="radio" name="detergent_added" value="true" />
                        TRUE</label>
                        <label><input className='mx-4' type="radio" name="detergent_added" value="false" defaultChecked/>
                        FALSE</label>
                    </div>
                        
                    
                    
                    <br/>

                    <div className="field">
                        <label>Filtering method: </label><br/>
                        <label><input className='mx-4' type="radio" name="filtering_method" value="Miracloth" />
                        Miracloth</label>
                        <label><input className='mx-4' type="radio" name="filtering_method" value="Celltrics column" defaultChecked/>
                        Celltrics column</label>
                    </div>
                    <br/>

                    <div className="field">
                        <label>Comments:</label><br/>
                        <textarea name="comments" placeholder=" Any additional information "/>
                    </div>
                    <br/>
                    <Divider/>
                    <button type='submit' className='ui button primary'>Save</button>
                    <br/>
                    <br/>
                </AutoForm>

                </div>
                {/* <div className="block text-left">
                    <p>Last <code>onChange</code> arguments:</p>
                    <pre><code>{lastOnChange ? JSON.stringify(lastOnChange, null, 2) : ' '}</code></pre>
                    <p>Last <code>onSubmit</code> arguments:</p>
                    <pre><code>{lastOnSubmit ? JSON.stringify(lastOnSubmit, null, 2) : ' '}</code></pre>     
                </div> */}
                
            </div>
        )
    }
}

export default FileInformation;