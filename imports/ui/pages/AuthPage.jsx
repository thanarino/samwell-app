import React, { Component } from 'react';
import { Button, Icon, Grid, Divider, Header } from 'semantic-ui-react';
import Particles from 'react-particles-js';

import LoginButton from '../components/login/LoginButton.jsx';
import AdminLoginModal from '../components/login/AdminLoginModal.jsx';

export default class AuthPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='mainLogin'>
                <AdminLoginModal />
                <Particles height={"100vh"} params={{
                    "particles": {
                        "number": {
                            "value": 96,
                            "density": {
                                "enable": true,
                                "value_area": 801.7060304327614
                            }
                        },
                        "color": {
                            "value": "#ffffff"
                        },
                        "shape": {
                            "type": "circle",
                            "stroke": {
                                "width": 0,
                                "color": "#000000"
                            },
                            "polygon": {
                                "nb_sides": 5
                            },
                            "image": {
                                "src": "img/github.svg",
                                "width": 100,
                                "height": 100
                            }
                        },
                        "opacity": {
                            "value": 0.5,
                            "random": false,
                            "anim": {
                                "enable": false,
                                "speed": 1,
                                "opacity_min": 0.1,
                                "sync": false
                            }
                        },
                        "size": {
                            "value": 3,
                            "random": true,
                            "anim": {
                                "enable": false,
                                "speed": 40,
                                "size_min": 0.1,
                                "sync": false
                            }
                        },
                        "line_linked": {
                            "enable": false,
                            "distance": 150,
                            "color": "#ffffff",
                            "opacity": 0.4,
                            "width": 1
                        },
                        "move": {
                            "enable": true,
                            "speed": 3.206824121731046,
                            "direction": "none",
                            "random": true,
                            "straight": false,
                            "out_mode": "out",
                            "bounce": false,
                            "attract": {
                                "enable": false,
                                "rotateX": 600,
                                "rotateY": 1200
                            }
                        }
                    },
                    "interactivity": {
                        "detect_on": "canvas",
                        "events": {
                            "onhover": {
                                "enable": false,
                                "mode": "repulse"
                            },
                            "onclick": {
                                "enable": false,
                                "mode": "push"
                            },
                            "resize": true
                        },
                        "modes": {
                            "grab": {
                                "distance": 400,
                                "line_linked": {
                                    "opacity": 1
                                }
                            },
                            "bubble": {
                                "distance": 400,
                                "size": 40,
                                "duration": 2,
                                "opacity": 8,
                                "speed": 3
                            },
                            "repulse": {
                                "distance": 200,
                                "duration": 0.4
                            },
                            "push": {
                                "particles_nb": 4
                            },
                            "remove": {
                                "particles_nb": 2
                            }
                        }
                    },
                    "retina_detect": false
                }} />
                <Grid columns={2} relaxed className='positionAbsolute'>
                    <Grid.Column verticalAlign='middle'>
                        <Header size='huge' textAlign='right' id='title' content='Samwell' subheader='The chatbot for students and teachers.'></Header>
                    </Grid.Column>
                    <Divider vertical></Divider>
                    <Grid.Column textAlign='left' verticalAlign='middle'>
                        <LoginButton />
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
};
