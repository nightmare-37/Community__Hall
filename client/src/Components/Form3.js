import React,{useState,useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { DateRangePicker } from 'react-date-range';
import { addDays,format} from 'date-fns';
import { toast } from 'react-toastify';
import moment from 'moment';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import "./Form.css";
import { AuthContext } from '../Context/auth-context';

function Form3() {

  const auth=useContext(AuthContext);

  const history=useHistory();

  const [error,setError]=useState("");

      const [empDetail,setEmpDetail]=useState({
           empName: "",
           empPost: "",
           empId: "",
           city: "",
           district: "",
           state: "",
           pincode: "",
           mobile: "",
           purpose: "",
           permanentHouse: "",
           permanentStreet: "",
           permanentCity: "",
           permanentDistrict: "",
           permanentState: "",
           permanentPincode: ""
      });

      const [openDateRange,setOpenDateRange]=useState(false);

      // const [inputDate,setInputDate]=useState({
      //        start: new Date(),
      //        end: addDays(new Date(),2)
      // });

      const [range, setRange] = useState([
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 2),
          key: 'selection'
        }
      ]);

      const [dateRangeError,setDateRangeError]=useState(false);

      const [floor,setFloor]=useState("");
      const [personDetail,setPersonDetail]=useState({
            personName: "",
            personAge: "",
            personId: "",
            personRelation: ""
      });

    const empHandler=(event)=>{
        const {name,value}=event.target;
        setEmpDetail((prevValue)=> {
            return {
            ...prevValue,
            [name]: value
            };
        });
    }
    const inputDateHandler=(event)=>{
      setOpenDateRange((prevState)=>!prevState);
    }

    const floorHandler=(event)=>{
        setFloor(event.target.value);
    }

    const personHandler=(event)=>{
        const {name,value}=event.target;
              setPersonDetail((prevValue)=> {
                return {
                    ...prevValue,
                    [name]: value
                }
              })
    }
    
     const formSubmitHandler=async(event)=>{
      event.preventDefault();
      let diffDay=moment(range[0].endDate).diff(range[0].startDate,'days');
      console.log(diffDay);
      let start;
      let end;
      if(diffDay > 3){
         start=new Date(range[0].startDate);
         end=new Date(addDays(range[0].startDate,2));
      }
      else {
        start=new Date(range[0].startDate);
        end=new Date(range[0].endDate);
      }

      console.log(start.getTime());
        var dirange=true;
      try {
        const response=await fetch("http://localhost:5000/api/bookings/bookingdetail");
        const responseData = await response.json();
        console.log(responseData);
        var bookedDates=[];
        if (!response.ok) {
            throw new Error(responseData.message);
          }
          else {
              bookedDates=responseData.bookingDetail.map(data=>{
              return {
               startDate: new Date(data.startDate),
               endDate:  new Date(data.endDate)
              }
             })
          }

          console.log(bookedDates);
          //  for(let date of bookedDates){

          //     console.log(date.startDate);
          //     console.log(date.endDate);
              
          //     if(start >= date.startdate && start <= date.endDate){
          //       dirange=false;
          //     }
          //     else {
          //       dirange=true;
          //       break;
          //     }
          //  }
          for(var i=0;i<bookedDates.length;i++){
            console.log(bookedDates[i].startDate.getTime());

            if(((start.getTime() >= (bookedDates[i].startDate).getTime()) &&  (start.getTime()<= (bookedDates[i].endDate).getTime())) || ((end.getTime() >= (bookedDates[i].startDate).getTime()) &&  (end.getTime()<= (bookedDates[i].endDate).getTime())) ){
                    dirange=false;
                    break;
                  }
                  else {
                    dirange=true;
                  }
          }
           console.log(dirange);
          

      }catch(err){
        setError(err.message);
        console.log(err.message);
    }

    if(!dirange){
      setError("This Date is Not Available For Booking");
    }

    if(dirange){
      try{
        const response=await fetch("http://localhost:5000/api/bookings",{
            method: "POST",
            body: JSON.stringify({
              member: "OTHERS",
              name: empDetail.empName,
              post: empDetail.empPost,
              id: empDetail.empId,
              city: empDetail.city,
              district: empDetail.district,
              state: empDetail.state,
              pincode: empDetail.pincode,
              mobile: empDetail.mobile,
              purpose: empDetail.purpose,
              permanentHouse: empDetail.permanentHouse,
              permanentStreet: empDetail.permanentStreet,
              permanentCity: empDetail.permanentCity,
              permanentDistrict: empDetail.permanentDistrict,
              permanentState: empDetail.permanentState,
              permanentPincode: empDetail.permanentPincode,
              startDate: start,
              endDate: end,
              floor: floor,
              personName: personDetail.personName,
              personAge: personDetail.personAge,
              personId: personDetail.personId,
              personRelation: personDetail.personRelation
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
            toast.success("successfully send",{
              position: 'top-center',
              autoClose: 700
             });
             history.push("/");
             auth.logout();
          }
    }catch(err){
        console.log(err.message);
    }
    }
      
      
     
    } 
      
  return (
    <div className="form-handler">
      <h2>Community Hall Booking Form</h2>
        <form onSubmit={formSubmitHandler}>
        <div className="control-group">
           <div className="form-control">
              <label>Name</label>
              <input type="text" name="empName" value={empDetail.empName} onChange={empHandler} required />
             </div> 
             <div className="form-control">
              <label>Occupation:</label>
              <input type="text" name="empPost" value={empDetail.empPost} onChange={empHandler} required />
            </div> 

            <div className="form-control">
            <label>Aadhar No</label>
            <input type="text" name="empId" value={empDetail.empId} onChange={empHandler} required />
            </div>
            <div className="form-control">
            <label >Mobile No:</label>
            <input type="text" name="mobile" value={empDetail.mobile} onChange={empHandler} required />
           </div>
           <div className="form-control">
            <label>Purpose</label>
            <input type="text" name="purpose" value={empDetail.purpose} onChange={empHandler} required />
            </div>
            </div>

            <h3>Temporary address</h3>
            <div className="control-group">
            <div className="form-control">
            <label >City:</label>
            <input  type="text" name="city" value={empDetail.city} onChange={empHandler} required />
            </div>
            <div className="form-control">
            <label>District</label>
            <input type="text" name="district" value={empDetail.district} onChange={empHandler} required />
            </div>
            <div className="form-control">
            <label>State</label>
            <input type="text" name="state" value={empDetail.state} onChange={empHandler} required />
            </div>
            <div className="form-control">
            <label>Pincode</label>
            <input  type="text" name="pincode" value={empDetail.pincode} onChange={empHandler} required />
            </div>
            </div>

            <h3>Permanent Address</h3>
            <div className="control-group">
            <div className="form-control">
            <label >House/Plot:</label>
            <input  type="text" name="permanentHouse" value={empDetail.permanentHouse} onChange={empHandler} />
            </div>
            <div className="form-control">
            <label>Street/Locality</label>
            <input type="text" name="permanentStreet" value={empDetail.permanentStreet} onChange={empHandler} />
            </div>
            <div className="form-control">
            <label>City</label>
            <input type="text" name="permanentCity" value={empDetail.permanentCity} onChange={empHandler} required />
            </div>
            <div className="form-control">
            <label>District</label>
            <input type="text" name="permanentDistrict" value={empDetail.permanentDistrict} onChange={empHandler} required />
            </div>
            <div className="form-control">
            <label>State</label>
            <input type="text" name="permanentState" value={empDetail.permanentState} onChange={empHandler} required />
            </div>
            <div className="form-control">
            <label>Pincode</label>
            <input  type="text" name="permanentPincode" value={empDetail.permanentPincode} onChange={empHandler} required />
            </div>
            </div>
            <div className="control-group">
            <div className="form-control">
            <label>Select Date (Maximum 3 Days)</label>
            <input  type="text" name="date" value={`${format(range[0].startDate,'dd/MM/yyyy')} to ${format(range[0].endDate,'dd/MM/yyyy')}`} onClick={inputDateHandler} />
            { error && <p>{error}</p>}
            <div className="calendarwrap">
            {openDateRange && <DateRangePicker
              onChange={item => setRange([item.selection])}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={2}
              minDate={addDays(new Date(),0)}
              maxDate={addDays(new Date(),120)}
              dateFormat={"dd/MM/YYYY"}
              placeholder='Select a range' minDays={1} maxDays={3}
              ranges={range}
              direction="horizontal"
              className='calendarElement'
            />}
            </div>
            
            </div>
            <div className="form-control">
            <label>Select Floor</label>
            <label style={{ display: "flex" }}>Hall (Ground Floor):</label>
            <input style={{ marginTop: "-22px" }} type="radio" name="selectFloor" value="hall" onChange={floorHandler} />
            </div>
            <div className="form-control">
            <label style={{ display: "flex" }}>Lawn (First Floor):</label>
            <input style={{ marginTop: "-22px" }} type="radio" name="selectFloor" value="lawn" onChange={floorHandler} />
            </div>
            <div className="form-control">
            <label style={{ display: "flex" }}>Both Hall and Lawn</label>
            <input style={{ marginTop: "-22px" }} type="radio" name="selectFloor" value="both" onChange={floorHandler} />
            </div>
            </div>
 
            <h3>Detail of the Person</h3>
            <div className="control-group">
            <div className="form-control">
            <label>Person Name</label>
            <input type="text" name="personName" value={personDetail.personName} onChange={personHandler} required />
            </div>
            <div className="form-control">
            <label>Person Age</label>
            <input type="text" name="personAge" value={personDetail.personAge} onChange={personHandler} required />
            </div>
            <div className="form-control">
            <label>Aadhar/Pan Number</label>
            <input type="text" name="personId" value={personDetail.personId} onChange={personHandler} required />
            </div>
            <div className="form-control">
            <label>Relation With Applicant</label>
            <input type="text" name="personRelation" value={personDetail.personRelation} onChange={personHandler} required />
            </div>
            </div>
        
        <div className="form-actions">
           <button>Submit</button>
           </div>   
        </form>        
    </div>
  )
}

export default Form3;