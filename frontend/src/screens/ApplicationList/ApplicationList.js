


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import Badge from "react-bootstrap/Badge";
import ProgressBar from "react-bootstrap/ProgressBar";
import Modal from "react-bootstrap/Modal";
import Adminheader from "../../components/Adminheader/Adminheader";

const ApplicationList = () => {
  const navigate = useNavigate();
  const [applicationDetails, setapplicationDetails] = useState([]);
  const [Updated, setUpdated] = useState([]);
  const [rowId, setrowId] = useState('')
  const [progress, setprogress] = useState(60);
  const [refresh, setrefresh] = useState(false);
  const [show, setShow] = useState(false);
  const [underprocess, setunderprocess] = useState([])

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  function handleShow(Id){
    setShow(true);
    setrowId(Id)

  }
 
 

  useEffect(() => {
    const adminInfo = localStorage.getItem("adminInfo");
    if (adminInfo) {
      (async function() {
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
          const pending = await axios.get("/api/admin/appliedusers", config);
          //console.log("pendingg true first data",pending.data);
          
          setapplicationDetails(pending.data);
          // setUpdated(underProcess.data);

          const updateusers=await axios.get('/api/admin/updateusers',config)
          console.log("update all second data",updateusers.data);
          setUpdated(updateusers.data);
         
          




        } catch (error) {
          console.error(error);
        }
      })();
    }else{
      navigate('/admin')
    }
  }, [refresh, navigate]);


  // console.log(applicationDetails,"apllicationdetails");

  async function underProcess (rowId) {
  
    handleClose();
    setrefresh(!refresh);
     
    // console.log(rowId)
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },  // window.location.reload(true)
        // setrefresh([...refresh,!refresh])
      };
      //
      const changeProcess = await axios.patch("/api/admin/processusers/",rowId,
        {config}
      )
        console.log("underprocess true",changeProcess.data)

        // setunderprocess(changeProcess.data)
        // setUpdated(changeProcess.data)
      
    } catch (error) {
      console.log(error.data)
    }
  }

  

  const showDetails = (userId) => {
    try{
      navigate(`/view/${userId}`);
         
    }catch(error){
      throw new error(error.response.data.message);
         
    }
  };



  async function Decline(declineId) { 

    console.log(declineId);
     setrefresh(!refresh);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      //
      const declineApplication = await axios.patch("/api/admin/declinedusers",
        { declineId },
        {
          config,
        }
      );



      // if (declineApplication) {
        console.log("decline true",declineApplication.data);
      // }
      // setprogress(declineApplication.data)
      // setUpdated(declineApplication.data)
      

    } catch (error) {
      console.log(error);
    }
  };

  async function approve(approveId) {

    console.log(approveId);
    
     setrefresh(!refresh);
     

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
    console.log(approveId);

      const approveApplication = await axios.patch("/api/admin/approveusers", {approveId} ,{config});
      // if (approveApplication) {

        console.log("approve true",approveApplication.data);
      // }
      // setprogress(approveApplication.data)
      // setUpdated(approveApplication.data)


    } catch (error) {
      console.log(error);
    }
  }

  
  const columns = [
    {
      name: "Name",
      cell: (row) => row.name
     
    },
    {
      name: "Company Logo",
      cell: (row) => (
        <img style={{ width: "80px", height: "60px" }} src={row.image} alt="" />
      ),
     
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
      name: "Status",
      cell: (row) => (
        <Button
          variant="warning"
          onClick={() => {
            handleShow(row._id);
          }}
        >
          pending
        </Button>
      ),
    },
   
  ];
  const columnss = [

    {
      name: "Name",
      cell: (row) =>row.name
    
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
      name: "Decline",
      cell: (row) =>
        row.isUnderprocess ? (
          <Button
            variant="danger"
            onClick={() => {
              Decline(row._id);
            }}
          >
            Decline
          </Button>
          //
        ) : row.isDeclined ? (
          <h5>
            <Badge bg="danger" style={{color:"gray",height:"1.5rem"}}>Declined</Badge>
          </h5>
        ) : (
          ""
        ),
    },
    {
      name: "Approve",
      cell: (row) =>
        row.isUnderprocess ? (
          <Button
            variant="success"
            onClick={() => {
              approve(row._id);
            }}
          >
            Approve
          </Button>
        ) : row.isApproved ? (
          <h5>
            <Badge bg="success" style={{color:"gray",height:"1.5rem"}}>Approved</Badge>
          </h5>
        ) : (
          ""
        ),
    }
  ];







  return (
    <div>
      <Adminheader/>
      <Container className="mt-4">
        {/* <div className="row"> */}
          {/* <Button variant="primary" onClick={handleShow}>
            Launch static backdrop modal
          </Button> */}

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header>
              <Modal.Title>Start Process</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to start processing this application?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={() => {
            underProcess({ rowId });
          }}>Start</Button>
            </Modal.Footer>
          </Modal>
          <div className="shadow p-3 mb-5 bg-white rounded">
            <DataTable
              title="New Applicant List"
              columns={columns}
              data={applicationDetails}
              pagination
              fixedHeader
              highlightOnHover
            />
          </div>
        {/* </div> */}
        {/* <div className="row mt-5"> */}
          <div className="shadow-lg p-3 mb-5 bg-white rounded">
            <DataTable
              title="Incubation Applications"
              columns={columnss}
              data={Updated}
              pagination
              fixedHeader
              highlightOnHover
            />
          </div>
        {/* </div> */}
       
      </Container>
    </div>
  );
};

export default ApplicationList;