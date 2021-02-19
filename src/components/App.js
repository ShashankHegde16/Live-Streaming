import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamList from './streams/StreamList';
import StreamView from './streams/StreamView';
import StreamEdit from './streams/StreamEdit';
import Header from './header';




function App() {
    return (
        <div className="ui container">
            <Router >
                <Header />

                <div>
                    <Route path='/' exact component={StreamList} />
                    <Route path='/stream/watch' exact={true} component={StreamView} />
                    <Route path='/stream/create' exact={true} component={StreamCreate} />
                    <Route path='/stream/edit' exact={true} component={StreamEdit} />
                    <Route path='/stream/delete' exact={true} component={StreamDelete} />
                </div>
            </Router>
        </div>
    );
}

export default App;
