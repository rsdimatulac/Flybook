import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SplashPage from "./components/SplashPage/Splash";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import ErrorPage from "./components/ErrorPage/Error";
import NewsFeedPage from "./components/NewsFeedPage/NewsFeed";
import ProfilePage from "./components/ProfilePage/Profile";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ScrollToTop from "./context/ScrollToTop";
import { authenticate } from "./store/session";
import "./index.css";
import "./reset.css";

function App() {
  const user = useSelector(state => state.session.user);

  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        <Route path="/" exact>
          <SplashPage />
          <Footer />
        </Route>
        <ProtectedRoute path="/feed" exact>
          <NavBar user={user}/>
          <NewsFeedPage user={user}/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId(\d+)" exact>
          <NavBar user={user}/>
          <ProfilePage currentUser={user}/>
        </ProtectedRoute>
        <Route path="*">
          <ErrorPage/>
          <Footer />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
