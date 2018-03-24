import _ from 'lodash';
import React, { Component } from 'react';
import { Search, Grid, Header, Label, Icon, Divider } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import { Sections } from '../../../api/sections/sections';

class ClassSearch extends Component {
    state = { classes: [] };

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    componentWillMount() {
        this.resetComponent();
    }

    getData = () => {
        return this.state.classes;
    }

    removeLabel = (result) => {
        let tempArray = this.state.classes;
        _.remove(tempArray, { _id: result._id });
        this.setState({ classes: tempArray });
    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

    handleResultSelect = (e, { result }) => {
        let tempArray = this.state.classes;
        if (!(_.includes(tempArray, result))) {
            tempArray.push(result);
        }

        this.setState({ classes: tempArray });
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent()

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = result => re.test(result.subject)

            this.setState({
                isLoading: false,
                results: _.filter(this.props.sections, isMatch),
            })
        }, 300)
    }

    render() {
        const { isLoading, value, results } = this.state;

        return (
            <div>
                <Search
                    input={{ fluid: true }}
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                    results={results}
                    value={value}
                    fluid
                    resultRenderer={(section) => <Header size='tiny' content={`${section.subject} - ${section.sectionName}`} />}
                />
                <div>
                    {this.state.classes.length != 0 && <Label basic>Click on a subject to remove it.</Label>}
                    {this.state.classes.map((classObject, index) => 
                        <Label as='a' key={index} onClick={()=>this.removeLabel(classObject)}>
                            {`${classObject.subject} - ${classObject.sectionName}`}
                        </Label>
                    )}
                </div>
            </div>
        )
    }
}

ClassSearch.protoTypes = {
    callback: PropTypes.func,
}

export default withTracker(() => {
    Meteor.subscribe('sections');

    return {
        sections: Sections.find({}, { sort: { createdAt: -1 } }).fetch()
    }
})(ClassSearch);