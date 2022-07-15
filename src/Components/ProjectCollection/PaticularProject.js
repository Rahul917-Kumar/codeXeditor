import React from 'react'


import LanguageIcon from "@mui/icons-material/Language";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { Button } from "@mui/material";

function PaticularProject({ data, VisitPen, deleteProject,  openDeployWindow}) {
  return (
    <>
      <div>
        <p className="card-heading">{data.name}</p>
      </div>
      <div className="card-projectCreated-date">Created:</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          color="primary"
          onClick={() => VisitPen(data.id)}
          startIcon={<OpenInNewIcon />}
          size="medium"
        >
          Open
        </Button>
        <Button size="medium" color="primary" startIcon={<LanguageIcon />} onClick={()=>openDeployWindow(data.id)}>
          Visit
        </Button>
        <Button
          size="medium"
          color="error"
          startIcon={<DeleteIcon color="error" />}
          onClick={() => {
            deleteProject(data.id);
          }}
        >
          Delete
        </Button>
      </div>
    </>
  );
}

export default PaticularProject