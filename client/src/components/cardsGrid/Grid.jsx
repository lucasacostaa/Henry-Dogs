import React, { useRef, useCallback, useState, useEffect } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import DogCard from "./card/DogCard";
import {
  addDogFavourite,
  removeDogFavourite,
  setDogDetail,
  setPageNumber,
  resetPageNumber,
  addDogsData,
  resetDogsData,
} from "../../redux/actions/index";

import "./Grid.scss";

const Grid = ({
  dogs,
  hasMore,
  setPageNumber,
  filters,
  pageNumber,
  query
}) => {
  const [rendered, setRendered] = useState([]);

  const observer = useRef();
  const lastDogRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(); //increment by 1
          return true;
        }
        return;
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, setPageNumber]
  );

  useEffect(() => {
    //Counts how many matches have been founded and rendered
    const showing = dogs.filter((el) =>
      filters.length >= 1
        ? filters
            .map((temp) => el.temperaments.map((el) => el.name).indexOf(temp))
            .includes(-1) === false
        : true
    );
    const len = showing.length;

    //Sets default state when it's first setted
    if (typeof rendered[1] !== "number") {
      setRendered([0, 0]);
    }

    // Checks if it's needed to ask for the next page
    (async () => {
      // [0, 4]
      //  |  |----- How many have been found in the new page
      //  |-------- How many had been found before the new page was rendered
      await setRendered([rendered[1], len]);

      // If there wasn't any match in the new page, it goes to the next one
      if (
        (rendered[0] === rendered[1] || rendered[1] - rendered[0] === 1) &&
        pageNumber < 22
      ) {
        setPageNumber();
      }
    })();
  }, [dogs]);

  return (
    <>
      <div className="grid-container">
        {dogs.length === 0 && query &&<div>We couldn't find a breed called "{query}"</div>}
        {dogs.length >= 1 &&
          dogs
            .filter((el) =>
              filters.length >= 1
                ? filters
                    .map((temp) =>
                      el.temperaments.map((el) => el.name).indexOf(temp)
                    )
                    .includes(-1) === false
                : true
            )
            .map((el, idx, arr) => {
              const { id, name, temperaments, image } = el;
              if (arr.length === idx + 1) {
                return (
                  <div ref={lastDogRef}> {/* add KEY */}
                    <DogCard
                      id={id}
                      name={name}
                      temperaments={temperaments}
                      image={image}
                    />
                  </div>
                );
              } else {
                return (
                  <div> {/* add KEY */}
                    <DogCard
                      id={id}
                      name={name}
                      temperaments={temperaments}
                      image={image}
                    />
                  </div>
                );
              }
            })}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  dogs: state.dogs,
  hasMore: state.hasMore,
  query: state.query,
  order: state.order,
  orderBy: state.orderBy,
  filters: state.filters,
  pageNumber: state.pageNumber,
});

const mapDispatchToProps = {
  addDogFavourite,
  removeDogFavourite,
  setDogDetail,
  setPageNumber,
  addDogsData,
  resetDogsData,
  resetPageNumber,
};

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
