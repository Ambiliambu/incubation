import React from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import './Landingpage.css'

function Landingpage() {

  const navigate=useNavigate()

  return (
    <div>
  
    <div className='main'>

        <Container>
            <Row>
                <div className='into-text'>
                    <div className='position'>
                        <h1 className='title'>
                            Welcome User
                        </h1>
                        <div className='buttonContainer'> 


                    
                             
                               
                                 <Button  size="lg" onClick={()=>navigate('/login')} className='landingbutton' variant='outline-primary'>Login</Button>
                                
                                 
                                <Button  size="lg" onClick={()=>navigate('/signup')} className='landingbutton' variant='outline-primary'>Signup</Button>
                              
                                 
                                {/* <Button  size="lg" onClick={()=>navigate('/signup')} className='landingbutton' variant='outline-primary'>Signup</Button> */}
                                
                        </div>
                    </div>
                </div>
            </Row>
        </Container>
      
    </div>

    

    
    </div>
  
  )
}

export default Landingpage
