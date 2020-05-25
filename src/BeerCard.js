import React, { useState } from "react";

import {
  makeStyles,
  Typography,
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
export function BeerCard({ beer, isFavorite, handleFavorite, handleUnfavorite }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleIsExpanded = () => setIsExpanded(!isExpanded);
  const classes = useStyles();
  return (
    <Card>
      <Grid container>
        <Grid item xs={2}>
          {beer.image_url && (
            <CardMedia
              className={classes.beer_media}
              image={beer.image_url}
              title=""
            />
          )}
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
                {beer.food_pairing.map((pairing, i) => (
                  <li key={`${beer.id}-${i}`}>{pairing}</li>
                ))}
              </ul>
            </CardContent>
          </Collapse>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites" onClick={() => isFavorite ? handleUnfavorite(beer) : handleFavorite(beer)}>
              {isFavorite ? (
                <FavoriteIcon style={{fill: "red"}} />
              ) : (
                <FavoriteIcon />
              )}
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
