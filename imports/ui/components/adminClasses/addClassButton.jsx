import React, { Component } from 'react';
import { Button, Modal, Input } from 'semantic-ui-react';
import AddClassForm from '../adminClasses/addClassForm';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Sections } from '../../../api/sections/sections';

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
                semester : this._addClassForm.getSemesterData().value
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

        // const toSend = {
        //     sectionID: '1',
        //     createdAt: new Date(),
            
        //     isDeleted: false,
        // };
        console.log(Meteor.userId());

        Meteor.call('sections.insert', Meteor.userId(), data.section, [], [], data.subject, new Date().getFullYear(), data.semester, data.classType, data.start, data.end, days, data.description,  (error) => {
            console.log('error');
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
                        <AddClassForm ref={(ref) => this._addClassForm = ref} />
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