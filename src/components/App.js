import React, { Component } from 'react';
import '../css/style.css';

import ContactList from './ContactList';

class App extends Component {

    render() {
        return (

            <React.Fragment>
                <ContactList />
            </React.Fragment>
        );
    }
}

export default App;