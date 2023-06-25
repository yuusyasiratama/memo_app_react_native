import React, { Component } from 'react';
import { Alert, Button, Text, TextInput, StyleSheet, View, SafeAreaView, RefreshControl } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-reanimated-table';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['日付', '脱出', '結果', 'メンバー'],
      // tableTitle: ['Title', 'Title2', 'Title3', 'Title4'],
      tableData: [
        ['無人島脱出', '6/19', '成功', 'A,B,C,D'],
        ['遊園地脱出', '6/19', '成功', 'A,B,C,D'],
        ['刑務所脱出', '6/19', '失敗', 'A,B,C,D'],
        ['コナン脱出', '6/19', '成功', 'A,B,C,D']
      ]
    };
  }

  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 1 }}>
          <Row data={state.tableHead} flexArr={[2, 1, 1, 3]} style={styles.head} textStyle={styles.text} />
          <TableWrapper style={styles.wrapper}>
            {/* <Col data={state.tableTitle} style={styles.title} heightArr={[28, 28]} textStyle={styles.text} /> */}
            <Rows data={state.tableData} flexArr={[2, 1, 1, 3]} style={styles.row} textStyle={styles.text} />
          </TableWrapper>
        </Table>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: { height: 28 },
  text: { textAlign: 'center' }
});
