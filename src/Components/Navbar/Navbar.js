import React,{useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { UserContext } from '../../GlobalContext/GlobalState';

function Navbar() {
    const navigate  = useNavigate()
    const { logout, checkLogin, setcheckLogin, showNavbar, setShowNavbar } =
      useContext(UserContext);
    const loggingOut = async () => {
      await logout().then(() => {
        setcheckLogin(false)
        navigate("/auth/login");
      });
    };
    useEffect(() => {
      setShowNavbar(true);
    }, [setShowNavbar]);

  return (
    <>
      {showNavbar ? (
        <>
          <div>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <p className="project-title">
                    Code<span className="special-X">X</span>Editor
                  </p>
                </Typography>
                {checkLogin ? (
                  <>
                    <Button color="inherit" onClick={loggingOut}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <></>
                )}
              </Toolbar>
            </AppBar>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Navbar