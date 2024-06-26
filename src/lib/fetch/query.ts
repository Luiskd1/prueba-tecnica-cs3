'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchApi } from './fetch';
import { MerData } from './interface/interfaceApi';

export const useMerData = (sellerId:number, offset:number,SearchBase:string, category:string, sort:string) => {
  const { data: merdata, refetch, status, isFetching, isLoading } = useQuery<MerData>({
    queryKey: ['merdata', sellerId],
    queryFn: async () => await fetchApi(`/search?seller_id=${sellerId}&offset=${offset}&limit=10&q=${SearchBase}&category=${category}&sort=${sort}`),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 1,
  });

  return { merdata, refetch, status, isFetching, isLoading };
};


export const useCategoryData = (sellerId:number, ) => {
  const { data: categoryData, refetch, status, isFetching, isLoading } = useQuery<MerData>({
    queryKey: ['fetch2'],
    queryFn: async () => await fetchApi(`/search?seller_id=${sellerId}`),
    refetchOnWindowFocus:true,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 1 

  });
  return { categoryData, refetch, status, isFetching, isLoading };
};

export const useSubCategory = (sellerId:number, Category:string ) => {
  console.log(Category)
  const { data: subCategoryData, refetch, status, isFetching, isLoading } = useQuery<MerData>({
    queryKey: ['data2', sellerId, Category],
    queryFn: async () => await fetchApi(`/search?seller_id=${sellerId}&category=${Category}`),
    refetchOnWindowFocus:true,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 1 

  });
  return { subCategoryData, refetch, status, isFetching, isLoading };
};