import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Feed from './Components/Feed/Feed';
import SpecificEvent from './Components/SpecificEvent/SpecificEvent';

export default (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/feed" component={Feed}/>
            <Route path="/event/:id" component={SpecificEvent}/>
        </Switch>
)