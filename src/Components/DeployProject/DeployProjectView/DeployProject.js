import React, { useEffect , useState , useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import { doc, getDoc } from "firebase/firestore";
import { db } from '../../../firebase_config/firebase';
import { UserContext } from '../../../GlobalContext/GlobalState';

import CircularProgress from "@mui/material/CircularProgress";
import { Button } from '@mui/material';

import "./DeployProject.css"
function DeployProject() {
  const navigate = useNavigate()
   const { setShowNavbar } = useContext(UserContext);
    const {userId , id} = useParams()
    const [loading, setLoading] = useState(true);
    const [html, setHtml] = useState("");
    const [css, setCss] = useState("");
    const [js, setJs] = useState("");
    
  const updateIframe = () => {
    const output = document.querySelector(".iframe").contentWindow.document;
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

  

    useEffect(() => {
      const getdataOfProject = async () => {
        const subref = doc(db, "codeeditor", userId, "projectsCollection", id);
        const docSnap = await getDoc(subref);

        setHtml(docSnap.data().html);
        setCss(docSnap.data().css);
        setJs(docSnap.data().js);
        setShowNavbar(false);
        setLoading(false);
      };
      getdataOfProject();
    }, [id, userId, setShowNavbar]);

     const VisitPen = () => {
       navigate(`/deploy/editor/${userId}/${id}`);
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
          <div className="iframe-container">
            <div style={{display:"flex" , justifyContent:"center"}}>
              <Button
                variant="contained"
                sx={{ margin: "1rem" }}
                onClick={VisitPen}
              >
                See Code
              </Button>
            </div>

            <iframe
              title="i-frame"
              className="iframe"
              frameBorder="0"
              onLoad={updateIframe}
            ></iframe>
          </div>
        </>
      )}
    </>
  );
}

export default DeployProject