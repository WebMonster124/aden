import axios from 'axios';
import React, { Fragment, useState } from 'react';

const FileUpload = () => {
  const [files, setFiles] = useState([]);

  const onChange = e => {
    console.log(e.target.files);
    setFiles(e.target.files)
  };
  console.log(files);
  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    Object.values(files).forEach(file=>{
      formData.append("uploadImages", file);
    });

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      console.log(res);
    } catch (err) {
      if (err.response.status === 500) {
        console.log(err);
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type='file'
            id='file'
            name="uploadImages"
            multiple
            onChange={onChange}
          />
        </div>
        <input
          type='submit'
          value='Upload'
        />
      </form>
    </Fragment>
  );
};

export default FileUpload;