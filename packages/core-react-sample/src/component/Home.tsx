import * as React from "react";
import Template, { ITemplateProps } from "./Template";

interface IHomeProps extends ITemplateProps {}

const Home = (props : IHomeProps) => {
    return (
        <Template {...props}>
            Home - TODO
        </Template>
    );
};

export {
    Home,
    Home as default,
    IHomeProps
}