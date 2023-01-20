import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";

const fetchColors = (pageNumber) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
  //   http://localhost:4000/colors?_limit=2&_page=2 will give us id of 3 and 4
};

function PaginatedQueriesPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, isError, error, data, isFetching } = useQuery(
    ["colors", pageNumber],
    () => fetchColors(pageNumber),
    { keepPreviousData: true }
  );

  console.log("isLoading", isLoading, "isFetching", isFetching);

  if (isLoading) {
    return <h2> Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      {data?.data.map((color) => {
        return (
          <div key={color.id}>
            <h2>
              {color.id}. {color.label}
            </h2>
          </div>
        );
      })}
      <div>
        <button
          onClick={() => setPageNumber((prevNumber) => prevNumber - 1)}
          disabled={pageNumber === 1}
        >
          Prev Page
        </button>
        <button
          onClick={() => setPageNumber((prevNumber) => prevNumber + 1)}
          disabled={pageNumber === 4}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default PaginatedQueriesPage;
