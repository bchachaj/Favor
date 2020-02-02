import React from 'react'
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  loadContainer: {
    display: "flex",
    alignItems: 'center', 
    justifyContent: 'center',
    padding: '5%',
    flexGrow: 1,
    width: '100%'
  }
}));

export default function Loader() {
    const classes = useStyles();
    return (
      <div className={classes.loadContainer}>
        <CircularProgress color="secondary" />
      </div>
    );
}
