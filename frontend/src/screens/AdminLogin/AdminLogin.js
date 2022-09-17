import React, {  useEffect, useState } from 'react'
import  {useNavigate} from "react-router-dom";
import { Container, Row } from 'react-bootstrap'
import "./AdminLogin.css";
// import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { adminlogin } from '../../actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form'


function AdminLogin() {

const navigate=useNavigate()

 const [email,setEmail]=useState("")
 const [password,setPassword]=useState("")
//  const [error,setError]=useState(false)
//  const [loading,setLoading]=useState(false)

const {
  register,
  handleSubmit,
  formState: { errors }, } = useForm();





const dispatch=useDispatch()
const adminLogin=useSelector((state)=>state.adminLogin)

const {error,adminInfo}=adminLogin;

useEffect(()=>{
  if (adminInfo) {
    navigate('/list');
    } 
 },[navigate,adminInfo])


 const onSubmit=async(data)=>{
  const {email,password}=data
  dispatch(adminlogin(email,password))
 }



  return (
    <div>
    <Container>
        <Row>
        <div className="adminlogin">
  <div className="adminform">
    {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
    {/* {loading && <Loading/>} */}
    <form className="login-form" onSubmit={handleSubmit(onSubmit)} method="post">
      <span className="material-icons">Login</span>
      <input 
      type="email" 
      placeholder="email" 
     pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" 
      name="email"
      {...register('email', { required: {value:true,message:"Email is required" }},
      {pattern:{value:/^\w+@(\w)+((\-)\w+)?(\.(\w+)){1,2}$/,message:"Enter valid Email"}})}
      // value={email}
      // onChange={(e)=>setEmail(e.target.value)}
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

      <button type="submit">Login</button>
    </form>  
  </div>
</div>
        </Row>
    </Container>

    </div>
  )
}

export default AdminLogin
