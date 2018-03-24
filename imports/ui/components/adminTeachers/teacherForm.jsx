import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Accordion, Button, Checkbox, Form, Label, Input, Divider, Header, Grid, Icon } from 'semantic-ui-react';

import ClassSearch from './classSearch';

const resultRenderer = ({ subject, sectionName }) => <Header size='tiny' content={`${subject} - ${sectionName}`} />

resultRenderer.propTypes = {
    subject: PropTypes.string,
    sectionName: PropTypes.string,
}

class TeacherForm extends Component {
    state = {
        username: '',
        password: '',
        lastName: '',
        firstName: '',
        middleName: '',
        email: '',
        department: '',
        position: '',
        office: '',
        classes: [],
        consultationHours: [
            { day: 'Sun', time: [], fullName: "Sunday" },
            { day: 'Mon', time: [], fullName: "Monday" },
            { day: 'Tue', time: [], fullName: "Tuesday" },
            { day: 'Wed', time: [], fullName: "Wednesday" },
            { day: 'Thu', time: [], fullName: "Thursday" },
            { day: 'Fri', time: [], fullName: "Friday" },
            { day: 'Sat', time: [], fullName: "Saturday" }
        ],
        available: false,
        activeIndex: 0,
    };

    componentDidMount() {
        if (this.props.teacher) {
            const { username, password, lastName, firstName, middleName, email, department, position, office, available, classes } = this.props.teacher;
            const consultationHours = this.consultationHoursBuilder(this.props.teacher.consultationHoursList);
            this.setState({
                username: username,
                password: password,
                lastName: lastName,
                firstName: firstName,
                middleName: middleName,
                email: email,
                department: department,
                position: position,
                office: office,
                available: available,
                classes: classes,
                consultationHours: consultationHours,
            })
        }
    }

    getData = () => { return this.state; }
    
    getClassData = () => { return this._searchForm.getData(); }

    clearForm = () => {
        this.setState({
            username: '',
            password: '',
            lastName: '',
            firstName: '',
            middleName: '',
            email: '',
            department: '',
            position: '',
            office: '',
            classes: [],
            consultationHours: [
                { day: 'Sun', time: [], fullName: "Sunday" },
                { day: 'Mon', time: [], fullName: "Monday" },
                { day: 'Tue', time: [], fullName: "Tuesday" },
                { day: 'Wed', time: [], fullName: "Wednesday" },
                { day: 'Thu', time: [], fullName: "Thursday" },
                { day: 'Fri', time: [], fullName: "Friday" },
                { day: 'Sat', time: [], fullName: "Saturday" }
            ],
            available: false
        })
    }

    handleClick = (index) => {
        let newDays = this.state;
        if (_.last(newDays.consultationHours[index].time) != { start: "", end: "" }) {
            newDays.consultationHours[index].time.push({ start: "", end: "" });
            this.setState(newDays);
        }
    };

    handleAccordionClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value });
    
    handleTimeChange = (e, { index, index2, type, value }) => {
        console.log('adsad');
        let newState = this.state;
        if (type == '0') {
            console.log('zero');
            newState.consultationHours[index].time[index2].start = value;
        } else {
            console.log('one');
            newState.consultationHours[index].time[index2].end = value;
        }
        //  ?  : ; 
        this.setState(newState);
    }

    deleteTime = (index, index2) => {
        console.log(`clicked i1: ${index}, i2: ${index2}`);
        let newState = this.state;
        newState = newState.consultationHours[index].time.splice(index2, 1);
        this.setState(newState);
    }

    consultationHoursBuilder = (consultationHoursList) => {
        let tempArray = [
            { day: 'Sun', time: [], fullName: "Sunday" },
            { day: 'Mon', time: [], fullName: "Monday" },
            { day: 'Tue', time: [], fullName: "Tuesday" },
            { day: 'Wed', time: [], fullName: "Wednesday" },
            { day: 'Thu', time: [], fullName: "Thursday" },
            { day: 'Fri', time: [], fullName: "Friday" },
            { day: 'Sat', time: [], fullName: "Saturday" }
        ];
        consultationHoursList.map((element) => {
            tempArray.map((element2) => {
                if (element.search(element2.name) === 0) {
                    element2.time = JSON.parse(JSON.stringify(element.time));
                }
            })
        })
        return tempArray;
    }

    render() {
        const { username, password, lastName, firstName, middleName, email, department, position, office, classes, consultationHours, available, activeIndex } = this.state;
        return (
            <Form>
                <Grid columns={2} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <Form.Group>
                                <Form.Input name='username' label='Username' placeholder='Username' value={this.state.username} width={8} onChange={this.handleChange} />
                                <Form.Input name='password' label='Password' placeholder='Password' value={this.state.password} width={8} onChange={this.handleChange} type='password'/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Input name='firstName' label='First Name' placeholder='First Name' value={this.state.firstName} width={5} onChange={this.handleChange} />
                                <Form.Input name='middleName' label='Middle Name' placeholder='Middle Name' value={this.state.middleName} width={5} onChange={this.handleChange} />
                                <Form.Input name='lastName' label='Last Name' placeholder='Last Name' value={this.state.lastName} width={5} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Input name='email' label='Email' placeholder='Email' value={this.state.email} width={16} onChange={this.handleChange} />
                            <Form.Group widths='equal' inline>
                                <Form.Input label='Department' fluid placeholder='Department' name='department' value={this.state.department} onChange={this.handleChange} />
                                <Form.Input label='Office' fluid placeholder='Office' name='office' value={this.state.office} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Input name='position' label='Position' placeholder='Position' value={this.state.position} width={16} onChange={this.handleChange} />
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Field>
                                <label>Classes</label>
                                <ClassSearch onRef={ref => this._searchForm = ref} />
                            </Form.Field>
                            <Divider />
                            <Header as='h5'>Consultation Hours</Header>
                            <Button.Group widths='7'>
                                {this.state.consultationHours.map((day, index) =>
                                    <Button onClick={() => this.handleClick(index)} key={day.day} color={day.time.length != 0 ? 'teal' : 'grey'}>{day.day}</Button>
                                )}
                            </Button.Group>
                            <Accordion styled exclusive={false}>
                                {this.state.consultationHours.map((day, index) =>
                                    day.time.length != 0 ?
                                        <div key={`outer${index}`}>
                                            <Accordion.Title active={activeIndex === index} index={index} onClick={this.handleAccordionClick}>
                                                <Icon name='dropdown' />
                                                {day.fullName}
                                            </Accordion.Title>
                                            <Accordion.Content active={activeIndex === index}>
                                                {day.time.map((time, index2) =>
                                                    <div key={`inner${index2}`}>
                                                        <Form.Group key={`innerdiv${index2}`}>
                                                            <Form.Input
                                                                label='Start Time'
                                                                fluid placeholder='1'
                                                                name='start'
                                                                value={time.start}
                                                                onChange={this.handleTimeChange}
                                                                width='6'
                                                                key={`start${index2}`}
                                                                index={index}
                                                                index2={index2}
                                                                type='0'
                                                            />
                                                            <Form.Input
                                                                label='End Time'
                                                                fluid
                                                                placeholder='2'
                                                                name='end'
                                                                value={time.end}
                                                                onChange={this.handleTimeChange}
                                                                width='6'
                                                                key={`end${index2}`}
                                                                index={index}
                                                                index2={index2}
                                                                type='1'
                                                            />
                                                            <Form.Button
                                                                negative
                                                                icon
                                                                labelPosition='left'
                                                                size='large'
                                                                onClick={() => this.deleteTime(index, index2)}
                                                                key={`delBut${index2}`}
                                                            >
                                                                <Icon name='x' width='4' key={`delIcon${index2}`}/> Delete
                                                            </Form.Button>
                                                        </Form.Group>
                                                    </div>
                                                )}
                                            </Accordion.Content>
                                        </div> : <div key={`outer${index}`}/>
                                )}
                            </Accordion>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>
        )
    }
}

export default TeacherForm;