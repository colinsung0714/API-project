import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import SpotDetailPage from "./components/SpotDetailPage";
import NewSpotPage from "./components/NewSpotPage";
import ManageSpotPage from "./components/ManageSpotPage";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route path='/spots/new'>
            <NewSpotPage />
          </Route>
          <Route path='/spots/:spotId'>
            <SpotDetailPage />
          </Route>
          <Route path='/current'>
              <ManageSpotPage/>
          </Route>
        </Switch>}
    </>
  );
}

export default App;