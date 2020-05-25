import React from "react";
import { Grid } from "@material-ui/core";
import { BeerCard } from "./BeerCard";

export function SearchResults({ loading, error, data }) {
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
