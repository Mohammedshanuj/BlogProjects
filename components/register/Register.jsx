import React, { useReducer, useState, Component } from "react";
import { NavLink } from 'react-router-dom';
//import './Home.css'
import './Register.css'
import { useLoginFormValidator } from "./UseValidator";

const Register = () => {

  const [form, setForm] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userName: "",


  });
  const { errors, validateForm, onBlurField } = useLoginFormValidator(form);

  const onUpdateChange = (e) => {
    const field = e.target.name;
    const nextFormState = {
      ...form,
      [field]: e.target.value,
    };
    setForm(nextFormState);
    if (errors[field].dirty)
      validateForm({
        form: nextFormState,
        errors,
        field,
      });
  };



  return (
    <div className="container containi" >
      <div className="containeri">
        <div className="title">Registration
        </div>
        <div className="content">
          <form action="#">
            <div className="user-details">
              <div className="input-box">
                <span className="details">Full Name</span>
                <input type="text" placeholder="Enter your name" required />
              </div>
              <div className="input-box">
                <span className="details">Username</span>
                <input
                  type="text"
                  aria-label="username field"
                  name="userName"
                  value={form.userName}
                  onChange={onUpdateChange}
                  onBlur={onBlurField}
                />
                {errors.userName.dirty && errors.userName.error ? (
                  <p style={{ color: "red" }}>{errors.userName.message}</p>
                ) : null}

              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="text"
                  aria-label="Email field"
                  name="email"
                  value={form.email}
                  onChange={onUpdateChange}
                  onBlur={onBlurField}

                />
                {errors.email.dirty && errors.email.error ? (
                  <p style={{ color: "red" }}>{errors.email.message}</p>
                ) : null}

              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input
                  type="number"
                  aria-label="phone Field"
                  name="phone"
                  value={form.phone}
                  onChange={onUpdateChange}
                  onBlur={onBlurField}
                />
                {errors.phone.dirty && errors.phone.error ? (
                  <p style={{ color: "red" }}>
                    {errors.phone.message}
                  </p>
                ) : null}
              </div>
              <div className="input-box">
                <span className="details">Password</span>
                <input
                  type="password"
                  aria-label="Password field"
                  name="password"
                  value={form.password}
                  onChange={onUpdateChange}
                  onBlur={onBlurField}
                />
                {errors.password.dirty && errors.password.error ? (
                  <p style={{ color: "red" }}>
                    {errors.password.message}
                  </p>
                ) : null}

              </div>
              <div className="input-box">
                <span className="details">Confirm Password</span>
                <input
                  type="password"
                  aria-label="Confirm password field"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={onUpdateChange}
                  onBlur={onBlurField}
                />
                {errors.confirmPassword.dirty && errors.confirmPassword.error ? (
                  <p style={{ color: "red" }}>
                    {errors.confirmPassword.message}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="gender-details">
              <input type="radio" name="gender" id="dot-1" />
              <input type="radio" name="gender" id="dot-2" />
              <input type="radio" name="gender" id="dot-3" />
              <span className="gender-title">Gender</span>
              <div className="category">
                <label for="dot-1">
                  <span className="dot one"></span>
                  <span className="gender">Male</span>
                </label>
                <label for="dot-2">
                  <span className="dot two"></span>
                  <span className="gender">Female</span>
                </label>
                <label for="dot-3">
                  <span className="dot three"></span>
                  <span className="gender">Prefer not to say</span>
                </label>
              </div>
            </div>
            <div className="button">
              <input type="submit" value="Register" />
            </div>
            <p className="forgot-password text-right">
              Already have an Account  <NavLink to="/login"> <h4>sign in?</h4></NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>

  )
};
export default Register;
