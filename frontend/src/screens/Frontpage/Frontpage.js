import React from 'react'
import { Container, Row } from 'react-bootstrap'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import './Frontpage.css'

function Frontpage() {

  

  return (
    <div>
      <Header/>
    <div className='mainback'>
       <Container>
          <Row>
            
            <div className='maindiv'>
                 <h1 className='fronttitle'>
                      Welcome 
                 </h1>
             </div> 
                      
          </Row>
       </Container>
    </div>
    <Footer/>
    </div>
  )
}

export default Frontpage
