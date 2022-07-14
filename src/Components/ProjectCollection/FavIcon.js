import React from 'react'
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  fabBtn: {
    left: "50%",
    marginTop: "1rem",
  },
});
function FavIcon({ createNewProject }) {
  const classes = useStyles();
  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fabBtn}
        onClick={createNewProject}
      >
        <AddIcon />
      </Fab>
    </>
  );
}

export default FavIcon