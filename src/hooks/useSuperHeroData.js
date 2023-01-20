// import axios from "axios";
// import { useQuery } from "react-query";

// const fetchSuperHero = (heroId) => {
//   return axios.get(`http://localhost:4000/superheroes/${heroId}`);
// };

// export const useSuperHeroData = (heroId) => {
//   return useQuery(["super-hero", heroId], () => fetchSuperHero(heroId));
// };

import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId) => {
  const queryClient = useQueryClient(); //has connection with cache
  return useQuery(["super-hero", heroId], () => fetchSuperHero(heroId), {
    initialData: () => {
      const heroes = queryClient.getQueryData(["super-heroes"])?.data;

      const hero = heroes.find((hero) => hero.id === parseInt(heroId));

      if (hero) {
        return {
          data: hero,
        };
      } else {
        return undefined;
      }
    },
  });
};
