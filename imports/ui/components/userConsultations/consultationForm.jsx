import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Accordion, Button, Checkbox, Form, Label, Input, Divider, Header, Grid, Icon } from 'semantic-ui-react';
import moment from 'moment';
import _ from 'lodash';
import { withTracker } from 'meteor/react-meteor-data';
import DatePicker from 'react-datepicker';
import '../../../../node_modules/react-datepicker/dist/react-datepicker.css';

import { Sections } from '../../../api/sections/sections';

class ConsultationForm extends Component {
    static propTypes = {
        teacher: PropTypes.object,
    }

    constructor(props) {
        super(props);

        this.state = {
            teacher: props.teacher,
            classes: [],
            options: [],
        }
    }
    
    optionBuilder(classes) {
        console.log('went here');
        return classes.map((section, index) => {
            return {
                key: index,
                text: `${section.subject} - ${section.sectionName}`,
                value: `${section.subject} - ${section.sectionName}`,
            }
        })
    }

    convertToClasses(classIDs, sections) {
        let classes = [];
        classIDs.map((classID, index) => {
            classes.push(_.filter(sections, { '_id': classID })[0]);
        });
        console.log(classes);
        return classes;
    }

    render() {
        const { sections } = this.props;
        return (
            <div>
                <Form>
                    <Form.Select fluid label='Class' options={this.optionBuilder(this.convertToClasses(this.state.teacher.classes, sections))} placeholder='Class' />
                </Form>
            </div>
        )
    }
}

ConsultationForm.protoTypes = {
    callback: PropTypes.func,
}

export default withTracker(() => {
    Meteor.subscribe('sections');

    return {
        sections: Sections.find({ isDeleted: false }, { sort: { createdAt: -1 } }).fetch()
    }
})(ConsultationForm);