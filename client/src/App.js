import React, { Component } from "react";
import "./App.css";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Home from "./components/home";
import About from "./components/about";
import Signup from "./components/signup";
import Signin from "./components/signin";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userService from "./services/userService";
import Logout from "./components/logout";
import OwnerSignup from "./components/owner-signup";
import CreateAsset from "./components/create-asset";
import EditAsset from "./components/edit-asset";
import ProtectedRoute from "./components/common/protectedRoute";
import MyAssets from "./components/my-assets";
import AllAssets from "./components/all-assets";
import Favorites from "./components/favorites";



class App extends Component {

  state = {};

  // i made the getcurrentuser method in the app.js file because he is the main component and i can share this method with all the components(i can pass the method with the props). instead of importing it and run it in every single component that wants to know if the user is connected or not..

  // because i dont know how much time will get the browser to get to the localstorage and retrive the data, we use componentdidmount so if there is some change in the state it will render again

  componentDidMount() {
    const user = userService.getCurrentUser();
    this.setState({ user });

  }

  render() {
    const { user } = this.state;

    return (
      <div className="App">
        <header>
          <ToastContainer />
          {/* i send to Navbar the object user that has: 1. or the user details with the id and the email 2. or null --> that means the user is disconnected or someone is trying to fake the token */}
          <Navbar user={user} />

        </header>
        <main style={{ minHeight: 900 }}>
          <Switch>
            <ProtectedRoute path="/favorites" component={Favorites} />
            <ProtectedRoute path="/all-assets" component={AllAssets} />
            <ProtectedRoute path="/my-assets/edit/:id" component={EditAsset} assetOwner={true} />
            <ProtectedRoute path="/my-assets" component={MyAssets} assetOwner={true} />
            <ProtectedRoute path="/create-asset" component={CreateAsset} assetOwner={true} />
            <Route path="/owner-signup" component={OwnerSignup} />
            <Route path="/logout" component={Logout} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/about" render={(props) => (<About {...props} user={user} />)} />
            <Route path="/" exact component={Home} />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;
