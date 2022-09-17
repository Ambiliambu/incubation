import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap';
// import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import "./SignupScreen.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../actions/userActions';
import { useForm } from 'react-hook-form'




function SignupScreen() {
  
  const navigate=useNavigate()

  const [name,setName]=useState("") 
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [confirmpassword,setConfirmpassword]=useState("")

  const [message,setMessage]=useState(null)
 
  const {
    register,
    handleSubmit,
    formState: { errors }, } = useForm();

const dispatch=useDispatch()
const userSignup=useSelector((state)=>state.userSignup)

const {error,userInfo}=userSignup;

useEffect(()=>{
  if(userInfo){
    // navigate('/frontpage')
    navigate('/application')

  }
},[navigate,userInfo])


const onSubmit=async(data)=>{
  const {name,email,password}=data
  
        dispatch(signup(name,email,password))
      

}


  return (  
<div>
  
    <div className='usersignup'>
    <Container>
        <Row>
        <div className="signup">
  <div className="form">

    {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
    {/* {message && <ErrorMessage variant="danger">{message}</ErrorMessage>} */}
    {/* {loading && <Loading/>} */}
   
    <form className="signup-form" onSubmit={handleSubmit(onSubmit)} method="post">
      <span className="material-icons">Signup</span>

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
    
    
      <button type="submit">Signup</button>
    </form>  
  <a style={{color:"lightcoral"}} href="/login">Click here to login</a>
  </div>
</div>
        </Row>
    </Container>

    </div>
    </div>
  )
}

export default SignupScreen;
