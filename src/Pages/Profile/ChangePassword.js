import {
  Button,
  Dialog,
  IconButton,
  FormHelperText,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  DialogTitle,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import * as yup from "yup";
//toast
import { toast } from "react-toastify";
import { BASEURL } from "../../Url";

//change password in profile(dialog box)
export function ChangePassword({ dialogOpen, setDialogOpen }) {
  const user = useSelector((state) => state.user.userInfo);
  //validation
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: formValidationSchema,
    onSubmit: (newPassword) => {
      axios
        .put(`${BASEURL}/user/${user._id}`, {
          password: newPassword.password,
          _id: user._id,
        })
        .then((res) => {
          toast.success("Password changed successfully");
          setDialogOpen(false);
          resetForm();
        })
        .catch((err) => console.log(err.response.data.message));
    },
  });
  return (
    <section>
      <Dialog open={dialogOpen}>
        <DialogTitle style={{ textAlign: "center", fontFamily: "poppins" }}>
          Change Password
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <div className="ProfilePassword">
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
            <div className="dialogBoxBtn">
              <Button
                color="secondary"
                onClick={() => {
                  setDialogOpen(false);
                  resetForm();
                }}
              >
                cancel
              </Button>
              <Button variant="contained" color="success" type="submit">
                Change
              </Button>
            </div>
          </div>
        </form>
      </Dialog>
    </section>
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
