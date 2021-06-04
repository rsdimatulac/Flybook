import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SplashPage from "./components/SplashPage/Splash";
import Footer from "./components/Footer";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ErrorPage from "./components/ErrorPage/Error";
import NewsFeedPage from "./components/NewsFeedPage/NewsFeed";
import ProfilePage from "./components/ProfilePage/Profile";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import User from "./components/User";
import { authenticate } from "./store/session";

function App() {
  const user = useSelector(state => state.session.user)
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <SplashPage />
          <LoginForm />
          <SignUpForm />
          <Footer />
        </Route>
        <ProtectedRoute path="/feed">
          <NavBar user={user}/>
          <NewsFeedPage />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact>
          <NavBar user={user}/>
          <ProfilePage/>
          <User />
        </ProtectedRoute>
        <Route path="*">
          <ErrorPage />
          <Footer />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
