import React, {Component} from 'react'
import AutoForm from 'react-auto-form'
import PILOT_FIELDS from './pilot.fields.json'
import ReactJson from 'react-json-view'
import ConfirmationModal from './ConfirmationModal'
import Notifications, {notify} from 'react-notify-toast';

import {
    Container,
    Button,
    Header,
    Icon,
    Modal,
    Segment,
    Divider
} from 'semantic-ui-react'

const LABS = [
    "Dolinoy Lab",
    "Aylor Lab",
    "Bartolomei Lab",
    "Biswal Lab",
    "Mutlu Lab",
    "Walker Lab",
    "Zhibin Lab",
    "Wang Lab"
]
const PROTOCOLS = ['NA', 'Omni-ATAC', 'FAST-ATAC']
const ASSAYS = [
    'ATAC-seq',
    'RNA-seq',
    'RRBS-seq',
    'MeDIP-seq',
    'MRE-seq',
    'Mnase-seq',
    'ChIP-seq'
]
class BasicQuestions extends Component {
    state = {
        lastOnChange: null,
        lastOnSubmit: null,
        modalOpen: false
    }
    handleClose = () => {
        this.setState({modalOpen: false})
    }

    handleModalSubmit = () => {
        this.setState({modalOpen: false})
        this
            .props
            .onSubmit(this.state.lastOnSubmit.data)
    }

    _onChange = (event, name, data, change) => {
        this.setState({
            lastOnChange: {
                name,
                data,
                change
            }
        })
    }

    _onSubmit = (event, data) => {
        if (data.username === '') {
            notify.show('Please provide username', 'error');
        } else {
            this.setState({lastOnSubmit: {
                data
            }, modalOpen: true})
        }
        event.preventDefault()
    }

    render() {
        let {lastOnChange, lastOnSubmit} = this.state

        return (
            <div style={{
                // backgroundColor: 'lavender'
            }}>
                <Container>
                <Notifications />
                    {lastOnSubmit
                        ? <ConfirmationModal
                                handleClose={this.handleClose}
                                open={this.state.modalOpen}
                                onSubmit={this.handleModalSubmit}>
                                <ReactJson
                                    displayDataTypes={false}
                                    enableClipboard={false}
                                    name={false}
                                    src={lastOnSubmit.data}/>
                            </ConfirmationModal>
                        : null}
                </Container>
                <div className='form-body mt-8'>
                    <AutoForm
                        className='ui form'
                        onSubmit={this._onSubmit}
                        onChange={this._onChange}>
                        <Segment raised>
                            <div className="flex mb-4">
                                <div className="mt-4 px-2 w-1/2 bg-grey-lightest h-64">
                                    <div className="six wide inline field">
                                        <label className="pt-8 pb-8" htmlFor="assay">Assay:</label><br/>
                                        <select name="assay" id="assay" defaultValue="1">
                                            {ASSAYS.map((assay, i) => <option key={assay} value={assay}>{assay}</option>)}
                                        </select>
                                    </div><br/>

                                    <Divider/>

                                    <div className="field">
                                        <h5>Data phase:</h5>
                                        <label><input
                                            className='mx-4'
                                            type="radio"
                                            name="data-phase"
                                            value="pilot"
                                            defaultChecked/>
                                            Pilot</label>
                                        <label><input className='mx-4' type="radio" name="data-phase" value="production"/>
                                            Production</label>
                                    </div>
                                    <br/>
                                </div>

                                {/* <div className="field">
                        <label htmlFor="password">Password:</label><br/>
                        <input type="password" name="password" id="password" defaultValue="hunter2 "/>
                    </div> */}
                                <div className="mt-4 px-4 py-2 w-1/2 h-32">
                                    <div className="field">
                                        <h5>Read type:</h5>
                                        <label><input
                                            className='mx-4'
                                            type="radio"
                                            name="read-type"
                                            value="single-end"
                                            defaultChecked/>
                                            Single-end</label>
                                        <label><input className='mx-4' type="radio" name="read-type" value="paired-end"/>
                                            Paired-end</label>
                                    </div>
                                    <br/>
                                    
                                    <div className="six wide inline field">
                                        <label className="pt-4 pb-8" htmlFor="quantity">Number of files</label><br/>
                                        <input
                                            type="number"
                                            name="quantity"
                                            id="quantity"
                                            min="1"
                                            step="1"
                                            defaultValue="4"/>
                                    </div>
                                    <br/>
                                </div>
                            </div>
                        </Segment>
                        {/*
                    <Segment raised padded>
                    <div className="field">
                        <h4 htmlFor="biosample">Biosample:</h4>
                        <p>{PILOT_FIELDS.biosample[0].placeholder} (press Cmd + click to select multiple)</p>
                        <select name="biosample" id="colours" multiple size="3" defaultValue={['Liver']}>
                            {PILOT_FIELDS.biosample[0].values.map((sample, i) => <option key={sample} value={sample}>{sample}</option>)}
                        </select>
                    </div>
                    <br/>

                    <div className="py-6 my-4 field">
                        <h4>Treatment:</h4>
                        <p>{PILOT_FIELDS.treatment[0].placeholder}</p>
                        { PILOT_FIELDS.treatment[0].values.map((treatment, i) => <label key={treatment} className='float-left'><input className='mx-4' type="checkbox" name="treatment" value={treatment}/>{treatment}</label>)}
                    </div>
                    <br/>
                    </Segment>
*/}
                        <div className="field">
                            <label>Comments/Notes for DCC</label><br/>
                            <textarea name="comments" placeholder=" Any information "/>
                        </div>
                        <br/> {/*
                    <div className="field">
                        <label>Assay Protocol (Custom):</label><br/>
                        <input type="file" name="assay_protocol"/>
                    </div>
                    <br/>

                    <div className="field">
                        <label htmlFor="protocol">Assay Protocol (Standard):</label><br/>
                        <select name="protocol" id="protocol" defaultValue="1">
                            {PROTOCOLS.map((protocol, i) => <option key={protocol} value={protocol}>{protocol}</option>)}
                        </select>
                    </div>
                    <br/>

                    <h2>More details</h2>
                    <div className="field">
                        <label>Strand specificity:</label><br/>
                        <label><input className='mx-4' type="radio" name="strand-specific" value="true" />
                        TRUE</label>
                        <label><input className='mx-4' type="radio" name="strand-specific" value="false" defaultChecked/>
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
                        <label>Detergent added:</label><br/>
                        <label><input className='mx-4' type="radio" name="detergent-added" value="true" />
                        TRUE</label>
                        <label><input className='mx-4' type="radio" name="detergent-added" value="false" defaultChecked/>
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
    */}

                        <button className='ui button primary'>Submit</button>
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

export default BasicQuestions;