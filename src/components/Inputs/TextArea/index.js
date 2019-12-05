import React,{PureComponent} from "react"
import "./input.scss"

export default class TextArea extends PureComponent {

    handleChange = e => {
        this.props.onChange && this.props.onChange(e);
    }
    render() {
        const {className,type,placeholder,id,name} = this.props;
        return (
            <textarea
                id={id}
                className={ className }
                name={name}
                placeholder={placeholder}
                autoComplete={type==="password" || type==="text" ? "new-password":"false"}
                onChange={ this.handleChange } >
            </textarea>
        );
    }
}