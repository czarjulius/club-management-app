import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/layout/Dashboard";
import Login from "./components/user/Login";
import Register from "./components/user/Register";

const App = () => (
    <Switch>
      <Route path="/" exact>
        <Login />
      </Route>
      <Route path="/signup" >
        <Register />
      </Route>
      <Route path="/dashboard" >
        <Dashboard />
      </Route>
    </Switch>

)

export default App;
