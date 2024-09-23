import { Link } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import colors from '@/constants/Colors';
import StyledText from '../common/StyledText';
import { Image } from 'expo-image';
import { Session } from '@/types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { formatDate } from '@/utils/formatDate';
import Space from '../common/Space';

interface CardSessionDefaultProps {
  variant?: 'default' | 'activity';
  item: Session;
}

type CardSessionProps = CardSessionDefaultProps;

const CardSession = ({ item, variant = 'default' }: CardSessionProps) => {
  if (variant === 'activity') {
    return (
      <View style={styles.container}>
        <StyledText size="base" font="semiBold">
          {formatDate(item.startsAt, 'time')} - {formatDate(item.endsAt, 'time')}
        </StyledText>
        <StyledText size="lg" font="bold">
          {item.title}
        </StyledText>
        <StyledText size="md" font="light">
          {item.room}
        </StyledText>
      </View>
    );
  }
  return (
    <Link push href={{ pathname: '/session/[session]/', params: { session: item.id } }} asChild>
      <TouchableOpacity activeOpacity={0.8}>
        <View
          style={[
            {
              backgroundColor: colors.palette.translucent,
              borderColor: colors.palette.text,
            },
            styles.contentContainer,
          ]}
        >
          <View style={styles.contentRow}>
            <View>
              <StyledText size="base" font="medium" italic variant="text">
                {item.title}
              </StyledText>
              <Space size={8} />
              <View style={styles.rowEnd}>
                <Ionicons name="location-outline" size={24} color={Colors.palette.secondary} />
                <StyledText size="base" font="medium" italic variant="text">
                  {item.room}
                </StyledText>
              </View>

              <Space size={8} />
              <StyledText size="base" font="semiBold" variant="text">
                {formatDate(item.startsAt, 'time')} - {formatDate(item.endsAt, 'time')}
              </StyledText>
            </View>
            <MaterialIcons name="bookmark-outline" size={24} color={Colors.palette.secondary} />
          </View>

          <View style={[{ backgroundColor: Colors.palette.secondary }, styles.horizontalRule]} />
          {item.speakers.map((speaker) => (
            <View style={styles.speakerContainer}>
              <Image source={speaker.profilePicture} style={styles.speakerImage} />
              <Space size={18} horizontal />
              <View>
                <StyledText size="md" font="bold" variant="text">
                  {speaker.fullName}
                </StyledText>
                <StyledText size="base" font="light" italic variant="text" style={styles.tagline}>
                  {speaker.tagLine}
                </StyledText>
              </View>
            </View>
          ))}
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default CardSession;

const styles = StyleSheet.create({
  container: {
    margin: 18,
    borderRadius: 8,
  },
  contentContainer: {
    borderWidth: 1,
    padding: 18,
    overflow: 'hidden',
    borderRadius: 8,
    marginHorizontal: 18,
  },
  tagline: { width: '80%' },
  contentRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  rowEnd: { flexDirection: 'row', alignItems: 'flex-end' },
  horizontalRule: { height: 1, width: '100%', marginTop: 18 },
  speakerContainer: { flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginTop: 18 },
  speakerImage: { width: 67, height: 67, borderRadius: 8 },
});
