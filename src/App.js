import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header'
import Passangers from './screens/Passangers'


function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/passangers' component={Passangers} />
      </Switch>
    </Router>
  );
}

export default App;
