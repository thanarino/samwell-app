import React, { Component } from 'react';
import { Button, Modal, Header } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';

export default class deleteClassModal extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    show = () => this.setState({ open: true });
    close = () => this.setState({ open: false });
    submit = () => {
        Meteor.call('teacher.delete', this.props.teacher._id, !this.props.teacher.isDeleted);
        this.close();
        window.location.reload();
    }
        
    render() {
        const teacher = this.props.teacher;
        const { open } = this.state;
        return (
            <Modal trigger={<Button icon='trash outline' content={teacher.isDeleted ? 'Recover' : 'Delete'} size='large' onClick={this.show}/>} size='mini' closeIcon open={open} onClose={this.close}>
                <Header content={`${teacher.isDeleted ? `Recover` : `Delete`} ${teacher.family_name}, ${teacher.given_name} ${teacher.middle_name}?`}/>
                <Modal.Actions>
                    <Button negative onClick={this.close}>No</Button>
                    <Button positive onClick={this.submit}>Yes</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}