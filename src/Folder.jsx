import React from 'react';
class Folder extends React.Component {
    render=()=>{

        return (
            <li className='folder-item'>{this.props.name}</li>
        );
    };
}
export default Folder;