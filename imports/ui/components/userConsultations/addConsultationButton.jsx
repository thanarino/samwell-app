import React, { Component } from 'react';
import { Button, Modal, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

import ConsultationForm from './consultationForm.jsx';

import { Consultations } from '../../../api/consultations/consultations';

export default class AddConsultationButton extends Component {
    static propTypes = {
        teacher: PropTypes.object,
    }
    constructor(props) {
        super(props);

        this.state = {
            teacher: props.teacher,
            open: false,
        }
    }

    show = () => this.setState({ open: true });
    close = () => this.setState({ open: false });
    submit = () => {
        let data = Object.assign(
            {},
            this._addConsultationForm.getData(),
            {
                teacherID: Meteor.userId()
            }
        )

        console.log(data);
        console.log(Meteor.userId());

        Meteor.call('consultations.insert', Meteor.userId(), data, false, true);

        this.close();
    }

    render() {
        const { open } = this.state;
        return (
            <div>
                <Button onClick={this.show} icon labelPosition='right' floated='right'>
                    <Icon name='plus' />
                    Schedule new
                </Button>

                <Modal size='mini' open={open} onClose={this.close}>
                    <Modal.Header>
                        Schedule new consultation
                    </Modal.Header>
                    <Modal.Content>
                        <ConsultationForm onRef={(ref) => this._addConsultationForm = ref} teacher={this.props.teacher} />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.close}>Close</Button>
                        <Button positive onClick={this.submit}>Submit</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}