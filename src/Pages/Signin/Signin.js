import "./Signin.css";
import {
  Button,
  TextField,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
//
import { useHistory } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
//
import { green } from "@mui/material/colors";
import { useSelector, useDispatch } from "react-redux";
import {
  login_starts,
  login_successful,
  login_failed,
} from "../../Redux/action/userAction";
import { BASEURL } from "../../Url";

//sign in
function Signin() {
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const history = useHistory();
  //validation
  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (signinUser) => {
        signIn(signinUser);
      },
    });

  const signIn = (signinUser) => {
    dispatch(login_starts());
    axios
      .post(`${BASEURL}/auth/signin`, signinUser)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        dispatch(login_successful(res.data.loginData)); // user info will stored in local storage and pass the data to all components via redux
        history.push("/");
      })
      .catch((err) => dispatch(login_failed(err.response.data.message))); //error message
  };

  //demo credential
  const handleSignin = () => {
    const signinUser = {
      email: "test@gmail.com",
      password: "Test@123",
    };
    // dispatch(login_starts());
    setIsLoading(true);
    axios
      .post(`${BASEURL}/auth/signin`, signinUser)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setIsLoading(false);
        dispatch(login_successful(res.data.loginData)); // user info will stored in local storage and pass the data to all components via redux
        history.push("/");
      })
      .catch(() => setIsLoading(false)); //error message
  };

  return (
    <form className="signInFormContainer" onSubmit={handleSubmit}>
      <div className="signInForm">
        <h2>Sign In</h2>
        <h4 style={{ color: "red", marginBottom: "15px" }}>{error}</h4>
        <div className="signInInputs">
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
                    onClick={handleClickShowPassword}
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
          <Button
            type="submit"
            sx={{
              borderRadius: "5px",
              boxShadow: "none",
              padding: "5px",
            }}
            variant="contained"
            color="secondary"
            disabled={isFetching}
          >
            <p className="optionBtn">Sign In</p>
            {isFetching ? (
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
          <Button
            onClick={handleSignin}
            disabled={isLoading}
            sx={{
              borderRadius: "5px",
              boxShadow: "none",
              padding: "5px",
            }}
            variant="contained"
            color="success"
          >
            <p className="optionBtn">Sign in with demo credential</p>
            {isLoading && (
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
            )}
          </Button>
        </div>
        <div className="signInBtn">
          <p style={{ margin: 0, display: "inline" }}>
            Don't have an account?
            <Button
              style={{ color: "white", textDecoration: "underLine" }}
              onClick={() => {
                history.push("/signup");
              }}
            >
              Sign Up
            </Button>
          </p>
          <Button
            color="warning"
            onClick={() => {
              history.push("/forgot-password");
            }}
          >
            <p className="optionBtn">Forgot Password?</p>
          </Button>
        </div>
      </div>
    </form>
  );
}

//validation schema
const formValidationSchema = yup.object({
  email: yup
    .string()
    .email("Please provide valid email")
    .required("please fill the Email"),
  password: yup.string().required("please fill the Password"),
});

export default Signin;
