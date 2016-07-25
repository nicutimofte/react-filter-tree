import React, {Component} from 'react';

class File extends Component {

  render(){

    return(
        <li className='file-item'>{this.props.name}</li>
    );
  }
}
class Folder extends Component {

  render(){

    return(
        <li className='folder-item'>{this.props.name}</li>
    );
  }
}
class Input extends Component{
  handleChange(event) {
    console.log(this.state.value);
}
  getInitialState() {
  return {value: ''};
}
  render(){

    return (
      <input
          type="text"
          placeholder="filter..."
          valueLink={this.linkState('value')}
          onChange={this.handleChange}
      />
    );
  }
}
class FolderContainer extends Component {
  render() {
    const items = this.props.data;
    let folderItems = [];
    for(let i=0;i<items.length;i++) {
          if(items[i].type === 'dir') {
            folderItems.push(<Folder name={items[i].name} />);
          } else {
            folderItems.push(
                <File name={items[i].name} />
            );
          }
          if(items[i].children) {
            folderItems.push(<FolderContainer  data={items[i].children}/>);
          }
    }
    return (
        <ul>
          {folderItems}
        </ul>
    );
  }
}
class App extends Component {
  render() {
    return (
        <div className="widget">
          <Input />
          <div>{ this.props.value ? 'Searching for:' + this.props.value : null }</div>
          <FolderContainer data={this.props.data} />
        </div>
    );
  }
}

export default App;
