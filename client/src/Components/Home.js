import React from 'react';
import { Link,useHistory } from "react-router-dom";
import "./Home.css";

function Home() {

   const history=useHistory();

   const calendarHandler=(event)=>{
      event.preventDefault();
      history.push("/calendar");
   }

  return (
    <div className="homepage">
    <div>
        <img src={require("../Utils/Images/BSPHCL.jpg")} alt="bsphcl" />
    </div>

    <div className="home">
        <Link className="home_link" to="/">Home</Link>
        <button style={{border: "none", backgroundColor: "#004975" ,color: "#fff",float: "right",height: "100%"}} onClick={calendarHandler}>Reserved Dates</button>
       
    </div>
    <div className="backlook">
    <div className="community">
       <Link className="community-link" to="/">BSPHCL Community Hall Booking</Link> 
    </div>
    <div className="description">
        <div className="vidyutimage">
       <img className="vidyut" src={require("../Utils/Images/vidyutbhawan22.jpg")} alt="vidyut_bhawan"></img>
       </div>
       <div className="details">
          <div className="details__text">
            <h4 style={{padding: "10px 0 0 0"}}>About Bihar State Power Holding Company Community  Hall Booking System -</h4>
          </div>
          <div className="details__description">
          <p><span style={{padding: "10px 0 0 0" }}>In</span> Bihar State Power Holding Company Grievance Redressal System, grievances related to service matters and acceptance and payment of terminal benefits of regular employees and office bearers of Bihar State Power Holding Company Limited and its subsidiaries are redressed. Matters related to their appointment by regular employees and office bearers of Bihar State Power Holding Company Limited and its subsidiaries, service-confirmation, payment of salary and increment, promotion, ACP.</p>
          <p> MACP, priority determination, acceptance of holidays other than casual leave, leave-salary, acceptance and payment of due allowances, medical reimbursement and terminal benefits, such as pension, gratuity, group insurance, unutilized accrued leave Complaints can be lodged on the matter related to exchange of cash payment and general provident fund payment.</p>
          </div>
       </div>
       </div>
       <div className="functions"> 
        <div className="functional__div">
           <img src={require("../Utils/Images/lodge_your_grievance_btn2.jpg")} alt="lodge" />
           <div className="functional__div__comp">
           <Link className="functional__link" to="/user/login">BOOK YOUR HALL</Link>
           <hr />
           <Link className="functional__link" to="/user/login">book hall</Link>
           </div>
        </div>
          
        
        <div className="functional__div">
           <img src={require("../Utils/Images/view_grievance_status_btn5.jpg")} alt="view" />
           <div className="functional__div__comp">
            <Link className="functional__link" to="/status">VIEW BOOKING STATUS</Link>
            <hr />
            <Link className="functional__link" to="/status">view status</Link>
           </div>
        </div>
        <div className="functional__div">
           <img src={require("../Utils/Images/officer_login_btn3.jpg")} alt="officer" />
           <div className="functional__div__comp">
            <Link className="functional__link" to="/admin/login">OFFICER LOGIN</Link> 
            <hr />
            <Link className="functional__link" to="/admin/login">officer login</Link> 
           </div>
        </div>
        
    </div>

     </div>
    </div>
  )
}

export default Home;