import React, {Component} from 'react';
import {Button, Header, Icon, Modal} from 'semantic-ui-react'
import fire from '../../fire';
import Bioproject from './Bioproject';
import {generateAccession} from '../../helpers';
// function generateAccession(test) {
//     return "TRGTBPR00015";
// }
const inlineStyle = {
    modal : {
        marginTop: '0px !important',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
};
// const LAB = "Wang Lab";
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
        fire.auth().onAuthStateChanged(user => {
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
                        // const bioprojectExistingLab = bioprojectsInFirebase.filter(item => item.text.lab === LAB);
                        this.setState({bioprojects: bioprojectExistingLab});
                    }, (errorObject) => {
                        console.log("The read failed: " + errorObject.code);
                    });
                }
            });
    }
    render() {
        return (
            <div className='flex justify-center m-8'>
            <div className="">
            {this.state.bioprojects
                        .map(item => <div className='m-4 p-4 bg-grey-lighter' key={item.id}>
                            <Button color='blue' name={item.id} onClick={this.handleEditOne} > {item.id} </Button>
                            <div className="text-xs text-grey">{item.text.title}</div>
                        </div>)}
                
                {(this.state.mode === 'edit') ? <div className="sdfsd">
                        <div>
                            <Modal
                                open={this.state.modalOpen}
                                onClose={this.handleClose}
                                basic
                                style={inlineStyle.modal}
                                size='large'>
                                <Header icon='key' content={this.state.id}/>
                                <Modal.Content>
                                    <div className="bg-white">
                                        <div>
                                            <Bioproject id={this.state.id} mode='edit' lab={this.state.lab} handleSave={this.handleClose}/>
                                        </div>
                                    </div>
                                </Modal.Content>
                            </Modal>
                        </div> </div>: null }

                    {(this.state.mode === 'new') ? 
                    <div className='m-4 p-4'>
                        <Modal
                            open={this.state.modalOpen}
                            onClose={this.handleClose}
                            basic
                            style={inlineStyle.modal}
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