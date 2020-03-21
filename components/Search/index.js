import React from "react";
import ClearAll from "../ClearAll";
import Hits from "../Hits";
import Menu from "../Menu";
import Panel from "../Panel";
import CheckboxList from "../CheckboxList";
import SearchBox from "../SearchBox";
import SearchPoweredBy from "../SearchPoweredBy";
import SortBy from "../SortBy";
import Tabs from "../Tabs";
import orderBy from "lodash.orderby";
import Advertisement from "../Advertisement";

function Search({currentCollection, currentQuery, collectionsOrder, sortOptions}) {
  return <div>
    <div className="bg-grey-lighter border-b border-grey-light  overflow-hidden">
      <div className="relative m-4 mb-1 select-none">
        <a href="/">
          <img
            src="images/jess-small.svg"
            width="50"
            height="50"
            className="absolute left-0 inline"
            draggable="false"
            alt="Coach Jess welcomes you!"
          />
        </a>
        <div className="ml-16 max-w-2xl">
          <SearchBox/>
          <div className="mt-4 ml-1">
            <Tabs
              attribute="collections"
              items={collectionsOrder}
              transformItems={items =>
                items.sort(
                  (a, b) => collectionsOrder.indexOf(a.label) > collectionsOrder.indexOf(b.label)
                )
              }
            />
            <ClearAll/>
          </div>
        </div>
      </div>
    </div>
    <div className="flex p-4 pt-3">
      <div className="ml-16 max-w-2xl w-full">
        <SortBy
          items={sortOptions}
          defaultRefinement={
            // Sort by relevance by default if it's a search, or updated at if browsing
            // Make sure the default matches the indexName prop on the InstantSearch component
            sortOptions[currentQuery ? 0 : 1].value
          }
        />
        <Hits/>
        <SearchPoweredBy/>
      </div>

      <div className="ml-8 pl-4 pt-2 flex-none">
        <Advertisement/>

        {currentCollection === "React" && (
          <div className="mb-8">
            <Panel title="Styling">
              <CheckboxList
                attribute="styling"
                operator="and"
                transformItems={items => orderBy(items, ["label", "count"], ["asc", "desc"])}
              />
            </Panel>
          </div>
        )}

        {currentCollection === "React Native" && (
          <div className="mb-8">
            <Panel title="Compatibility">
              <CheckboxList
                attribute="compatibility"
                transformItems={items =>
                  orderBy(items, [item => item.label.toLowerCase()], ["asc"])
                }
              />
            </Panel>
          </div>
        )}

        <div className="mb-8">
          <Panel title="Categories">
            <Menu
              attribute="categories"
              showMore
              limitMax={25}
              transformItems={items => orderBy(items, ["label", "count"], ["asc", "desc"])}
            />
          </Panel>
        </div>
      </div>
    </div>
  </div>;
}

export default Search;
