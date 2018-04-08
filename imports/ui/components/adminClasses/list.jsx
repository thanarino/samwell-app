import React, { Component } from 'react';
import { List, Grid, Button, Input, Header, Icon, Label, Loader } from 'semantic-ui-react';
import AddClassButton from '../adminClasses/addClassButton.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import { Sections } from '../../../api/sections/sections';

class ClassList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            classes: [],
            search: []
        }
    }

    handleChange = (e, {value}) => {
        if (value === "") {
            this.setState({ search: this.state.classes });
        } else {
            console.log(this.state.classes);
            this.setState({ search: _.filter(this.state.search, (item) => { return item.subject.toLowerCase().indexOf(value.toLowerCase()) > -1 || item.sectionName.toLowerCase().indexOf(value.toLowerCase()) > -1 || item.classType.toLowerCase().indexOf(value.toLowerCase()) > -1 }) });
        }
    }

    componentWillReceiveProps(newProp) {
        if (newProp.sections.length != 0) {
            this.setState({ classes: newProp.sections, search: newProp.sections });
        }
    }

    sendToParent = (section) => {
        this.props.callback(section);
    }

    render() {
        return (
            <Grid columns={3} divided='vertically'>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <AddClassButton />
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Input fluid icon='search' placeholder='Search for Class' size='big' onChange={this.handleChange} loading={this.props.sections.length == 0}/>
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
                        <List animated selection verticalAlign='middle' className='scrollableList'>
                            { this.props.sections.length != 0 ?
                                this.state.search.map((section, index) =>
                                    <List.Item onClick={this.sendToParent.bind(this, section)} key={index}>
                                        {section.isDeleted ?
                                            <List.Content floated='right'>
                                                <Label color='teal' size='large'>
                                                    archived
                                            </Label>
                                            </List.Content>
                                            : null}
                                        <List.Content>
                                            <List.Header>{section.subject} - {section.sectionName}</List.Header>
                                            <List.Description>
                                                {section.semester.startYear} -  {section.semester.value === 'First' || section.semester.value === 'Second' ? section.semester.value + ' Semester' : section.semester.value} - {section.classType}
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                )
                                : <Loader active inline='centered' /> }
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