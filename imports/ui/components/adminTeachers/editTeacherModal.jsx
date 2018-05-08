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
                classes: this.getClassIDs(this._addTeacherForm.getClassData()),
            }
        )

        const { activeIndex, ...newData } = data;

        console.log(newData);
        console.log(this.props.teacher._id);

        Meteor.call('teacher.update', this.props.teacher._id, newData);

        this._addTeacherForm.clearForm();
        this.close();
        window.location.reload();
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
        const teacher = this.props.teacher;

        return (
            <div>
                {/* <Button icon='write' content='Update' size='large' onClick={this.show}>Edit</Button> */}

                <Modal size='large' open={open} onClose={this.close} trigger={<Button icon='write' content='Update' size='large' onClick={this.show} />}>
                    <Modal.Header>
                        {`Edit ${teacher.family_name}, ${teacher.given_name}`} 
                    </Modal.Header>
                    <Modal.Content scrolling>
                        <TeacherForm ref={(ref) => this._addTeacherForm = ref} teacher={teacher}/>
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