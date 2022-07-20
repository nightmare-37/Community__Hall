import React,{useContext} from 'react';
import { useHistory } from "react-router-dom";
import { AuthContext } from '../../Context/auth-context';

function Admindashboard() {
    const auth=useContext(AuthContext);

    const history=useHistory();

    const createHandler=(event)=>{
        event.preventDefault();
        history.push("/input");

    }

    const readAllHandler=(event)=>{
        event.preventDefault();
        history.push("/admin/read/all");
    }

    const readBSPHCLHandler=(event)=>{
        event.preventDefault();
        history.push("/admin/read/bsphcl");
    }

    const readOtherCompanyHandler=(event)=>{
        event.preventDefault();
        history.push("/admin/read/othercmp");
    }

    const readOthersHandler=(event)=>{
        event.preventDefault();
        history.push("/admin/read/others");
    }

    const deleteHandler=(event)=>{
        event.preventDefault();
        history.push("/admin/delete");
    }

    const signupHandler=(event)=>{
        event.preventDefault();
        history.push("/admin/signup");
    }

    const logoutHandler=(event)=>{
        history.push("/");
        auth.logout();
    }

  return (
    <>
    <div>
    <div style={{textAlign: "center", marginTop: "20px"}}>
        <img src={require("../../Utils/Images/BSPHCL.jpg")} alt="bsphcl" />
    </div>
    <div style={{ backgroundColor: "  #004975", height: "35px", width: "79%",marginLeft: "10.5%",marginTop: "-5px"}}>
    <button style={{border: "none", backgroundColor: "  #004975" ,color: "#fff",float: "left",height: "100%"}} onClick={logoutHandler}>Home</button>
        <button style={{border: "none", backgroundColor: "#004975" ,color: "#fff",float: "right",height: "100%"}} onClick={logoutHandler}>Logout</button>
    </div>
    <div style={{width: "100%", display: "flex",flexDirection: "column",marginTop: "50px"}}>
    <div style={{textAlign: "center",marginBottom: "20px"}}>
    <button style={{ width: "20%"}} onClick={createHandler}>Book Community Hall</button>
        </div>
        
        <div style={{textAlign: "center",marginBottom: "20px"}}>
        <button style={{ width: "20%"}} onClick={readAllHandler}>All Booking Details</button>
        </div>

        <div style={{textAlign: "center",marginBottom: "20px"}}>
        <button style={{ width: "20%"}} onClick={ readBSPHCLHandler }>BSPHCL Booking Details</button>
        </div>

        <div style={{textAlign: "center",marginBottom: "20px"}}>
        <button style={{ width: "20%"}} onClick={readOtherCompanyHandler}>Other Company Booking Details</button>
        </div>

        <div style={{textAlign: "center",marginBottom: "20px"}}>
        <button style={{ width: "20%"}} onClick={readOthersHandler}>Others Booking Details</button>
        </div>
       
        <div style={{textAlign: "center",marginBottom: "20px"}}>
        <button style={{ width: "20%"}} onClick={deleteHandler}>Delete a Booking</button>
        </div>
        
        <div style={{textAlign: "center",marginBottom: "20px"}}>
        <button style={{ width: "20%"}} onClick={signupHandler}>Add a New Admin</button>
        </div>
       
    </div>
    </div>
    </>
  )
}

export default Admindashboard;