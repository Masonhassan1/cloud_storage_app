import "./ResetPassword.css";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  FormHelperText,
  InputAdornment,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import { green } from "@mui/material/colors";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { BASEURL } from "../../Url";

//reset password -when user click a link from mail after forgot password process
function ResetPassword() {
  const history = useHistory();
  const { token } = useParams();

  const [response, setResponse] = useState(false); //to verify token is matched or not
  const [loading, setLoading] = useState(false);

  //validation
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  useEffect(() => {
    axios
      .get(`${BASEURL}/auth/forgot-password/verify`, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        setResponse(true);
      })
      .catch((err) => {
        setResponse(false);
        console.log(err.response.data.message);
      });
  }, [token]);

  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        confirmPassword: "",
        password: "",
        token: token,
      },
      validationSchema: formValidationSchema,
      onSubmit: (newPassword) => {
        verifyBtn(newPassword);
      },
    });

  const verifyBtn = (newPassword) => {
    setLoading(true);
    const { confirmPassword, ...others } = newPassword;

    axios
      .post(`${BASEURL}/auth/change-password`, others)
      .then(() => {
        setLoading(false);
        history.push("/passwordchanged-Successfully");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setLoading(false);
      });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className="resetPasswordContainer">
      {response ? ( //response ok text fiels will display
        <div className="resetPasswordWraper">
          <form className="resetPasswordInput" onSubmit={handleSubmit}>
            <DialogTitle
              style={{
                textAlign: "center",
                fontFamily: "poppins",
                fontSize: "30px",
              }}
            >
              Change Password
            </DialogTitle>
            <FormControl
              margin="dense"
              fullWidth
              error={errors.password && touched.password}
              variant="outlined"
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
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
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              <FormHelperText color="error" id="component-error-text">
                {errors.password && touched.password && errors.password}
              </FormHelperText>
            </FormControl>
            <FormControl
              margin="dense"
              fullWidth
              error={errors.confirmPassword && touched.confirmPassword}
              variant="outlined"
            >
              <InputLabel htmlFor="confirmPassword">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />
              <FormHelperText color="error" id="component-error-text">
                {errors.confirmPassword &&
                  touched.confirmPassword &&
                  errors.confirmPassword}
              </FormHelperText>
            </FormControl>
            <div className="submitBtn">
              <Button
                variant="contained"
                disabled={loading}
                color="success"
                type="submit"
              >
                Change Password{" "}
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: green[800],
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
          </form>
        </div>
      ) : (
        //else link no longer message will display
        <div className="invalidPage">
          <ErrorOutlineOutlinedIcon
            color="error"
            style={{ fontSize: "50px" }}
          />
          <h5>Sorry, your password reset link is no longer valid.</h5>
          <div className="invalidPageBtn">
            <Button
              onClick={() => history.push("/forgot-password")}
              color="warning"
            >
              Forgot password
            </Button>
            <Button onClick={() => history.push("/signin")} color="info">
              Sign In
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
// password validation schema
const formValidationSchema = yup.object({
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

export default ResetPassword;
