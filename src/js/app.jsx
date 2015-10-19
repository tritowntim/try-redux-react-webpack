'use strict';

import React from 'react'
import ReactDOM from 'react-dom';
import {createStore} from 'redux';

import '../css/app.scss';


function reducer(state, action) {
  return { type: action.type, id: state.id + 1 };
}

const store = createStore(reducer, { id: 0 });

store.subscribe(logState);

function logState() {
  const epoch = new Date().valueOf();
  console.log(epoch);
  console.log(store.getState());
}

logState();

// Redux seemingly dispatches an initialize action
// Object {type: "@@redux/INIT", id: 1}

class Form extends React.Component {
  handleSubmit(event) {
    event.preventDefault();
    console.log('handleSubmit');
    this.props.store.dispatch({ type: this.refs.type.value });
    this.refs.type.value = null;
    this.refs.type.focus();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input id="type" ref="type"></input>
        <input type="submit" value="append"></input>
      </form>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.props.store.subscribe(this.setType.bind(this));
    this.state = { type: null, types: [] };
  }

  setType() {
    this.setState({ type: store.getState().type, types: Array.prototype.slice.call(this.state.types).concat(store.getState().type) });
  }

  render() {
    const types = this.state.types.map(function li(type) { return <li key={type}>{type}</li>; });
    return (
      <div>
        This is a sub heading in Inconsolata. This paragraph is in Inconsolata.
        <p><strong>{this.state.type}</strong></p>
        <ul>{types}</ul>
        <Form store={store}/>
        <img src={require('../images/webpack.png')} alt=""/>
      </div>
    )
  }
}

var app = <App store={store}/>;

ReactDOM.render(app, document.getElementById('app'));

store.dispatch({ type: 'ABC' });
store.dispatch({ type: 'XYZ' });
store.dispatch({ type: '123' });
store.dispatch({ type: 'QRS' });
