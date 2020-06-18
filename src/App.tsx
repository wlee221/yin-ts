import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Analyze, Home, Upload } from './Pages';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    RouteChildrenProps,
    RouteProps,
} from 'react-router-dom';

type PropType = RouteChildrenProps<{}, { file: File }>

const App: React.FC<{}> = () => {
    return (
        <Router>
            <div className="App">
                <link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css" />
                <header className="App-header">
                    YIN Pitch Detection Demo
                </header>
                <div className="App-body">
                    <Switch>
                        <Route exact path='/'>
                            <Home />
                        </Route>
                        <Route exact path='/upload' render={(props: RouteProps) => <Upload {...props}/>} />
                        <Route exact path='/analyze' render={(props: PropType) => <Analyze {...props} />} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default App;
