import React, {Component} from 'react';



// class App extends Component {
  // render() {
  //   return (
  //     <h1>Hello React :)</h1>
  //   );
  // }
  var TreeNode = React.createClass({
    getInitialState: function() {
      return {
        visible: true
      };
    },
    render: function() {
      var children;
      if (this.props.node.children != null) {
        children = this.props.node.children.map(function(node, index) {
          return <li className="folder-wrapper" ><TreeNode node={node} /></li>
        });
      }

      return (
          <div>
            <li className={(this.props.node.type==='file'? 'file-item':'folder-item')}>
              {this.props.node.name}
            </li>
            <ul >{children}</ul>
          </div>
      );
    }
  });




//}
export default TreeNode;
