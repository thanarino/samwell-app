import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, Form, Label, Input, Divider, Header } from 'semantic-ui-react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import '../../../../node_modules/react-datepicker/dist/react-datepicker.css';

import ClassTypeForm from '../adminClasses/classTypeForm';
import SemesterForm from '../adminClasses/semesterForm';

export default class ClassForm extends Component {
    state = {
        subject: '', section: '', classType: '', semester: {
            semesterType: '',
            start: moment().startOf('day'),
            end: moment().startOf('day'),
        }, start: moment().startOf('day'), end: moment().startOf('day'), description: '', room: '' ,days: [
            { name: "Sun", active: false },
            { name: "Mon", active: false },
            { name: "Tue", active: false },
            { name: "Wed", active: false },
            { name: "Thu", active: false },
            { name: "Fri", active: false },
            { name: "Sat", active: false }
        ]
    };

    componentDidMount() {
        if (this.props.section) {
            const { subject, sectionName, classType, semester, startTime, endTime, description, room } = this.props.section;
            const days = this.daysArrayBuilder(this.props.section.daysList);
            this.setState({
                subject: subject,
                section: sectionName,
                classType: classType,
                semester: semester,
                start: moment(startTime, 'hh:mm'),
                end: moment(endTime, 'hh:mm'),
                description: description,
                room: room,
                days: days,
            });
        }
    }

    getData = () => {
        return this.state;
    }

    clearForm = () => {
        this.setState({
            subject: '', section: '', classType: '', semester: {
                semesterType: '',
                start: moment().startOf('day'),
                end: moment().startOf('day'),
            }, start: moment().startOf('day'), end: moment().startOf('day'), description: '', room:'', days: [
                { name: "Sun", active: false },
                { name: "Mon", active: false },
                { name: "Tue", active: false },
                { name: "Wed", active: false },
                { name: "Thu", active: false },
                { name: "Fri", active: false },
                { name: "Sat", active: false }
            ]
        });
        this._classTypeForm.clearForm();
        this._semesterForm.clearForm();
    }

    getClassTypeData = () => {
        return this._classTypeForm.getData();
    }

    getSemesterData = () => {
        return this._semesterForm.getData();
    }

    handleClick = (index) => { 
        let newDays = this.state;
        newDays.days[index].active = !newDays.days[index].active;
        this.setState(newDays);
    };
    
    handleStartChange = (date) => this.setState({ start: date });
    handleEndChange = (date) => this.setState({ end: date });

    handleStartChangeRaw = (value) => {
        let converted = moment(value, 'hh:mma');
        this.handleStartChange(converted);
    }
    
    handleEndChangeRaw = (value) => {
        let converted = moment(value, 'hh:mma');
        this.handleEndChange(converted);
    } 

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    daysArrayBuilder = (daysList) => {
        let tempArray = [
            { name: "Sun", active: false },
            { name: "Mon", active: false },
            { name: "Tue", active: false },
            { name: "Wed", active: false },
            { name: "Thu", active: false },
            { name: "Fri", active: false },
            { name: "Sat", active: false }
        ];
        daysList.map((element) => {
            tempArray.map((element2) => {
                if (element.search(element2.name) === 0) {
                    element2.active = true;
                }
            })
        })
        return tempArray;
    }

    RadioRender = () => {
        if (this.props.section) {
            return <div>
                <ClassTypeForm ref={(ref) => this._classTypeForm = ref} option={this.props.section.classType}/>
                <SemesterForm ref={(ref) => this._semesterForm = ref} semester={this.props.section.semester}/>
            </div>
        } else {
            return <div>
                <ClassTypeForm ref={(ref) => this._classTypeForm = ref} option={null} />
                <SemesterForm ref={(ref) => this._semesterForm = ref} semester={null} />
            </div>
        }
    }

    render() {
        const { subject, section, classType, semester, start, end, value, days, description, room } = this.state;

        return (
            <Form>
                <Form.Group>
                    <Form.Input name='subject' label='Subject' placeholder='Subject' value={this.state.subject} width={8} onChange={this.handleChange}/>
                    <Form.Input name='section' label='Section' placeholder='Section' value={this.state.section} width={8} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Input name='description' label='Course Title' placeholder='Course Title' value={this.state.description} width={10} onChange={this.handleChange} />
                    <Form.Field>
                        <label>Room</label>
                        <Input name='room' placeholder='Room' value={this.state.room} width={6} onChange={this.handleChange} />
                    </Form.Field>
                </Form.Group>
                <this.RadioRender/>
                <Header as='h3'>Schedule</Header>
                <Button.Group widths='7'>
                    {days.map((day, index) => 
                        <Button onClick={()=>this.handleClick(index)} key={day.name} color={ day.active ? 'teal' : 'grey'}>{day.name}</Button>
                    )}
                </Button.Group>
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
        )
    }
}