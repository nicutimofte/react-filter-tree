import React, {Component} from 'react';

class File extends Component {

    render() {

        return (
            <li className='file-item'>{this.props.name}</li>
        );
    }
}
class Folder extends Component {
    render=()=>{

        return (
            <li className='folder-item'>{this.props.name}</li>
        );
    };
}
class FolderContainer extends Component {

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

class Input extends Component{
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
class App extends Component {
    constructor(props) {
        super(props);
        this.handleInput=this.handleInput.bind(this);
        this.state={
            data:this.props.data
        };
    }
    transformJSON=(data, value)=>{
    let newObj=[];
        (function filterJSON(obj, searchValue)
        {
            if(obj.name && (obj.name.indexOf(searchValue) >-1)){
                newObj.push(obj);
                return
            }
            for (var key in obj)
            {
                if (typeof obj[key] == "object" && obj[key] !== null){
                    filterJSON(obj[key],searchValue);
                }
            }
        })(data, value);
        return newObj;
    };

    handleInput=(event) =>{
        this.setState({data: this.transformJSON(this.props.data,event.target.value)});
    };

    render(){
        return (
            <div className="widget">
                <Input handleChange={this.handleInput}/>

                <FolderContainer data={this.state.data}/>
            </div>
        );
    }
}

export default App;
