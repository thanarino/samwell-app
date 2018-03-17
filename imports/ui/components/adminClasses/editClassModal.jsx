import React, { Component } from 'react';
import { Button, Modal, Input } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';

import { Sections } from '../../../api/sections/sections';
import ClassForm from '../adminClasses/classForm';

export default class EditClassModal extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
    }

    show = () => this.setState({ open: true });
    close = () => this.setState({ open: false });
    submit = () => {
        let data = Object.assign(
            {},
            this._addClassForm.getData(),
            {
                _id: this.props.section._id,
                classType: this._addClassForm.getClassTypeData().value,
                semester: this._addClassForm.getSemesterData().value
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

        Meteor.call('sections.update', data._id, data.section, [], [], data.subject, data.semester, data.classType, data.start, data.end, days, data.description, data.room, (error) => {
            console.log(error);
        });

        this.close();
    }

    render() {
        const { open } = this.state;
        const section = this.props.section;

        return (
            <div>              
                <Modal size='tiny' open={open} trigger={<Button icon='write' content='Update' size='large' onClick={this.show} />} onClose={this.close} >
                    <Modal.Header>
                        {`Edit ${section.subject} - ${section.sectionName}`} 
                    </Modal.Header>
                    <Modal.Content scrolling>
                        <ClassForm ref={(ref) => this._addClassForm = ref} section={section}/>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.close}>Cancel</Button>
                        <Button positive onClick={this.submit}>Update</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}