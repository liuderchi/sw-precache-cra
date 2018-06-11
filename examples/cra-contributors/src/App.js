import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    contributors: [],
  };
  componentDidMount() {
    fetch('https://api.github.com/repos/facebook/create-react-app/contributors')
      .then(res => res.json())
      .then(contributors => this.setState({ contributors }));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Contributors of Create React App</h1>
        </header>
        <h3>👷 Service worker caches API response. This page works offline!</h3>
        <div className="App-contributors">
          {this.state.contributors.map(({ id, avatar_url, login, url }) => (
            <div key={id} className="App-contributor">
              <img src={avatar_url} width={50} />
              <div>
                <a href={url}>
                  <code>{login}</code>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
