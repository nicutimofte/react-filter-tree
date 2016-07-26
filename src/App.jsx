import React, {Component} from 'react';
import FolderContainer from './FolderContainer.jsx';
import Input from './Input.jsx';


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
        this.state={
            value:event.target.value
        };
        this.setState({data: this.transformJSON(this.props.data,event.target.value)});
    };

    render(){
        return (
            <div className="widget">
                <Input handleChange={this.handleInput}/>
                <div>{this.state.value? ("Searching for:"+this.state.value):null}</div>
                <FolderContainer data={this.state.data}/>
            </div>
        );
    }
}

export default App;
