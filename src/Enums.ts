enum AlertType {
  Success,
  Warning,
  Problem,
}

enum MediaType {
  Movies ='movie',
  TV = 'tv',
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
}

enum DiscoverSortTv {
  Popularity = "popularity.desc",
  Average = "vote_average.desc",
}

export {
  AlertType,
  MediaType,
  ListAction,
  DiscoverSortMovie,
  DiscoverSortTv,
};
