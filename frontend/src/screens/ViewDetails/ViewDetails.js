import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { useLocation, useParams } from 'react-router-dom';

function ViewDetails() {


    const [record, setRecord] = useState([])
    const userId = useParams();



  

    useEffect(() => {
        try {
          (async function () {
            const { data } = await axios.get(`/api/admin/view/${userId.userId}`);
            // console.log("tty",data)
            setRecord(data)
            
          })();
        } catch (error) {
          throw new error(error.response.data.message);
        }
      }, []);






  return (

    <div className='m-5 shadow p-5 mb-5 bg-white rounded'>

     <h4>APPLICANT DETAILS</h4>

      <ListGroup>
  <ListGroupItem>Applicant Name : {record.name}</ListGroupItem>
  <ListGroupItem>Applicant Details : {record.address},{record.city},{record.state}</ListGroupItem>
  <ListGroupItem>Email : {record.email}</ListGroupItem>
  <ListGroupItem>Phone Number : {record.phone}</ListGroupItem>
  <ListGroupItem>Company Logo : <img  style={{width:"80px",height:"60px"}} src={record.image} /></ListGroupItem>
  <ListGroupItem>Company Name : {record.companyname}</ListGroupItem>
    <ListGroupItem>Company Details : {record.companyname},{record.companyNproduct},{record.teamNbackground}</ListGroupItem>
  <ListGroupItem>Problem trying to solve : {record.solution}</ListGroupItem>
  <ListGroupItem>Their unique solution : {record.uniquesolution}</ListGroupItem>
  <ListGroupItem>Value preposition for customers : {record.preposition}</ListGroupItem>
  <ListGroupItem>Competitors and Competative advantages : {record.competitorsNadvantages}</ListGroupItem>
  <ListGroupItem>Revenue Model : {record.revenue}</ListGroupItem>
  <ListGroupItem>Potntial market size of the product : {record.potentialmarketsize}</ListGroupItem>
  <ListGroupItem>Plan to market your product and Services : {record.marketproductNservice}</ListGroupItem>
  <ListGroupItem>Type of Incubation : {record.typeincubation} </ListGroupItem>
  <ListGroupItem>Detailed business proposal : {record.proposal}</ListGroupItem>

</ListGroup>
    </div>
  )
}

export default ViewDetails
