import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// import axios from 'axios';
import io from 'socket.io-client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';

import '../Calendar/Calendar.css'
import Navbar from '../layout/Navbar';



// const routeGenerator = require('./../shared/routeGenerator');

export default class EventCalendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            redirect: null,
            endpoint: 'http://127.0.0.1:6060'
        };
    }

    componentDidMount() {
        const { endpoint } = this.state;
        const socket = io(endpoint);
        socket.on('recipes', data => {
            this.setState({ recipes: data });
            // console.log('events', this.state.events);
            // let api_uri = routeGenerator.getURI(`events`);
            // axios.get(api_uri)
            //     .then(response => {
            //         this.setState({ events: response.data })
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     })
        });

    }

    handleDateClick = (dateClickInfo) => {
        this.setState({ redirect: null });
        // localStorage.setItem('eventDate', JSON.stringify(dateClickInfo.dateStr));
        this.setState({ redirect: `/add-event`});
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className='container'>
            
                <FullCalendar
                    defaultView="dayGridMonth"
                    header={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                    }}
                    plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin
                    ]}
                    events={this.state.events}
                    dateClick={this.handleDateClick}
                />
            </div>
        )
    }

}
