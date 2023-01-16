import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const useSuperHeroesData = () => {
  return useQuery("super-heroes", fetchSuperHeroes, {
    // cacheTime: 5000, //5s
    // staleTime: 10000, //10s
    // refetchOnMount: true,
    // refetchOnWindowFocus: true,
    // refetchInterval: refetchIntervalTime,
    // refetchIntervalInBackground: true,
    // enabled: false,
    // onSuccess: onSuccess,
    // onError: onError,
    // select: (data) => {
    //   return data.data?.map((data) => data.name);
    // },
  });
};
