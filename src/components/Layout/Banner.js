import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const HomeBanner = () => {
  return (
    <View style={styles.wrapper}>
      <Swiper
        autoplay
        autoplayTimeout={3}
        showsPagination={true}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
      >
        <View style={styles.imageContainer}>
          <Image source={require('../../../assets/images/slide-1.png')} style={styles.image} />
        </View>
        <View style={styles.imageContainer}>
          <Image source={require('../../../assets/images/slide-2.png')} style={styles.image} />
        </View>
        <View style={styles.imageContainer}>
          <Image source={require('../../../assets/images/slide-3.png')} style={styles.image} />
        </View>
        <View style={styles.imageContainer}>
          <Image source={require('../../../assets/images/slide-4.png')} style={styles.image} />
        </View>
        <View style={styles.imageContainer}>
          <Image source={require('../../../assets/images/slide-5.png')} style={styles.image} />
        </View>
        <View style={styles.imageContainer}>
          <Image source={require('../../../assets/images/slide-6.png')} style={styles.image} />
        </View>
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageContainer: {
    width: 358,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', 
    borderRadius: 12,
  },
  dot: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
});

export default HomeBanner;
