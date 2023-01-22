import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

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
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    // onSuccess: () => queryClient.invalidateQueries("super-heroes"), // gonna refetch query with this key
    // onSuccess: (data) => {
    //   queryClient.setQueryData("super-heroes", (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, data.data],
    //     };
    //   });
    //} change cached values of super heroes
    onMutate: (newHero) => {
      queryClient.cancelQueries("super-heroes");
      const previousHeroesData = queryClient.getQueryData("super-heroes");
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        };
      });
      return { previousHeroesData }; //we are returning this because if api call wasn't succeeded to rollback to this data
    }, //executes when before mutation function is fired
    onError: (_error, _hero, context) => {
      queryClient.setQueryData("super-heroes", context.previousHeroesData); //if api call was failed we do rollback to apply to cache old data that was returned from onMutate function in context object
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes"); //we are refetching super heroes to make sure that client and server sides are in sync
    },
  });
};
