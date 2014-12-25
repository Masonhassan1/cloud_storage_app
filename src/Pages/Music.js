import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Musics } from "../Components/FilesContainer/FileItems";
import {
  fetch_failed,
  fetch_starts,
  fetch_success,
} from "../Redux/action/fileAction";
import Loader from "../Components/Loader";
import { BASEURL } from "../Url";
import { ListSubheader } from "@mui/material";

// to display all music files of logged user
function Music() {
  const [music, setMusic] = useState([]);
  const { refresh, isFetching } = useSelector((state) => state.file);
  const { _id } = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetch_starts());
    axios
      .get(`${BASEURL}/file/${_id}`)
      .then((res) => {
        setMusic(res.data);
        dispatch(fetch_success());
      })
      .catch((err) => {
        console.log(err.data);
        dispatch(fetch_failed());
      });
  }, [refresh]);
  const filterByMusic = music.filter((item) => item.type.includes("audio")); //filter by music files
  return (
    <div>
      {isFetching ? (
        <Loader />
      ) : filterByMusic.length === 0 ? (
        <ListSubheader>Music Not Found</ListSubheader>
      ) : (
        <Musics files={filterByMusic} />
      )}
    </div>
  );
}

export default Music;
