import React, { Component } from 'react';
import { Button, Modal, Input } from 'semantic-ui-react';
import AddClassForm from '../adminClasses/addClassForm';

export default class AddClassButton extends Component {
    state = { open: false };
    show = () => this.setState({ open: true });
    close = () => this.setState({ open: false });

    render() {
        const { open } = this.state;

        return (
            <div>
                <Button onClick={this.show} color='teal'>Add A New Class</Button>

                <Modal size='tiny' open={open} onClose={this.close}>
                    <Modal.Header>
                        Add new Class
                    </Modal.Header>
                    <Modal.Content scrolling>
                        <AddClassForm/>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.close}>Close</Button>
                        <Button positive>Yes</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}