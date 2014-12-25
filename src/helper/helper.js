import axios from "axios";
import fileDownload from "js-file-download";

//file download
export const handleDownload = (fileUrl, fileName) => {
  axios
    .get(fileUrl, {
      responseType: "blob",
    })
    .then((res) => {
      fileDownload(res.data, fileName);
    });
};

// get size of the file
export const getReadableFileSizeString = (fileSizeInBytes) => {
  let i = -1;
  const byteUnits = [" kB", " MB", " GB", " TB", "PB", "EB", "ZB", "YB"];
  do {
    fileSizeInBytes = fileSizeInBytes / 1024;
    i++;
  } while (fileSizeInBytes > 1024);

  return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
};
