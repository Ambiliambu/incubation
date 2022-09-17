import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import  React,{ useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import "./EditUser.css";
import ErrorMessage from '../../components/ErrorMessage';
import { useForm } from 'react-hook-form'
 

function EditUser() {


  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

//  const [err,setErr]=useState(false)

  const [error, setError] = useState(false);

  const userId = useParams();

  useEffect(() => {
    console.log("dfghjk");
    try {
      (async function () {
        console.log("async fun");
        const { data } = await axios.get(`/api/admin/edituser/${userId.userId}`);
        // console.log("tty",data)
        setName(data.name);
        setEmail(data.email);
      })();
    } catch (error) {
      throw new error(error.response.data.message);
    }
  }, []);



   //user details edit button
  
  let handleSubmit = async (e) => {
   e.preventDefault();

    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      console.log("userhhhId",userId)
      await axios.patch(
        `/api/admin/edituser/${userId.userId}`,
        {
          name,
          email,
        },
        config);
      // localStorage.setItem("userinfo", JSON.stringify(data))
      navigate('/usermanagements');
    } catch (error) {
      setError(error.response.data);
    }
  }




  return (
  
    <div>

    <Container>
        <Row>
        <div className="useredit">
  <div className="editform">
    {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
    {/* {loading && <Loading/>} */}
    <form className="login-form"  onSubmit={handleSubmit} >
      <span className="material-icon" style={{fontSize:"40px"}}>Edit User</span>

      <input 
      minLength={3}
      maxLength={20}
      type="text" 
      placeholder="Name"
      value={name}
      onChange={(e)=>setName(e.target.value)}
      name="name"
      required
     
      />
    
     

      <input 
      type="email" 
      placeholder="Email" 
      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      required
     
      />

      <button type="submit">Edit</button>
    </form>  
  </div>
</div>
        </Row>
    </Container>

    
    </div>


  )
}

export default EditUser




