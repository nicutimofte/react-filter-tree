import React from 'react';
class Input extends React.Component{
    render(){
        return(
            <div className="widget" onChange={this.props.handleChange}>
                <input
                    type="text"
                    placeholder="filter..."
                />
            </div>
        );
    }
}
export default Input;