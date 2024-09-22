import { TouchableOpacity } from 'react-native-gesture-handler';
import StyledText from '../common/StyledText';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import Space from '../common/Space';

const SectionListButton = ({
  onPress,
  isBold,
  title,
  subtitle,
}: {
  onPress: () => void;
  isBold: boolean;
  title: string;
  subtitle: string | null;
}) => {
  const opacity = { opacity: isBold ? 1 : 0.5 };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={{ flexDirection: 'row', alignItems: 'center' }}>
      <MaterialIcons name="calendar-today" size={19} color={isBold ? Colors.palette.secondary : 'white'} />
      <Space size={8} horizontal />
      <StyledText
        font={isBold ? 'bold' : 'regular'}
        variant={isBold ? 'secondary' : 'text'}
        size="base"
        style={opacity}
      >
        {title}
        {subtitle ? (
          <StyledText font={isBold ? 'semiBold' : 'light'} variant={isBold ? 'secondary' : 'text'} size="sm">
            {' '}
            {subtitle}{' '}
          </StyledText>
        ) : null}
      </StyledText>
    </TouchableOpacity>
  );
};

export default SectionListButton;
