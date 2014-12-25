import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Photos,
  Videos,
  Files,
  Musics,
} from "../Components/FilesContainer/FileItems";
import {
  fetch_failed,
  fetch_starts,
  fetch_success,
} from "../Redux/action/fileAction";
import Loader from "../Components/Loader";
import { BASEURL } from "../Url";
import { ListSubheader } from "@mui/material";

//to display all file (all-types) of logged user
function Recent() {
  const { refresh, isFetching } = useSelector((state) => state.file);
  const { _id } = useSelector((state) => state.user?.userInfo);
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetch_starts());
    axios
      .get(`${BASEURL}/file/${_id}/?recent=${true}`)
      .then((res) => {
        setFiles(res.data);
        dispatch(fetch_success());
      })
      .catch((err) => {
        console.log(err.data);
        dispatch(fetch_failed());
      });
  }, [refresh]);

  //filter file by 5 recent image
  const filterByImages = files
    .filter((item) => item.type.includes("image/"))
    .slice(0, 5);
  //filter file by 5 recent video
  const filterByVideos = files
    .filter((item) => item.type.includes("video/"))
    .slice(0, 5);
  //filter file by 5 recent files
  const filterByFiles = files
    .filter((item) => item.type.includes("application/"))
    .slice(0, 5);
  //filter file by  5 recent music files
  const filterByMusic = files
    .filter((item) => item.type.includes("audio/"))
    .slice(0, 5);
  return (
    <div className="fileView">
      {isFetching ? (
        <Loader />
      ) : files.length === 0 ? (
        <ListSubheader>No Files Available</ListSubheader>
      ) : (
        <>
          {filterByImages.length > 0 && <Photos files={filterByImages} />}
          {filterByVideos.length > 0 && <Videos files={filterByVideos} />}
          {filterByMusic.length > 0 && <Musics files={filterByMusic} />}
          {filterByFiles.length > 0 && <Files files={filterByFiles} />}
        </>
      )}
    </div>
  );
}

export default Recent;
