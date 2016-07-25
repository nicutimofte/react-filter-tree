const App = {
    // reactor instance, let's call it application context
    context: new Nuclear.Reactor({ debug: true }),

    // like MVC models they store our data model, we call it state,
    // and it differs from a model in that it does not refer
    // to a specific view data but a specific application domain data model
    stores: {
        SearchStore: Nuclear.Store({
            getInitialState() {
                return Nuclear.toImmutable({
                    value: null
                });
            },

            initialize() {
                this.on('FILTER', filter);
            }
        }),

        DirectoriesStore: Nuclear.Store({
            getInitialState() {
                return Nuclear.toImmutable([])
            },

            initialize() {
                this.on('FILTER', filter);
            }
        })
    },

    // actions
    actions: {
        filter(value) {
            App.context.dispatch('FILTER', value);
        }
    },

    getters: {
        directories: [
            ['directories'],

            (directories) => {
                return directories.toJS();
            }
        ],

        value: [
            ['search'],

            (search) => {
                return search.get('value')
            }
        ],

        data: [
            ['directories'],
            ['search', 'value'],

            // pure function (aka reducer)
            // that helps us in building
            // the object that will be rendered
            (directories, value) => {
                let children;
                let matches = [];

                const iteratee = (item) => {
                    if (!value) {
                        matches = directories.toJS();
                        return;
                    }

                    if (item.get('name').indexOf(value) > -1) {
                        matches.push(item.toJS());
                        return;
                    }

                    children = item.get('children');

                    if (children && children.size) {
                        children.map(iteratee);
                    }
                };

                directories.map(iteratee);

                return {
                    value: value,
                    directories: matches
                };
            }
        ]
    },

    Input: React.createClass({
        displayName: 'Input',

        render() {
            return (
                <input onKeyUp={this.props.handleChange} placeholder='filter...' />
            );
        }
    }),

    File: React.createClass({
        displayName: 'File',

        render() {
            return (
                <li className='file-item'>{this.props.name}</li>
            );
        }
    }),

    Folder: React.createClass({
        displayName: 'Folder',

        render() {
            return (
                <li className='folder-item'>{this.props.name}</li>
            );
        }
    }),

    FolderContainer: React.createClass({
        displayName: 'Tree',

        renderChildren(children, index) {
            const { FolderContainer } = App;

            return (
                <li className='folder-wrapper' key={'children-' + (++index)}>
                    <FolderContainer items={children}/>
                </li>
            );
        },

        render() {
            const { items } = this.props;
            const { Folder, File } = App;

            let output = [];

            items.forEach((item, index) => {
                if (item.type === 'dir') {
                    output.push(<Folder key={index} name={item.name}/>);
                } else {
                    output.push(<File key={index} name={item.name}/>);
                }

                if (item.children) {
                    output.push(
                        this.renderChildren(item.children, index)
                    );
                }
            });

            return (
                <ul className='folder-container'>{output}</ul>
            );
        }
    }),

    Container: React.createClass({
        displayName: 'Container',

        handleChange(ev) {
            App.actions.filter({
                value: ev.target.value
            });
        },

        componentWillMount() {
            const data = App.context.evaluateToJS(App.getters.data);

            this.setState(data);
        },

        componentDidMount() {
            App.context.observe(App.getters.data, (data) => {
                this.setState(data);
            });
        },

        render() {
            const { value, directories } = this.state;
            const { FolderContainer, Input } = App;

            return (
                <div className='widget'>
                    <Input handleChange={this.handleChange}/>
                    <div>{ value ? 'Searching for:' + value : null }</div>
                    <FolderContainer items={directories} value={value}/>
                </div>
            );
        }
    }),

    render() {
        const { Container } = App;

        return React.render(<Container/>, this.mountNode);
    },

    initialize(spec) {
        const stores = this.stores;
        const mountNode = document.getElementById('root');

        if (!mountNode) {
            throw new Error('A root node must be provided...');
        }

        this.context.registerStores({
            directories: stores.DirectoriesStore,
            search: stores.SearchStore
        });

        this.context.loadState(spec.stores);
        this.mountNode = mountNode;
        this.render();
    }
};

function filter(state, payload) {
    const nextState = state.set('value', payload.value);

    if (state.equals(nextState)) {
        return state;
    }

    return nextState;
}


// This is going to be inserted in a script tag
// so that we can inject persistent data from the server into stores
App.initialize({
    stores: {
        directories: [
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
        ]
    }
});





class Input extends Component{
    // const displayName='Input';
    render() {
        return (
            <input onKeyUp={this.props.handleChange} placeholder='filter...' />
        );
    }
}


class File extends Component{
    //const displayName='File';

    render() {
        return (
            <li className='file-item'>{this.props.name}</li>
        );
    }
}

class Folder extends Component{
    //const displayName = 'Folder';

    render() {
        return (
            <li className='folder-item'>{this.props.name}</li>
        );
    }
}

class FolderContainer extends Component{
    // const displayName='Tree';

    renderChildren(children, index) {
        const { FolderContainer } = App;

        return (
            <li className='folder-wrapper' key={'children-' + (++index)}>
                <FolderContainer items={children}/>
            </li>
        );
    }

    render() {
        const { items } = this.props;
        const { Folder, File } = App;

        let output = [];

        items.forEach((item, index) => {
            if (item.type === 'dir') {
                output.push(<Folder key={index} name={item.name}/>);
            } else {
                output.push(<File key={index} name={item.name}/>);
            }

            if (item.children) {
                output.push(
                    this.renderChildren(item.children, index)
                );
            }
        });

        return (
            <ul className='folder-container'>{output}</ul>
        );
    }
}

