import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, Form, Label, Input, Divider } from 'semantic-ui-react';

import ClassTypeForm from '../adminClasses/classTypeForm';
import SemesterForm from '../adminClasses/semesterForm';

export default class AddClassForm extends Component {
    state = {
        subject: '', section: '', classType: '', semester: '', start: '', end: '', description: '', days: [
            { name: "Sun", active: false },
            { name: "Mon", active: false },
            { name: "Tue", active: false },
            { name: "Wed", active: false },
            { name: "Thu", active: false },
            { name: "Fri", active: false },
            { name: "Sat", active: false }
        ]
    };

    getData = () => {
        return this.state;
    }

    clearForm = () => {
        this.setState({
            subject: '', section: '', classType: '', semester: '', start: '', end: '', description: '', days: [
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
        console.log(index);
        newDays.days[index].active = !newDays.days[index].active;
        this.setState(newDays);
     };

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    render() {
        const { subject, section, classType, semester, start, end, value, days, description } = this.state;
        return (
            <Form>
                <Form.Group>
                    <Form.Input name='subject' label='Subject' placeholder='Subject' value={subject} width={8} onChange={this.handleChange}/>
                    <Form.Input name='section' label='Section' placeholder='Section' value={section} width={8} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Input name='description' label='Course Title' placeholder='Course Title' value={description} width={16} onChange={this.handleChange} />
                <ClassTypeForm ref={(ref) => this._classTypeForm = ref}/>
                <SemesterForm ref={(ref) => this._semesterForm = ref} />
                <Divider />
                <Button.Group widths='7'>
                    {days.map((day, index) => 
                        <Button onClick={()=>this.handleClick(index)} key={day.name} color={ day.active ? 'teal' : 'grey'}>{day.name}</Button>
                    )}
                </Button.Group>
                <Form.Group widths='equal' inline>
                    <Form.Input label='Start Time' fluid placeholder='Start Time' name='start' value={start} onChange={this.handleChange}/>
                    <Form.Input label='End Time' fluid placeholder='End Time' name='end' value={end} onChange={this.handleChange}/>
                </Form.Group>    
            </Form>
        )
    }
}