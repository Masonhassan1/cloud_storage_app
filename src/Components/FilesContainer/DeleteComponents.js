import React from "react";
import {
  Slide,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  DialogContentText,
} from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  api_call_failed,
  api_call_starts,
  api_call_success,
} from "../../Redux/action/fileAction";
import { toast } from "react-toastify";

//delete dialog box
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function DeleteAccDialogBtn({ dialogOpen, setDialogOpen, fileObj }) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(api_call_starts());
    axios
      .delete(`http://localhost:9000/file/${fileObj._id}`)
      .then(() => {
        toast.success(`${fileObj.fileName} is deleted successfully`);
        setDialogOpen(false);
        dispatch(api_call_success());
      })
      .catch((err) => {
        console.log(err);
        dispatch(api_call_failed());
      });
  };
  return (
    <div>
      <Dialog
        open={dialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setDialogOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <DialogContentText>
            <p>
              Are you sure. Do you want to delete<b> {fileObj?.fileName}?</b>
            </p>
          </DialogContentText>
        </DialogTitle>
        <DialogActions>
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => setDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
