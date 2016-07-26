import React from 'react';
class File extends React.Component {

    render() {

        return (
            <li className='file-item'>{this.props.name}</li>
        );
    }
}
export default File;