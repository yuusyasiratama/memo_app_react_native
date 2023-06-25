import React from 'react';
import { View, Button } from 'react-native';

const Home = ({ navigation }) => {
  const handleNavigate = () => {
    navigation.navigate('EscapeGameList');
  };

  return (
    <View>
      <Button title="脱出結果の登録" onPress={handleNavigate} />
      <Button title="脱出結果の確認" onPress={handleNavigate} />
    </View>
  );
};

export default Home;
