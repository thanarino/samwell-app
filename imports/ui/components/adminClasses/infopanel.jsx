import React, { Component } from 'react';
import { Header, Sticky, Label } from 'semantic-ui-react';

NoneSelected = (props) => {
    return <Sticky>
        < Header as='h1' >Select a section in the list on the left.</Header >
    </Sticky>;
} 

SectionSelected = (props) => {
    const section = props.section;
    return <Sticky>
        <Header as='h1'>{section.subject} - {section.sectionName}</Header>
        <Label>{section.description}</Label>
    </Sticky>;
}

PanelBuilder = (props) => {
    const section = props.section;
    if (section) {
        return <SectionSelected section={section}/>
    } else {
        return <NoneSelected/>
    }
} 

export default class InfoPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const section = this.props.section;
        console.log(section);
        return (
            <PanelBuilder section={section}/>
        )
    }
}
