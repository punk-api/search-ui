import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import { BeerCard } from "./BeerCard";

import { favoriteApi } from "./config";
import { useAxios, refetch } from "use-axios";
import { post, delete as del } from 'axios';
import UserContext from "./UserContext";

export function SearchResults({ loading, error, data }) {
  const user = useContext(UserContext);
  const baseUrl = `${favoriteApi}/${user}`
  const { data: favorites } = useAxios(baseUrl);

  const handleFavorite = async (beer) => {
    await post(`${baseUrl}/${beer.id}`);
    await refetch(baseUrl);
  };
  const handleUnfavorite = async (beer) => {
    await del(`${baseUrl}/${beer.id}`);
    await refetch(baseUrl);
  };

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
          <BeerCard
            beer={beer}
            isFavorite={favorites.includes(beer.id.toString())}
            handleFavorite={handleFavorite}
            handleUnfavorite={handleUnfavorite}
          />
        </Grid>
      ))}
    </Grid>
  );
}
