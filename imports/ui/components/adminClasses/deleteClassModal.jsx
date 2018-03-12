import React, { Component } from 'react';
import { Button, Modal, Header } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';

export default class deleteClassModal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const section = this.props.section;
        return (
            <Modal trigger={<Button icon='trash outline' content='Delete' size='large' />} size='mini' closeIcon>
                <Header content={`Delete ${section.subject} - ${section.sectionName}?`}/>
                <Modal.Actions>
                    <Button negative>No</Button>
                    <Button positive>Yes</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}