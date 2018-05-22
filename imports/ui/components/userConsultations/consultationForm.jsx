import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Accordion, Button, Checkbox, Form, Label, Input, Divider, Header, Grid, Icon } from 'semantic-ui-react';
import moment from 'moment';
import _ from 'lodash';
import { withTracker } from 'meteor/react-meteor-data';
import DatePicker from 'react-datepicker';
import '../../../../node_modules/react-datepicker/dist/react-datepicker.css';

import { Sections } from '../../../api/sections/sections';
import { Consultations } from '../../../api/consultations/consultations';

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
            start: moment(),
            startDate: moment(),
            end: moment(),
            classSelected: '',
            studentSelected: ''
        }
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    getData = () => {
        let tosend =  {
            startTime: `${moment(this.state.start).hour()}:${moment(this.state.start).minute()}`,
            endTime: `${moment(this.state.end).hour()}:${moment(this.state.end).minute()}`,
            year: moment(this.state.startDate).year(),
            sectionID: this.state.classSelected,
            studentID: this.state.studentSelected,
            date: moment(this.state.startDate).dayOfYear(),
            startDate: moment(this.state.startDate).toDate()
        }

        console.log(tosend);
        return tosend;
    }

    optionBuilder(classes) {
        console.log('went here');
        return classes.map((section, index) => {
            return {
                key: index,
                text: `${section.subject} - ${section.sectionName}`,
                value: `${section._id}`,
            }
        })
    }

    studentOptionBuilder(students) {
        return students.map((student, index) => {
            console.log(student);
            return {
                key: index,
                text: `${student.family_name}, ${student.given_name}`,
                value: `${student._id}`,
                // image: { avatar: true, src: `https://graph.facebook.com/v2.12/${student._id}/picture?redirect=false&access_token=${process.env.FB_ACCESS_TOKEN}` }
            }
        })
    }
    
    convertToObjects(ids, src) {
        let output = [];
        console.log(src);
        ids.map((id, index) => {
            output.push(_.filter(src, { '_id': id })[0]);
        });
        console.log(output);
        return output;
    }

    handleStartChange = (date) => this.setState({ start: date });
    handleStartDateChange = (date) => this.setState({ startDate: date });
    handleEndChange = (date) => this.setState({ end: date });

    handleStartChangeRaw = (value) => {
        let converted = moment(value, 'hh:mma');
        this.handleStartChange(converted);
    }

    handleStartDateChangeRaw = (value) => {
        let converted = moment(value, 'MM/DD/YYYY');
        this.handleStartDateChange(converted);
    }

    handleEndChangeRaw = (value) => {
        let converted = moment(value, 'hh:mma');
        this.handleEndChange(converted);
    } 

    handleChange = (event, { value }) => {
        this.setState({ classSelected: value });
    }

    handleStudentChange = (event, { value }) => {
        this.setState({ studentSelected: value });
    }

    getStudents = (classid, sections) => {
        return _.filter(sections, { '_id': classid })[0].studentList;
    }

    render() {
        const { sections, students } = this.props;
        return (
            <div>
                <Form>
                    <Form.Select fluid label='Class' search scrolling options={this.optionBuilder(this.convertToObjects(this.state.teacher.classes, sections))} placeholder='Class' value={this.state.classSelected} onChange={this.handleChange}/>
                    {this.state.classSelected != "" ? <Form.Select fluid label='Student' placeholder='Student' search scrolling options={this.studentOptionBuilder(this.convertToObjects(this.getStudents(this.state.classSelected, sections), students))} onChange={this.handleStudentChange}/> : null }
                    <Form.Field width={16}>
                        <label>Date</label>
                        <DatePicker
                            fluid    
                            selected={this.state.startDate}
                            onChange={this.handleStartDateChange}
                            name="start"
                            onChangeRaw={(event) => {
                                this.handleStartDateChangeRaw(event.target.value);
                            }}
                        />
                    </Form.Field>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Start Time</label>
                            <DatePicker
                                selected={this.state.start}
                                onChange={this.handleStartChange}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                dateFormat="LT"
                                name="start"
                                onChangeRaw={(event) => {
                                    this.handleStartChangeRaw(event.target.value);
                                }}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>End Time</label>
                            <DatePicker
                                selected={this.state.end}
                                onChange={this.handleEndChange}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                dateFormat="LT"
                                name='end'
                                onChangeRaw={(event) => {
                                    this.handleEndChangeRaw(event.target.value);
                                }}
                            />
                        </Form.Field>
                    </Form.Group>
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
    Meteor.subscribe('studentsAll');

    return {
        sections: Sections.find({ isDeleted: false }, { sort: { createdAt: -1 } }).fetch(),
        students: Meteor.users.find({ roles: 'student' }, { sort: { createdAt: -1 } }).fetch()
    }
})(ConsultationForm);