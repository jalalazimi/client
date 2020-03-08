import React from 'react'
import { Configure, InstantSearch } from "react-instantsearch-dom";
import Search from "../components/search";
import throttle from "lodash.throttle";
import pickBy from "lodash.pickby";
import identity from "lodash.identity";
import qs from "qs";
import algoliasearch from 'algoliasearch/lite';

const attributesToRetrieve = [
  "categories",
  "collections",
  "dependents",
  "description",
  "downloads",
  "styling",
  "latestRelease",
  "license",
  "modifiedAt",
  "name",
  "compatibility",
  "publishedAt",
  "repositoryName",
  "repositoryUser",
  "repositoryUserAvatar",
  "stars",
  "communityPick",
  "homepage",
  "customRepoPath",
  "pushedAt",
  "donationUrl",
];

const sortOptions = [
  {value: process.env.REACT_APP_INDEX_BY_RELEVANCE, label: "relevance"},
  {value: process.env.REACT_APP_INDEX_BY_UPDATED_AT, label: "updated"},
];

const collectionsOrder = ["React", "React Native", "React VR", "Webpack", "Babel", "PostCSS"];

const filterDelimiter = ".";

const classicRoutes = {
  all: null,
  react: "React",
  "react-native": "React+Native",
  webpack: "Webpack",
  browserify: "Browserify",
  babel: "Babel",
  postcss: "PostCSS",
};
const searchClient = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID, process.env.REACT_APP_ALGOLIA_API_KEY,);

const stripFalsy = object => pickBy(object, identity);

const createURL = state => {
  const selectedSortOption = sortOptions.find(option => state.sortBy === option.value);

  const params = stripFalsy({
    search: state.query,
    sort: selectedSortOption && selectedSortOption.label,
    collection: state.menu && state.menu.collections,
    category: state.menu && state.menu.categories,
    styling:
      state.refinementList &&
      state.refinementList.styling &&
      state.refinementList.styling.join(filterDelimiter),
    compatibility:
      state.refinementList &&
      state.refinementList.compatibility &&
      state.refinementList.compatibility.join(filterDelimiter),
  });

  return qs.stringify(params, {format: "RFC1738", addQueryPrefix: true});
};

const searchStateToUrl = (props, searchState) =>
  searchState ? `${props.location.pathname}${createURL(searchState)}` : "";

const urlToSearchState = location => {
  const params = qs.parse('/', {ignoreQueryPrefix: true});
  const selectedSortOption = sortOptions.find(option => params.sort === option.label);

  return stripFalsy({
    query: params.search,
    sortBy: selectedSortOption && selectedSortOption.value,
    menu: stripFalsy({
      collections: params.collection,
      categories: params.category,
    }),
    refinementList: stripFalsy({
      styling: params.styling && params.styling.split(filterDelimiter),
      compatibility: params.compatibility && params.compatibility.split(filterDelimiter),
    }),
  });
};


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHome: "/",
      searchState: urlToSearchState(props.location),
    };
    this.updateURL = throttle(this.updateURL, 1000);
  }

  onSearchStateChange = searchState => {
    this.updateURL(searchState);
    this.setState({isHome: false, searchState});
  };

  updateURL = searchState => {
    this.props.history.push(searchStateToUrl(this.props, searchState), searchState);
  };


  render() {


    const currentCollection =
      this.state.searchState &&
      this.state.searchState.menu &&
      this.state.searchState.menu.collections;

    const currentQuery = this.state.searchState && this.state.searchState.query;


    return <InstantSearch
      searchClient={searchClient}
      indexName={process.env.REACT_APP_INDEX_BY_UPDATED_AT}
      searchState={this.state.searchState}
      onSearchStateChange={this.onSearchStateChange}
      createURL={createURL}>
      <Configure attributesToRetrieve={attributesToRetrieve}/>
      <Search
        sortOptions={sortOptions}
        collectionsOrder={collectionsOrder}
        currentCollection={currentCollection}
        currentQuery={currentQuery}
        isHome={true}
      />
    </InstantSearch>
  }
}

export default Home;
