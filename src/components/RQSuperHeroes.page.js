import { useState } from "react";
import { Link } from "react-router-dom";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";

export const RQSuperHeroesPage = () => {
  // const [refetchIntervalTime, setRefetchIntervalTime] = useState(3000);
  // const onSuccess = (data) => {
  //   if (data.data.length === 4) {
  //     console.log("gio");
  //     setRefetchIntervalTime(false);
  //   }
  //   console.log("refetchIntervalTime-1", refetchIntervalTime);
  // };

  // const onError = (error) => {
  //   if (data.data.length === 4) {
  //     setRefetchIntervalTime(false);
  //   }
  // };
  // console.log("refetchIntervalTime-2", refetchIntervalTime);

  const { isLoading, data, isError, error, refetch } = useSuperHeroesData();

  if (isLoading) {
    return <h2> Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <button onClick={() => refetch()}>Refetch</button>
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
    </>
  );
};
