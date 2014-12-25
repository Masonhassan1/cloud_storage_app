import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Files } from "../Components/FilesContainer/FileItems";
import {
  fetch_failed,
  fetch_starts,
  fetch_success,
} from "../Redux/action/fileAction";
import Loader from "../Components/Loader";
import { BASEURL } from "../Url";

//to display all files of logged user
function AllFiles() {
  const [files, setFiles] = useState([]);
  const [filter, setFilter] = useState("application/");
  const { refresh, isFetching } = useSelector((state) => state.file);
  const { _id } = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetch_starts());
    axios
      .get(`${BASEURL}/file/${_id}`)
      .then((res) => {
        setFiles(res.data);
        dispatch(fetch_success());
      })
      .catch((err) => {
        console.log(err.data);
        dispatch(fetch_failed());
      });
  }, [refresh]);

  const filteredFiles = files.filter((item) => item.type.includes(filter)); //filter by specific files
  return (
    <div>
      {isFetching ? (
        <Loader />
      ) : (
        <Files setFilter={setFilter} filter={filter} files={filteredFiles} />
      )}
    </div>
  );
}

export default AllFiles;
