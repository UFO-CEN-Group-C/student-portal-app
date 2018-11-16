import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Users from '../Pages/Users';
import Home from '../Pages/Home';
import Teams from '../Pages/Teams';
import SendMail from './SendMail';
import ListMail from './ListMail';
import StudentSurvey from './StudentSurvey';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/teams' component={Teams}/>
            <Route path='/users' component={Users}/>
            <Route path="/sendmail/:projectId/:emailId?" component={SendMail} />
            <Route path="/listmail/:projectId" component={ListMail} />
            <Route path="/studentsurvey/:projectId" component={StudentSurvey} />
        </Switch>
    </main>
)

export default Main;