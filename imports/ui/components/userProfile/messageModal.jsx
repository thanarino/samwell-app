import React, { Component } from 'react';
import { Button, Modal, Header, Icon, TextArea, Form } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';

export default class MessageModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            value: undefined,
        };
    }

    show = () => this.setState({ open: true });
    close = () => this.setState({ open: false });
    submit = () => {
        console.log(this.state.value);
    }

    handleChange = (e, { value }) => this.setState({ value });

    render() {
        const section = this.props.section;
        const { open } = this.state;
        return (
            <Modal trigger={<Button icon labelPosition='left' onClick={this.show}>
                <Icon name='send outline' />Message</Button>} size='tiny' closeIcon open={open} onClose={this.close}>
                <Header content={`Send a message to all students from ${section.subject}-${section.sectionName}`} />
                <Modal.Content>
                    <Form>
                        <TextArea placeholder='Send reminders, and/or announcements' style={{ minHeight: 100 }} autoheight onChange={this.handleChange} />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button icon labelPosition='left' positive onClick={this.submit}>
                        <Icon name='send outline' />Send</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}