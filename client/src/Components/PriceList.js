import React,{useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../Context/auth-context';
import "./PriceList.css";

function PriceList() {

  const auth=useContext(AuthContext);

    const history=useHistory();


  const logoutHandler=(event)=>{
    history.push("/");
    auth.logout();
}
  return (
    <>
    <div style={{textAlign: "center", marginTop: "20px"}}>
        <img src={require("../Utils/Images/BSPHCL.jpg")} alt="bsphcl" />
    </div>
    <div style={{ backgroundColor: "  #004975", height: "35px", width: "80%",marginLeft: "10%",marginTop: "-5px"}}>
    <button style={{border: "none", backgroundColor: "  #004975" ,color: "#fff",float: "left",height: "100%"}} onClick={logoutHandler}>Home</button>
        <button style={{border: "none", backgroundColor: "#004975" ,color: "#fff",float: "right",height: "100%"}} onClick={logoutHandler}>Logout</button>
    </div>
    <div>
    <table className="table">
      <thead className="thead">
        <tr>
          <th>S No.</th>
          <th>Applicant</th>
          <th>Price For Hall</th>
          <th>Price For Lawn</th>
          <th>Price For Both Hall and Lawn</th>
        </tr>
      </thead>
      <tbody className="tbody">
          <tr>
            <td data-label="">i</td>
            <td data-label="Name">Vidyut Company Official Function</td>
            <td data-label="Email">NULL</td>
            <td data-label="cases">NULL</td>
            <td data-label="specializations">NULL</td>
          </tr>
          <tr>
            <td data-label="">ii</td>
            <td data-label="Name">Other Department/Board/Corporation Official Purpose</td>
            <td data-label="Email">Rs 20,000/- + 18% GST</td>
            <td data-label="cases">Rs 10,000/- + 18% GST</td>
            <td data-label="specializations">Rs 25,000/- + 18% GST</td>
          </tr>
          <tr>
            <td data-label="">iii</td>
            <td data-label="Name">For Members Of Vidyut Company</td>
            <td data-label="Email">Rs 40,000/- + 18% GST</td>
            <td data-label="cases">Rs 15,000/- + 18% GST</td>
            <td data-label="specializations">Rs 50,000/- + 18% GST</td>
          </tr>
          <tr>
            <td data-label="">iv</td>
            <td data-label="Name">Other People</td>
            <td data-label="Email">Rs 1,00,000/- + 18% GST</td>
            <td data-label="cases">Rs 30,000/- + 18% GST</td>
            <td data-label="specializations">Rs 1,20,000/- + 18% GST</td>
          </tr>
      </tbody>
    </table>
  </div>
  </>
  )
}

export default PriceList;