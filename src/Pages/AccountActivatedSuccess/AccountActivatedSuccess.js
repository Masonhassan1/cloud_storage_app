import "./AccountActivatedSuccess.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { BASEURL } from "../../Url";

//when user click the url from the email after signup to activate the account
function AccountActivatedSuccess() {
  const history = useHistory();
  const { token } = useParams();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .get(`${BASEURL}/auth/account-verification/${token}`)
      .then((res) => {
        setSuccess(res.data.message);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }, [token]);
  return (
    <div className="accountActivationContainer">
      <div className="accountActivation">
        {/* when the user click the link after activating a account it shows warning */}
        {success ? ( //success ==true verified successfully message will display
          <>
            <CheckCircleOutlineIcon
              color="success"
              style={{ fontSize: "100px" }}
            />
            <h5>{success}</h5>
          </>
        ) : (
          //else link expired messsage will display
          <>
            <h3>Cloud Storage App</h3>
            <WarningAmberIcon color="warning" style={{ fontSize: "80px" }} />
            <h5>Account Activation {error}</h5>
          </>
        )}
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

export default AccountActivatedSuccess;
