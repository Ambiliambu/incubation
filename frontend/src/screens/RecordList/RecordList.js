import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import Container from "react-bootstrap/esm/Container";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import Adminheader from "../../components/Adminheader/Adminheader";


const RecordList = () => {
  const navigate = useNavigate();
  const [record, setRecord] = useState([])
  let location = useLocation();
  useEffect(() => {
    function recordDetails(){
      
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        axios.get("/api/admin/recordlist/",config) 
        .then((response)=>{
          // console.log(response)
          setRecord(response.data)
        })
    }
    recordDetails();
  }, [location])
  



  const showDetails = (userId) => {
    try{
      navigate(`/view/${userId}`);
         
    }catch(error){
      throw new error(error.response.data.message);
         
    }
  };

   const columns = [
     {
       name: "Name",
       cell: (row) => row.name
   
     },
     {
       name: "Company Name",
       selector: (row) => row.companyname,
       sortable: true,
     },

     {
        name: "View Details",
        cell: (row) => (
          <Button
            onClick={() => {
              showDetails(row._id);
            }}
          >
            open
          </Button>
        ),
      },

     {
       name: "Progress",
       cell: (row) =>
         row.isPending ? (
           <ProgressBar
             now={30}
             label="pending"
             variant="warning"
           ></ProgressBar>
         ) : row.isUnderprocess ? (
           <ProgressBar
             now={60}
             label="processing"
             variant="info"
           ></ProgressBar>
         ) : row.isApproved ? (
           <ProgressBar
             now={100}
             label="Approved"
             variant="success"
           ></ProgressBar>
         ) : (
           <ProgressBar
             now={100}
             label="Declined"
             variant="danger"
           ></ProgressBar>
         ),
       style: {
         display: "block",
         marginTop: "16px",
         paddingRight:"2rem",
         

       },
     },
   ];
  


    
  return (
    <div>
      <Adminheader/>
    <Container className="mt-5">
      <div className="shadow p-3 mb-5 bg-white rounded">
        <DataTable
          title="Record List"
          columns={columns}
          data={record}
          pagination
          fixedHeader
          highlightOnHover
        />
      </div>
    </Container>
    </div>
  );
};

export default RecordList;