import React,{useEffect,useState,useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../Context/auth-context';
import DeleteDetail from './DeleteDetail';

import "./DeleteDetail.css";

function DeleteBooking() {

    const auth=useContext(AuthContext);
    const history=useHistory();
    const [formDetails,setFormDetails]=useState([]);
     
    useEffect(()=>{
            const getAllDetails=async()=>{
                try{
                    const response=await fetch("http://localhost:5000/api/bookings/bookingdetail");
                    const responseData = await response.json();
                    if (!response.ok) {
                        throw new Error(responseData.message);
                      }
                      else {
                        setFormDetails(responseData.bookingDetail);
                        console.log(responseData.bookingDetail);
                      }
                }catch(err){
                    console.log(err.message);
                }
            };

            getAllDetails();


    },[formDetails]);

    const deleteBooking=async(id)=>{
      try{
        const response=await fetch("http://localhost:5000/api/bookings/deletebooking",{
            method: "DELETE",
            body: JSON.stringify({
                 id: id
              }),
              headers: {
                'Content-Type': 'application/json'
              }
        });
        const responseData = await response.json();

        
        if (!response.ok) {
            throw new Error(responseData.message);
          }

          setFormDetails(prevValue => {
            return prevValue.filter((items) => {
                return items.id!=id;
              });
              
          });

          console.log(formDetails);

          
    }catch(err){
        console.log(err.message);
    }
    }  
    
    const logoutHandler=(event)=>{
      history.push("/");
      auth.logout();
  }
  return (
    <>
    <div style={{textAlign: "center", marginTop: "20px"}}>
        <img src={require("../../Utils/Images/BSPHCL.jpg")} alt="bsphcl" />
    </div>
    <div style={{ backgroundColor: "#004975", height: "35px", width: "80%",marginLeft: "10%",marginTop: "-5px"}}>
    <button style={{border: "none", backgroundColor: "#004975" ,color: "#fff",float: "left",height: "100%"}} onClick={logoutHandler}>Home</button>
        <button style={{border: "none", backgroundColor: "#004975" ,color: "#fff",float: "right",height: "100%"}} onClick={logoutHandler}>Logout</button>
    </div>
    <div style={{width: "65%", margin: "0 auto"}}>
        { formDetails.map((detail,index)=>{
            return <DeleteDetail key={index} name={detail.name} id={detail.id} member={detail.member} startDate={detail.startDate} endDate={detail.endDate} floor={detail.floor} onDelete={deleteBooking} />;
        }) }
    </div>
    </>
  )
}

export default DeleteBooking;