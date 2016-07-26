import React from 'react';
import File from './File.jsx';
import Folder from './Folder.jsx';

export default class FolderContainer extends React.Component {

    render() {
        const items = this.props.data;
        let folderItems = [];
        let index=0;
        for (let i = 0; i < items.length; i++) {
            if (items[i].type === 'dir') {
                folderItems.push(<Folder key={index++} name={items[i].name}/>);
            } else {
                folderItems.push(
                    <File key={index++} name={items[i].name}/>
                );
            }
            if (items[i].children) {
                folderItems.push(<FolderContainer key={index++} data={items[i].children}/>);
            }
        }

        return (
            <ul>
                {folderItems}
            </ul>
        );
    }
}
