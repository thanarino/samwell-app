import React, { Component } from 'react';
import { Button, Modal, Icon, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import ConsultationForm from './consultationForm.jsx';

import { Consultations } from '../../../api/consultations/consultations';
import MoreInfoTable from './moreInfoTable.jsx';

class MoreInfoButton extends Component {
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
        const { consultations } = this.props;
        return (
            <div>
                <Button onClick={this.show} icon floated='right'>
                    Expand&nbsp;&nbsp;
                    {consultations.length > 0 ? <Label circular color='red' size='mini'>{consultations.length}</Label> : null}    
                </Button>

                <Modal size='large' open={open} onClose={this.close} closeIcon>
                    <Modal.Header>
                        Consultations
                    </Modal.Header>
                    <Modal.Content scrolling>
                        <MoreInfoTable teacher={this.props.teacher} />
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}

MoreInfoButton.protoTypes = {
    callback: PropTypes.func,
}

export default withTracker((props) => {
    Meteor.subscribe('consultations');

    return {
        consultations: Consultations.find({ teacherID: props.teacher._id, isApprovedByTeacher: false }, { sort: { createdAt: -1 } }).fetch(),
    }
})(MoreInfoButton);