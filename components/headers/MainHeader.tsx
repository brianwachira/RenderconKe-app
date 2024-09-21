import { EXPANDED_HEADER } from '@/constants/Styles';
import Animated, { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { RenderConfHeader } from './RenderConfHeader';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

interface HeaderProps {
  scrollOffset: SharedValue<number>;
  refreshing: boolean;
}

export function MainHeader({ scrollOffset, refreshing }: HeaderProps) {
  const animatedHeader = useAnimatedStyle(() => ({
    height: interpolate(scrollOffset.value, [0, EXPANDED_HEADER], [EXPANDED_HEADER, 0]),
  }));

  return (
    <Animated.View style={[styles.header, animatedHeader]}>
      <RenderConfHeader scrollOffset={scrollOffset} />
      <View style={{ position: 'absolute', right: 20, top: 15 }}>
        <ActivityIndicator size="small" hidesWhenStopped={true} animating={refreshing} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    width: '100%',
  },
});
