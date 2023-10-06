import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import SpotDetailPage from "./components/SpotDetailPage";
import NewSpotPage from "./components/NewSpotPage";
import ManageSpotPage from "./components/ManageSpotPage";
import BookingPage from "./components/BookingPage";
import NewBookingPage from "./components/NewBookingPage";
import { BookingDetail } from "./components/BookingDetail";
import { ChangeReservation } from "./components/ChangeReservation";
import { CancelBooking } from "./components/CancelBooking";
import { getKey } from "./store/maps";
import { Footer } from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const apiKey = useSelector(state=>state.maps.key)
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setLoaded(true)).then(()=>dispatch(getKey()));
  }, [dispatch]);

  
  return (
    <>
      <Navigation loaded={loaded} />
      {(loaded && apiKey) &&
        <Switch>
          <Route exact path='/'>
            <LandingPage apiKey={apiKey} />
          </Route>
          <Route path='/spots/:spotId/bookings'>
            <NewBookingPage />
          </Route>
          <Route path='/spots/new'>
            <NewSpotPage />
          </Route>
          <Route path='/spots/:spotId'>
            <SpotDetailPage/>
          </Route>
          <Route exact path='/bookings/current'>
              <BookingPage />
          </Route>
          <Route exact path='/bookings/:bookingId'>
              <BookingDetail  />
          </Route>
          <Route exact path='/bookings/:bookingId/edit'>
              <ChangeReservation />
          </Route>
          <Route exact path='/bookings/:bookingId/cancel'>
              <CancelBooking />
          </Route>
          <Route path='/current'>
              <ManageSpotPage/>
          </Route>
        </Switch>}
        <Footer />
    </>
  );
}

export default App;