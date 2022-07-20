import React,{useState, useContext} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../Context/auth-context';
import "./LoginSignup.css";

function UserSignup() {

  const auth=useContext(AuthContext);

    const history=useHistory();

    const [userSignupDetail,setUserSignupDetail]=useState({
        username: "",
        useremail: "",
        password: ""
    });

    const [error,setError]=useState("");

    const userHandler=(event)=>{
        const {name,value}=event.target;
        setUserSignupDetail((prevValue)=>{
            return {
                ...prevValue,
                [name]: value
            }
            
        });
    }
    const calendarHandler=(event)=>{
      event.preventDefault();
      history.push("/calendar");
   }

    const signupSubmitHandler=async(event)=>{
        event.preventDefault();
        try{
            const response=await fetch("http://localhost:5000/api/users/signup",{
                method: "POST",
                body: JSON.stringify({
                    name: userSignupDetail.username,
                    email: userSignupDetail.useremail,
                    password: userSignupDetail.password
                  }),
                  headers: {
                    'Content-Type': 'application/json'
                  }
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
              }
              else {
                
                 history.push("/input");
                 auth.login();
              }
        }catch(err){
           setError(err.message);
            console.log(err.message);
        }
    }
  return (
    <>
    <div style={{textAlign: "center", marginTop: "20px"}}>
        <img src={require("../Utils/Images/BSPHCL.jpg")} alt="bsphcl" />
    </div>
    <div style={{ backgroundColor: "#004975", height: "35px", width: "79%",marginLeft: "10.5%",marginTop: "-5px"}}>
        <Link className="home_link" to="/">Home</Link>
        <button style={{border: "none", backgroundColor: "#004975" ,color: "#fff",float: "right",height: "100%"}} onClick={calendarHandler}>Reserved Dates</button>
        </div>
    <div className="form-handler1">
        <form onSubmit={signupSubmitHandler}>
        <div className="control-group1">
        <div className="form-control1">
              <label>Name</label>
              <input type="text" name="username" value={userSignupDetail.username} onChange={userHandler} required />
             </div>
           <div className="form-control1">
              <label>Email</label>
              <input type="email" name="useremail" value={userSignupDetail.useremail} onChange={userHandler} required />
             </div> 
             <div className="form-control1">
              <label>Password</label>
              <input type="password" name="password" value={userSignupDetail.password} onChange={userHandler} required />
            </div>
            {error && <p style={{marginLeft: "35px"}}>{error}</p>} 
            </div>
            <div className="form-actions1">
           <button>Submit</button>
           </div>  
            </form>
            </div>
            </>
  )
}

export default UserSignup;