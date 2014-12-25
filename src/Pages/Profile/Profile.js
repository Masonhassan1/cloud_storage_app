import "./Profile.css";
import React from "react";
import {
  TextField,
  Tooltip,
  Button,
  Fade,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
  Box,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ChangePassword } from "./ChangePassword";
import { useDispatch, useSelector } from "react-redux";

import { useFormik } from "formik";
import * as yup from "yup";
import firebaseFileUpload from "../../Firebase/FirebaseFileUpload";
import axios from "axios";
import {
  userUpdateStart,
  userUpdateSuccess,
  userUpdateFailure,
  logout,
} from "../../Redux/action/userAction";
import { useHistory } from "react-router-dom";
//toast
import { toast } from "react-toastify";
import { BASEURL } from "../../Url";

function Profile() {
  const history = useHistory();
  const user = useSelector((state) => state.user.userInfo);
  const { error, isFetching } = useSelector((state) => state.user);
  //update updated used info to redux store and local storage
  const dispatch = useDispatch();

  const Input = styled("input")({
    display: "none",
  });

  //mobile option
  const [anchorEl, setAnchorEl] = useState(null);
  const option = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //delete dialog
  const [open, setOpen] = useState(false);

  const confirmDelete = () => {
    axios
      .delete(`${BASEURL}/user/${user._id}`, {
        data: { _id: user._id },
      })
      .then(() => {
        dispatch(logout());
        toast.success("Account deleted successfully");
        history.push("/signin");
      })
      .catch((err) => console.log(err));
    setOpen(false);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setAnchorEl(null);
    setOpen(true);
  };

  //file upload
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const fileUpload = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      const file = e.target.files[0];
      firebaseFileUpload({
        //firebase file uplaoder
        file,
        setUrl,
        userId: user._id,
        setProgress,
        setLoading,
        type: "profile",
      });
    }
    return;
  };

  //validation
  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        userName: user.userName,
        email: user.email,
      },
      validationSchema: formValidationSchema,
      onSubmit: (updatedProfile) => {
        dispatch(userUpdateStart());
        updatedProfile.profilePic = url ? url : user.profilePic;
        axios
          .put(`${BASEURL}/user/${user._id}`, {
            userName: updatedProfile.userName,
            email: updatedProfile.email,
            profilePic: updatedProfile.profilePic,
            _id: user._id,
          })
          .then((res) => {
            dispatch(userUpdateSuccess(res.data));
            toast.success("Profile updated successfully");
            setUrl("");
          })
          .catch((err) =>
            dispatch(userUpdateFailure(err.response.data.message))
          );
      },
    });
  //delete popup
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <section>
      <form className="profile" onSubmit={handleSubmit}>
        {loading && (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "40%",
              zIndex: "2",
            }}
          >
            <Box sx={{ position: "absolute" }}>
              <CircularProgress
                variant="determinate"
                color="info"
                value={progress}
                size={53}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="caption"
                  component="div"
                  fontSize={17}
                  color="WindowText"
                >
                  {`${progress}%`}
                </Typography>
              </Box>
            </Box>
          </div>
        )}
        <div className="profileContainer">
          <div>
            <h1 className="profileTitle">Profile</h1>
            <div className="profileDltBtn">
              <Button color="error" onClick={handleDelete}>
                Delete Account
              </Button>
            </div>
            <div className="ProfileOptionMobileView">
              <Button onClick={handleMenuClick}>
                <MoreVertIcon />
              </Button>
              {/* for mobile menu icon will display */}
              <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={option}
                onClose={handleMenuClose}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={handleDelete}>
                  <p
                    style={{
                      fontSize: "14px",
                      marginBottom: "0px",
                    }}
                  >
                    Delete Account
                  </p>
                </MenuItem>
              </Menu>
            </div>
            {/* when user click delete account dialog box will display to confirm */}
            <div className="deleteDialog">
              <DeleteAccDialogBtn
                open={open}
                setOpen={setOpen}
                confirmDelete={confirmDelete}
              />
            </div>
            <div className="profileUpdate">
              <h4>Profile Picture</h4>
              <div className="profilePicUpload">
                <label htmlFor="contained-button-file">
                  <Avatar
                    alt="Remy Sharp"
                    src={url ? url : user.profilePic}
                    sx={{ width: 66, height: 66 }}
                  >
                    {user && user ? user.userName[0] : "profile pic"}
                  </Avatar>
                </label>
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                    onChange={fileUpload}
                  />
                  <Tooltip arrow title="Upload">
                    <AddIcon color="action" style={{ fontSize: "40px" }} />
                  </Tooltip>
                </label>
                {url ? ( //after image is clicked remove icon will shown
                  <Button
                    color="error"
                    onClick={() => setUrl("")}
                    variant="text"
                  >
                    Remove
                  </Button>
                ) : (
                  ""
                )}
              </div>
              <div className="profileInputs">
                <label htmlFor="name">
                  <h4>User Name</h4>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                </label>
                <TextField
                  variant="outlined"
                  label="Enter your User Name"
                  id="userName"
                  value={values.userName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.userName && touched.userName}
                  helperText={
                    errors.userName && touched.userName && errors.userName
                  }
                ></TextField>

                <label htmlFor="email">
                  <h4>Email</h4>
                </label>
                <TextField
                  variant="outlined"
                  label="Email"
                  id="email"
                  value={user.email}
                  disabled={true}
                ></TextField>
                <Button color="warning" onClick={() => setDialogOpen(true)}>
                  Change Password
                </Button>
                <Button
                  disabled={loading}
                  color="success"
                  variant="text"
                  type="submit"
                >
                  Update
                  {isFetching && (
                    <CircularProgress
                      sx={{ marginLeft: "7px" }}
                      color="success"
                      size={17}
                    />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <ChangePassword dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
    </section>
  );
}
// validation schema
const formValidationSchema = yup.object({
  userName: yup
    .string()
    .min(3, "Need bigger user name")
    .required("fill user name please"),
});

//delete dialog box
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DeleteAccDialogBtn({ open, setOpen, confirmDelete }) {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {"Are you sure. Do you want to delete your account?"}
        </DialogTitle>
        <DialogActions>
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="outlined" color="error" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
//

export default Profile;
