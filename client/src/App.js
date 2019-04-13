import React, { Component } from 'react';
import logo from './sample-logo.png';
import './App.css';

class App extends Component {
  state = {
    response: '',
    get: '',
    responseToGet: '',
  };
  componentDidMount() {

  }
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/members', {
      method: 'GET',
    });
    const body = await response.text();
    this.setState({ responseToGet: body });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <button className="btn" type="submit">Get Members</button>
        </form>
        <p className="api-result">{this.state.responseToGet}</p>
      </div>
    );
  }
}

export default App;
