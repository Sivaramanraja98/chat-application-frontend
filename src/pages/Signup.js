import React, { useState } from "react";
import "./Signup.css";
import botImg from "../assets/bot.png";
import { FaPlusCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSignupUserMutation } from "../services/appApi";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupUser, { isLoading, error }] = useSignupUserMutation();
  const navigate = useNavigate();
  //image upload state
  const [image, setImage] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  function validateImg(e) {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      return alert("Max file size is 1MB");
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function uploadImage() {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "preview");
    try {
      setUploadingImg(true);
      let res = await fetch(
        `https://api.cloudinary.com/v1_1/dd6ou0uod/image/upload`,
        {
          method: "post",
          body: data,
        }
      );
      const urlData = await res.json();
      setUploadingImg(false);
      return urlData.url;
    } catch (error) {
      setUploadingImg(false);
      console.log(error);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    if (!image) return alert("Please upload your profile picture");
    const url = await uploadImage(image);
    console.log(url);
    //signup user
    signupUser({ name, email, password, picture: url }).then(({ data }) => {
      if (data) {
        navigate("/chat");
      }
    });
  }

  return (
    <div className="container-fluid">
      <div className="row margin">
        <div className="col-md-12 d-flex flex-direction-column align-items-center justify-content-center">
          <form onSubmit={handleSignup} style={{ width: "80%", maxWidth: 500 }}>
            {error && <p className="alert alert-danger">{error.data}</p>}
            <h1 className="text-center">Create account</h1>
            <div className="signupProfilePic__container">
              <img
                src={imagePreview || botImg}
                alt="profile"
                className="signupProfilePic"
              />
              <label htmlFor="image-upload" className="image-upload-label">
                <FaPlusCircle className="add-picture-icon" />
              </label>
              <input
                type="file"
                id="image-upload"
                hidden
                accept="image/png, image/jpeg, image/jpg"
                onChange={validateImg}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputName1" className="form-label">
                Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                className="form-control"
                id="exampleInputName1"
                aria-describedby="emailHelp"
                placeholder="Enter Your Name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Your Email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Your Password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {uploadingImg || isLoading ? "Signing you up..." : "Signup"}
            </button>
            <div className="py-4">
              <p className="text-center">
                Already have an account <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
        <div className="col-md-6 signup__bg"></div>
      </div>
    </div>
  );
}

export default Signup;
