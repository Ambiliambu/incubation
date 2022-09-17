import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { adminlogout } from '../../actions/adminActions';

function Adminheader() {
    

    const [Admindetails, setAdmindetails] = useState({});
    const navigate = useNavigate();

    const dispatch=useDispatch()
    const adminLogin=useSelector((state)=> state.adminLogin)
    const {adminInfo}=adminLogin;





    useEffect(() => {
        const adminInfo = localStorage.getItem("adminInfo");
        if (adminInfo) {
        //   navigate("/list");
          setAdmindetails(JSON.parse(adminInfo));
        } else {
          navigate("/admin");
        }
      }, [navigate]);



      const adminlogoutHandler = async()=>{
        console.log("'dfghjk");
        if(window.confirm(`Want to logout?`) ){
            dispatch(adminlogout())
            console.log("fghjkl");
            navigate('/admin')
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
                <Navbar.Brand style={{marginLeft:"1rem"}}>
                    
                    <Link to='/list'>
                      
                      Applicant list
                    </Link>
                    
                </Navbar.Brand>
                <Navbar.Brand style={{marginLeft:"1rem"}}>
                    
                    <Link to='/progress'>
                      
                      Record list
                    </Link>
                    
                </Navbar.Brand>
              
                    <Nav className="m-auto">
                       </Nav>
                      

                    <Nav >

                        
                        <NavDropdown title="Hi Admin" id="navbarScrollingDropdown">
                            <Link to='/login'/>
                            {/* <NavDropdown.Item href="">{Admindetails.name} Profile</NavDropdown.Item> */}
                            <NavDropdown.Item onClick={adminlogoutHandler}>Logout</NavDropdown.Item>
                                {/* localStorage.clear();
                                navigate('/admin') */}

                            

                            <NavDropdown.Divider />

                        </NavDropdown>

                    </Nav>
                    <></>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Adminheader
