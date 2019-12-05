import React,{PureComponent} from "react"
import "./input.scss"

export default class Input extends PureComponent {

    handleChange = e => {
        this.props.onChange && this.props.onChange(e);
    }
    render() {
        const {className,value,type,placeholder,id,name,ref} = this.props;
        return (
            <input
                id={id}
                className={ className }
                type={type}
                name={name}
                value={ value }
                placeholder={placeholder}
                ref={ref}
                autoComplete={type==="password" || type==="text" ? "new-password":"false"}
                onChange={ this.handleChange } />
        );
    }
}