import React,{useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../Context/auth-context';
import { format } from 'date-fns';
import "./DeleteDetail.css";

function DeleteDetail(props) {


  const auth=useContext(AuthContext);
  const history=useHistory();

  const logoutHandler=(event)=>{
    history.push("/");
    auth.logout();
}

  return (
    <div>
    <div className="note">
    <h1>{props.name}</h1>
    <p>{props.id}</p>
    <p>{props.member}</p>
    <p>{`${format(new Date(props.startDate),'dd/MM/yyyy')}`}</p>
    <p>{`${format(new Date(props.endDate),'dd/MM/yyyy')}`}</p>
    <p>{props.floor}</p>
    <button onClick={() => props.onDelete(props.id)}>DELETE</button>
  </div>
  </div>
  )
}

export default DeleteDetail;