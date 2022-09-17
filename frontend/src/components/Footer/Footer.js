import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function Footer() {
    return (
        <footer style={{width:"100%",
        position:"relative",
        bottom:0,
        display:"flex",
        justifyContent:"center",
        backgroundColor:"white"}}>
         
         <Container>
             <Row>
                <Col className="text-center py-3">footer</Col>
             </Row>
         </Container>
        </footer>
    )
}

export default Footer
