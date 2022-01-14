import React from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface BackgroundImageViewProps {
  image: string;
  index: number;
  scrollX: SharedValue<number>;
}

const BackgroundImageView: React.FC<BackgroundImageViewProps> = ({
  image,
  index,
  scrollX,
}) => {
  const {width} = useWindowDimensions();

  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollX.value, inputRange, [0, 1, 0]),
    };
  });

  return (
    <Animated.Image
      key={`image-bg-${index}`}
      source={{uri: image}}
      style={[
        StyleSheet.absoluteFillObject,
        {
          resizeMode: 'cover',
          ...animatedImageStyle,
        },
      ]}
      blurRadius={2}
    />
  );
};

export default BackgroundImageView;
