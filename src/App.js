import React, {Component} from 'react';
import FlatTemplate from './components/template-generator/FlatTemplate';
import MetadataDownloadContainer from './MetadataDownloadContainer';
import UploadContainer from './components/template-generator/UploadContainer';
import LabSpecific from './components/template-generator/LabSpecific';
import {Menu} from 'semantic-ui-react';
import Bioprojects from './components/template-generator/Bioprojects';
// import ExcelDownloadFlat from './components/template-generator/ExcelDownloadFlat';
// const tmpFileJSON = require('./json/target-submission-prod--LQFvZsN2SnICqrHr_i6-export.json');
const TUTORIALS_PDF="https://firebasestorage.googleapis.com/v0/b/target-submission-prod.appspot.com/o/Updated%20Production%20metadata%20submission-prod.pdf?alt=media&token=b0494656-0103-4fe2-8f01-b4a917e3966a";

class App extends Component {
    state = { activeItem: 'template', data: null}

    // componentDidMount() {
    //     const data = JSON.parse(tmpFileJSON.data);
    //     this.setState({ data: data });
    // }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <div>
                <div className="text-center">
                    <a href={TUTORIALS_PDF}>Tutorial</a>
                </div>
            <div className="flex justify-center m-8">
                <Menu stackable>
                    <Menu.Item
                        name='lab'
                        active={activeItem === 'lab'}
                        onClick={this.handleItemClick}>
                        Lab details
                    </Menu.Item>

                    <Menu.Item
                        name='bioproject'
                        active={activeItem === 'bioproject'}
                        onClick={this.handleItemClick}>
                        Bioprojects
                    </Menu.Item>

                    <Menu.Item
                        name='template'
                        active={activeItem === 'template'}
                        onClick={this.handleItemClick}>
                        Generate a Blank Template
                    </Menu.Item>

                    <Menu.Item
                        name='download'
                        active={activeItem === 'download'}
                        onClick={this.handleItemClick}>
                        Download previously uploaded Metadata
                    </Menu.Item>

                    <Menu.Item
                        name='upload'
                        active={activeItem === 'sign-in'}
                        onClick={this.handleItemClick}>
                        Upload new or Update previous metadata
                    </Menu.Item>
                </Menu>
                </div>

                { (this.state.activeItem === 'lab') ? <LabSpecific/> : null}
                { (this.state.activeItem === 'bioproject') ? <Bioprojects/> : null}
                { (this.state.activeItem === 'template') ? <FlatTemplate/> : null}
                { (this.state.activeItem === 'upload') ? <UploadContainer/> : null}
                { (this.state.activeItem === 'download') ? <div className="text-center"><MetadataDownloadContainer/></div> : null}

                            
                <p className="text-center text-grey text-xs">
                    ©2018 TaRGET DCC @ Wash U St. Louis -- TEST INSTANCE ONLY--
                    {/* ©2018 TaRGET DCC @ Wash U St. Louis -- PRODUCTION INSTANCE -- */}
                </p>
                {/* {(this.state.data)? <ExcelDownloadFlat data={this.state.data} />: null} */}
                
            </div>
        );
    }
}

export default App;