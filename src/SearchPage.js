import React, { useContext } from "react";

import { ReactiveList, RangeInput } from "@appbaseio/reactivesearch";
import { Grid, Button } from "@material-ui/core";

import { SearchResults } from "./SearchResults";
import UserContext from "./UserContext";
import { favoriteApi } from "./config";
import { useAxios, refetch } from "use-axios/cjs";

export function SearchPage() {
  const user = useContext(UserContext);
  const baseUrl = `${favoriteApi}/recommendations/${user}`;
  const { data: recommendations } = useAxios(baseUrl);
  const { data: popular } = useAxios(`${favoriteApi}/popular`);
  return (
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
        <h4>Recommended</h4>
        {recommendations.length > 0 ? (
          <>
            {
              <SearchResults
                data={recommendations}
                error={false}
                loading={false}
              />
            }
          </>
        ) : (
          <>
            <p>No recommendations yet, try liking some beers!</p>
          </>
        )}
        <Button onClick={() => refetch(baseUrl)}>Refresh</Button>
        {popular.length > 0 ? (
          <>
            <h4>Popular beer</h4>
            {<SearchResults data={popular} error={false} loading={false} />}
          </>
        ) : (
          <></>
        )}
        <Button onClick={() => refetch(`${favoriteApi}/popular`)}>Refresh</Button>
      </Grid>
      <Grid item xs={9}>
        <ReactiveList
          componentId="SearchResult"
          dataField="id"
          react={{
            and: ["search", "abv"],
          }}
          includeFields={[
            "id",
            "name",
            "tagline",
            "description",
            "abv",
            "image_url",
            "food_pairing",
          ]}
          pagination
          showLoader={false}
          render={(props) => <SearchResults {...props} />}
        />
      </Grid>
    </Grid>
  );
}
