import React, { Component } from 'react';
import { List, Grid, Button, Input, Header, Icon } from 'semantic-ui-react';
import AddClassButton from '../adminClasses/addClassButton.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import { Sections } from '../../../api/sections/sections';

class ClassList extends Component {
    constructor(props) {
        super(props);
    }

    sendToParent = (section) => {
        this.props.callback(section);
    }

    render() {
        return (
            <Grid columns={3} divided='vertically'>
                <Grid.Row>
                    <Grid.Column width={4}>
                        {/* <Button color='teal'>Add New Class</Button> */}
                        <AddClassButton />
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Input fluid icon='search' placeholder='Search for Class' size='big' />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16} size='big'>
                        <Header as='h2'>
                            <Icon name='university' />
                            <Header.Content>
                                Classes
                            </Header.Content>
                        </Header>    
                        <List animated selection verticalAlign='middle'>
                            {this.props.sections.map((section, index) => 
                                <List.Item onClick={this.sendToParent.bind(this, section)} key={index}>
                                    <List.Content>
                                        <List.Header>{section.subject} - {section.sectionName}</List.Header>
                                        <List.Description>{section.year} - {section.semester === 'First' || section.semester === 'Second' ? section.semester + ' Semester' : section.semester} - {section.classType}</List.Description>
                                    </List.Content>
                                </List.Item>
                            )}
                        </List>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

ClassList.protoTypes = {
    callback: PropTypes.func,
}

export default withTracker(() => {
    Meteor.subscribe('sections');

    return {
        sections: Sections.find({}, { sort: { createdAt: -1 } }).fetch()
    }
})(ClassList);