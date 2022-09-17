import React, { useState } from 'react'
import { Container, Row } from 'react-bootstrap';
// import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import "./AdminSignup.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




function AdminSignup() {
  
  const navigate=useNavigate()

  const [name,setName]=useState("") 
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [confirmpassword,setConfirmpassword]=useState("")

  const [message,setMessage]=useState(null)
  const [error,setError]=useState(false)
  // const [loading,setLoading]=useState(false)
 
 const submitHandler=async(e)=>{
  e.preventDefault();
  console.log("ghjk");
  if(password !==confirmpassword){
    setMessage('Password do not match')
  
  }else{
     setMessage(null)
     try{
      const config={
        header:{
          "Content-type":"application/json"
        }
      };
      // setLoading(true)

      const {data}=await axios.post('/api/admin',{
        name,
        email,
        password
      },
      config
      );
       console.log("data in signup",data );
      localStorage.setItem('adminInfo',JSON.stringify(data))
      console.log("data in signup",data );

      navigate('/usermanagements')
     }catch(error){
      setError(error.response.data.message);

     }
  }

 }

  return (  

    <div>
    <Container>
        <Row>
        <div className="adminsignup">
  <div className="adminform">

    {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
    {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
    {/* {loading && <Loading/>} */}
   
    <form className="signup-form" onSubmit={submitHandler} method="post">
      <span className="material-icons">Signup</span>

      <input 
      type="text" 
      placeholder="Name" 
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />
    

      <input 
      type="email" 
      placeholder="Email" 
      required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" 
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      />
      <input 
      type="password" 
      placeholder="Password" 
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      required />

     <input 
      type="password" 
      placeholder="Confirm Password" 
      value={confirmpassword}
      onChange={(e)=>setConfirmpassword(e.target.value)}
      required />
      <button type="submit">Signup</button>
    </form>  
  </div>
</div>
        </Row>
    </Container>

    </div>
  )
}

export default AdminSignup;
