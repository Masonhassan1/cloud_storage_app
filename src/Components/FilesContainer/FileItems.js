import React, { useRef, useState } from "react";
import "./FileItems.css";
import ImgsViewer from "react-images-viewer";
import {
  ImageList,
  ImageListItem,
  IconButton,
  ImageListItemBar,
  Popover,
  ListSubheader,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { handleDownload, getReadableFileSizeString } from "../../helper/helper";
import { DeleteAccDialogBtn } from "./DeleteComponents";

//photos component
export function Photos({ files }) {
  const [imageOpen, setImageOpen] = useState(false);
  const [data, setData] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [fileData, setFileData] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const fileObj = useRef(null);

  const handleClick = (e, data) => {
    setAnchorEl(e.currentTarget);
    setFileData({
      name: data.fileName,
      size: getReadableFileSizeString(data.size),
      createdAt: new Date(data.createdAt).toDateString(),
      type: data.type,
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const path = "photos";
  const filePath = window.location.pathname.includes(path);
  return (
    <div>
      <ImageList>
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div">
            {filePath ? "Photos" : "Recent Photos"}
          </ListSubheader>
        </ImageListItem>
        {files.map((item) => (
          <div key={item._id}>
            <ImageListItem>
              <img
                className="image"
                src={`${item.fileUrl}?w=248&fit=crop&auto=format`}
                srcSet={`${item.fileUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.fileName}
                loading="lazy"
                onClick={() => {
                  setImageOpen(true);
                  setData({ img: item.fileUrl, title: item.fileName });
                }}
              />
              <div className="photoDownloadBtn">
                <IconButton
                  sx={{ color: "white" }}
                  onClick={() => handleDownload(item.fileUrl, item.fileName)}
                  aria-label={`info about ${item.fileName}`}
                >
                  <DownloadForOfflineIcon color="inherit" />
                </IconButton>
              </div>
              <ImageListItemBar
                title={item.fileName}
                actionIcon={
                  <div style={{ display: "flex" }}>
                    <IconButton
                      sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      aria-label={`info about ${item.fileName}`}
                      onClick={() => {
                        setDialogOpen(true);
                        fileObj.current = item;
                      }}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>

                    <IconButton
                      sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      aria-label={`info about ${item.fileName}`}
                      onClick={(e) => handleClick(e, item)}
                      aria-describedby={item.createdAt}
                    >
                      <InfoIcon />
                    </IconButton>
                    <Popover
                      style={{ opacity: "0.8" }}
                      id={item.createdAt}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      <div className="poper">
                        <p>
                          <b>file name: </b>
                          {fileData.name}
                        </p>
                        <p>
                          <b>Size: </b>
                          {fileData.size}
                        </p>
                        <p>
                          <b>created: </b>
                          {fileData.createdAt}
                        </p>
                        <p>
                          <b>type: </b>
                          {fileData.type}
                        </p>
                      </div>
                    </Popover>
                  </div>
                }
              />
            </ImageListItem>
            <ImgsViewer
              imgs={[
                {
                  src: data.img,
                  caption: data.title,
                },
              ]}
              isOpen={imageOpen}
              onClose={() => setImageOpen(false)}
            />
          </div>
        ))}
      </ImageList>
      <DeleteAccDialogBtn
        setDialogOpen={setDialogOpen}
        fileObj={fileObj.current}
        dialogOpen={dialogOpen}
      />
    </div>
  );
}

//videos component
export function Videos({ files }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [fileData, setFileData] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const fileObj = useRef(null);

  const handleClick = (e, data) => {
    setAnchorEl(e.currentTarget);
    setFileData({
      name: data.fileName,
      size: getReadableFileSizeString(data.size),
      createdAt: new Date(data.createdAt).toDateString(),
      type: data.type,
    });
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const path = "videos";
  const filePath = window.location.pathname.includes(path);
  return (
    <div>
      <ListSubheader component="div">
        {filePath ? "Videos" : "Recent Videos"}
      </ListSubheader>
      {files.map((item) => (
        <ImageListItem key={item._id} style={{ margin: "10px" }}>
          <a href={item.fileUrl}>
            <video className="video">
              <source src={item.fileUrl}></source>
            </video>
          </a>
          <div className="videoDownloadBtn">
            <IconButton
              sx={{ color: "white" }}
              onClick={() => handleDownload(item.fileUrl, item.fileName)}
              aria-label={`info about ${item.fileName}`}
            >
              <DownloadForOfflineIcon color="inherit" />
            </IconButton>
          </div>
          <ImageListItemBar
            title={item.fileName}
            actionIcon={
              <div style={{ display: "flex" }}>
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.fileName}`}
                  onClick={() => {
                    setDialogOpen(true);
                    fileObj.current = item;
                  }}
                >
                  <DeleteIcon color="error" />
                </IconButton>
                <DeleteAccDialogBtn />
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.fileName}`}
                  onClick={(e) => handleClick(e, item)}
                  aria-describedby={item.createdAt}
                >
                  <InfoIcon />
                </IconButton>
                <Popover
                  style={{ opacity: "0.8" }}
                  id={item.createdAt}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <div className="poper">
                    <p>
                      <b>file name: </b>
                      {fileData.name}
                    </p>
                    <p>
                      <b>Size: </b>
                      {fileData.size}
                    </p>
                    <p>
                      <b>created: </b>
                      {fileData.createdAt}
                    </p>
                    <p>
                      <b>type: </b>
                      {fileData.type}
                    </p>
                  </div>
                </Popover>
              </div>
            }
          />
        </ImageListItem>
      ))}
      <DeleteAccDialogBtn
        setDialogOpen={setDialogOpen}
        fileObj={fileObj.current}
        dialogOpen={dialogOpen}
      />
    </div>
  );
}

//files component
export function Files(props) {
  const { filter, setFilter, files } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [fileData, setFileData] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const fileObj = useRef(null);

  const handleClick = (e, data) => {
    setAnchorEl(e.currentTarget);
    setFileData({
      name: data.fileName,
      size: getReadableFileSizeString(data.size),
      createdAt: new Date(data.createdAt).toDateString(),
      type: data.type,
    });
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  const open = Boolean(anchorEl);
  const path = "all-files";
  const filePath = window.location.pathname.includes(path);
  //different file images
  const applicationImage =
    "https://firebasestorage.googleapis.com/v0/b/cloud-storage-app-9119a.appspot.com/o/application.png?alt=media&token=7748eddf-5732-4899-9ac2-3c2efac33ba9";
  const zipFileImage =
    "https://firebasestorage.googleapis.com/v0/b/cloud-storage-app-9119a.appspot.com/o/zip-file.jpg?alt=media&token=ddf28201-03f7-4ee2-9933-05bb9439c5ea";
  const pdfImage =
    "https://firebasestorage.googleapis.com/v0/b/cloud-storage-app-9119a.appspot.com/o/pdf.png?alt=media&token=221bf8a4-5bc3-450d-b920-96cfb673dcc7";
  const docImage =
    "https://firebasestorage.googleapis.com/v0/b/cloud-storage-app-9119a.appspot.com/o/doc.png?alt=media&token=f4475806-3577-4d12-b180-d4053aa4ea40";
  return (
    <div>
      <div className="filesHeader">
        <ListSubheader component="div">
          {filePath ? "Files" : "Recent Files"}
        </ListSubheader>
        {filePath && (
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Filter</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              label="filter"
              onChange={handleChange}
            >
              <MenuItem value="application/">All</MenuItem>
              <MenuItem value="application/pdf">Pdf</MenuItem>
              <MenuItem value="application/vnd">Docs</MenuItem>
              <MenuItem value="application/zip">Zip</MenuItem>
            </Select>
          </FormControl>
        )}
      </div>
      {files.length === 0 ? (
        <ListSubheader component="div">Files Not Found</ListSubheader>
      ) : (
        files.map((item) => (
          <ImageListItem key={item._id} style={{ margin: "20px 15px" }}>
            <a href={item.fileUrl}>
              <img
                className="files"
                alt={item.fileName}
                src={
                  item.type.includes("/pdf")
                    ? pdfImage
                    : item.type.includes("/vnd")
                    ? docImage
                    : item.type.includes("/zip")
                    ? zipFileImage
                    : applicationImage
                }
              ></img>
            </a>
            <div className="fileDownloadBtn">
              <IconButton
                sx={{ color: "black" }}
                onClick={() => handleDownload(item.fileUrl, item.fileName)}
                aria-label={`info about ${item.fileName}`}
              >
                <DownloadForOfflineIcon color="inherit" />
              </IconButton>
            </div>
            <ImageListItemBar
              title={item.fileName}
              actionIcon={
                <div style={{ display: "flex" }}>
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`info about ${item.fileName}`}
                    onClick={() => {
                      setDialogOpen(true);
                      fileObj.current = item;
                    }}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                  <DeleteAccDialogBtn />
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`info about ${item.fileName}`}
                    onClick={(e) => handleClick(e, item)}
                    aria-describedby={item.createdAt}
                  >
                    <InfoIcon />
                  </IconButton>
                  <Popover
                    style={{ opacity: "0.8" }}
                    id={item.createdAt}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <div className="poper">
                      <p>
                        <b>file name: </b>
                        {fileData.name}
                      </p>
                      <p>
                        <b>Size: </b>
                        {fileData.size}
                      </p>
                      <p>
                        <b>created: </b>
                        {fileData.createdAt}
                      </p>
                      <p>
                        <b>type: </b>
                        {fileData.type}
                      </p>
                    </div>
                  </Popover>
                </div>
              }
            />
          </ImageListItem>
        ))
      )}
      <DeleteAccDialogBtn
        setDialogOpen={setDialogOpen}
        fileObj={fileObj.current}
        dialogOpen={dialogOpen}
      />
    </div>
  );
}

//music component
export function Musics({ files }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [fileData, setFileData] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const fileObj = useRef(null);
  const handleClick = (e, data) => {
    setAnchorEl(e.currentTarget);
    setFileData({
      name: data.fileName,
      size: getReadableFileSizeString(data.size),
      createdAt: new Date(data.createdAt).toDateString(),
      type: data.type,
    });
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const path = "music";
  const filePath = window.location.pathname.includes(path);
  return (
    <div>
      <ListSubheader component="div">
        {filePath ? "Music" : "Recent Music"}
      </ListSubheader>
      {files
        .filter((item) => item.type.includes("audio/"))
        .map((item) => (
          <ImageListItem key={item._id} style={{ margin: "20px 15px" }}>
            <a href={item.fileUrl}>
              <img
                alt={item.fileName}
                className="files"
                src="https://i.pinimg.com/originals/3c/d9/b1/3cd9b17cd4f302ae36e52edb5ae794d9.jpg"
              ></img>
            </a>
            <div className="musicDownloadBtn">
              <IconButton
                sx={{ color: "black" }}
                onClick={() => handleDownload(item.fileUrl, item.fileName)}
                aria-label={`info about ${item.fileName}`}
              >
                <DownloadForOfflineIcon color="inherit" />
              </IconButton>
            </div>
            <ImageListItemBar
              title={item.fileName}
              actionIcon={
                <div style={{ display: "flex" }}>
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`info about ${item.fileName}`}
                    onClick={() => {
                      setDialogOpen(true);
                      fileObj.current = item;
                    }}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                  <DeleteAccDialogBtn />
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`info about ${item.fileName}`}
                    onClick={(e) => handleClick(e, item)}
                    aria-describedby={item.createdAt}
                  >
                    <InfoIcon />
                  </IconButton>
                  <Popover
                    style={{ opacity: "0.8" }}
                    id={item.createdAt}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <div className="poper">
                      <p>
                        <b>file name: </b>
                        {fileData.name}
                      </p>
                      <p>
                        <b>Size: </b>
                        {fileData.size}
                      </p>
                      <p>
                        <b>created: </b>
                        {fileData.createdAt}
                      </p>
                      <p>
                        <b>type: </b>
                        {fileData.type}
                      </p>
                    </div>
                  </Popover>
                </div>
              }
            />
          </ImageListItem>
        ))}
      <DeleteAccDialogBtn
        setDialogOpen={setDialogOpen}
        fileObj={fileObj.current}
        dialogOpen={dialogOpen}
      />
    </div>
  );
}
