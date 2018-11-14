import React, {Component} from 'react';
import {Button, Header, Icon, Modal} from 'semantic-ui-react'
import fire from '../../fire';
import Bioproject from './Bioproject';
// import {generateAccession} from '../../helpers';
function generateAccession(test) {
    return "TRGTBPR0003";
}

class Bioprojects extends Component {
    state = {
        bioprojects: [],
        user: null,
        lab: null,
        uid: null,
        modalOpen: false,
        mode: 'edit',
        id: null
    }
    handleOpen = () => this.setState({modalOpen: true})

    handleClose = () => this.setState({modalOpen: false})

    handleNewRequest = () => this.setState({mode: 'new', modalOpen: true})

    handleCloseNewRequest = () => this.setState({ mode: 'edit', modalOpen: false})

    handleEditOne = (e, {name}) => this.setState({ mode: 'edit', modalOpen: true, id: name})

    componentWillMount = () => {
        fire
            .auth()
            .onAuthStateChanged(user => {
                if (user) {
                    this.setState({user: user.displayName, lab: user.photoURL, uid: user.uid});

                    let bioprojectsRef = fire
                        .database()
                        .ref('bioprojects')
                        .orderByKey()
                        .limitToLast(10);
                    bioprojectsRef.on('value', snapshot => {
                        let bioprojectsInFirebase = [];
                        snapshot.forEach(data => {
                            bioprojectsInFirebase.push({
                                text: data.val(),
                                id: data.key
                            })
                        });
                        const bioprojectExistingLab = bioprojectsInFirebase.filter(item => item.text.lab === user.photoURL);
                        this.setState({bioprojects: bioprojectExistingLab});
                    }, (errorObject) => {
                        console.log("The read failed: " + errorObject.code);
                    });
                }
            });
    }
    render() {
        return (
            <div className='flex justify-center'>
            <div className="">
            {this.state.bioprojects
                        .map(item => <div className='m-4 p-4 bg-grey-lighter' key={item.id}>
                            <Button color='blue' name={item.id} onClick={this.handleEditOne} > {item.id} </Button>
                        </div>)}
                
                {(this.state.mode === 'edit') ? <div className="sdfsd">
                        <div>
                            <Modal
                                open={this.state.modalOpen}
                                onClose={this.handleClose}
                                basic
                                size='large'>
                                <Header icon='key' content={this.state.id}/>
                                <Modal.Content>
                                    <div className="bg-white">
                                        <div>
                                            <Bioproject id={this.state.id} mode='edit' lab={this.state.lab} handleSave={this.handleClose}/>
                                        </div>
                                    </div>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='green' inverted>
                                        <Icon name='checkmark'/>
                                        Done
                                    </Button>
                                </Modal.Actions>
                            </Modal>
                        </div> </div>: null }

                    {(this.state.mode === 'new') ? 
                    <div className='m-4 p-4'>
                        <Modal
                            open={this.state.modalOpen}
                            onClose={this.handleClose}
                            basic
                            size='large'>
                            <Header icon='key' content='Create New Bioproject'/>
                            <Modal.Content>
                                <div className="bg-white">
                                    <div>
                                        <Bioproject
                                            id={generateAccession('BPR')}
                                            mode='new'
                                            lab={this.state.lab}
                                            handleSave={this.handleCloseNewRequest}/>
                                    </div>
                                </div>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color='green' inverted>
                                    <Icon name='checkmark'/>
                                    Done
                                </Button>
                            </Modal.Actions>
                        </Modal>
                    </div> : null}
                    <Button onClick = {this.handleNewRequest} color='green' size='large' inverted>
                        <Icon name='plus'/>
                        Add new
                    </Button>
                </div>
            </div>
        );
    }
}
export default Bioprojects;