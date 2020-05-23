import React, { Component } from 'react';
import logo from '../../logo.svg';
class HomeComponent extends Component {
    render() {
        return (
            <div>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                        Lets code
                    </a>
                </header>
            </div>
        );
    }
}

export default HomeComponent;