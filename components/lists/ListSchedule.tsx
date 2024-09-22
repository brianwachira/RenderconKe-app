import Colors from '@/constants/Colors';
import { EXPANDED_HEADER } from '@/constants/Styles';
import { Session } from '@/types';
import { StyleSheet, View, ViewToken } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated, { AnimatedRef, SharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';
import SectionListButton from '../buttons/SectionListButton';
import CardSession from '../cards/CardSession';
import Space from '../common/Space';

interface IListScheduleProps {
  scrollRef: AnimatedRef<FlatList<SessionItem>>;
  scrollOffset: SharedValue<number>;
  data: SessionItem[];
  onViewableItemsChanged: (items: {
    viewableItems: ViewToken<SessionItem>[];
    changed: ViewToken<SessionItem>[];
  }) => void;
  shouldShowDayOneHeader: boolean;
  hideDayOneHeader: () => void;
  scrollToSection: ({ isDayOne }: { isDayOne: boolean }) => void;
}

type SessionItem =
  | {
      type: 'session';
      day: number;
      item: Session;
    }
  | {
      type: 'section-header';
      day: number;
    };

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<SessionItem>);

const ListSchedule = ({
  scrollRef,
  scrollOffset,
  data,
  onViewableItemsChanged,
  shouldShowDayOneHeader,
  scrollToSection,
}: IListScheduleProps) => {
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollOffset.value = event.contentOffset.y;
  });

  return (
    <AnimatedFlatList
      ref={scrollRef}
      onViewableItemsChanged={onViewableItemsChanged}
      onScroll={scrollHandler}
      //style={{ backgroundColor: sectionListBackgroundColor }}
      contentContainerStyle={{
        paddingTop: EXPANDED_HEADER / 2,
      }}
      scrollEventThrottle={8}
      data={data}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={() => {
        return (
          <View style={[styles.sectionHeader, { borderBottomColor: Colors.palette.secondary }]}>
            <SectionListButton
              title="Fri,"
              subtitle={'Day 1'}
              isBold={shouldShowDayOneHeader}
              onPress={() => scrollToSection({ isDayOne: true })}
            />
            <SectionListButton
              title="Sat,"
              subtitle={'Day 2'}
              isBold={!shouldShowDayOneHeader}
              onPress={() => scrollToSection({ isDayOne: false })}
            />
          </View>
        );
      }}
      renderItem={({ item }) => {
        const isDayOne = item.day === 1;
        if (item.type === 'section-header') {
          return (
            <View style={[styles.sectionHeader, { borderBottomColor: Colors.palette.secondary }]}>
              <SectionListButton
                title="Fri,"
                subtitle={'Day 1'}
                isBold={isDayOne}
                onPress={() => scrollToSection({ isDayOne: true })}
              />
              <SectionListButton
                title="Sat,"
                subtitle={'Day 2'}
                isBold={!isDayOne}
                onPress={() => scrollToSection({ isDayOne: false })}
              />
            </View>
          );
        }
        if (item.item.isServiceSession) {
          return <CardSession item={item.item} variant="activity" />;
        }
        return <CardSession item={item.item} />;
      }}
      ItemSeparatorComponent={() => <Space size={18} />}
    />
  );
};

export default ListSchedule;

const styles = StyleSheet.create({
  sectionHeader: {
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 3,
  },
});
