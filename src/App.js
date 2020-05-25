import React, { useState } from "react";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";

import {
  DataSearch,
  ReactiveBase,
  ReactiveList,
  RangeInput,
} from "@appbaseio/reactivesearch";
import {
  makeStyles,
  fade,
  Typography,
  Toolbar,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Collapse,
  Chip,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";

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

function SearchResults({ loading, error, data }) {
  if (loading) {
    return <div>Searching...</div>;
  }
  if (error) {
    return (
      <div>
        Something went wrong! Error: <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }
  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      {data.map((beer) => (
        <Grid item xs={12} sm={12} md={12} key={beer.id}>
          <BeerCard beer={beer} />
        </Grid>
      ))}
    </Grid>
  );
}

const useStylesBeerCard = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  tagline: {
    display: "inline-block",
    marginLeft: theme.spacing(1),
  },
  beer_media: {
    height: "100%",
  },
}));
function BeerCard({ beer }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleIsExpanded = () => setIsExpanded(!isExpanded);
  const classes = useStylesBeerCard();
  return (
    <Card>
      <Grid container>
        <Grid item xs={2}>
          <CardMedia
            className={classes.beer_media}
            image={beer.image_url}
            title=""
          />
        </Grid>
        <Grid item xs={10}>
          <CardHeader
            title={beer.name}
            subheader={
              <>
                <Chip className={classes.abv} label={`${beer.abv}%`} />
                <Typography className={classes.tagline}>
                  {beer.tagline}
                </Typography>
              </>
            }
          />
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>{beer.description}</Typography>
              <Typography variant="h6">Food pairings</Typography>
              <ul>
                {beer.food_pairing.map((pairing) => (
                  <li>{pairing}</li>
                ))}
              </ul>
            </CardContent>
          </Collapse>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: isExpanded,
              })}
              onClick={toggleIsExpanded}
              aria-expanded={isExpanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
}

function App() {
  const classes = useStyles();

  return (
    <ReactiveBase app="beer" url={process.env.REACT_APP_SEARCH_API}>
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
                dataField={[
                  "name",
                  "tagline",
                  "description",
                  // "abv",
                  "food_pairing",
                  // "brewers_tips",
                ]}
                debounce={200}
                autosuggest={false}
                autoFocus
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <div className={classes.content}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <RangeInput
              componentId="abv"
              dataField="abv"
              URLParams
              title="ABV"
              showFilter
              showHistogram
            />
            {/* <MultiList
              componentId="food_pairing"
              dataField="food_pairing"
              title="food_pairing"
            /> */}
          </Grid>
          <Grid item xs={9}>
            <ReactiveList
              componentId="SearchResult"
              dataField="id"
              react={{
                and: ["search", "abv"],
                // and: ["search"],
              }}
              includeFields={[
                "id",
                "name",
                "tagline",
                "description",
                "abv",
                "image_url",
                "food_pairing",
                // "brewers_tips",
              ]}
              pagination
              showLoader={false}
              render={SearchResults}
            />
          </Grid>
        </Grid>
      </div>
    </ReactiveBase>
  );
}

export default App;
