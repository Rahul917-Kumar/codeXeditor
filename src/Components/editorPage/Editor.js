import React, { useEffect,  useState , useContext } from "react";
import "./editor.css";

import { UserContext } from "../../GlobalContext/GlobalState";

import JsEditor from "./JSEditor/JsEditor";
import CssEditor from "./CSSEditor/CssEditor";
import HtmlEditor from "./HtmlEditor/HtmlEditor";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase_config/firebase";
import { makeStyles } from "@mui/styles";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import CloudIcon from "@mui/icons-material/Cloud";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from "@mui/material/CircularProgress";


const useStyles = makeStyles({
  input: {
    color: "white",
  },
  onHover: {
    '&:hover': {
      backgroundColor: "#454856",
    },
  },
});

function Editor() {
     const { setcheckLogin, setShowNavbar } = useContext(UserContext);
  const classes = useStyles();
  const {  userId,id } = useParams();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
 
  const updateIframe = () => {
    const output =
      document.querySelector(".virtual-iframe").contentWindow.document;
    console.log(output);
    let htmlDoc =
      "<style>" +
      css +
      "</style>" +
      `
         <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
        ` +
      html +
      `        
</body>
</html>
        ` +
      `<script>` +
      js +
      `</script>`;
    output.open();
    output.write(htmlDoc);
    output.close();
  };

  const htmlChanged = async (e) => {
    setHtml(e);
    updateIframe();
  };
  const cssChanged = (e) => {
    setCss(e);
    updateIframe();
  };
  const jsChanged = (e) => {
    setJs(e);
    updateIframe();
  };
  
  useEffect(() => {
    console.log(id);
    //let uid = localStorage.getItem("userId");
      const getdataOfProject = async () => {
      const subref = doc(db, "codeeditor", userId, "projectsCollection", id);
      const docSnap = await getDoc(subref);

      setHtml(docSnap.data().html);
      setCss(docSnap.data().css);
      setJs(docSnap.data().js);
      setName(docSnap.data().name);
      setShowNavbar(false);
      setLoading(false);  
      setcheckLogin(true);
      
    };
    getdataOfProject();
  }, [id, setcheckLogin, setShowNavbar, userId]);

  const saveCurrentProgress = async () => {
    //const uid = localStorage.getItem("userId");
    // thsi is to update a specific document in subcollection we use hehrarical method to reach upto that paticular document
    // which need to update
    const subref = doc(db, "codeeditor", userId, "projectsCollection", id);
    await updateDoc(subref, {
      name: name,
      html: html,
      css: css,
      js: js,
    });
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
          <div className="outer-container-layout">
            <div className="title-container">
              <div>
                <EditIcon className={`${classes.input} `} />
                <InputBase
                  name="name"
                  value={name}
                  color="primary"
                  onChange={(e) => setName(e.target.value)}
                  inputProps={{
                    style: {
                      fontFamily: "Arial",
                      color: "white",
                      fontSize: "1.5rem",
                    },
                  }}
                />
              </div>
              <div>
                <Button
                  variant="contained"
                  onClick={saveCurrentProgress}
                  startIcon={<CloudIcon />}
                  sx={{ backgroundColor: "#454856" }}
                  className={classes.onHover}
                >
                  Save
                </Button>
              </div>
            </div>
            <div className="container-layout">
              <div className="editor">
                <HtmlEditor html={html} htmlChanged={htmlChanged} />
                <CssEditor css={css} cssChanged={cssChanged} />
                <JsEditor js={js} jsChanged={jsChanged} />
              </div>

              <div className="output">
                <iframe
                  src=""
                  className="virtual-iframe"
                  frameBorder="0"
                  title="i-frame"
                  onLoad={updateIframe}
                ></iframe>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Editor;
