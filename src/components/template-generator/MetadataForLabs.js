import React, {Component} from 'react';
import {Label, Button} from 'semantic-ui-react';
import Neo4jDownloadLab from './Neo4jDownloadLab';
// import Neo4jDownloadLabLegacy from './Neo4jDownloadLabLegacy';
import {Loader, Dimmer, Popup} from 'semantic-ui-react';

// const LABS = [
//     'David Aylor',
//     'Shyam Biswal',
//     'Marisa Bartolomei',
//     'Dana Dolinoy',
//     'Gokhan Mutlu, MD',
//     'Cheryl Walker',
//     'Zhibin Wang',
//     'Winnie Tang',
//     'Ting Wang'
// ];

// const PIs = {
//     "Aylor Lab": "David Aylor",
//     "Biswal Lab": "Shyam Biswal",
//     "Bartolomei Lab": "Marisa Bartolomei",
//     "Dolinoy Lab": "Dana Dolinoy",
//     "Mutlu Lab": "Gokhan Mutlu, MD",
//     "Walker Lab": "Cheryl Walker",
//     "Zhibin Lab": "Zhibin Wang",
//     "Tang Lab": "Winnie Tang",
//     "Wang Lab": "Ting Wang"
// };
const LABS = [
    'Aylor Lab',
    'Biswal Lab',
    'Bartolomei Lab',
    'Dolinoy Lab',
    'Mutlu Lab',
    'Walker Lab',
    'Zhibin Lab',
    'Wang Lab'
];

class MetadataForLabs extends Component {
    state = {
        download: null,
        downloadFlat: null,
        loader: false
    }

    handleMetadataDownload = (e, {name}) => {
        this.setState({download: name});
    }

    handleMetadataDownloadFlat = (e, {name}) => {
        this.setState({download: name, downloadFlat: true});
    }

    handleLoader = () => {
        const loaderState = !this.state.loader;
        this.setState({loader: loaderState})
    }

    render() {
        if (this.state.loader) {
            return (
                <div className="h-screen">
                    <Dimmer active>
                        <Loader size='mini'>Downloading...</Loader>
                    </Dimmer>
                </div>
            )
        }

        if (this.props.lab === 'ADMIN') {
            return (
                <div className="flex justify-center">
                    <div className='border-2 border-dashed border-teal p-4 m-4  w-1/2 flex justify-center'>
                        <h4>Download metadata by Lab</h4>
                        <hr/>
                        <div className="m-4 p-4 w-1/2">
                            {LABS.map((lab, index) => <div className="m-4 p-4 bg-teal-lightest  flex justify-between " key={index}>
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

                        <Neo4jDownloadLab id={this.state.download} handleLoader={this.handleLoader}/>

                    </div>
                </div>
            );
        }

        return (
            <div className="m-4 p-4 flex justify-center">
                <div className="m-4 p-4 bg-teal-lightest flex justify-between w-1/3">
                    <Label size='tiny' color='blue' className="px-4">{this.props.lab}</Label>
                    <Popup trigger={
                    <Button
                        basic
                        size='tiny'
                        name={this.props.lab}
                        className="mx-4"
                        icon='download'
                        onClick={this.handleMetadataDownload}/>} content='Download all metadata excel' />
                        <Popup trigger={
                            <Button
                                basic
                                size='tiny'
                                name={this.props.lab}
                                className="mx-4"
                                icon='table'
                                onClick={this.handleMetadataDownloadFlat}/>
                            } content='Download flat file of all metadata csv' />
                </div>
                    { 
                        (this.state.downloadFlat) ? 
                        <Neo4jDownloadLab flat={true} id={this.state.download} lab={this.props.lab} handleLoader={this.handleLoader}/>
                        :
                        <Neo4jDownloadLab flat={false} id={this.state.download} handleLoader={this.handleLoader}/>
                    }
            </div>
        );
    }
}

export default MetadataForLabs;