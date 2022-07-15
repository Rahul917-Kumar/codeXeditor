import React, { useState, useContext } from "react";
import { db } from "../../firebase_config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../GlobalContext/GlobalState";
import {  doc, setDoc } from "firebase/firestore";
import { makeStyles } from "@mui/styles";   
import { Button, InputBase } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./signup.css"
const useStyles = makeStyles({
    inputbase:{
        border:"1px solid blue",
        borderRadius:"5px",
        height:"6vh"
    }
})

function Signup() {
    const classes = useStyles()
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false);
  const { createUser } = useContext(UserContext);

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      if(!name || !password || !email){
        throw new Error("Please fill all the inputs");
      }
      try {
        await createUser(email, password).then((res) => {
          setLoading(true);
          const ref = doc(db, "codeeditor", res.user.uid);
          setDoc(ref, {
            username: name,
          })
            .then(() => {
              setLoading(false);
              navigate("/");
            })
        });
      } catch (error) {
        toast.warn("Invalid Credentials", {
          position: "top-center",
        });
        console.log(error);
      }
    } catch (error) {
      toast.warn("Please fill all the inputs", {
        position: "top-center",
      });
      console.log()
    }
    
  };
  return (
    <>
      {loading ? (
        <>
          <div className="loading">
            <CircularProgress size={70} />
          </div>
        </>
      ) : (
        <>
          <div className="parentSignUpContainer">
            <div className="signUpContainer">
              <p
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  textAlign: "center",
                  margin: "1rem 0 1rem 0",
                  color: "#1976D2",
                }}
              >
                {" "}
                SignUp
              </p>
              <form>
                {/*  */}
                <div className="input-fields-container">
                  <p className="details">Enter Your Name</p>
                  <InputBase
                    id="standard-basic"
                    label="Standard"
                    variant="standard"
                    value={name}
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    className={classes.inputbase}
                    inputProps={{
                      style: {
                        fontFamily: "Arial",
                        color: "white",
                        fontSize: "1rem",
                      },
                    }}
                    autoComplete="off"
                  />
                </div>
                <div className="input-fields-container">
                  <p className="details">Enter Your Email</p>
                  <InputBase
                    id="standard-basic"
                    label="Standard"
                    variant="standard"
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    className={classes.inputbase}
                    inputProps={{
                      style: {
                        fontFamily: "Arial",
                        color: "white",
                        fontSize: "1rem",
                      },
                    }}
                    autoComplete="off"
                  />
                </div>
                <div className="input-fields-container">
                  <p className="details">Enter Your Password</p>
                  <InputBase
                    id="standard-basic"
                    label="Standard"
                    variant="standard"
                    value={password}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    className={classes.inputbase}
                    inputProps={{
                      style: {
                        fontFamily: "Arial",
                        color: "white",
                        fontSize: "1rem",
                      },
                    }}
                    autoComplete="off"
                  />
                </div>
                <div className="input-fields-container">
                  <Button
                    onClick={registerUser}
                    variant="contained"
                    fullWidth
                    sx={{ fontSize: "1.4rem" }}
                  >
                    Sign Up
                  </Button>
                </div>
                <div style={{ textAlign: "center", margin: "1rem 0 1rem 0" }}>
                  <p style={{ color: "#1976D2" }}>
                    already have an account?{" "}
                    <Link
                      to="/"
                      style={{ textDecoration: "none", color: "#412ba1" }}
                    >
                      Login here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
            <ToastContainer />
          </div>
        </>
      )}
    </>
  );
}

export default Signup;
