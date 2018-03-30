import React, { Component } from 'react';
import { Button, Modal, Input } from 'semantic-ui-react';
import ClassForm from '../adminClasses/classForm';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Sections } from '../../../api/sections/sections';
import moment from 'moment';

export default class AddClassButton extends Component {
    state = { open: false };
    show = () => this.setState({ open: true });
    close = () => this.setState({ open: false });
    submit = () => {
        let data = Object.assign(
            {},
            this._addClassForm.getData(),
            {
                classType : this._addClassForm.getClassTypeData().value,
                semester : this._addClassForm.getSemesterData()
            }
        )

        const dayPicker = (index) => {
            switch (index) {
                case 0:
                    return 'Sunday';
                case 1:
                    return 'Monday';
                case 2:
                    return 'Tuesday';
                case 3:
                    return 'Wednesday';
                case 4:
                    return 'Thursday';
                case 5:
                    return 'Friday';
                case 6:
                    return 'Saturday';
            }
        }

        let days = [];
        data.days.map((day, index) => {
            day.active ? days.push(dayPicker(index)) : null
        })

        data.semester.startYear = moment(data.semester.start).year();
        data.semester.endYear = moment(data.semester.end).year();
        data.semester.start = moment(data.semester.start).dayOfYear();
        data.semester.end = moment(data.semester.end).dayOfYear();

        data.end = `${moment(data.end).hour()}:${moment(data.end).minute()}`
        data.start = `${moment(data.start).hour()}:${moment(data.start).minute()}`

        // const toSend = {
        //     sectionID: '1',
        //     createdAt: new Date(),
            
        //     isDeleted: false,
        // };

        console.log(data);

        Meteor.call('sections.insert', Meteor.userId(), data.section, [], [], data.subject, data.semester, data.classType, data.start, data.end, days, data.description, data.room,  (error) => {
            console.log(error);
        });

        this._addClassForm.clearForm();
        this.close();

    }

    render() {
        const { open } = this.state;

        return (
            <div>
                <Button onClick={this.show} color='teal'>Add A New Class</Button>

                <Modal size='tiny' open={open} onClose={this.close}>
                    <Modal.Header>
                        Add new Class
                    </Modal.Header>
                    <Modal.Content scrolling>
                        <ClassForm ref={(ref) => this._addClassForm = ref} section={null} />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.close}>Cancel</Button>
                        <Button positive onClick={this.submit}>Submit</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}