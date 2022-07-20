import React ,{useCallback,useState} from "react";
import Home from "./Components/Home";
import Input from "./Components/Input";
import UserLogin from "./Components/UserLogin";
import UserSignup from "./Components/UserSignup";
import Status from "./Components/Status";
import PriceList from "./Components/PriceList";
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminSignup from "./Components/Admin/AdminSignup";
import AllBookings from "./Components/Admin/AllBookings";
import BSPHCLBookings from "./Components/Admin/BSPHCLbookings";
import OtherCompanyBookings from "./Components/Admin/OtherComapnyBookings";
import OthersBookings from "./Components/Admin/OthersBookings";
import Admindashboard from "./Components/Admin/Admindashboard";
import DeleteBooking from "./Components/Admin/DeleteBooking";
import { AuthContext } from "./Context/auth-context";
import { Route,Switch,Redirect } from "react-router-dom";
import MyCalendar from "./Components/Calendar/MyCalendar";
import './App.css';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

    let routes;

    if(isLoggedIn){
     
      routes=(
        <Switch>
          <Route path="/input" exact><Input /></Route>
        <Route path="/admin/dashboard" exact><Admindashboard /></Route>
        <Route path="/admin/signup" exact><AdminSignup /></Route>
        <Route path="/admin/read/all" exact><AllBookings /></Route>
        <Route path="/admin/read/bsphcl" exact><BSPHCLBookings /></Route>
        <Route path="/admin/read/othercmp" exact><OtherCompanyBookings /></Route>
        <Route path="/admin/read/others" exact><OthersBookings /></Route>
      <Route path="/admin/delete" exact><DeleteBooking /></Route>
      <Route path="/pricelist" exact><PriceList /></Route>
        </Switch>
      );
    }
    else{
      routes=(
        <Switch>
        <Route path="/" exact><Home /></Route>
        <Route path="/calendar" exact><MyCalendar/></Route>
        <Route path="/status" exact><Status /></Route>
        <Route path="/user/login" exact><UserLogin /></Route>
        <Route path="/user/signup" exact><UserSignup /></Route>
        <Route path="/admin/login" exact><AdminLogin /></Route>
        <Route path="*" exact>
           <Redirect to="/"></Redirect>
        </Route>
        </Switch>
      );
    }
     
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          login: login,
          logout: logout
        }}
      >
          <main>{routes}</main>
      </AuthContext.Provider>
    );
}

export default App;
