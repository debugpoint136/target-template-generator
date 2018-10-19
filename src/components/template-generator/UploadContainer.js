import React, {Component} from 'react';
import ExcelUpload from './ExcelUpload';
import UploadsList from './UploadsList';

class UploadContainer extends Component {
    state = {}
    render() {
        return (
            <div className="flex justify-center">
            <div className="m-8 p-8 flex-col w-1/2 justify-center">
                <div className="border-2 border-blue m-8 p-8">
                    <div className="m-8 p-8 h-8 font-semibold text-grey-darker font-sans text-2xl">Save filled out template excel file</div>
                    <ExcelUpload/>
                </div>
                <div className="border-2 border-blue m-8 p-8">
                    <h3 className='text-center'>Saved Excel files</h3>
                    <hr/>
                    <UploadsList/>
                </div>
            </div>
            </div>
        );
    }
}

export default UploadContainer;