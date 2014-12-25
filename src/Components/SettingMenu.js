import { useState } from "react";
import Box from "@mui/material/Box";
import { IconButton, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { logout } from "../Redux/action/userAction";
import { useDispatch } from "react-redux";
import { settings } from "./Dashboard.";

//settings menu
export function SettingMenu() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleAction = (path, name) => {
    if (name === "Profile") {
      history.push(path);
    } else {
      history.push(path);
      dispatch(logout());
    }
  };
  const userName = useSelector((state) => state.user?.userInfo?.userName);
  const profilePic = useSelector((state) => state.user?.userInfo?.profilePic);
  return (
    <div>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title={userName}>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt={userName} src={profilePic ? profilePic : ""} />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((item, index) => (
            <MenuItem key={index} onClick={handleCloseUserMenu}>
              <Typography
                onClick={() => handleAction(item.path, item.name)}
                textAlign="center"
              >
                {item.name}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </div>
  );
}
