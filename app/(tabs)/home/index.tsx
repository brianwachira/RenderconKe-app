import { StyleSheet, ViewToken } from 'react-native';
import Animated from 'react-native-reanimated';
import { FlatList } from 'react-native-gesture-handler';
import MainContainer from '@/components/containers/MainContainer';
import { COLLAPSED_HEADER, EXPANDED_HEADER, ROW_HEIGHT } from '@/constants/Styles';
import ListSchedule from '@/components/lists/ListSchedule';
import { Extrapolation, interpolate, useAnimatedRef, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useScrollToTop } from '@react-navigation/native';
import { useFocusEffect } from 'expo-router';
import { useRenderConfStore } from '@/store/renderConfStore';
import { SessionItem } from '@/types';
import { NotFound } from '@/components/common/NotFound';
import { useState } from 'react';
import { MainHeader } from '@/components/headers/MainHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Home = () => {
  const insets = useSafeAreaInsets();
  const scrollRef = useAnimatedRef<FlatList<SessionItem>>();
  useScrollToTop(scrollRef as any);
  const [shouldShowDayOneHeader, setShouldShowDayOneHeader] = useState(true);

  const scrollOffset = useSharedValue(0);

  const paddingTopStyle = useAnimatedStyle(() => ({
    paddingTop: interpolate(
      scrollOffset.value,
      [COLLAPSED_HEADER, EXPANDED_HEADER],
      [0, ROW_HEIGHT],
      Extrapolation.CLAMP,
    ),
  }));

  useFocusEffect(() => {
    refreshSchedule({ ttlMs: 60_000 });
  });

  const { dayOne, dayTwo } = useRenderConfStore((state) => state.schedule);
  const refreshSchedule = useRenderConfStore((state) => state.refreshData);
  const isRefreshing = useRenderConfStore((state) => !!state.isRefreshing);

  const scrollToSection = ({ isDayOne }: { isDayOne: boolean }) => {
    scrollRef.current?.scrollToIndex({
      index: isDayOne ? 0 : dayOne.length,
      animated: true,
    });
  };

  const onViewableItemsChanged = (items: {
    viewableItems: ViewToken<SessionItem>[];
    changed: ViewToken<SessionItem>[];
  }) => {
    const topVisibleIndex = items.viewableItems?.[0]?.index || 0;
    const isDayOneThreshold = topVisibleIndex <= dayOne.length;
    const isDayTwoThreshold = topVisibleIndex >= dayOne.length;

    if (!shouldShowDayOneHeader && isDayOneThreshold) {
      setShouldShowDayOneHeader(true);
    }

    if (shouldShowDayOneHeader && isDayTwoThreshold) {
      setShouldShowDayOneHeader(false);
    }
  };

  const data = [
    ...dayOne.map((item) => ({ type: 'session', day: 1, item })),
    { type: 'section-header', day: 2 },
    ...dayTwo.map((item) => ({ type: 'session', day: 2, item })),
  ] as SessionItem[];

  if (!dayOne.length || !dayTwo.length) {
    return <NotFound message="Schedule unavailable" />;
  }
  return (
    <MainContainer style={[styles.container, { paddingTop: insets.top / 2 }]}>
      <Animated.View style={[styles.container, paddingTopStyle]}>
        <ListSchedule
          scrollRef={scrollRef}
          scrollOffset={scrollOffset}
          scrollToSection={scrollToSection}
          data={data}
          onViewableItemsChanged={onViewableItemsChanged}
          shouldShowDayOneHeader={shouldShowDayOneHeader}
          hideDayOneHeader={() => setShouldShowDayOneHeader(false)}
        />
        <MainHeader scrollOffset={scrollOffset} refreshing={isRefreshing} />
      </Animated.View>
    </MainContainer>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});
