import React, { Component } from 'react';
import { Button, Modal, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

import ConsultationForm from './consultationForm.jsx';

import { Consultations } from '../../../api/consultations/consultations';
import MoreInfoTable from './moreInfoTable.jsx';

export default class MoreInfoButton extends Component {
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

    render() {
        const { open } = this.state;
        return (
            <div>
                <Button onClick={this.show} icon labelPosition='right' floated='right'>
                    <Icon name='expand' />
                    Expand
                </Button>

                <Modal size='mini' open={open} onClose={this.close} closeIcon>
                    <Modal.Header>
                        Consultations
                    </Modal.Header>
                    <Modal.Content>
                        <MoreInfoTable teacher={this.props.teacher} />
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}