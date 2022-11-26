
//import "./App.css";

import { FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from "@mui/material";
import { Form, Formik, Field } from "formik";
import validator from "validator";
import Intro from '../../assets/images/bg.jpg'
import { config } from "../../utils/axiosData";
import { NavLink, useNavigate } from 'react-router-dom';
import axios from "axios";

function RegField() {
    const navigate=useNavigate()
    const validateForm = (values) => {
        const errors = {};

        if (!values.name) {
            errors.name = "Name is required";
        } else if (values.name.length > 15) {
            errors.name = "Must be 15 characters or less";
        }
        if (!values.dob) {
            errors.dob = "dob is required";
        }
        if (!values.gender) {
            errors.gender = "gender is required";
        }

        if (!values.email) {
            errors.email = "Email is required";
        } else if (!validator.isEmail(values.email)) {
            errors.email = "Invalid email address";
        }

        // if (!values.phoneNo) {
        //     errors.phoneNo = "Phone No is required";
        // } else if (
        //     !validator.isMobilePhone(values.phoneNo, "en-US", { strictMode: true })
        // ) {
        //     errors.phoneNo = "Invalid Phone Number - +1XXXXXXXXXX";
        // }

        if (!values.password) {
            errors.password = "Password is required";
        } else if (!validator.isStrongPassword(values.password)) {
            errors.password =
                "Password must contain one Capital letter, Small Letter, Number & Special symbol";
        }

        if (!values.confirmPassword) {
            errors.confirmPassword = "Confirm password is required";
        } else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Password does not match";
        }

        return errors;
    };

    const submitHandler = async (e) => {

        console.log('hiiii');
        console.log(e.dob);
        const data = {
            userType: 'GUEST',
            name: e.name,
            email: e.email,
            password: e.password,
            confirmPassword: e.confirmPassword,
            dob: e.dob,
            gender: e.gender
        }
        console.log(data);
        try {
            const res = await axios.post('http://localhost:3001/api/v1/user/reg', data, config)
            console.log(res);
            alert("Registered Succesfully ")
            navigate('/login')
        } catch (error) {
            console.log(error);
            alert("Incorrect data")
        }
    }

    return (
        <div>
           <img className='background-img' src={Intro} alt="bg" />
            <div className="container container-fluid">
                <div className="row wrapper cent">
                    <div className="col-10 col-lg-5">
                        <Formik
                            className="shadow-lg"
                            initialValues={{ name: "", email: "", password: "", dob: "", gender: "" }}
                            validate={validateForm}
                            onSubmit={submitHandler}
                        >
                            {(formik) => (
                                <Form className="colr">
                                    <h1 className="mb-4" style={{color:'white',fontWeight:'600'}}>Sign Up</h1>
                                    <div className="form-group mt-4">
                                        <label htmlFor="name">Name</label>
                                        <Field
                                            name="name"
                                            type="text"
                                            className={
                                                formik.touched.name && formik.errors.name
                                                    ? "form-control is-invalid"
                                                    : "form-control"
                                            }
                                        />

                                        {formik.touched.name && formik.errors.name ? (
                                            <div className="invalid-feedback">{formik.errors.name}</div>
                                        ) : null}
                                    </div>

                                    <div className="form-group mt-4">
                                        <label htmlFor="email">Email</label>
                                        <Field
                                            name="email"
                                            type="email"
                                            className={
                                                formik.touched.email && formik.errors.email
                                                    ? "form-control is-invalid"
                                                    : "form-control"
                                            }
                                        />

                                        {formik.touched.email && formik.errors.email ? (
                                            <div className="invalid-feedback">
                                                {formik.errors.email}
                                            </div>
                                        ) : null}
                                    </div>



                                    <div className="form-group mt-4">
                                        <label htmlFor="password">Password</label>
                                        <Field
                                            name="password"
                                            type="password"
                                            className={
                                                formik.touched.password && formik.errors.password
                                                    ? "form-control is-invalid"
                                                    : "form-control"
                                            }
                                        />

                                        {formik.touched.password && formik.errors.password ? (
                                            <div className="invalid-feedback">
                                                {formik.errors.password}
                                            </div>
                                        ) : null}
                                    </div>

                                    <div className="form-group mt-4">
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <Field
                                            name="confirmPassword"
                                            type="password"
                                            className={
                                                formik.touched.confirmPassword &&
                                                    formik.errors.confirmPassword
                                                    ? "form-control is-invalid"
                                                    : "form-control"
                                            }
                                        />

                                        {formik.touched.confirmPassword &&
                                            formik.errors.confirmPassword ? (
                                            <div className="invalid-feedback">
                                                {formik.errors.confirmPassword}
                                            </div>
                                        ) : null}
                                    </div>



                                    <div className="form-group mt-4">
                                        <label htmlFor="Date of Birth">DOB:</label>
                                        <Field
                                            name="dob"
                                            type="date"
                                            className={
                                                formik.touched.dob && formik.errors.dob
                                                    ? "form-control is-invalid"
                                                    : "form-control"
                                            }
                                        />

                                        {formik.touched.dob && formik.errors.dob ? (
                                            <div className="invalid-feedback">
                                                {formik.errors.dob}
                                            </div>
                                        ) : null}
                                    </div>


                                    <div  id="my-radio-group">Gender</div>
                                    <div role="group" aria-labelledby="my-radio-group"  className='point'>
                                        <label>
                                            <Field  type="radio" name="gender" value="Male" />
                                            Male
                                        </label>&emsp;&emsp;
                                        <label>
                                            <Field type="radio" name="gender" value="Female" />
                                            Female
                                        </label>
                                        <label>&emsp;&emsp;
                                            <Field type="radio" name="gender" value="Other" />
                                            Other
                                        </label>
                                        {/* <div>gender: {formik.gender}</div> */}


                                        {formik.touched.gender && formik.errors.gender ? (
                                            <div className="invalid-feedback">
                                                {formik.errors.gender}
                                            </div>
                                        ) : null}
                                    </div>





                                    <div className="form-group">
                                        <button
                                            type="submit"
                                            className="btn btn-block btn-primary py-3 mt-4 w-100"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegField;