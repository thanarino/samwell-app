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
        Meteor.call('sections.delete', this.props.section._id);
        this.close();
    }
        
    render() {
        const section = this.props.section;
        const { open } = this.state;
        return (
            <Modal trigger={<Button icon='trash outline' content='Delete' size='large' onClick={this.show}/>} size='mini' closeIcon open={open} onClose={this.close}>
                <Header content={`Delete ${section.subject} - ${section.sectionName}?`}/>
                <Modal.Actions>
                    <Button negative onClick={this.close}>No</Button>
                    <Button positive onClick={this.submit}>Yes</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}