
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import About from './About';

function App() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
        </Switch>
    );
}

export default App;
