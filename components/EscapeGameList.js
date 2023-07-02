import React, { useState } from 'react';
import { View, ScrollView, Button, Text, StyleSheet } from 'react-native';

const escapeGameResults = [
  { name: 'コナン脱出', date: '2023-06-20', result: '成功', members: ['AAA', 'BBB'], impression: 'とても楽しかった！' },
  { name: '遊園地脱出', date: '2023-06-21', result: '成功', members: ['CCC', 'DDD'], impression: '成功率20％！' },
  { name: '遊園地脱出', date: '2023-06-21', result: '成功', members: ['CCC', 'DDD'], impression: '成功率20％！' },
  { name: '遊園地脱出', date: '2023-06-21', result: '成功', members: ['CCC', 'DDD'], impression: '成功率20％！' },
  { name: '遊園地脱出', date: '2023-06-21', result: '成功', members: ['CCC', 'DDD'], impression: '成功率20％！' },
  { name: '遊園地脱出', date: '2023-06-21', result: '成功', members: ['CCC', 'DDD'], impression: '成功率20％！' },
  { name: '遊園地脱出', date: '2023-06-21', result: '成功', members: ['CCC', 'DDD'], impression: '成功率20％！' },
  // 他の結果データ
];


const EscapeGameList = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemPress = (item) => {
    setSelectedItem(item);
  };

  const renderEscapeGameItem = (item) => {
    const { name, date, result, members, impression } = item;

    return (
      <View key={name} style={styles.itemContainer}>
        <Text style={styles.itemText}>脱出ゲーム名: {name}</Text>
        <Text style={styles.itemText}>日付: {date}</Text>
        <Text style={styles.itemText}>結果: {result}</Text>
        <Button title="詳細を表示" onPress={() => handleItemPress(item)} />
        {selectedItem === item && (
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsText}>参加メンバー: {members.join(', ')}</Text>
            <Text style={styles.detailsText}>感想: {impression}</Text>
            {/* 他の詳細情報の表示 */}
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {escapeGameResults.map(renderEscapeGameItem)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  itemContainer: {
    marginBottom: 16,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 8,
  },
  detailsContainer: {
    backgroundColor: '#f1f1f1',
    padding: 16,
  },
  detailsText: {
    fontSize: 14,
    marginBottom: 8,
  },
});

export default EscapeGameList;
