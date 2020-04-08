import React, {Component} from 'react'
import AutoForm from 'react-auto-form'
import {Divider} from 'semantic-ui-react';
import Notifications, {notify} from 'react-notify-toast';

const PLACEHOLDER_SE = `8a0a881f624a5748bf5eef2188ec7164,GM-ATAC-5-FAM_S1_L006.SE.fastq.gz
8124b88ff035b6200a734c9517dc376b,GM-ATAC-6-FAF_S2_L006.SE.fastq.gz
ad319dbce943fbb4ed747afc521ce4e0,GM-ATAC-7-PMM_S3_L006.SE.fastq.gz
823536c65837192fbeb2b73a11c8a1c7,GM-ATAC-8-PMF_S4_L006.SE.fastq.gz
`

const PLACEHOLDER_PE = `8a0a881f624a5748bf5eef2188ec7164,GM-ATAC-5-FAM_S1_L006.PE.R1.fastq.gz
8124b88ff035b6200a734c9517dc376b,GM-ATAC-5-FAM_S1_L006.PE.R2.fastq.gz
ad319dbce943fbb4ed747afc521ce4e0,GM-ATAC-7-PMM_S3_L006.PE.R1.fastq.gz
823536c65837192fbeb2b73a11c8a1c7,GM-ATAC-7-PMM_S3_L006.PE.R2.fastq.gz`

const instruction = `md5sum * | awk -F' ' '{print $1","$2}' > md5sum.csv`
// TODO: ADD mac and unix specific instructions

class FilesMd5sum extends Component {
    state = {
        lastOnChange: null,
        lastOnSubmit: null
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
        /*
            TODO: ADD CHECK TO SEE IF VALUE PROVIDED
        if (data.username === '') {
            notify.show('Please provide username', 'error');
        }
        */
        event.preventDefault()
        this.setState({lastOnSubmit: {
                data
            }})
        this
            .props
            .onSubmit(data)
    }
    render() {
        let {lastOnChange, lastOnSubmit} = this.state

        return (
            <div>
                <div className="flex mb-4"> 
                    <div className="mt-4 px-8 py-4 w-1/3 bg-grey-lightest h-screen">
                    {(this.props.onError) ? <h3 className="text-red">Error: Check if correct number of files declared and naming convention followed</h3>: null }
                        <h3>Steps:</h3>
                        <p>1. On your local computer/server</p>
                        <p>using terminal/command line, cd into the directory where the data files to be
                            uploaded are available</p>
                        <Divider/>
                        <p>2 . Please ensure the files have extensions like this</p>
                        <h5>Single-end reads</h5>
                        <code>some-filename.SE.fastq.gz</code>
                        <h5>Paired-end reads</h5>
                        <code>other-filename.PE.R1.fastq.gz</code>
                        <br/>
                        <code>other-filename.PE.R2.fastq.gz</code>
                        <br/><br/>
                        <h5>Note:
                        </h5>
                        <div className='text-md max-w-md p-2 bg-red-light text-white'>
                            <strong>other-filename</strong> string should be IDENTICAL for paired-end files
                        </div>
                        
                        <br/><br/>
                        <div className='font-mono font-thin underline text-lg text-pink'>Filenames not in this format will be ignored</div>
                        < Divider/>

                        <p>3. Run md5sum calculation command for these files</p>
                        <div className='font-mono font-thin text-xs p-2 bg-grey-light'>{instruction}</div>
                    </div>

                    <div className="mt-4 mb-4 px-8 py-4 w-2/3 bg-grey-light h-24">
                        <div className='font-sans font-thin text-sm text-teal'>Please make sure same files are uploaded as part of this submission</div>
                        <AutoForm
                            className='ui form'
                            onSubmit={this._onSubmit}
                            onChange={this._onChange}>
                            <div className="field">
                                <h3>Paste md5sum, files (comma separated)</h3><br/>
                                <div className="italic font-thin text-xs text-grey">Hint: Step 3. left panel</div>
                                <textarea
                                    name="filenames-md5sum" rows="30"
                                    placeholder={(this.props.read_type === 'paired-end') ? PLACEHOLDER_PE : PLACEHOLDER_SE }
                                    />
                            </div>
                            <br/>
                            <button className='ui button primary'>Submit</button>
                        </AutoForm>
                    </div>
                </div>
            </div>
        )
    }
}

export default FilesMd5sum

function checkFileNamesForPairedEnd (list) {

}