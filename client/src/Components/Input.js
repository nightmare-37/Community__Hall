import React,{useState,useContext} from 'react';
import { useHistory } from 'react-router-dom';
import Form1 from './Form1';
import Form2 from './Form2';
import Form3 from './Form3';
import "./Form.css";
import { AuthContext } from '../Context/auth-context';

function Input() {

  const auth=useContext(AuthContext);
  const history=useHistory();

    const [profession,setProfession]=useState("");

    const professionHandler=(event)=>{
        setProfession(event.target.value);
    }

    const logoutHandler=(event)=>{
      history.push("/");
      auth.logout();
  }

  const priceHandler=(event)=>{
    event.preventDefault();
    history.push("/pricelist");
  }
  

  return (
    <div>
      <div style={{textAlign: "center", marginTop: "20px"}}>
        <img src={require("../Utils/Images/BSPHCL.jpg")} alt="bsphcl" />
    </div>
    <div style={{ backgroundColor: "#004975", height: "35px", width: "80%",marginLeft: "10%",marginTop: "-5px"}}>
      <button style={{border: "none", backgroundColor: "#004975" ,color: "#fff",float: "left",height: "100%"}} onClick={logoutHandler}>Home</button>
        <button style={{border: "none", backgroundColor: "#004975" ,color: "#fff",float: "right",height: "100%"}} onClick={logoutHandler}>Logout</button>
        <button style={{border: "none", backgroundColor: "#004975" ,color: "#fff",float: "right",height: "100%",marginRight: "-15px"}} onClick={priceHandler}>Booking Charge</button>
    </div>
      <div className="form-handler">
    <div className="control-group">
          <div className="form-control">
          <label style={{ display: "flex" }} htmlFor="employee">BSPHCL Member</label>
            <input style={{marginTop: "-25px"}} id="employee" type="radio" name="selector" value="employee" onChange={professionHandler} />  
          </div>
          <div className="form-control">
            <label style={{ display: "flex" }} htmlFor="pensioner">Other Company Member</label>
            <input style={{marginTop: "-25px"}} id="pensioner" type="radio" name="selector" value="pensioner" onChange={professionHandler} />
          </div>
          <div className="form-control">
            <label style={{ display: "flex",fontWeight: "bold" }} htmlFor="others">Others</label>
            <input style={{marginTop: "-25px"}} id="others" type="radio" name="selector" value="others" onChange={professionHandler} />
          </div>
      </div>
      </div>
            
            {profession==="employee" && <Form1 />}
            {profession==="pensioner" && <Form2 />}
            {profession==="others" && <Form3 />}
    
    </div>

  )
}

export default Input;