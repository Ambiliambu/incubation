
 
import React, { useEffect, useState } from 'react';
// import MaterialTable from 'material-table';
// import './Table.css';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import { useNavigate } from 'react-router-dom';
import Adminheader from '../../components/Adminheader/Adminheader';
function User() {


  const navigate = useNavigate();

  const [userDetails, setuserDetails] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [search, setsearch] = useState('');
  const [filterValue, setfilterValue] = useState([]);

  useEffect(() => {

    const adminInfo = localStorage.getItem('adminInfo');
    // console.log("adm",adminInfo);
    if (adminInfo) {
      navigate('/usermanagements');

      (async function () {
        try {
          const config = {
            headers: {
              'Content-type': 'application/json',
            },
          };
          console.log("fghjk");

          const { data } = await axios.get('/api/admin/users', config);
          // console.log("dts1",data);

          setuserDetails(data);
          // console.log("dts",data);
          setfilterValue(data);
        } catch (error) {
          throw new error(error.response.data.message);
        }
      })();
    } else {
      navigate('/admin');
    }
  }, [refresh, navigate]);


  useEffect(() => {
    const result = userDetails.filter((users) => {
      return users.name.toLowerCase().match(search.toLowerCase());
    });
    setfilterValue(result);
  }, [search]);


  const deleteuser = async (userId) => {
    if (window.confirm(`Sure to Delete?`)) {
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
          },
        };
        await axios.delete('/api/admin/deleteuser', {
          params: {
            id: userId,
          },
          config,
        });
        setRefresh(!refresh);
      } catch (error) {
        throw new error(error.response.data.message);
      }
    }
  };

  const editHandler = async (userId) => {
    try {
      console.log("iduser",userId);
      navigate(`/edituser/${userId}`);
    } catch (error) {
      throw new error(error.response.data.message);
    }
  };


  
  const adduser = async()=>{
    try{
      console.log("ghjk");
      navigate('/adduser')
      console.log("qwert");
      
    }catch(error){
       throw new error(error.response.data.message);
    }
  }






  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: '',
      cell: (row) => (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<EditIcon />}
          onClick={() => {
            editHandler(row._id);
          }}
        >
          Edit
        </Button>
      ),
    },
    {
      name: '',
      cell: (row) => (
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => deleteuser(row._id)}
        >
          Delete
        </Button>
      ),
    },


  ];
  return (
 <div>

   


  <Adminheader/>




  <Button

style={{marginLeft:"4rem",marginTop:"0.5rem"}}
  
// className="fas fa-plus" 
variant="contained"
color="success"
startIcon={<AddIcon />}
onClick={ adduser}
>
Add
</Button>
    <div
      className="d-flex justify-content-center"
      style={{ marginTop: '30px' }}
    >
        

                        
         


        
      <Card style={{ height: '100%', width: '90%' }}>

      

        <DataTable

          title={'User Details'}
          columns={columns}
          data={filterValue}
          pagination
          fixedHeader
          highlightOnHover
          subHeader
          subHeaderComponent={
            <input
              type="text"
              placeholder="Serch here..."
              className="w-25 form-control"
              value={search}
              onChange={(e) => {
                setsearch(e.target.value);
              }}
            />

          }
        />



      </Card>


    </div>
  

  </div>
  );
}

export default User;



