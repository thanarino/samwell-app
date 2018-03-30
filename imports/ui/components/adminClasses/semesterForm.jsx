import React, { Component } from 'react';
import { Form , Divider, Header } from 'semantic-ui-react';

import DatePicker from 'react-datepicker';
import '../../../../node_modules/react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

export default class SemesterForm extends Component {
    state = { start: moment(), end: moment() };

    //ADAPT THIS TO NEW SEMESTER FORMAT

    componentDidMount() {
        if (this.props.semester) {
            this.setState({
                value: this.props.semester.value,
                endYear: this.props.semester.endYear,
                startYear: this.props.semester.startYear,
                start: moment().dayOfYear(this.props.semester.start),
                end: moment().dayOfYear(this.props.semester.end),
            });
        }
    }

    handleStartChange = (date) => this.setState({ start: date });
    handleEndChange = (date) => this.setState({ end: date });
    handleStartChangeRaw = (value) => {
        let converted = moment(value, 'MM/DD/YYYY');
        this.handleStartChange(converted);
    }

    handleEndChangeRaw = (value) => {
        let converted = moment(value, 'MM/DD/YYYY');
        this.handleEndChange(converted);
    } 
    handleChange = (e, { value }) => this.setState({ value });
    getData = () => { return this.state };
    clearForm = () => { this.setState({}) };

    render() {
        const { value } = this.state;
        return (
            <div>
                <Divider />
                <Header as='h3'>Semester Information</Header>
                <Form.Group inline>
                    <label>Type</label>
                    <Form.Radio label='First' value='First' checked={value === 'First'} onChange={this.handleChange} />
                    <Form.Radio label='Second' value='Second' checked={value === 'Second'} onChange={this.handleChange} />
                    <Form.Radio label='Midyear' value='Midyear' checked={value === 'Midyear'} onChange={this.handleChange} />
                    <Form.Radio label='Summer' value='Summer' checked={value === 'Summer'} onChange={this.handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Field width={8}>
                        <label>Start Date</label>
                        <DatePicker
                            selected={this.state.start}
                            onChange={this.handleStartChange}
                            name="start"
                            onChangeRaw={(event) => {
                                this.handleStartChangeRaw(event.target.value);
                            }}
                        />
                    </Form.Field>
                    <Form.Field width={8}>
                        <label>End Date</label>
                        <DatePicker
                            selected={this.state.end}
                            onChange={this.handleEndChange}
                            name='end'
                            onChangeRaw={(event) => {
                                this.handleEndChangeRaw(event.target.value);
                            }}
                        />
                    </Form.Field>
                </Form.Group>
                <Divider />
            </div>    
        );
    }
}