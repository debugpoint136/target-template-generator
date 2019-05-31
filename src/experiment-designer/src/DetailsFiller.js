import React, { Component } from 'react'
import  FileTable from './FileTable' 
import { Button } from 'semantic-ui-react'
import FileInformation from "./FileInformation";

class DetailsFiller extends Component {
    state = { allFiles: [], selectedFiles: [], updatedFiles: [], remainingFiles: [], fileInfo: [] }

    handleFileSelection = (files) => {
        this.setState({ selectedFiles: files })
    }

    handleFileUpdation = (data) => {
        let _remainingFiles = this.state.remainingFiles
        let files = data.files
        let info = data.info
        // remove these from remaining
        _remainingFiles = _remainingFiles.filter(item => !files.includes(item._id))

        // update fileInfo
        let _fileInfo = this.state.fileInfo
        let _fileInfoItem = mergeFileAndInfo(this.state.allFiles, data)        
        _fileInfo = _fileInfo.concat(_fileInfoItem)        
        this.setState({ updatedFiles: files, selectedFiles: [], remainingFiles: _remainingFiles, fileInfo: _fileInfo})
    }

    handleReviewClick = () => {        
        this.props.onSubmit(this.state.fileInfo)
    }

    componentDidMount() {
        this.setState({ allFiles: this.props.files, remainingFiles: this.props.files })
    }


    render() { 
        return ( 
        <div>
            <h2>Details Filer</h2>

            { (this.state.remainingFiles.length === 0) ?
            <Button color='pink' floated='right' onClick={this.handleReviewClick}>REVIEW</Button>
            : <h3>Click on files on the left pane, fill out information on the right pane and hit Save button</h3>
            }
            <p>Click Review on the right when done</p>

            <div className="flex mb-4">
                    { (this.state.remainingFiles.length > 0) ?
                    <div className="px-2 w-1/2 bg-grey-light h-8">
                        <FileTable data={this.state.remainingFiles} selection={this.state.selectedFiles} onSelected={this.handleFileSelection}/>
                    </div>
                    : null}
                    { (this.state.selectedFiles.length > 0) ?
                    <div className="px-2 py-2 w-1/2 bg-grey h-8">
                    <h5>Add Details for Selected Files</h5>
                        <div className="overflow-scroll" style={{ height: '40rem'}}>
                        <FileInformation files={this.state.selectedFiles} onUpdated={this.handleFileUpdation}/>
                        </div>
                    </div>
                    : null}
                </div>
            
        </div> )
    }
}

export default DetailsFiller;

function mergeFileAndInfo(allFiles, obj) {
    let { files, info } = obj

    let updatedFiles = files.map(file => {
        let _file = allFiles.filter(files => files._id === file)[0]
        _file = Object.assign({}, _file, {...info})
        return _file
    })

    return updatedFiles
}