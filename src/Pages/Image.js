import React, { useEffect, useState } from "react";
import axios from "axios";
import { Photos } from "../Components/FilesContainer/FileItems";
import { useSelector, useDispatch } from "react-redux";
import {
  fetch_failed,
  fetch_starts,
  fetch_success,
} from "../Redux/action/fileAction";
import Loader from "../Components/Loader";
import { BASEURL } from "../Url";
import { ListSubheader } from "@mui/material";

// to display all images of logged user
function Image() {
  const [photos, setPhotos] = useState([]);
  const { refresh, isFetching } = useSelector((state) => state.file);
  const { _id } = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetch_starts());
    axios
      .get(`${BASEURL}/file/${_id}`)
      .then((res) => {
        setPhotos(res.data);
        dispatch(fetch_success());
      })
      .catch((err) => {
        console.log(err.data);
        dispatch(fetch_failed());
      });
  }, [refresh]);

  const filterByPhotos = photos.filter((item) => item.type.includes("image")); //filter by image type
  return (
    <div>
      {isFetching ? (
        <Loader />
      ) : filterByPhotos.length === 0 ? (
        <ListSubheader>Photos Not Found</ListSubheader>
      ) : (
        <Photos files={filterByPhotos} />
      )}
    </div>
  );
}

export default Image;
