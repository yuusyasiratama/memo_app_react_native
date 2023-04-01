import React, { Component } from 'react';
import { Alert, Button, Text, TextInput, StyleSheet, View, SafeAreaView, RefreshControl } from 'react-native';
import Message from './Message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: '',
      count: '',
      items: [],
    };

    this.onload = async () => {
      //全件取得
      try {
        let values = [];
        const keys = await AsyncStorage.getAllKeys();
        console.log("kokoha?", keys);
        keys.sort().forEach(async (key) => {
          if (key === "count") { return };
          const value = await AsyncStorage.getItem(key.toString());
          const json = {
            key: key,
            value: value,
          }
          console.log("valueeeeeeee:", value);
          values.push(json);
          console.log("json:::::", json);
          this.setState({ items: values });
        });

      } catch (error) {
        console.log('error', error);
      }
    }
    this.onload();

    this.doNote = (text) => {
      this.setState({ note: text })
      console.log("doNote:" + this.state.note);
    };

    this.doCount = (text) => {
      this.setState({ count: text })
    };

    this.doPut = async () => {
      try {
        console.log("doPut");
        console.log(this.state.items);
        var count = await AsyncStorage.getItem('count');
        if (count == null) { count = 1; }
        console.log("count:::", count);

        const note = this.state.note == null ? " " : this.state.note;
        // const putJson = {
        //   key:count,
        //   value:note,
        // };
        console.log("note::::", note);
        await AsyncStorage.setItem(count.toString(), note);
        const nextCount = parseInt(count) + 1;
        console.log("nextCount", nextCount);
        await AsyncStorage.setItem('count', nextCount.toString());
        this.doNote();
        Alert.alert('put data!');
        this.onload();
      } catch (error) {
        console.log(error);
        Alert.alert(error);
      }
    }

    this.clearAll = async () => {
      try {
        await AsyncStorage.clear()
        this.setState({ items: [] })
      } catch (e) {
        // clear error
      }
      this.setState({
        values: []
      })
      console.log('Clear Done.')
    }
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            placeholder='note'
            value={this.state.note}
            onChangeText={this.doNote}
          />
        </View>
        <Button title="PUT DATA" onPress={this.doPut} />
        <Button title="CLEAR ALL" onPress={this.clearAll} />
        {this.state.items.map(data => { return (<Text key={data.key}>{data.value}</Text>) })}

      </SafeAreaView >
    );
  }
}
