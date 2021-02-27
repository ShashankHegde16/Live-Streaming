import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamList from './streams/StreamList';
import StreamView from './streams/StreamView';
import StreamEdit from './streams/StreamEdit';
import Header from './header';
import history from '../history';


function App() {
    return (
        <div className="ui container">
            <Router history={history}>
                <Header />
                <React.Fragment>
                    <Switch>
                        <Route path='/' exact component={StreamList} />
                        <Route path='/stream/create' exact={true} component={StreamCreate} />
                        <Route path='/stream/:id' exact={true} component={StreamView} />
                        <Route path='/stream/edit/:id' exact={true} component={StreamEdit} />
                        <Route path='/stream/delete/:id' exact={true} component={StreamDelete} />
                    </Switch>
                </React.Fragment>
            </Router>
        </div>
    );
}

export default App;
