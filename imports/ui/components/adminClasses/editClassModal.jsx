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

    render() {
        const { open } = this.state;
        const section = this.props.section;

        return (
            <div>
                {/* < Button icon='write' content='Update' size='large' /> */}
                
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