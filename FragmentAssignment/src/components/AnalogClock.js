import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Svg, Circle, Line} from 'react-native-svg';

const AnalogClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timerID);
  }, []);

  const getRotationAngle = (timeUnit, totalUnits) =>
    (360 / totalUnits) * timeUnit;

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  const hourAngle = getRotationAngle(((hours % 12) + minutes / 60) * 5, 60);
  const minuteAngle = getRotationAngle(minutes, 60);
  const secondAngle = getRotationAngle(seconds, 60);

  const renderHourText = (hour, index) => {
    const customText = [
      '12',
      '1',
      'Movie',
      '3',
      '4',
      '5',
      '6',
      '7',
      'yoga',
      '9',
      '10',
      '11',
    ];
    const angle = -(index * 30 + 270) % 360;

    return (
      <Text
        key={hour}
        style={{
          position: 'absolute',
          left: 90 + 80 * Math.cos((angle * Math.PI) / 180),
          top: 100 - 80 * Math.sin((angle * Math.PI) / 180),
          color: 'black',
          fontWeight: 'bold',
        }}>
        {customText[hour]}
      </Text>
    );
  };

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Svg height="200" width="200">
        {/* Hour markers */}
        {[...Array(12).keys()].map((hour, index) =>
          renderHourText(hour, index),
        )}

        {/* Hour hand */}
        <Line
          x1="100"
          y1="100"
          x2="100"
          y2="60"
          stroke="black"
          strokeWidth="4"
          strokeLinecap="round"
          rotation={hourAngle}
          origin="100,100"
        />

        {/* Minute hand */}
        <Line
          x1="100"
          y1="100"
          x2="100"
          y2="40"
          stroke="black"
          strokeWidth="3"
          strokeLinecap="round"
          rotation={minuteAngle}
          origin="100,100"
        />

        {/* Second hand */}
        <Line
          x1="100"
          y1="100"
          x2="100"
          y2="60"
          stroke="red"
          strokeWidth="2"
          strokeLinecap="round"
          rotation={secondAngle}
          origin="100,100"
        />

        {/* Clock center */}
        <Circle cx="100" cy="100" r="5" fill="black" />
      </Svg>
    </View>
  );
};

export default AnalogClock;
