import React, { Component } from 'react';
import _ from 'lodash';
import '../../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import PropTypes from 'prop-types';
import 'moment-recur';
import { withTracker } from 'meteor/react-meteor-data';
import { Loader } from 'semantic-ui-react';

import { Sections } from '../../../api/sections/sections';
import { Consultations } from '../../../api/consultations/consultations';

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
            classes: [],
            consultations: [],
            // isShown: false,
            // event: undefined,
        };

        this.bindScopes([
            'onView',
            'onNavigate',
            'updateTimes',
            'timesToEvents'
        ]);

        this.updateTimes();
    }

    bindScopes(keys) {
        for (let key of keys) {
            this[key] = this[key].bind(this);
        }
    }

    componentWillReceiveProps(newProp) {
        console.log('newprop:');
        console.log(newProp);
        if (newProp.sections.length > 0 && newProp.consultations.length > 0) {
            this.setState({
                classes: this.convertToClasses(this.state.teacher.classes, newProp.sections),
                consultations: newProp.consultations
            }, () => {
                console.log(this.state);
                this.updateTimes()
            });
        }
    }

    convertToClasses(classIDs, sections) {
        let classes = [];
        classIDs.map((classID, index) => {
            classes.push(_.filter(sections, { '_id': classID })[0]);
        });
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
            start = moment(date).startOf('week');
            end = moment(date).endOf('week');
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
        let events = [];
        let colors = ['#e57373', '#ba68c8', '#4fc3f7', '#4db6ac', '#aed581', '#fff176', '#90a4ae', '#e0e0e0', '#ffb74d', '#dce775'];
        if (this.state.classes) {
            this.state.classes.map((section, index) => {
                let sched = moment().recur(start, end).every(section.daysList).daysOfWeek();
                let semStart = moment().dayOfYear(section.semester.start).clone().set({ 'year': section.semester.startYear });
                let semEnd = moment().dayOfYear(section.semester.end).clone().set({ 'year': section.semester.startYear });
                //gets all dates from start to end of semester given by recurrence
                let allValid = sched.all().map((dateFromArray) => {
                    if (moment(dateFromArray).diff(semStart, 'days') >= 0 && moment(dateFromArray).diff(semEnd, 'days') <= 0) {
                        return dateFromArray;
                    } else {
                        return null;
                    }
                })
                console.log('start');
                console.log(moment(start).format());
                console.log('end');
                console.log(moment(end).format());
                console.log(sched.all());
                console.log(allValid);
                const startHour = moment(section.startTime, 'hh:mm').hour();
                const startMinute = moment(section.startTime, 'hh:mm').minute();
                const endHour = moment(section.endTime, 'hh:mm').hour();
                const endMinute = moment(section.endTime, 'hh:mm').minute();

                let subevents = allValid.map(date => {
                    let startTime = moment(date).clone().set({ 'hour': startHour, 'minute': startMinute, 'second': 0 }).subtract(8, 'hours');
                    let endTime = moment(date).clone().set({ 'hour': endHour, 'minute': endMinute, 'second': 0 }).subtract(8, 'hours');
                    return {
                        title: `${section.subject} - ${section.sectionName}`,
                        start: startTime.toDate(),
                        end: endTime.toDate(),
                        color: colors[index],
                    }
                });
                console.log(events);
                events = _.union(events, subevents);
            });
        }

        let events2 = [];

        if (this.state.consultations) {
            this.state.consultations.map(consultation => {
                const startHour2 = moment(consultation.startTime, 'hh:mm').hour();
                const startMinute2 = moment(consultation.startTime, 'hh:mm').minute();
                const endHour2 = moment(consultation.endTime, 'hh:mm').hour();
                const endMinute2 = moment(consultation.endTime, 'hh:mm').minute();
                let startTime2 = moment().dayOfYear(consultation.date).clone().set({ 'year': consultation.year, 'hour': startHour2, 'minute': startMinute2, 'second': 0 });
                let endTime2 = moment().dayOfYear(consultation.date).clone().set({ 'year': consultation.year, 'hour': endHour2, 'minute': endMinute2, 'second': 0 });

                return {
                    title: `Consultation`,
                    start: startTime2.toDate(),
                    end: endTime2.toDate(),
                    color: '#ff8a65',
                }
            });
        }
        events = _.union(events, events2);

        this.setState({
            events: events
        })
    }

    setEvents = () => {
        this.updateTimes();
        return true;
    }

    render() {
        const { sections, consultations } = this.props;
        return (
            <div className={'schedule'}>    
                {(sections.length != 0 || consultations.length != 0) && this.setEvents ?     
                <div>    
                    {/* <Popup
                        trigger={this.state.isShown}
                        content='Hide the popup on any scroll event'
                        on='click'
                        hideOnScroll
                    /> */}
                    <BigCalendar
                        onView={this.onView}
                        onNavigate={this.onNavigate}
                        events={this.state.events}
                        startAccessor={'start'}
                        endAccessor={'end'}
                        defaultView='week'
                        step={30}
                        popup
                        showMultiDayTimes
                        // onSelectEvent={event => this.setState({isShown: !this.state.isShown, event: event})}
                        defaultDate={new Date()}
                        min={moment('6:00', 'hh:mm').toDate()}
                        max={moment('20:00', 'hh:mm').toDate()}
                        views={['month', 'week', 'day']}
                        eventPropGetter={
                            (event, start, end, isSelected) => {
                                let newStyle = {
                                    backgroundColor: event.color,
                                    color: 'black',
                                    borderRadius: "5px",
                                    border: "none"
                                };

                                return {
                                    className: "",
                                    style: newStyle
                                };
                            }
                        }
                        />
                    </div>    
                    : <Loader active inline='centered' /> }
                
            </div>
        );
    }

};

Schedule.protoTypes = {
    callback: PropTypes.func,
}

export default withTracker((props) => {
    Meteor.subscribe('sections');
    Meteor.subscribe('consultations');
    Meteor.subscribe('studentsAll');

    return {
        sections: Sections.find({ isDeleted: false }, { sort: { createdAt: -1 } }).fetch(),
        consultations: Consultations.find({ teacherID: props.teacher._id, isApprovedByTeacher:true, isApprovedByStudent:true }, { sort: { createdAt: -1 } }).fetch(),
        students: Meteor.users.find({ roles: 'student' }, { sort: { createdAt: -1 } }).fetch(),
    }
})(Schedule);