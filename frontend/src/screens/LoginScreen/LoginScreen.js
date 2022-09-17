import React, { useEffect, useState } from 'react'
import  {useNavigate} from "react-router-dom";
import { Container, Row } from 'react-bootstrap'
import "./LoginScreen.css";
// import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/userActions';
import { useForm } from 'react-hook-form'



function LoginScreen() {

const navigate=useNavigate()

//  const [email,setEmail]=useState("")
//  const [password,setPassword]=useState("")
//  const [error,setError]=useState(false)
//  const [loading,setLoading]=useState(false)

const {
  register,
  handleSubmit,
  formState: { errors }, } = useForm();


const dispatch=useDispatch()
const userLogin=useSelector((state)=> state.userLogin)

const {error,userInfo}=userLogin;


useEffect(()=>{
  if (userInfo) {
    // navigate('/frontpage');
    navigate('/application')

    } 
 },[navigate,userInfo])


 const onSubmit=async(data)=>{
  // e.preventDefault();
  const {email,password}=data

    dispatch(login(email,password))
 }





  return (
    <div>
      
    <div className='userlogin'>
      
    <Container>
        <Row>
        <div className="login">
  <div className="form">
    {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
    {/* {loading && <Loading/>} */}
    <form className="login-form" onSubmit={handleSubmit(onSubmit)} method="post">
      <span className="material-icons">Login</span>
      <input 
      type="email" 
      placeholder="email" 
      name="email"
       pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" 
      // value={email}
      // onChange={(e)=>setEmail(e.target.value)}
      {...register('email', { required: {value:true,message:"Email is required" }},
      {pattern:{value:/^\w+@(\w)+((\-)\w+)?(\.(\w+)){1,2}$/,message:"Enter valid Email"}}  )}
      
      />
      <p  style={{ color: "crimson" }}>{errors.email?.message}</p>

      <input 
       
      type="password" 
      placeholder="password" 
      name="password"
      // value={password}
      // onChange={(e)=>setPassword(e.target.value)}
      {...register('password', { required: {value:true,message:"Password is required"},
      minLength:{value:3,message:"Password must be at least 3 character"},
      maxLength:{value:6,message:"Password cannot exceed more than 6 character"},
      })}
       />
       <p  style={{ color: "crimson" }}>{errors.password?.message}</p>

      <button type="submit">login</button>
    </form> 
  <a style={{color:"lightcoral"}} href="/signup">Click here to Signup</a>

  </div>
</div>
        </Row>
    </Container>

    </div>
    </div>

  )
}

export default LoginScreen
