import React, { Component } from "react";
import { connectStateResults } from 'react-instantsearch-dom';
import { Helmet } from "react-helmet";

import Hit from "../Hits/ExpandedHit";
import License from "../Hits/License";
import Stars from "../Hits/Stars";
import Downloads from "../Hits/Downloads";
import Dependents from "../Hits/Dependents";
import CompatibilityIcons from "../Hits/CompatibilityIcons";
import TimeAgo from "timeago-react";
import { format } from "timeago.js";

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
    <strong className="block text-2xl text-gray-300">404</strong>
    <span className="text-gray-900 text-xl">Página não encontrada</span>
  </div>
);

class Readme extends Component {


  render() {
    const {searchResults, id, searching} = this.props;
    const hit = searchResults && searchResults.hits.find(hit => hit.name === id);

    if (hit) {
      hit.repositoryUrl = `https://github.com/${hit.repositoryUser}/${hit.repositoryName}${
        hit.customRepoPath ? `/tree/master/${hit.customRepoPath}` : ""
      }`;
    }

    return (<>
        {!searching && !hit && <NotFound/>}
        {hit && (<div className="relative container mx-auto">
            <div className="flex">
              <div className="w-8/12">
                <div className="p-6 border-r border-gray-100 border-solid">
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
              </div>
              <div className="w-4/12">
                <Hit hit={hit}/>
                <MetaTags {...hit} />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default connectStateResults(Readme);
