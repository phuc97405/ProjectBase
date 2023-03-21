import React, {useRef, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {localServices} from '~services/local-service';
import {navigationServices} from '~navigation/navigation-services';
import {authenticateService} from '~services/api';
import Loading from '~components/loading/Loading';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

const HomeScreen = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const queryClient = useQueryClient();
  const idCoin = useRef<number>(2);
  const getListDataApi = async ({pageParam = 1, queryKey}: any) => {
    try {
      const [, {idCoin}] = queryKey;
      const res = await authenticateService.testQuery(idCoin, pageParam, limit);
      const data = res?.data?.data;
      return {data: data?.results, nextPage: data?.metaData};
    } catch (error) {
      console.log(error);
    }
  };
  const getListData = useInfiniteQuery(
    ['getListRecent', {idCoin: idCoin.current}],
    getListDataApi,
    {
      getNextPageParam: (_lastPage, pages) => {
        if (_lastPage?.nextPage.currentPage < _lastPage?.nextPage.totalPages) {
          return _lastPage?.nextPage.currentPage + 1;
        } else return undefined;
      },
      onError(err) {
        console.log(err);
      },
    },
  );
  const {
    data,
    refetch,
    isFetching,
    fetchNextPage,
    hasNextPage,
    error,
    isError,
  } = getListData || [];
  let results = data
    ? data?.pages?.reduce((acc, val) => acc.concat(val?.data), [])
    : [];

  const updateItem = async () => {
    try {
      // const res=await authenticateService.
      // return res;
    } catch (error) {}
  };

  const editData = useMutation(updateItem, {
    onSuccess: data => {
      queryClient.invalidateQueries(['getListRecent']);
    },
  });

  return (
    <View>
      <Text>HomeStackApp</Text>
      {results?.map((item: any, index: number) => (
        <Text key={index}> {item.id}</Text>
      ))}

      <TouchableOpacity
        onPress={async () => {
          hasNextPage && (await fetchNextPage());
          console.log('next');
        }}>
        <Text> Next Page</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => refetch()}>
        <Text> refetch Page</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          await localServices.clearToken();
          navigationServices.navigate('LoginScreen');
        }}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          navigationServices.navigate('Animateded');
        }}>
        <Text>go to animated</Text>
      </TouchableOpacity>
      <Loading isVisible={isFetching} />
    </View>
  );
};

export default HomeScreen;
