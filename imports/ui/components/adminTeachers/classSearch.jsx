import _ from 'lodash';
import React, { Component } from 'react';
import { Search, Grid, Header, Label, Icon, Divider, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import { Sections } from '../../../api/sections/sections';

class ClassSearch extends Component {
    state = { classes: [] };

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillReceiveProps(newProp) {
        if (this.props.classes && newProp.sections.length != 0) {
            console.log('props.classes', this.props.classes);
            this.setState({ classes: this.convertToClasses(this.props.classes, newProp.sections) });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('state.classes 2: ', this.state.classes);
        console.log('nextprops.classes: ', nextProps.classes);
        if (_.isEqual(this.state.classes, nextProps.classes)) {
            console.log('went herer');
            return false
        }
        return true
    }

    convertToClasses(classIDs, sections) {
        let classes = [];
        classIDs.map((classID, index) => {
            classes.push(_.filter(sections, { '_id': classID })[0]);
        });
        return classes;
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
                { this.state.classes.length != 0 ?
                    <div>
                        {this.state.classes.length != 0 && <Label basic>Click on a subject to remove it.</Label>}
                        {this.state.classes.map((classObject, index) => {
                            console.log('class State: ',this.state.classes);
                            console.log('classObject: ',classObject);
                            // if (typeof classObject == "string") {
                            //     console.log("went here")
                            //     console.log(classObject);
                            //     let section = _.filter(this.props.sections, { '_id': classObject });
                            //     return <Label as='a' key={index} onClick={() => this.removeLabel(section)}>
                            //         {`${section.subject} - ${section.sectionName}`}
                            //     </Label>
                            // } else {
                            return <Label as='a' key={index} onClick={() => this.removeLabel(classObject)}>
                                {`${classObject.subject} - ${classObject.sectionName}`}
                            </Label>
                            // }
                        }
                        )}
                    </div>
                    : <Loader active inline='centered' />}
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
        sections: Sections.find({isDeleted: false}, { sort: { createdAt: -1 } }).fetch()
    }
})(ClassSearch);