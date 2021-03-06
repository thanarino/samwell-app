import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import TeacherForm from './teacherForm';

export default class AddTeacherButton extends Component {
    state = { open: false };
    show = () => this.setState({ open: true });
    close = () => this.setState({ open: false });
    submit = () => {
        let data = Object.assign(
            {},
            this._addTeacherForm.getData(),
            {
                classes: this.getClassIDs(this._addTeacherForm.getClassData())
            }
        )

        const { activeIndex, ...newData } = data;

        console.log(newData);
        
        Meteor.call('teacher.add', Meteor.userId(), newData);

        this._addTeacherForm.clearForm();
        this.close();
    }

    getClassIDs = (sections) => {
        let newSections = [];
        sections.map((section, index) => {
            newSections.push(section._id);
        })
        return newSections;
    }

    render() {
        const { open } = this.state;

        return (
            <div>
                <Button onClick={this.show} color='teal'>Add A New Teacher</Button>

                <Modal size='large' open={open} onClose={this.close}>
                    <Modal.Header>
                        Add new Teacher
                    </Modal.Header>
                    <Modal.Content scrolling>
                        <TeacherForm ref={(ref) => this._addTeacherForm = ref}/>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.close}>Close</Button>
                        <Button positive onClick={this.submit}>Yes</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}