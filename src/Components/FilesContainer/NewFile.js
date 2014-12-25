import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItem,
  Input,
  Button,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import firebaseFileUpload from "../../Firebase/FirebaseFileUpload";
import axios from "axios";
import "./NewFile.css";
import { useDispatch, useSelector } from "react-redux";
import {
  api_call_failed,
  api_call_starts,
  api_call_success,
} from "../../Redux/action/fileAction";
import { BASEURL } from "../../Url";
//add new files
function NewFile() {
  const [open, setOpen] = useState(false); //dialog box
  const [file, setFile] = useState(null); //file
  const [progress, setProgress] = useState(0); //progress of uploading
  const [loading, setLoading] = useState(false); //loading
  const _id = useSelector((state) => state.user?.userInfo?._id);

  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFile("");
  };
  const fileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = (fileName, url, size) => {
    dispatch(api_call_starts());
    const data = {
      fileName,
      fileUrl: url,
      size,
      type: file.type,
      userId: _id,
    };
    axios
      .post(`${BASEURL}/file`, data)
      .then((res) => {
        setOpen(false);
        setFile("");
        dispatch(api_call_success());
      })
      .catch((err) => {
        console.log(err);
        dispatch(api_call_failed());
      });
  };

  const handleUpload = () => {
    firebaseFileUpload({
      file,
      setProgress,
      uploadFile,
      setLoading,
      type: "newfile",
      userId: _id,
    });
  };

  return (
    <div>
      <ListItem
        button
        style={{ padding: 0, height: "40px" }}
        onClick={handleClickOpen}
      >
        <AddIcon fontSize="large" style={{ margin: "0 14px" }} />
        <p style={{ margin: 0 }}>
          <b>Add</b>
        </p>
      </ListItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Select files you want to upload!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <label htmlFor="file">
              <Input
                style={{ display: "none" }}
                id="file"
                onChange={fileUpload}
                type="file"
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <Button component="span">Choose File</Button>

                {file ? (
                  <p className="fileName">{file.name}</p>
                ) : (
                  <p style={{ margin: 0 }}>No file selected</p>
                )}
                {/* loader indicator with progress//file uploader */}
              </div>
            </label>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              {loading ? (
                <Box sx={{ position: "absolute" }}>
                  <CircularProgress
                    variant="determinate"
                    color="secondary"
                    value={progress}
                    size={32}
                  />
                  <Box
                    sx={{
                      top: -3,
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
                      fontSize={9}
                      color="WindowText"
                    >
                      {`${progress}%`}
                    </Typography>
                  </Box>
                </Box>
              ) : (
                ""
              )}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button disabled={!file || loading} onClick={handleUpload} autoFocus>
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NewFile;
