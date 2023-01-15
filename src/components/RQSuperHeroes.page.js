import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const RQSuperHeroesPage = () => {
  const { isLoading, data } = useQuery("super-heroes", fetchSuperHeroes);

  if (isLoading) {
    return <h2> Loading...</h2>;
  }

  console.log("data", data);
  return (
    <>
      <h2>React Query Super Heroes Pages</h2>
      {data?.data.map((hero) => {
        return <div key={hero.id}>{hero.name}</div>;
      })}
    </>
  );
};
