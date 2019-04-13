import React, { Component, memo } from 'react';
import NavBar from './components/NavBar';
import MemberGrid from './components/MemberGrid';
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
        <NavBar />
        <MemberGrid />
      </div>
    );
  }
}

export default App;
