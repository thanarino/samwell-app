import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

export default class ClassTypeForm extends Component {
    state = {};

    componentDidMount() {
        if (this.props.option) {
            this.setState({ value: this.props.option });
        }
    }

    handleChange = (e, { value }) => this.setState({ value });
    getData = () => { return this.state };
    clearForm = () => { this.setState({}) };

    render() {
        const { value } = this.state;
        return (
            <Form.Group inline>
                <label>Class Type</label>
                <Form.Radio label='Lecture' value='Lecture' checked={value === 'Lecture'} onChange={this.handleChange} />
                <Form.Radio label='Laboratory' value='Laboratory' checked={value === 'Laboratory'} onChange={this.handleChange} />
                <Form.Radio label='Recitation' value='Recitation' checked={value === 'Recitation'} onChange={this.handleChange} />
                <Form.Radio label='Other' value='Other' checked={value === 'Other'} onChange={this.handleChange} />
            </Form.Group>
        );
    }
}