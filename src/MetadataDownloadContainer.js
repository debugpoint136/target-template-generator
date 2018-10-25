import React, {Component} from 'react';
import {Button, Popup} from 'semantic-ui-react'
import MetadataForSubmissions from './components/template-generator/MetadataForSubmissions';
import MetadataForLabs from './components/template-generator/MetadataForLabs';
import app from "./fire";

class MetadataDownloadContainer extends Component {
    state = {
        active: null
    }

    componentWillMount() {
        app.auth()
            .onAuthStateChanged(user => {
                if (user) {
                    this.setState({lab: user.photoURL });
                } else {
                    this.setState({lab: null});
                }
            });
    }
    handleClick = (e, {name}) => this.setState({active: name})

    render() {
        const {active} = this.state;

        return (
            <div className="m-8 p-8">
                {(this.state.lab) ? 
                <Button.Group>
                    <Popup trigger={
                    <Button
                        positive={active === 'submission'}
                        name='submission'
                        active={active === 'submission'}
                        onClick={this.handleClick}>By Submission</Button>
                    } content='Download metadata connected only as part of selected submission' />
                    <Button.Or/>
                    <Popup trigger={
                    <Button
                        positive={active === 'lab'}
                        name='lab'
                        active={active === 'lab'}
                        onClick={this.handleClick}>By Lab - 5.0.0</Button>
                    } content='Download all metadata registered by members of lab, updated to 5.0.0' />
                    <Button.Or/>
                    <Button
                        positive={active === 'legacy'}
                        name='legacy'
                        active={active === 'legacy'}
                        onClick={this.handleClick}>By Lab - 4.0.1</Button>
                    } content='Download all metadata registered by members of lab (old metadata 4.0.1)' />
                </Button.Group> : null }

                {(active === 'submission')
                    ? <MetadataForSubmissions lab={this.state.lab}/>
                    : (active === 'lab')
                        ? <MetadataForLabs lab={this.state.lab} legacy={false}/> : 
                        (active === 'legacy') ? <MetadataForLabs lab={this.state.lab} legacy={true}/>
                        : <p className='text-grey font-hairline mt-8'>Please select an option</p>}

            </div>
        )
    }

}

export default MetadataDownloadContainer;