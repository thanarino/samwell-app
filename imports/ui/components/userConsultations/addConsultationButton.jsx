import React, { Component } from 'react';
import { Button, Modal, Icon } from 'semantic-ui-react';
import ConsultationForm from './consultationForm.jsx';
import PropTypes from 'prop-types';

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
        )

        Meteor.call('consultation.add', Meteor.userId(), newData);

        this._addConsultationForm.clearForm();
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

                <Modal size='small' open={open} onClose={this.close}>
                    <Modal.Header>
                        Schedule new consultation
                    </Modal.Header>
                    <Modal.Content>
                        <ConsultationForm ref={(ref) => this._addConsultationForm = ref} teacher={this.props.teacher} />
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