import React, { useState, useEffect } from "react";
import axios from "axios";
import { Videos } from "../Components/FilesContainer/FileItems";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Components/Loader";
import {
  fetch_failed,
  fetch_starts,
  fetch_success,
} from "../Redux/action/fileAction";
import { BASEURL } from "../Url";
import { ListSubheader } from "@mui/material";

//to display all videos of logged user
function Video() {
  const [videos, setVideos] = useState([]);
  const { refresh, isFetching } = useSelector((state) => state.file);
  const { _id } = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch_starts());
    axios
      .get(`${BASEURL}/file/${_id}`)
      .then((res) => {
        setVideos(res.data);
        dispatch(fetch_success());
      })
      .catch((err) => {
        console.log(err.data);
        dispatch(fetch_failed());
      });
  }, [refresh]);

  const filterByVideo = videos.filter((item) => item.type.includes("video")); //filter by video type
  return (
    <div>
      {isFetching ? (
        <Loader />
      ) : filterByVideo.length === 0 ? (
        <ListSubheader>Video Not Found</ListSubheader>
      ) : (
        <Videos files={filterByVideo} />
      )}
    </div>
  );
}

export default Video;
