// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Input from './App.jsx';

const folders = [
    {
        type: 'dir',
        name: 'app',
        children: [
            {
                type: 'file',
                name: 'index.html'
            },
            {
                type: 'dir',
                name: 'js',
                children: [
                    {
                        type: 'file',
                        name: 'main.js'
                    },
                    {
                        type: 'file',
                        name: 'app.js'
                    },
                    {
                        type: 'file',
                        name: 'misc.js'
                    },
                    {
                        type: 'dir',
                        name: 'vendor',
                        children: [
                            {
                                type: 'file',
                                name: 'jquery.js'
                            },
                            {
                                type: 'file',
                                name: 'underscore.js'
                            }
                        ]
                    }
                ]
            },
            {
                type: 'dir',
                name: 'css',
                children: [
                    {
                        type: 'file',
                        name: 'reset.css'
                    },
                    {
                        type: 'file',
                        name: 'main.css'
                    }
                ]
            }
        ]
    }
];


function filterJson(data,string) {
    var arr = [];
    for (var key in data)
        if (typeof(data[key]) == 'object' && data[key] != null) {
            if (data['name'].indexOf(string) <= -1) {
                for (var i = 0; i < data.children.length; i++) {
                    arr=arr.concat(filterJson(data.children[i], string));
                }
                return arr;
            }
        }
        else {
            if (data['name'].indexOf(string) > -1) {
                arr = arr.concat(data);
                return arr;
            }
        }
}

ReactDOM.render(<App data={folders}/>, document.getElementById('container'));
