import { useState, Suspense } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import {
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ImageIcon from "@mui/icons-material/Image";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import WbCloudyIcon from "@mui/icons-material/WbCloudy";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  useHistory,
  Switch,
  Route,
  Redirect,
  Link,
  Router,
} from "react-router-dom";
import NewFile from "./FilesContainer/NewFile";
import Recent from "../Pages/Recent";
import Image from "../Pages/Image";
import Video from "../Pages/Video";
import AllFiles from "../Pages/AllFiles";
import Music from "../Pages/Music";
import Loader from "./Loader";
//
import { ToProtect } from "../Router/ProtectedRouterData";
import RouterProtection from "../Router/RouterProtection";
import { Musics } from "./FilesContainer/FileItems";
import Signin from "../Pages/Signin/Signin";
import { SettingMenu } from "./SettingMenu";
const drawerWidth = 240;

function Dashboard(props) {
  const history = useHistory();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sideBarMen = [
    {
      name: "Recent",
      path: "/",
    },
    {
      name: "Photos",
      path: "/photos",
    },
    {
      name: "Videos",
      path: "/videos",
    },
    {
      name: "Music",
      path: "/music",
    },
    {
      name: "All Files",
      path: "/all-files",
    },
  ];

  const drawer = (
    <div>
      <div
        onClick={() => history.push("/")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginLeft: "20px",
          height: "63px",
          cursor: "pointer",
        }}
      >
        <WbCloudyIcon color="info" fontSize="large" />
        <p style={{ margin: "0px" }}>
          <b>Storage App</b>
        </p>
      </div>
      <Divider />
      <List>
        <NewFile />
      </List>
      <Divider />
      <List>
        {sideBarMen.map((item, index) => (
          <ListItem onClick={() => history.push(item.path)} button key={index}>
            <ListItemIcon>
              {index === 0 ? (
                <AccessTimeIcon />
              ) : index === 1 ? (
                <ImageIcon />
              ) : index === 2 ? (
                <VideoFileIcon />
              ) : index === 3 ? (
                <MusicNoteIcon />
              ) : (
                <InsertDriveFileIcon />
              )}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: "#272727",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div style={{ marginLeft: "auto" }}>
            <SettingMenu />
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Suspense fallback={<Loader />}>
          <Switch>
            {ToProtect.map((route, index) => {
              return (
                <RouterProtection
                  path={route.path}
                  key={index}
                  component={route.component}
                  exact={route.exact}
                />
              );
            })}
          </Switch>
        </Suspense>
      </Box>
    </Box>
  );
}

export default Dashboard;

export const settings = [
  { name: "Profile", path: "/profile" },
  { name: "Logout", path: "/signin" },
];
