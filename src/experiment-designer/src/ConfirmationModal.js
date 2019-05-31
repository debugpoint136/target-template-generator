import React, {Component} from 'react'
import { Button, Modal, Container, Image } from 'semantic-ui-react'

class ModalExampleSize extends Component {

    render() {

        return (
            <div>
            <Container>
                <div className="mt-8 pt-8 align-middle">
                <Modal open={this.props.open} onClose={this.props.handleClose}>
                    <Modal.Header>
                        Confirm metadata
                    </Modal.Header>
                    <Modal.Actions>
                        <Button negative onClick={this.props.handleClose}> 
                            No
                        </Button>
                        <Button positive icon='checkmark' labelPosition='right' content='Yes' onClick={this.props.onSubmit}/>
                    </Modal.Actions>
                    <Modal.Content>
                    <div className="flex justify-center mb-4">
                        <div>
                        <h3>Looks good ?</h3>
                        {this.props.children}
                        </div>
                    </div>
                    </Modal.Content>
                    
                </Modal>
                </div>
            </Container>
            </div>
        )
    }
}

export default ModalExampleSize