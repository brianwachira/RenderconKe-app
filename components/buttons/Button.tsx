import Colors from '@/constants/Colors';
import { StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import StyledText from '../common/StyledText';

const buttonTextSize = 22;

export function Button({ title, onPress, isLoading }: { title: string; onPress: () => void; isLoading?: boolean }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button]} activeOpacity={0.8}>
      {isLoading ? (
        <ActivityIndicator color={'white'} />
      ) : (
        <StyledText size="xxl" font="medium" style={styles.text}>
          {title}
        </StyledText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colors.palette.text,
    lineHeight: buttonTextSize,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 6,
    backgroundColor: Colors.palette.secondary,
    minWidth: 150,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
