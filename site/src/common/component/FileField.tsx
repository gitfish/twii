import * as React from "react";
import { getId } from "office-ui-fabric-react/lib/Utilities";
import { Label } from "office-ui-fabric-react/lib/Label";
import { Image } from "office-ui-fabric-react/lib/Image";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import { getClassNames } from "./FileField.classNames";
import { IFileFieldStyles, getStyles } from "./FileField.styles";

interface IFileFieldProps {
    files?: File[];
    label?: string;
    onChange?: (files : File[]) => void;
    onRenderFiles?: (files : File[]) => React.ReactNode;
    onRenderSelect?: () => React.ReactNode;
    defaultSelectText?: string;
    accept?: string;
    multiple?: boolean;
    className?: string;
    styles?: IFileFieldStyles;
    disabled?: boolean;
    onClear?: () => void;
}

interface IFilesProps {
    files: File[];
}

class FileNameList extends React.Component<IFilesProps, any> {
    render() {
        if(this.props.files && this.props.files.length > 0) {
            const items = this.props.files.map((file, idx) => {
                return (
                    <div key={idx} className="file-name">
                        {file.name}
                    </div>
                );
            });
            return (
                <div className="file-name-list">
                    {items}
                </div>
            )
        }
        return null;
    }
}

const defaultFilesRenderer = (files : File[]) => {
    return <FileNameList files={files} />;
};

interface IFileFieldState {
    files?: File[];
}

class FileField extends React.Component<IFileFieldProps, IFileFieldState> {
    private _ref : HTMLInputElement;
    private _id : string;
    constructor(props : IFileFieldProps) {
        super(props);
        this.state = { files: this.props.files };
        this._id = getId("image-field");
    }
    componentWillReceiveProps(nextProps : IFileFieldProps) {
        this.setState({ files: nextProps.files || [] });
    }
    private _onInputChange = (e) => {
        const files : File[] = [];
        const fileList = this._ref.files;
        const fl = fileList.length;
        for(let i = 0; i < fl; i ++) {
            files.push(fileList.item(i));
        }
        if(this.props.onChange) {
            this.props.onChange(files);
        }
        this.setState({ files: files });
    }
    private _onFileInputRef = (ref : HTMLInputElement) => {
        this._ref = ref;
    }
    private _onFieldGroupClick = () => {
        if(this._ref) {
            this._ref.click();
        }
    }
    private _onClickClear = () => {
        this.setState({ files: null });
        if(this.props.onClear) {
            this.props.onClear();
        }
    }
    render() {
        let selectContent;
        let clearAction;
        const files = this.state.files;
        if(this.props.onClear || (files && files.length > 0)) {
            clearAction = <IconButton iconProps={{ iconName: "Clear" }} onClick={this._onClickClear} disabled={this.props.disabled} />;
        }
        if(this.state.files && this.state.files.length > 0) {
            const r = this.props.onRenderFiles || defaultFilesRenderer;
            selectContent = r(this.state.files);
        } else {
            selectContent = this.props.onRenderSelect ? this.props.onRenderSelect() : this.props.defaultSelectText || `Select ${this.props.multiple ? "Files..." : "a File..."}`;
        }
        const styles = getStyles(undefined, this.props.styles);
        const classNames = getClassNames(styles, this.props.className);
        return (
            <div className={classNames.root}>
                <input id={this._id}
                       type="file"
                       accept={this.props.accept}
                       onChange={this._onInputChange}
                       ref={this._onFileInputRef}
                       value=""
                       multiple={this.props.multiple}
                       hidden={true}
                       style={{ display: "none" }}
                       disabled={this.props.disabled} />
                <div className={classNames.wrapper}>
                    {this.props.label && <Label htmlFor={this._id}>{this.props.label}</Label>}
                    <div className={classNames.selector}>
                        <button type="button" className={classNames.selectorAction} onClick={this._onFieldGroupClick} disabled={this.props.disabled}>
                            {selectContent}
                        </button>
                        {clearAction}
                    </div>
                    
                </div>
            </div>
        );
    }
}

export { FileField }