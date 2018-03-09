import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, Form, Label, Input, Divider } from 'semantic-ui-react';

export default class AddClassForm extends Component {

    constructor() {
        super();
    }


    render() {
        return (
            <Form>
                <Form.Group>
                    <Form.Input label='Subject' placeholder='Subject' width={8}/>
                    <Form.Input label='Section' placeholder='Section' width={8}/>
                </Form.Group>
                <Divider/>
                <Form.Group>
                    <Form.Input label='Monday Start Time' placeholder='Start Time' width={8} />
                    <Form.Input label='End Time' placeholder='End Time' width={8} />
                </Form.Group>
                <Form.Group>
                    <Form.Input label='Tuesday Start Time' placeholder='Start Time' width={8} />
                    <Form.Input label='End Time' placeholder='End Time' width={8} />
                </Form.Group>
                <Form.Group>
                    <Form.Input label='Wednesday Start Time' placeholder='Start Time' width={8} />
                    <Form.Input label='End Time' placeholder='End Time' width={8} />
                </Form.Group>
                <Form.Group>
                    <Form.Input label='Thursday Start Time' placeholder='Start Time' width={8} />
                    <Form.Input label='End Time' placeholder='End Time' width={8} />
                </Form.Group>
                <Form.Group>
                    <Form.Input label='Friday Start Time' placeholder='Start Time' width={8} />
                    <Form.Input label='End Time' placeholder='End Time' width={8} />
                </Form.Group>
                <Form.Group>
                    <Form.Input label='Saturday Start Time' placeholder='Start Time' width={8} />
                    <Form.Input label='End Time' placeholder='End Time' width={8} />
                </Form.Group>
            </Form>
        )
    }
}