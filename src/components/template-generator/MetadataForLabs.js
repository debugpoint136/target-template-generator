import React, {Component} from 'react';
import {Label, Button} from 'semantic-ui-react';
import Neo4jDownloadLab from './Neo4jDownloadLab';

const LABS = [
    'David Aylor',
    'Shyam Biswal',
    'Marisa Bartolomei',
    'Dana Dolinoy',
    'Gokhan Mutlu, MD',
    'Cheryl Walker',
    'Zhibin Wang',
    'Winnie Tang',
    'Ting Wang'
];

class MetadataForLabs extends Component {
    state = { download: null }

    handleMetadataDownload = (e, {name}) => {
        this.setState({ download: name });
    }

    render() {
        return (
            <div className='border-2 border-dashed border-teal p-4 m-4'>
                <h4>Download metadata by Lab</h4>
                <hr/>
                <div className="m-4 p-4">
                    { LABS.map((lab, index) => <div
                            className="m-4 p-4 bg-teal-lightest  flex justify-between"
                            key={index}>
                            <Label size='tiny' className="px-4">{lab}</Label>
                            
                            <Button
                                basic
                                size='tiny'
                                name={lab}
                                className="mx-4"
                                icon='download'
                                onClick={this.handleMetadataDownload}/>
                        </div>)
                    }
                </div>
                
                <Neo4jDownloadLab id={this.state.download}/>
                
            </div>
        );
    }
}

export default MetadataForLabs;