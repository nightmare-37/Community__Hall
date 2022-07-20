import React,{ useState , useEffect,useContext} from 'react';
import { useHistory } from "react-router-dom";
import { AuthContext } from '../../Context/auth-context';

function AllBookings() {

  const auth=useContext(AuthContext);

    const history=useHistory();

    const [formDetail,setFormDetail]=useState([]);
    const [error,setError]=useState("");

    const logoutHandler=(event)=>{
      history.push("/");
      auth.logout();
  }
     
    useEffect(()=>{
            const getAllDetails=async()=>{
                try{
                    const response=await fetch("http://localhost:5000/api/bookings/bookingdetail");
                     
                    const responseData = await response.json();
                    if (!response.ok) {
                        throw new Error(responseData.message);
                      }
                      else {
                        setFormDetail(responseData.bookingDetail);
                        console.log(responseData.bookingDetail);
                      }
                }catch(err){
                    setError(err.message);
                    console.log(err.message);
                }
            };

            getAllDetails();


    },[]);

  return (
    <>
    <div style={{textAlign: "center", marginTop: "20px"}}>
        <img src={require("../../Utils/Images/BSPHCL.jpg")} alt="bsphcl" />
    </div>
    <div style={{ backgroundColor: "  #004975", height: "35px", width: "79%",marginLeft: "10.5%",marginTop: "-5px"}}>
    <button style={{border: "none", backgroundColor: "  #004975" ,color: "#fff",float: "left",height: "100%"}} onClick={logoutHandler} >Home</button>
        <button style={{border: "none", backgroundColor: "#004975" ,color: "#fff",float: "right",height: "100%"}} onClick={logoutHandler} >Logout</button>
    </div>
    <div>
         {error && <p style={{marginLeft: "35px"}}>{error}</p>}
         <table style={{marginLeft: "145px"}} className="table">
          <thead className="thead">
            <tr>
              <th>Name</th>
              <th>Post</th>
              <th>Id</th>
              <th>Current City</th>
              <th>Current District</th>
              <th>Current State</th>
             
              <th>Mobile No</th>
              <th>Purpose</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Floor</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {formDetail.map((applicant, index) => (
              <tr key={parseInt(index)}>
                <td>{applicant.name}</td>
                <td>{applicant.post}</td>
                <td>{applicant.id}</td>
                <td>{applicant.city}</td>
                <td>{applicant.district}</td>
                <td>{applicant.state}</td>
                
                <td>{applicant.mobile}</td>
                <td>{applicant.purpose}</td>
                <td>{applicant.startDate}</td>
                <td>{applicant.endDate}</td>
                <td>{applicant.floor}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
    </>
  )
}

export default AllBookings;