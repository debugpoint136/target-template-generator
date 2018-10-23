import React, {Component} from 'react';
import FlatTemplate from './components/template-generator/FlatTemplate';
import MetadataForSubmissions from './components/template-generator/MetadataForSubmissions';
import MetadataForLabs from './components/template-generator/MetadataForLabs';
import UploadContainer from './components/template-generator/UploadContainer';
import {Menu} from 'semantic-ui-react'

class App extends Component {
    state = { activeItem: 'template'}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <div>
            <div className="flex justify-center m-8">
                <Menu stackable>
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

                { (this.state.activeItem === 'template') ? <FlatTemplate/> : null}
                { (this.state.activeItem === 'upload') ? <UploadContainer/> : null}
                { (this.state.activeItem === 'download') ? <MetadataForSubmissions/> : null}

                {/* <MetadataForLabs/> */}
                
                <p className="text-center text-grey text-xs">
                    {/* ©2018 TaRGET DCC @ Wash U St. Louis */}
                </p>
            </div>
        );
    }
}

export default App;