import { useState } from "react";
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

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData();

  console.log("isLoading", isLoading, "isFetching", isFetching);

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
      {data?.map((hero) => {
        return <div key={hero}>{hero}</div>;
      })}
    </>
  );
};
