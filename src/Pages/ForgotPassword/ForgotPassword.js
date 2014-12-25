import { TextField, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import "./ForgotPassword.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { green } from "@mui/material/colors";
import { BASEURL } from "../../Url";

//forgot password page
function ForgotPassword() {
  const history = useHistory();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (emailVerify) => {
        verifyBtn(emailVerify);
      },
    });

  const verifyBtn = (emailVerify) => {
    setLoading(true);
    axios
      .post(`${BASEURL}/auth/forgot-password`, emailVerify)
      .then((res) => {
        setError("");
        setSuccess(res.data.message);
        setLoading(false);
        console.log(res.data.message);
      })
      .catch((err) => {
        // toast.error(err.response.data.message);
        setError(err.response.data.message);
        setLoading(false);
      });
  };
  return (
    <section className="forgotPasswordContainer">
      {success ? (
        <div className="successMessage">
          <CheckCircleOutlineIcon
            color="success"
            style={{ fontSize: "100px" }}
          />
          <h5>{success}</h5>
          <Button
            style={{ marginTop: "20px" }}
            variant="contained"
            color="info"
            onClick={() => history.push("/signin")}
          >
            Sign In
          </Button>
        </div>
      ) : (
        <form className="forgotPassword" onSubmit={handleSubmit}>
          <h2>Forgot Password</h2>
          {error && (
            <p style={{ color: "red", marginBottom: "0px" }}>{error}</p>
          )}
          <TextField
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            id="email"
            name="email"
            label="Enter your email"
            variant="standard"
            error={errors.email && touched.email}
            helperText={errors.email && touched.email && errors.email}
          />
          <div className="resetBtn">
            <Button
              variant="contained"
              disabled={loading}
              color="warning"
              type="submit"
            >
              Send Password Reset Link
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
      )}
    </section>
  );
}

//validation schema for email
const formValidationSchema = yup.object({
  email: yup
    .string()
    .email("Please Provide a valid Email")
    .required("fill email please"),
});
export default ForgotPassword;
