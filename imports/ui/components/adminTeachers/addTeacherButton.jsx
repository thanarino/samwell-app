import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';

export default class AddTeacherButton extends Component {
    state = { open: false };
    show = () => this.setState({ open: true });
    close = () => this.setState({ open: false });

    render() {
        const { open } = this.state;

        return (
            <div>
                <Button onClick={this.show} color='teal'>Add A New Teacher</Button>

                <Modal size='tiny' open={open} onClose={this.close}>
                    <Modal.Header>
                        Add new Teacher
                    </Modal.Header>
                    <Modal.Content>
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