import React, { useState } from 'react'
import './Application.css'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import ErrorMessage from '../../components/ErrorMessage';
import Header from "../../components/Header/Header";



function Application() {

  const [error,setError]=useState(false)
  const navigate=useNavigate()


  const {
    register,
    handleSubmit,
    formState: { errors }, } = useForm();

  const [preview, setPreview] = useState()
  const [state,setState]=useState()

  const onSubmit = async (datas) => {



    if (datas.logo[0].type === 'image/jpeg' || datas.logo[0].type === 'image/png') {
      const formData = new FormData();
      //  console.log(formData,"form data")
      formData.append('file', datas.logo[0])
      formData.append('upload_preset', 'applicationform')
      formData.append('cloud_name', 'dluffulu8')
      const { data } = await axios.post('https://api.cloudinary.com/v1_1/dluffulu8/image/upload', formData)

      if (data) {

        datas.image = data.secure_url.toString()

        datas.isPending=true,
        datas.isUnderprocess=false,
        datas.isApproved=false,
        datas.isDeclined=false

        const config = {
          header: {
            "Content-type": "application/json"
          }
        };
        // console.log("jhg", datas);
        axios.post('/api/users/apply', datas, config)

        .then((response)=>{
  
          localStorage.setItem('userInfo',JSON.stringify(response.data))
          setState(response.data)

          if(alert('You are successfully registered ')){
            navigate('/application')
            setState('')


          }

          console.log(response,"uploedsed")
        }).catch((err)=>{
          console.log(err.response.data)
        })
       

      } else {
        console.log("Not a proper file");
      }

    }

  }






  //preview

  function handleChange(e) {
    // console.log("vnm",e.target.files[0]);
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    }

  }

  return (
    <div>
      <Header/>
    <div className='job shadow p-3 mb-5 bg-white rounded'>
      {/* {error && <ErrorMessage variant="danger">{error}</ErrorMessage>} */}

      <form id="job-form" onSubmit={handleSubmit(onSubmit)}>
        <section>
          <h2 className="form-section-title">Application Form</h2>
          <div className="row">
            <div className="col-4">
              <label className="form-label">Name</label>
              <input
                name="name"
                id="name"
                type="text"
                {...register('name', {required:{value:true,message:"Name is required"},
                  minLength: { value: 3, message: "Enter the valid name" },
                  pattern: { value: /^[a-zA-Z '.-]*$/, message: "Enter valid name" }

                })}
              />
              <p style={{ color: "crimson" }}>{errors.name?.message}</p>

            </div>


            <div className="col-8">
              <label className="form-label">Address</label>
              <input name="address"
                type="text"
                {...register('address', {required:{value:true,message:"Address is required"},
                  minLength: { value: 5, message: "Enter the valid Address" },
                  pattern: { value: /^[a-zA-Z '.-]*$/, message: "Enter valid Address" }

                })}
              />
              <p style={{ color: "crimson" }}>{errors.address?.message}</p>

            </div>
          </div>

          <div className="row">
            <div className="col-4">
              <label className="form-label">City</label>
              <input
                name="city"
                type="text"
                {...register('city', {required:{value:true,message:"City is required"},
                  minLength: { value: 3, message: "Enter the valid City" },
                  pattern: { value: /^[a-zA-Z '.-]*$/, message: "Enter valid City" }

                })}
              />
              <p style={{ color: "crimson" }}>{errors.city?.message}</p>

            </div>
            <div className="col-4">
              <label className="form-label">State</label>
              <input
                name="state"
                type="text"
                {...register('state', {required:{value:true,message:"State is required"},
                  minLength: { value: 3, message: "Enter the valid State" },
                  pattern: { value: /^[a-zA-Z '.-]*$/, message: "Enter valid State" }

                })}
              />
              <p style={{ color: "crimson" }}>{errors.state?.message}</p>

            </div>
          </div>

          <div className="row">
            <div className="col-4">
              <label className="form-label">Email</label>
              <input
                name="email"
                type="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                {...register('email', {required:{value:true,message:"Email is required"},
                  pattern: { value: /^\w+@(\w)+(\w+)?(\.(\w+)){1,2}$/, message: "Enter valid Email" }
                })}
              />
              <p style={{ color: "crimson" }}>{errors.email?.message}</p>

            </div>
            <div className="col-4">
              <label className="form-label">Phone no.</label>
              <input
                name="phone"
                type="text"
                {...register('phone', {required:{value:true,message:"Phone is required"},
                  maxLength: { value: 10, message: "Enter the valid Phone number " },
                  minLength: { value: 10, message: "Enter the valid Phone number " },
                  pattern: { value: /^[0-9+-]+$/, message: "Enter valid Phone number " }

                })}
              />
              <p style={{ color: "crimson" }}>{errors.phone?.message}</p>

            </div>
          </div>


          <div className="row">
            <div className="col-4" style={{ marginTop: "1.3rem" }}>
              <label className="form-label">Company Name</label>
              <input
                name="companyname"
                type="text"
                {...register('companyname', {required:{value:true,message:"Company Name is required"},
                  minLength: { value: 3, message: "Enter the valid  Companyname" },
                  pattern: { value: /^[a-zA-Z '.-]*$/, message: "Enter valid  Companyname" }

                })}
              />
              <p style={{ color: "crimson" }}>{errors.companyname?.message}</p>

            </div>


            <div className="col-4" >
              <label className="form-label"  >Company logo</label>
              <img alt="logo" style={{ width: "80px", height: "60px" }} src={preview}></img>
              <input name="logo" type="file"
                {...register('logo', { onChange: (e) => handleChange(e) },)}
               required
              />

              <p style={{ color: "crimson" }}>{errors.logo?.message}</p>

            </div>


          </div>

          <div className="row">
            <div className="col-4">
              <label className="form-label">Describe Your Team and Background</label>
              <textarea
                name="teamNbackground"
                type="text"
                {...register('teamNbackground', {required:{value:true,message:"Input is required"},
                  minLength: { value: 10, message: "Enter the valid Input" },
                  pattern: { value: /^[a-zA-Z '.-]*$/, message: "Enter valid Input" }

                })}
              />
              <p style={{ color: "crimson" }}>{errors.teamNbackground?.message}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <label className="form-label">Describe Your company and Products</label>
              <textarea
                name="companyNproduct"
                type="text"
                {...register('companyNproduct', {required:{value:true,message:"Input is required"},
                  minLength: { value: 10, message: "Enter the valid Input" },
                  pattern: { value: /^[a-zA-Z '.-]*$/, message: "Enter valid Input" }

                })}
              />
              <p style={{ color: "crimson" }}>{errors.companyNproduct?.message}</p>

            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <label className="form-label">Describe the problem your are trying to solve</label>
              <textarea
                name="solution"
                type="text"
                {...register('solution', {required:{value:true,message:"Input is required"},
                  minLength: { value: 10, message: "Enter the valid Input" },
                  pattern: { value: /^[a-zA-Z '.-]*$/, message: "Enter valid Input" }

                })}
              />
              <p style={{ color: "crimson" }}>{errors.solution?.message}</p>

            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <label className="form-label">What is unique about your solution?</label>
              <textarea
                name="uniquesolution"
                type="text"
                {...register('uniquesolution', {required:{value:true,message:"Input is required"},
                  minLength: { value: 3, message: "Enter the valid Input" },
                  pattern: { value: /^[a-zA-Z '.-]*$/, message: "Enter valid Input" }

                })}
              />
              <p style={{ color: "crimson" }}>{errors.uniquesolution?.message}</p>

            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <label className="form-label">What is your value proposition for the customer?</label>
              <textarea
                name="preposition"
                type="text"
                {...register('preposition', {required:{value:true,message:"Input is required"},
                  minLength: { value: 10, message: "Enter the valid Input" },
                  pattern: { value: /^[a-zA-Z '.-]*$/, message: "Enter valid Input" }

                })}
              />
              <p style={{ color: "crimson" }}>{errors.preposition?.message}</p>

            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <label className="form-label">Who are your compatetores and what is your competative advantage?</label>
              <textarea
                name="competitorsNadvantages"
                type="text"
                {...register('competitorsNadvantages', {required:{value:true,message:"Input is required"},
                  minLength: { value: 10, message: "Enter the valid Input" },
                  pattern: { value: /^[a-zA-Z '.-]*$/, message: "Enter valid Input" }

                })} />
              <p style={{ color: "crimson" }}>{errors.competitorsNadvantages?.message}</p>

            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <label className="form-label">Explain your revenue model</label>
              <textarea
                name="revenue"
                type="text"
                {...register('revenue', {required:{value:true,message:"Input is required"},
                  minLength: { value: 10, message: "Enter the valid Input" },
                  pattern: { value: /^[a-zA-Z '.-]*$/, message: "Enter valid Input" }

                })}
              />
              <p style={{ color: "crimson" }}>{errors.revenue?.message}</p>

            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <label className="form-label">What is the potential market size of the product ?</label>
              <textarea
                name="potentialmarketsize"
                type="text"
                {...register('potentialmarketsize', {required:{value:true,message:"Input is required"},
                  minLength: { value: 10, message: "Enter the valid Input" },
                  pattern: { value: /^[a-zA-Z '.-]*$/, message: "Enter valid Input" }

                })}
              />
              <p style={{ color: "crimson" }}>{errors.potentialmarketsize?.message}</p>

            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <label className="form-label">How do you market or plan to market your products and services</label>
              <textarea
                name="marketproductNservice"
                type="text"
                {...register('marketproductNservice', {required:{value:true,message:"Input is required"},
                  minLength: { value: 10, message: "Enter the valid Input" },
                  pattern: { value: /^[a-zA-Z '.-]*$/, message: "Enter valid Input" }

                })}
              />
              <p style={{ color: "crimson" }}>{errors.marketproductNservice?.message}</p>

            </div>
          </div>
          <div className='row'>
            <div className="col-3">
              <label className="form-label">Type of Incubation</label>
              <input
                name="typeincubation"
                type="radio"
                value="physicalincubation"
                {...register("typeincubation")}
                required
              />
              <span className="radio-selection">Physical incubation</span>
              <br />
              <input
                name="typeincubation"
                type="radio"
                value="virtualincubation"
                {...register("typeincubation")}
                required
              />
              <span className="radio-selection">Virtual incubation</span>
            </div>
          </div>

          <div className="row">
            <div className="col-4">
              <label className="form-label">Upload a detailed business proposal</label>
              <textarea
                name="proposal"
                type="text"
                {...register('proposal', {required:{value:true,message:"Input is required"},
                  minLength: { value: 10, message: "Enter the valid Input" },
                  pattern: { value: /^[a-zA-Z '.-]*$/, message: "Enter valid Input" }

                })} />
              <p style={{ color: "crimson" }}>{errors.proposal?.message}</p>

            </div>
          </div>

        </section>
        <button value="Submit" >Submit</button>

      </form>

    </div>
    </div>
  )
}

export default Application
