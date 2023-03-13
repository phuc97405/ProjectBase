import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {localServices} from '~services/local-service';
import {navigationServices} from '~navigation/navigation-services';
import {authenticateService} from '~services/api';
import Loading from '~components/loading/Loading';
import {useInfiniteQuery, useMutation, useQueryClient} from 'react-query';
const HomeScreen = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const queryClient = useQueryClient();
  const getListDataApi = async ({pageParam = 1}) => {
    try {
      // const [, page] = pageParam;
      const res = await authenticateService.testQuery('2', page, limit);
      console.log('resssss', res);
      return res?.data?.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getListData = useInfiniteQuery('getListRecent', getListDataApi, {
    getNextPageParam: (_lastPage, pages) => {
      if (_lastPage.metaData.currentPage < _lastPage.metaData.totalPages) {
        return _lastPage.metaData.currentPage + 1;
      }
    },
  });
  const {data, refetch, isFetching, fetchNextPage, hasNextPage, error} =
    getListData || [];
  let results = data?.pages.reduce(
    (acc, page) => [...acc, ...page.results],
    [],
  );
  const updateItem = async () => {
    try {
      // const res=await authenticateService.
      // return res;
    } catch (error) {}
  };

  const editData = useMutation(updateItem, {
    onSuccess: data => {
      queryClient.invalidateQueries('getListRecent');
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
          await fetchNextPage();
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
      <Loading isVisible={isFetching} />
    </View>
  );
};

export default HomeScreen;
