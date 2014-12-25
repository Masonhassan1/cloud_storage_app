import React from "react";
import "./Signup.css";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  TextField,
  Button,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { green } from "@mui/material/colors";
import { toast } from "react-toastify";
import { BASEURL } from "../../Url";

//sign up
function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const history = useHistory();
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  //validation
  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (newUser) => {
        signUp(newUser);
      },
    });

  const signUp = (newUser) => {
    setIsLoading(true);
    setError(null);
    const { confirmPassword, ...other } = newUser;
    axios
      .post(`${BASEURL}/auth/signup`, other)
      .then((res) => {
        setIsLoading(false);
        setError(null);
        toast.success(res.data.message);
        history.push("/signin");
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.message);
      });
  };
  return (
    <form className="signUpFormContainer" onSubmit={handleSubmit}>
      <div className="signUpForm">
        <h2>Sign Up</h2>
        <h4 style={{ color: "red", marginBottom: "15px" }}>{error}</h4>
        <div className="signUpInputs">
          <TextField
            fullWidth
            label="User Name"
            color="secondary"
            variant="standard"
            id="userName"
            value={values.userName}
            error={errors.userName && touched.userName}
            helperText={errors.userName && touched.userName && errors.userName}
            onChange={handleChange}
            onBlur={handleBlur}
          ></TextField>
          <TextField
            fullWidth
            label="Email"
            color="secondary"
            variant="standard"
            id="email"
            value={values.email}
            error={errors.email && touched.email}
            helperText={errors.email && touched.email && errors.email}
            onChange={handleChange}
            onBlur={handleBlur}
          ></TextField>
          <FormControl
            error={errors.password && touched.password}
            fullWidth
            variant="standard"
            color="secondary"
          >
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText color="error" id="component-error-text">
              {errors.password && touched.password && errors.password}
            </FormHelperText>
          </FormControl>

          <FormControl
            error={errors.confirmPassword && touched.confirmPassword}
            fullWidth
            variant="standard"
            color="secondary"
          >
            <InputLabel htmlFor="standard-adornment-password">
              Confirm Password
            </InputLabel>
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText color="error" id="component-error-text">
              {errors.confirmPassword &&
                touched.confirmPassword &&
                errors.confirmPassword}
            </FormHelperText>
          </FormControl>
          <Button
            type="submit"
            sx={{
              borderRadius: "5px",
              boxShadow: "none",
            }}
            variant="contained"
            color="secondary"
            disabled={isLoading}
          >
            <p className="signUpBtn">Sign Up</p>
            {isLoading ? (
              <CircularProgress
                size={24}
                sx={{
                  color: green[500],
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            ) : (
              ""
            )}
          </Button>
          <p style={{ margin: 0 }}>
            Already have an account?
            <span>
              <Button
                onClick={() => {
                  history.push("/signin");
                }}
              >
                <span style={{ textDecoration: "underLine", color: "white" }}>
                  Sign In
                </span>
              </Button>
            </span>
          </p>
        </div>
      </div>
    </form>
  );
}
//validation schema
const formValidationSchema = yup.object({
  userName: yup.string().required("please fill the User Name"),
  email: yup
    .string()
    .email("please provide valid email")
    .required("please fill the Email"),
  password: yup
    .string()
    .required("please fill the Password")
    .min(8, "Password should be at least 8 characters")
    .matches(
      /[a-z]/,
      "Password should contain at least one lower caser case letter"
    )
    .matches(
      /[A-Z]/,
      "Password should contain at least one upper caser case letter"
    )
    .matches(/[0-9]/, "Password should contain at least one number")
    .matches(
      /[`!@#$%^&*()_+\-=[\]{};':"\\/,.<>/?~]/,
      "Password should contain at least one non-alphanumeric character (@,!,#,etc)"
    ),
  confirmPassword: yup
    .string()
    .required("please fill the confirm password")
    .min(8, "Password should be at least 8 characters")
    .matches(
      /[a-z]/,
      "Password should contain at least one lower caser case letter"
    )
    .matches(
      /[A-Z]/,
      "Password should contain at least one upper caser case letter"
    )
    .matches(/[0-9]/, "Password should contain at least one number")
    .matches(
      /[`!@#$%^&*()_+\-=[\]{};':"\\/,.<>/?~]/,
      "Password should contain at least one non-alphanumeric character (@,!,#,etc)"
    )
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref("password")], "Both password need to be the same"),
    }),
});

export default SignUp;
