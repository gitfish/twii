import * as React from "react";
import { Button, Checkbox, Form, Menu, Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

class Default extends React.Component<any, any> {
    render() {
        return (
            <div>
                <Menu fixed="top" inverted>
                </Menu>

                <Container text style={{ marginTop: '7em'}}>
                    <Form>
                        <Form.Field>
                        <label>First Name</label>
                        <input placeholder='First Name' />
                        </Form.Field>
                        <Form.Field>
                        <label>Last Name</label>
                        <input placeholder='Last Name' />
                        </Form.Field>
                        <Form.Field>
                        <Checkbox label='I agree to the Terms and Conditions' />
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </Container>
            </div>
        );
    }
}

export { Default, Default as default }