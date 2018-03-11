import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

export default class SemesterForm extends Component {
    state = {};

    handleChange = (e, { value }) => this.setState({ value });
    getData = () => { return this.state };
    clearForm = () => { this.setState({}) };

    render() {
        const { value } = this.state;
        return (
            <Form.Group inline>
                <label>Semester</label>
                <Form.Radio label='First' value='First' checked={value === 'First'} onChange={this.handleChange} />
                <Form.Radio label='Second' value='Second' checked={value === 'Second'} onChange={this.handleChange} />
                <Form.Radio label='Midyear' value='Midyear' checked={value === 'Midyear'} onChange={this.handleChange} />
                <Form.Radio label='Summer' value='Summer' checked={value === 'Summer'} onChange={this.handleChange} />
            </Form.Group>
        );
    }
}