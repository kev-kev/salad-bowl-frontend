import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import Homepage from "./Homepage";
import { GlobalProvider } from "../context/GlobalContext";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <div>
          <Switch>
            <Route path="/">
              <Homepage />
            </Route>
          </Switch>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
