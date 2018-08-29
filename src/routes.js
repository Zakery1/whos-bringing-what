import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Feed from './Components/Feed/Feed';
import SpecificEvent from './Components/SpecificEvent/SpecificEvent';
import CreatorSpecificEvent from './Components/CreatorSpecificEvent/CreatorSpecificEvent';

export default (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/feed" component={Feed}/>
            <Route path="/specificEvent/:id" component={SpecificEvent}/>
            <Route path="/creatorSpecificEvent/:id" component={CreatorSpecificEvent}/>
            <Route path="/Danielle" component={() => window.location='https://www.linkedin.com/in/danielle-cucinotta-38b79527'}/>
            <Route path="/Danielle1" component={() => window.location='https://github.com/DanielleLyn'}/>
            <Route path="/Andrew1" component={() => window.location='https://github.com/Clayakn'}/>
            <Route path="/Zak1" component={() => window.location='https://github.com/zakery1'}/>
       
        </Switch>
)