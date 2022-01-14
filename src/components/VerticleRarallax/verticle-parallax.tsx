import React from 'react';
import {FlatList, StatusBar, useWindowDimensions, View} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {items} from '../../images/images';
import BackgroundImageView from '../BackgroundImageView/background-image-view';
import ImageView from '../ImageView/image-view';
import styles from './verticle-parallax-styles';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const VerticleParallax: React.FC = () => {
  const {height, width} = useWindowDimensions();

  const scrollX = useSharedValue<number>(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" />
      {items.map((image, index) => {
        return (
          <BackgroundImageView image={image} index={index} scrollX={scrollX} />
        );
      })}
      <AnimatedFlatList
        horizontal
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={[
          styles.flatListContainer,
          {
            height,
          },
        ]}
        pagingEnabled
        snapToInterval={width}
        data={items}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => {
          return <ImageView item={item} index={index} scrollX={scrollX} />;
        }}
      />
    </View>
  );
};

export default VerticleParallax;
