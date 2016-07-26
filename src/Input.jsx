import React from 'react';
export default class Input extends React.Component{
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
