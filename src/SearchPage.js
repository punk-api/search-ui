import React from "react";

import { ReactiveList, RangeInput } from "@appbaseio/reactivesearch";
import { Grid } from "@material-ui/core";

// import { favoriteApi } from "./config";
// import { useAxios } from "use-axios";

import { SearchResults } from "./SearchResults";

export function SearchPage() {
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
