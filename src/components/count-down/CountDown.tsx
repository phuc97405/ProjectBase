import React, {useEffect, useRef, useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {localServices} from '~services/local-service';

const CountDown = ({value, cb}: {value: number; cb?: () => {}}) => {
  // let a = 5756 + 1
  const [count, setCount] = useState<number>(value);
  console.log('value', value);
  useEffect(() => {
    setCount(value);
    // a.a();
    // const time = setInterval(t => {
    //   console.log('ttt', t);

    //   setCount((rePre): any => {
    //     if (rePre === 1) clearInterval(time);
    //     return rePre - 1;
    //   });
    // }, 1000);
    // return () => {
    //   clearInterval(time);
    // };
    console.log('useEffec con');
  }, [value]);

  return (
    <>
      {console.log('render con', count)}
      <TouchableOpacity onPress={() => setCount(count - 1)}>
        <Text>children{count}</Text>
      </TouchableOpacity>
    </>
  );
};
export default CountDown;
