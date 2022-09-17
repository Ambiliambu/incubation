import React, { useEffect, useState } from 'react'
import { Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../actions/userActions';
function Header() {


    const [Userdetails, setUserdetails] = useState({});
    const navigate = useNavigate();

    
    const dispatch=useDispatch()
    const userLogin=useSelector((state)=> state.userLogin)
    const {userInfo}=userLogin;


    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        console.log("userInfo",userInfo);
        if (userInfo) {
        //   navigate("/frontpage");
          setUserdetails(JSON.parse(userInfo));
        } else {
          navigate("/");
        }
      }, [navigate]);



      const logoutHandler = async()=>{
        if(window.confirm(`Want to logout?`) ){
            dispatch(logout())
            navigate('/')
        }
        
      }




    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand >
                    
                    Shops
                    
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="m-auto">
                      
                    </Nav>

                    <Nav >

                        <Nav.Link href="/frontpage" >
                            {/* {Userdetails.name} */}
                            </Nav.Link>
                        <NavDropdown  title= {Userdetails.name} id="navbarScrollingDropdown">
                            <Link to='/login'/>
                            {/* <NavDropdown.Item href="">{Userdetails.name}</NavDropdown.Item> */}
                            <NavDropdown.Item onClick={logoutHandler }>Logout</NavDropdown.Item>
                               
                            <NavDropdown.Divider />

                        </NavDropdown>

                    </Nav>
                    <></>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
