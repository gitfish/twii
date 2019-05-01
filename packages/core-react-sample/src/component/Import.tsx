import * as React from "react";
import Template, { ITemplateProps } from "./Template";

interface IImportProps extends ITemplateProps {}

const Import = (props : IImportProps) => {
    return (
        <Template {...props}>
            Import - TODO
        </Template>
    );
};

export {
    Import,
    Import as default,
    IImportProps
}