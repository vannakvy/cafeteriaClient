import './static/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Dashboard from './pages/dashboard';
import StyleProvider from './context/styleProvider';

function App() {
  return (
    <Router>
        <StyleProvider>
          <Switch>

            <Route exact path="/">
              <Dashboard />
            </Route>

          </Switch>

        </StyleProvider>
    </Router>
  );
}

export default App;
