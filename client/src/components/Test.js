import React, { useState } from "react";
import axios from "axios";


const Test = () => {
  const [img, setImg] = useState("https://via.placeholder.com/500x450");
  let [file, setFile] = useState(null);
  const [upload, setUpload] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post("http://localhost:8800/test", {
        image: img,
      });
      // console.log(result.data.public_id);
      const uploadImg = result.data.public_id;
      setUpload(uploadImg);
      // Handle the response data as needed
    } catch (error) {
      console.error("Error uploading image", error);
      // Handle the error as needed
    }
  };

  const previewImg = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImg(reader.result);
    };
  };

  const handleChange = (e) => {
    file = e.target.files[0];
    if (file) {
      setFile(file);
      previewImg(file);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-center flex-column align-items-center py-5">
          <label htmlFor="img_upload">Upload img</label>
          <input
            type="file"
            name="dp"
            id="img_upload"
            onChange={handleChange}
            accept="image/png, image/jpg, image/jpeg"
            required
          />
          <button className="btn btn-danger" type="submit">
            Submit
          </button>
          <p className="fs-5">Image you upload</p>
          <hr />
        </div>
      </form>
      <div>
        <img
          src={img}
          alt="Preview"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
      
    </>
  );
};

export default Test;
