import React from 'react';
export default class Folder extends React.Component {
    render=()=>{

        return (
            <li className='folder-item'>{this.props.name}</li>
        );
    };
}
