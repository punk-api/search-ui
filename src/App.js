import React, { Suspense } from "react";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";

import { DataSearch, ReactiveBase } from "@appbaseio/reactivesearch";
import { makeStyles, fade, Typography, Toolbar } from "@material-ui/core";

import { SearchPage } from "./SearchPage";
import { searchApi } from "./config";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();

  return (
    <ReactiveBase app="beer" url={searchApi}>
      <div className={classes.grow}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              Punk beers
            </Typography>
            <div className={classes.search}>
              <DataSearch
                componentId="search"
                URLParams
                dataField={["name", "tagline", "description", "food_pairing"]}
                debounce={200}
                autosuggest={false}
                autoFocus
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <div className={classes.content}>
        <Suspense fallback="Loading...">
          <SearchPage />
        </Suspense>
      </div>
    </ReactiveBase>
  );
}

export default App;
