import React, { Component } from 'react';
import _ from 'lodash';
import '../../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import PropTypes from 'prop-types';
import 'moment-recur';
import { withTracker } from 'meteor/react-meteor-data';

import { Sections } from '../../../api/sections/sections';

BigCalendar.momentLocalizer(moment);

// https://www.npmjs.com/package/react-big-calendar

const DEFAULT_VIEW = 'week';
const API_GET_DATE_FORMAT = 'YYYY-MM-DD';

class Schedule extends Component {
    static propTypes = {
        teacher: PropTypes.object,
    }

    constructor(props) {
        super(props);

        this.state = {
            current_date: moment().endOf(DEFAULT_VIEW),
            current_view: DEFAULT_VIEW,
            events: [],
            teacher: props.teacher,
            classes: []
        };

        this.bindScopes([
            'onView',
            'onNavigate',
            'updateTimes',
            'timesToEvents'
        ]);
    }

    bindScopes(keys) {
        for (let key of keys) {
            this[key] = this[key].bind(this);
        }
    }

    componentWillReceiveProps(newProp) {
        if (newProp.sections.length != 0) {
            this.setState({ classes: this.convertToClasses(this.state.teacher.classes, newProp.sections) });
            this.updateTimes();
        }
    }

    convertToClasses(classIDs, sections) {
        let classes = [];
        classIDs.map((classID, index) => {
            classes.push(_.filter(sections, { '_id': classID })[0]);
        });
        console.log(classes);
        return classes;
    }

    onView(view) {
        this.setState({
            current_view: view
        });

        this.updateTimes(this.state.current_date, view);
    }
    onNavigate(date, view) {
        const new_date = moment(date);
        this.setState({
            current_date: new_date
        });

        this.updateTimes(new_date, view);
    }

    updateTimes(date = this.state.current_date, view = this.state.current_view) {
        let start, end;
        // if view is day: from moment(date).startOf('day') to moment(date).endOf('day');
        if (view === 'day') {
            start = moment(date).startOf('day');
            end = moment(date).endOf('day');
        }
        // if view is week: from moment(date).startOf('isoWeek') to moment(date).endOf('isoWeek');
        else if (view === 'week') {
            start = moment(date).startOf('isoWeek');
            end = moment(date).endOf('isoWeek');
        }
        //if view is month: from moment(date).startOf('month').subtract(7, 'days') to moment(date).endOf('month').add(7, 'days'); i do additional 7 days math because you can see adjacent weeks on month view (that is the way how i generate my recurrent events for the Big Calendar, but if you need only start-end of month - just remove that math);
        else if (view === 'month') {
            start = moment(date).startOf('month').subtract(7, 'days');
            end = moment(date).endOf('month').add(7, 'days');
        }
        // if view is agenda: from moment(date).startOf('day') to moment(date).endOf('day').add(1, 'month');
        else if (view === 'agenda') {
            start = moment(date).startOf('day');
            end = moment(date).endOf('day').add(1, 'month');
        }

        this.timesToEvents(start, end);
    }

    timesToEvents(start, end) {
        console.log(this.state.classes);

        let events = [];
        this.state.classes.map(section => {
            let sched = moment().recur(start, end).every(section.daysList).daysOfWeek();
            let all = sched.all();
            const startHour = moment(section.startTime, 'hh:mm').hour();
            const startMinute = moment(section.startTime, 'hh:mm').minute();
            const endHour = moment(section.endTime, 'hh:mm').hour();
            const endMinute = moment(section.endTime, 'hh:mm').minute();

            let subevents =  all.map(date => {
                let startTime = date.clone().set({ 'hour': startHour, 'minute': startMinute, 'second': 0 }).subtract(8, 'hours');
                let endTime = date.clone().set({ 'hour': endHour, 'minute': endMinute, 'second': 0 }).subtract(8, 'hours');
                return {
                    title: `${section.subject} - ${section.sectionName}`,
                    start: startTime.toDate(),
                    end: endTime.toDate(),
                }
            });

            events = _.union(events, subevents);
        });
        
        console.log(events);

        this.setState({
            events: events
        })
    }

    render() {
        return (
            <div className={'schedule'}>
                <BigCalendar
                    onView={this.onView}
                    onNavigate={this.onNavigate}
                    events={this.state.events}
                    startAccessor={'start'}
                    endAccessor={'end'}
                    defaultView='week'
                    step={30}
                    showMultiDayTimes
                    defaultDate={new Date()}
                    min={moment('6:00', 'hh:mm').toDate()}
                    max={moment('20:00', 'hh:mm').toDate()}
                />
            </div>
        );
    }

};

Schedule.protoTypes = {
    callback: PropTypes.func,
}

export default withTracker(() => {
    Meteor.subscribe('sections');

    return {
        sections: Sections.find({ isDeleted: false }, { sort: { createdAt: -1 } }).fetch()
    }
})(Schedule);