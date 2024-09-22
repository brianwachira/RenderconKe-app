import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { Extrapolation, SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import StyledText from '../common/StyledText';
import { COLLAPSED_HEADER, EXPANDED_HEADER, ROW_HEIGHT } from '@/constants/Styles';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const interpolateHeader = (scrollOffset: SharedValue<number>, outputRange: number[]) => {
  'worklet';
  return interpolate(scrollOffset.value, [COLLAPSED_HEADER, EXPANDED_HEADER], outputRange, Extrapolation.CLAMP);
};

interface RenderConfHeaderProps {
  scrollOffset: SharedValue<number>;
}

export function RenderConfHeader({ scrollOffset }: RenderConfHeaderProps) {
  const animatedLogoStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolateHeader(scrollOffset, [0, -30]) },
      { scale: interpolateHeader(scrollOffset, [1, 0.6]) },
    ],
  }));

  const firstLineStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolateHeader(scrollOffset, [0, -45]) },
      { translateY: interpolateHeader(scrollOffset, [0, 0]) },
    ],
    fontSize: interpolateHeader(scrollOffset, [28, 24]),
  }));

  const headerStyle = useAnimatedStyle(() => ({
    height: interpolateHeader(scrollOffset, [EXPANDED_HEADER - ROW_HEIGHT, COLLAPSED_HEADER]),
  }));

  return (
    <Animated.View style={[styles.header, headerStyle]}>
      <AnimatedImage
        priority="high"
        source={require('../../assets/images/rendercon-white-logo.png')}
        style={[styles.reactImage, animatedLogoStyle]}
        contentFit={'contain'}
      />
      <StyledText font="bold" style={[styles.logoText, firstLineStyle]} animated>
        RENDERCONKE ‘24
      </StyledText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  reactImage: {
    width: 55,
    height: 55,
  },
  logoText: {
    paddingStart: 8,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
});
