import React, { useEffect, useState, useContext } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase_config/firebase";
import "./project.css";

import PaticularProject from "./PaticularProject";
import FavIcon from "./FavIcon";

import { UserContext } from "../../GlobalContext/GlobalState";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

function Project() {
  const { setcheckLogin,  setShowNavbar } = useContext(UserContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [alldata, setAlldata] = useState([]);
  const [zeroProjectYet, setZeroProjectYet] = useState(false);
  useEffect(() => {
    let uid = localStorage.getItem("userId");
    console.log(uid);
    const ref = collection(db, "codeeditor", uid, "projectsCollection");

    const getData = async () => {
      const docSnap = await getDocs(ref);
      const newData = [...docSnap.docs.map((d) => ({ id: d.id, ...d.data() }))];
      setAlldata([...newData]);
      if (alldata.length === 0) {
        setZeroProjectYet(true);
      }
      else setZeroProjectYet(false);
      setLoading(false);
    };
    setcheckLogin(true);
    setShowNavbar(true);
    getData();
  }, [alldata.length, setcheckLogin, setShowNavbar]);

  const createNewProject = async () => {
    let uid = localStorage.getItem("userId");
    let projectId = uuidv4();
    // the query of doc will look like /db/codeeditor/uid/projectcollection/projectId  so it will point to that point
    // and using setDoc it will create a docs and populate it with data provided
    const subref = doc(db, "codeeditor", uid, "projectsCollection", projectId);
    await setDoc(subref, {
      name: "Untitled",
      html: "<!--Code inside body goes here-->",
      css: "/*css code goes here*/",
      js: "/*Js code goes here*/",
    }).then(() => {
      navigate(`/editor/${uid}/${projectId}`);
    });
  };

  const VisitPen = (penID) => {
    //let uid = localStorage.getItem("userId");
    navigate(`/editor/${penID}`);
  };

  const deleteProject = async (penID) => {
    let uid = localStorage.getItem("userId");
    const subref = doc(db, "codeeditor", uid, "projectsCollection", penID);
    await deleteDoc(subref);
    const newData_AfterDeletion = alldata.filter((data) => data.id !== penID);
    setAlldata([...newData_AfterDeletion]);
  };

  const openDeployWindow = (penID)=>{
    let uid = localStorage.getItem("userId");
    window.open((`/deploy/${uid}/${penID}`) )
  }

  return (
    <>
      {loading ? (
        <div className="loading">
          <CircularProgress size={70} />
        </div>
      ) : (
        <>
          <div style={{ marginTop: "1rem" }}>
            <FavIcon createNewProject={createNewProject} />
            {zeroProjectYet ? (
              <>
                
                  <div className="message-when-there-are-no-projects">
                    Looks like you don't have any projects click on the add
                    button to create your first project
                  </div>
                
              </>
            ) : (
              <>
                <div className="containProjects">
                  {alldata.map((data) => {
                    return (
                      <div className="card">
                        <PaticularProject
                          data={data}
                          deleteProject={deleteProject}
                          VisitPen={VisitPen}
                          openDeployWindow={openDeployWindow}
                        />
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/*   */}
        </>
      )}
    </>
  );
}

export default Project;
