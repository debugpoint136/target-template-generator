import React, {Component} from 'react';
import {Button, Header, Icon, Modal} from 'semantic-ui-react'
import fire from '../../fire';
import Bioproject from './Bioproject';
import {generateAccession} from '../../helpers';

class Bioprojects extends Component {
    state = {
        bioprojects: [],
        user: null,
        lab: null,
        uid: null,
        modalOpen: false
    }
    handleOpen = () => this.setState({modalOpen: true})

    handleClose = () => this.setState({modalOpen: false})

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
                    {this
                        .state
                        .bioprojects
                        .map(item => <div className='m-4 p-4 bg-grey' key={item.id}>
                            <Modal
                                trigger={<Button onClick = {this.handleOpen} > {item.id} </Button>}
                                open={this.state.modalOpen}
                                onClose={this.handleClose}
                                basic
                                size='large'>
                                <Header icon='key' content={item.id}/>
                                <Modal.Content>
                                    <div className="bg-white">
                                        <div>
                                            <Bioproject id={item.id} mode='edit' handleSave={this.handleClose}/>
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
                        </div>)}

                    {/* Add new */}
                    <div className='m-4 p-4 bg-grey'>
                        <Modal
                            trigger={<Button onClick = {this.handleOpen}> 'Add new' </Button>}
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
                                            handleSave={this.handleClose}/>
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
                    </div>
                </div>
            </div>
        );
    }
}
export default Bioprojects;