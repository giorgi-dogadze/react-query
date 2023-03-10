import React from "react";
import { useParams } from "react-router-dom";
import { useSuperHeroData } from "../hooks/useSuperHeroData";

function RQSuperHeroPage() {
  const { heroId } = useParams();

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroData(heroId);

  console.log("isLoading", isLoading, "isFetching", isFetching);

  if (isLoading) {
    return <h2> Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      {data?.data.name} - {data?.data.alterEgo}
    </div>
  );
}

export default RQSuperHeroPage;
