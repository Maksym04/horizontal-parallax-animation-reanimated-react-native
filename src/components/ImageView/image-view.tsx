import React from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import styles from './image-view-styles';

interface ImageViewProps {
  item: any;
  index: number;
  scrollX: SharedValue<number>;
}

const ImageView: React.FC<ImageViewProps> = ({item, index, scrollX}) => {
  const {height, width} = useWindowDimensions();

  const CARD_WIDTH = width * 0.9;
  const CARD_HEIGHT = CARD_WIDTH * 1.6;

  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(scrollX.value, inputRange, [1.5, 1, 1.5]),
        },
      ],
    };
  });

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      justifyContent: 'flex-end',
      overflow: 'hidden',
      borderRadius: 10,
      borderWidth: 2,
      borderColor: 'white',
      transform: [
        {
          scale: interpolate(scrollX.value, inputRange, [0.8, 1, 0.8]),
        },
      ],
    };
  });

  return (
    <View style={[styles.container, {height: height, width: width}]}>
      <Animated.View
        style={{
          ...animatedContainerStyle,
        }}>
        <Animated.Image
          style={[
            StyleSheet.absoluteFillObject,
            {
              ...animatedImageStyle,
            },
            styles.image,
          ]}
          source={{uri: item}}
        />
        <View style={[{height: CARD_HEIGHT * 0.25}, styles.textContainer]}>
          <Text style={styles.headerText}>A beautiful Bird</Text>
          <Text style={styles.text}>
            Birds are a group of warm-blooded vertebrates constituting the class
            Aves
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default ImageView;
