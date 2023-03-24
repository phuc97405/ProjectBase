import React from 'react';
import styles from './styles';
import Svg, {Path, Polygon, Circle} from 'react-native-svg';
import * as chartImgData from './dataImageChart';
import {systemColors} from '~constans/system-colors';

const radarImgData = chartImgData.radarImgData;
const rule = 'evenodd';
const strokeLinecap = 'square';
const stroke = systemColors.black;
const hightestColor = systemColors.blueOcean;
export default function RadarChartCustom(props: any) {
  const scores = props.scores;
  let max = Math.max(...scores);
  const index = scores.indexOf(max);
  const setColorText = (id: any) => {
    return id == index ? hightestColor : systemColors.Grey04;
  };
  const setStrokeWidth = (id: any) => {
    return id == index ? '0.5' : '0';
  };
  const x1 = chartImgData.getX1();
  const y1 = chartImgData.getY1(scores[0]);
  const x2 = chartImgData.getX2(scores[1]);
  const y2 = chartImgData.getY2(scores[1]);
  const x3 = chartImgData.getX3(scores[2]);
  const y3 = chartImgData.getY3(scores[2]);
  const x4 = chartImgData.getX4();
  const y4 = chartImgData.getY4(scores[3]);
  const x5 = chartImgData.getX5(scores[4]);
  const y5 = chartImgData.getY5(scores[4]);
  const x6 = chartImgData.getX6(scores[5]);
  const y6 = chartImgData.getY6(scores[5]);
  const getPoints = () => {
    return (
      x1 +
      ',' +
      y1 +
      ' ' +
      x2 +
      ',' +
      y2 +
      ' ' +
      x3 +
      ',' +
      y3 +
      ' ' +
      x4 +
      ',' +
      y4 +
      ' ' +
      x5 +
      ',' +
      y5 +
      ' ' +
      x6 +
      ',' +
      y6
    );
  };
  const points = getPoints();
  return (
    <Svg
      style={styles.radarImg}
      viewBox="0 0 296 290"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d={radarImgData[0].d}
        fill={setColorText(radarImgData[0].id)}
        strokeWidth={setStrokeWidth(radarImgData[0].id)}
        stroke={hightestColor}
      />
      <Path
        d={radarImgData[1].d}
        fill={setColorText(radarImgData[1].id)}
        strokeWidth={setStrokeWidth(radarImgData[1].id)}
        stroke={hightestColor}
      />
      <Path
        d={radarImgData[2].d}
        fill={setColorText(radarImgData[2].id)}
        strokeWidth={setStrokeWidth(radarImgData[2].id)}
        stroke={hightestColor}
      />
      <Path
        d={radarImgData[3].d}
        fill={setColorText(radarImgData[3].id)}
        strokeWidth={setStrokeWidth(radarImgData[3].id)}
        stroke={hightestColor}
      />
      <Path
        d={radarImgData[4].d}
        fill={setColorText(radarImgData[4].id)}
        strokeWidth={setStrokeWidth(radarImgData[4].id)}
        stroke={hightestColor}
      />
      <Path
        d={radarImgData[5].d}
        fill={setColorText(radarImgData[5].id)}
        strokeWidth={setStrokeWidth(radarImgData[5].id)}
        stroke={hightestColor}
      />
      <Path
        fill-rule={rule}
        clip-rule={rule}
        d={radarImgData[6].d}
        stroke={stroke}
      />
      <Path
        fill-rule={rule}
        clip-rule={rule}
        d={radarImgData[7].d}
        stroke={stroke}
      />
      <Path
        fill-rule={rule}
        clip-rule={rule}
        d={radarImgData[8].d}
        stroke={stroke}
      />
      <Path
        fill-rule={rule}
        clip-rule={rule}
        d={radarImgData[9].d}
        stroke={stroke}
      />
      <Path
        fill-rule={rule}
        clip-rule={rule}
        d={radarImgData[10].d}
        stroke={stroke}
      />
      <Path
        d={radarImgData[11].d}
        stroke={stroke}
        stroke-linecap={strokeLinecap}
      />
      <Path
        d={radarImgData[12].d}
        stroke={stroke}
        stroke-linecap={strokeLinecap}
      />
      <Path
        d={radarImgData[13].d}
        stroke={stroke}
        stroke-linecap={strokeLinecap}
      />
      <Circle cx={x1} cy={y1} r="4" fill={hightestColor} />
      <Circle cx={x2} cy={y2} r="4" fill={hightestColor} />
      <Circle cx={x3} cy={y3} r="4" fill={hightestColor} />
      <Circle cx={x4} cy={y4} r="4" fill={hightestColor} />
      <Circle cx={x5} cy={y5} r="4" fill={hightestColor} />
      <Circle cx={x6} cy={y6} r="4" fill={hightestColor} />
      <Polygon
        points={points}
        fill={hightestColor}
        fillOpacity="0.4"
        stroke={hightestColor}
        strokeWidth="2"
      />
    </Svg>
  );
}

RadarChartCustom.defaultProps = {
  textStyle: null,
  titleText: null,
  numberOfLines: 0,
  values: ['', '', '', '', '', ''],
  scores: [0, 0, 0, 0, 0, 0],
};
