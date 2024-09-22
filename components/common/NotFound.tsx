import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import { useRenderConfStore } from '@/store/renderConfStore';
import MainContainer from '../containers/MainContainer';
import Colors from '@/constants/Colors';
import StyledText from './StyledText';
import { Button } from '../buttons/Button';

export function NotFound({ message }: { message: string }) {
  const refetch = useRenderConfStore((state) => state.refreshData);
  const isRefetching = useRenderConfStore((state) => state.isRefreshing);
  return (
    <MainContainer>
      <View style={styles.container}>
        <StyledText font="bold" size={'xxl'} style={styles.heading}>
          {message}
        </StyledText>
        <Image
          tintColor={Colors.palette.secondary}
          source={require('../../assets/images/not-found.svg')}
          style={styles.image}
        />

        <Button title="Refetch" onPress={refetch} isLoading={isRefetching} />
      </View>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 48,
  },
  heading: {
    marginBottom: 24,
  },
});
