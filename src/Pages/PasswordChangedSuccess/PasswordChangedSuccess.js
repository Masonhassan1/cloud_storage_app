import "./PasswordChangedSuccess.css";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

//after successfully password changed
function PasswordChangedSuccess() {
  const history = useHistory();

  return (
    <div className="passSuccessContainer">
      <div className="passSuccess">
        <CheckCircleOutlineIcon color="success" style={{ fontSize: "100px" }} />
        <h5>Password Changed Successfully</h5>
        <p>You can login with your new password</p>

        <Button
          style={{ marginTop: "20px" }}
          variant="contained"
          color="info"
          onClick={() => history.push("/signin")}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default PasswordChangedSuccess;
