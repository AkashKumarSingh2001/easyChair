import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../Components/Navbar';
export default function Signup() {
  const [credentials, setCredentials] = useState({ prefix: "",Fname: "",Mname: "",Lname: "",mobile: "", email: "", password: "" })
  // let [address, setAddress] = useState("");
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prefix: credentials.prefix,Fname: credentials.Fname, Mname: credentials.Mname, Lname: credentials.Lname, email: credentials.email, password: credentials.password, mobile: credentials.mobile })

    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      //save the auth toke to local storage and redirect
      localStorage.setItem('authToken', json.authToken)
      navigate("/login")

    }
    else {
      alert("Enter Valid Credentials")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    // <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover', height: '100vh' }}>
    <>
      <div>
        <Navbar />
      </div>

      <div className='container' >
        <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="name" className="form-label" placeholder='Enter prefix eg:- Mr,Mrs etc'>Prefix</label>
            <input type="text" className="form-control" name='prefix' value={credentials.prefix} onChange={onChange} aria-describedby="emailHelp" />
          </div>
          <div className="m-3">
            <label htmlFor="name" className="form-label">First Name</label>
            <input type="text" className="form-control" name='Fname' value={credentials.Fname} onChange={onChange} aria-describedby="emailHelp" />
          </div>
          <div className="m-3">
            <label htmlFor="name" className="form-label">Middle Name</label>
            <input type="text" className="form-control" name='Mname' value={credentials.Mname} onChange={onChange} aria-describedby="emailHelp" />
          </div>
          <div className="m-3">
            <label htmlFor="name" className="form-label">Last Name</label>
            <input type="text" className="form-control" name='Lname' value={credentials.Lname} onChange={onChange} aria-describedby="emailHelp" />
          </div>
          <div className="m-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
          </div>
          <div className="m-3">
            <label htmlFor="email" className="form-label">Mobile Number</label>
            <input type="number" className="form-control" name='mobile' value={credentials.mobile} onChange={onChange} aria-describedby="emailHelp" />
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/login" className="m-3 mx-1 btn btn-danger">Already a user</Link>
        </form>
      </div>
    </>
    // </div>
  )
}