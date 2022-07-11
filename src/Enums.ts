enum AlertType {
  Success,
  Warning,
  Problem,
}

enum MediaType {
  Movies,
  TV,
}

enum ListAction {
  Prev,
  Next,
}

enum DiscoverSortMovie {
  Popularity = "popularity.desc",
  Average = "vote_average.desc",
  Revenue = "revenue.desc",
  VoteCount = "vote_count.desc",
  ReleaseDate = "release_date.desc",
}

enum DiscoverSortTv {
  Popularity = "popularity.desc",
  Average = "vote_average.desc",
  AirDate = "first_air_date.desc",
}

export {
  AlertType,
  MediaType,
  ListAction,
  DiscoverSortMovie,
  DiscoverSortTv,
};
