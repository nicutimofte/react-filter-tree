import React from 'react';
export default class File extends React.Component {

    render() {

        return (
            <li className='file-item'>{this.props.name}</li>
        );
    }
}
