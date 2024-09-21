import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Extrapolation, SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import StyledText from '../common/StyledText';
import { COLLAPSED_HEADER, EXPANDED_HEADER, ROW_HEIGHT } from '@/constants/Styles';
import Colors from '@/constants/Colors';
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
      { translateY: interpolateHeader(scrollOffset, [0, 13]) },
    ],
    fontSize: interpolateHeader(scrollOffset, [36, 24]),
  }));

  const headerStyle = useAnimatedStyle(() => ({
    height: interpolateHeader(scrollOffset, [EXPANDED_HEADER - ROW_HEIGHT, COLLAPSED_HEADER]),
  }));

  return (
    <Animated.View style={[styles.header, headerStyle]}>
      <AnimatedImage
        priority="high"
        tintColor={Colors.palette.primary}
        source={require('../assets/images/rendercon-white-logo.png')}
        style={[styles.reactImage, animatedLogoStyle]}
      />
      <View>
        <StyledText size="xxl" font="bold" style={[styles.logoText, firstLineStyle]} animated>
          RENDERCONKE ‘24
        </StyledText>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  reactImage: {
    width: 75,
    height: 75,
  },
  logoText: {
    paddingStart: 8,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
});
