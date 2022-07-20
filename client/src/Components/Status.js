import React,{useState} from 'react';
import { Link , useHistory} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { format } from 'date-fns';
import "./LoginSignup.css";


function Status() {

  const history=useHistory();

    const [formId,setFormId]=useState("");

    const [error,setError]=useState("");

    const [formDetail,setFormDetail]=useState([]);
    const [hasData,setHasData]=useState(false);

    const formIdHandler=(event)=>{
        setFormId(event.target.value);
    }

    const calendarHandler=(event)=>{
      event.preventDefault();
      history.push("/calendar");
   }

    const formStatusSubmitHandler=async(event)=>{
      event.preventDefault();
      try{
        const response=await fetch("http://localhost:5000/api/bookings/getbookingById",{
            method: "POST",
            body: JSON.stringify({
                 id: formId
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
            setFormDetail(responseData.bookingDetailById);
            console.log(responseData.bookingDetailById);
            setHasData(true);
          }
    } catch(err){
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
    <form onSubmit={formStatusSubmitHandler}>
    <div className="control-group1">
       <div className="form-control1">
          <label>Enter Employee Id / Aadhar Number</label>
          <input type="text" name="formId" value={formId} onChange={formIdHandler} required />
         </div> 
         {error && <p>{error}</p>} 
        </div>
        <div className="form-actions1">
       <button>Submit</button>
       </div>  
        </form>
        </div>

        

        {(hasData) && (
        <table style={{ margin: "auto"}} className="table">
          <thead className="thead">
            <tr>
              <th>Name</th>
              <th>Id</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Floor</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {formDetail.map((applicant, index) => (
              <tr key={parseInt(index)}>
                <td>{applicant.name}</td>
                <td>{applicant.id}</td>
                <td>{`${format(new Date(applicant.startDate),'dd/MM/yyyy')}`}</td>
                <td>{`${format(new Date(applicant.endDate),'dd/MM/yyyy')}`}</td>
                <td>{applicant.floor}</td>
              </tr>
            ))}
          </tbody>
        </table>
       )}

        </>
  );
}

export default Status;