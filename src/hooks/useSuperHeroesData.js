import axios from "axios";
import { useQuery, useMutation } from "react-query";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const addSuperHero = (hero) => {
  console.log("axio");
  return axios.post("http://localhost:4000/superheroes", hero);
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

export const useAddSuperHeroData = () => {
  return useMutation(addSuperHero);
};
