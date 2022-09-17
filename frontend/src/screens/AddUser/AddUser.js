import React, { useState } from 'react'
import { Container, Row } from 'react-bootstrap';
// import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import "./AddUser.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';




function AddUser() {
  
  const navigate=useNavigate()

  const [name,setName]=useState("") 
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [confirmpassword,setConfirmpassword]=useState("")

  const [message,setMessage]=useState(null)
  const [error,setError]=useState(false)
  // const [loading,setLoading]=useState(false)
 
 
  const {
    register,
    handleSubmit,
    formState: { errors }, } = useForm();


 const onSubmit=async(datas)=>{
 const {name,email,password}=datas
     try{
      const config={
        header:{
          "Content-type":"application/json"
        }
      };
      // setLoading(true)

      const {data}=await axios.post('/api/admin/adduser',{
        name,
        email,
        password
      },
      config
      );
      localStorage.setItem('userInfo',JSON.stringify(data))

      navigate('/usermanagements')
     }catch(error){
      setError(error.response.data.message);

     }
  

 }

  return (  

    <div className='addusers'>
    <Container>
        <Row>
        <div className="adduser">
  <div className="adduserform">

    {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
    {/* {loading && <Loading/>} */}
   
    <form className="adduser-form" onSubmit={handleSubmit(onSubmit)} method="post">
      <span className="material-icons"  style={{fontSize:"40px"}}>Add user</span>

      <input 
      type="text" 
      placeholder="Name" 
      name="name"
      // value={name}
      // onChange={(e)=>setName(e.target.value)}
      {...register('name', { required: {value:true,message:"Name is required"},
      minLength:{value:3,message:"Enter the valid name"},
      pattern:{value:/^[a-zA-Z '.-]*$/ ,message:"Enter valid name"}
    
    })}
      />
    <p  style={{ color: "crimson" }}>{errors.name?.message}</p>
    

      <input 
      type="email" 
      placeholder="Email" 
       pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" 
      // value={email}
      // onChange={(e)=>setEmail(e.target.value)}
      name="email"
      {...register('email', { required: {value:true,message:"Email is required" }},
      {pattern:{value:/^\w+@(\w)+((\-)\w+)?(\.(\w+)){1,2}$/,message:"Enter valid Email"}})}
      />
       <p  style={{ color: "crimson" }}>{errors.email?.message}</p>

      <input 
      type="password" 
      placeholder="Password" 
      // value={password}
      // onChange={(e)=>setPassword(e.target.value)}
      name="password"
      {...register('password', { required: {value:true,message:"Password is required"},
      minLength:{value:3,message:"Password must be at least 3 character"},
     maxLength:{value:6,message:"Password cannot exceed more than 6 character"},
      })}
      />
        <p  style={{ color: "crimson" }}>{errors.password?.message}</p>

   
      <button type="submit">Submit</button>
    </form>  
  </div>
</div>
        </Row>
    </Container>

    </div>
  )
}

export default AddUser;
