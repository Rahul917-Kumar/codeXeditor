import React, { useState, useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import { UserContext } from "../../GlobalContext/GlobalState";

import { makeStyles } from "@mui/styles";
import { Button, InputBase } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import "../SignUp/signup.css";
import "./signin.css"

const useStyles = makeStyles({
  inputbase: {
    border: "1px solid blue",
    borderRadius: "5px",
    height: "6vh",
  },
});

function SignIn() {
    const classes = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading , setLoading] = useState(false)
  const { signIn } = useContext(UserContext);
  const loginUser = async (e) => {
    e.preventDefault();
    try {
        setLoading(true)
      await signIn(email, password).then(() => {
        setLoading(false)
        navigate("/projects");
      });
    } catch (error) {
      console.log(error);
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
          <div className="parentSignInContainer">
            <div className="signInContainer">
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
                SignIn
              </p>
              <form>
                <div className="input-fields-container">
                  <p className="details">Enter Your Name</p>
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
                    onClick={loginUser}
                    variant="contained"
                    fullWidth
                    sx={{ fontSize: "1.4rem" }}
                  >
                    SignIn
                  </Button>
                </div>
                <div style={{ textAlign: "center", margin: "1rem 0 1rem 0" }}>
                  <p style={{ color: "#1976D2" }}>
                    don't have an account?{" "}
                    <Link
                      to="/auth/signup"
                      style={{ textDecoration: "none", color: "#412ba1" }}
                    >
                      Register here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default SignIn;
