import React, { Component } from "react";
import { connectStateResults } from 'react-instantsearch-dom';
import { Helmet } from "react-helmet";
import "github-markdown-css";

import Hit from "../Hits/Hit";
import "./Readme.css";

const MetaTags = hit => (
  <Helmet>
    <title>{hit.name}</title>

    <meta property="og:title" content={hit.name}/>
    <meta property="og:description" content={hit.description}/>
    <meta property="og:image" content={`https://github.com/${hit.repositoryUser}.png`}/>
    <meta name="twitter:title" content={hit.name}/>
    <meta name="twitter:description" content={hit.description}/>
    <meta name="twitter:image" content={`https://github.com/${hit.repositoryUser}.png`}/>
  </Helmet>
);

const NotFound = () => (
  <div
    className="relative select-none text-center"
    style={{top: "50%", transform: "translateY(-50%)"}}>
    <strong className="block text-2xl text-grey-light">404</strong>
    <span className="text-grey-dark text-xl">Página não encontrada</span>
  </div>
);

class Readme extends Component {
  handleDismiss = e => {
    e.preventDefault();

    this.enableScroll();

    this.props.history.push({
      pathname: "/",
      search: this.props.location.search,
    });
  };

  handleClick = e => {
    e.stopPropagation();
  };

  render() {
    const {searchResults, id, searching} = this.props;
    const hit = searchResults && searchResults.hits.find(hit => hit.name === id);

    if (hit) {
      hit.repositoryUrl = `https://github.com/${hit.repositoryUser}/${hit.repositoryName}${
        hit.customRepoPath ? `/tree/master/${hit.customRepoPath}` : ""
      }`;
    }

    return (
      <div className="inset-0 overflow-auto z-30 cursor-pointer" onClick={this.handleDismiss}>
        <div className=" bg-grey-800 inset-0 pointer-events-none" style={{opacity: 0.9}}/>

        {!searching && !hit && <NotFound/>}

        {hit && (
          <div
            className="relative"
            onClick={this.handleClick}
          >
            <Hit hit={hit} expanded/>

            <div className="p-8 bg-white container mx-auto">
              <div dangerouslySetInnerHTML={{__html: hit && hit.readme}}/>
              {hit.readmeWasTruncated && (
                <div className="pt-6">
                  <a
                    className="btn btn-secondary p-3 w-full"
                    href={hit.repositoryUrl}
                    target="_blank">
                    Read more
                  </a>
                </div>
              )}
            </div>

            <MetaTags {...hit} />
          </div>
        )}
      </div>
    );
  }
}

export default connectStateResults(Readme);
