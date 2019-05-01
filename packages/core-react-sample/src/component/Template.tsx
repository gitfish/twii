import * as React from "react";
import "semantic-ui-css/semantic.min.css";
import { IAppProps } from "@twii/core-react/lib/component/IAppProps";
import { Menu, Container, Dropdown } from "semantic-ui-react";

interface ITemplateProps extends IAppProps {
    children?: React.ReactNode;
}

const Template = (props : ITemplateProps) => {
    const host = props.match.host;
    const onClickHome = () => {
        host.load({ path: "/" });
    };
    const onClickImport = () => {
        host.load({ path: "/import" });
    }
    return (
        <div>
            <Menu fixed="top" inverted>
                <Container>
                    <Menu.Item as="a" header>
                        Twii Sample App
                    </Menu.Item>
                    <Menu.Item as="a" onClick={onClickHome}>Home</Menu.Item>
                    <Dropdown item simple text="Data">
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={onClickImport}>Import</Dropdown.Item>
                        <Dropdown.Item>List Item</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Header>Header Item</Dropdown.Header>
                        <Dropdown.Item>
                        <i className='dropdown icon' />
                        <span className='text'>Submenu</span>
                        <Dropdown.Menu>
                            <Dropdown.Item>List Item</Dropdown.Item>
                            <Dropdown.Item>List Item</Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown.Item>
                        <Dropdown.Item>List Item</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                </Container>
            </Menu>

            <Container text style={{ marginTop: '7em'}}>
                {props.children}
            </Container>
        </div>
    );
};

export {
    Template,
    Template as default,
    ITemplateProps
}