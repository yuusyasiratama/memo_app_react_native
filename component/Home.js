import React, { Component } from 'react';
import { Alert, Button, Text, TextInput, StyleSheet, View, SafeAreaView, RefreshControl } from 'react-native';
import Message from './Message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      mail: '',
      keys: '',
      count: '',
      values: [],
      // sendtext: 
    };

    this.onload = async () => {
      //全件取得
      try {
        var values = [];
        const keys = await AsyncStorage.getAllKeys();
        keys.sort().forEach(key => async () => {
          if (key === "count") { return };
          const value = await AsyncStorage.getItem(key.toString());
          AsyncStorage.getItem(key.toString())
            .then((value) => {
              values.push(value);
              this.setState({
                values: values
              })
            })
        });

        // AsyncStorage.getAllKeys()
        //   .then((keys) => {
        //     var values = [];
        //     keys.sort().forEach(key => {
        //       if (key === "count") { return; };
        //       AsyncStorage.getItem(key.toString())
        //         .then((value) => {
        //           values.push(value);
        //           this.setState({
        //             values: values
        //           })
        //         })
        //     });
        //   });
      } catch (error) {
        console.log('error', error);
      }
    }
    this.onload();

    this.doName = (text) => {
      this.setState({ name: text })
      console.log("doName:" + this.state.name);
    };

    this.doKeys = (text) => {
      this.setState({ keys: text })
    }

    this.doCount = (text) => {
      this.setState({ count: text })
    };

    this.doValues = (values) => {
      this.setState({ values: values })
    };

    this.doPut = async () => {
      try {
        console.log("doPut");
        var count = await AsyncStorage.getItem('count');
        if (count == null) { count = 1; }
        console.log("count:::", count);

        var data = this.state.name;
        await AsyncStorage.setItem(count.toString(), this.state.name);
        const nextCount = parseInt(count) + 1;
        console.log("nextCount", nextCount);
        await AsyncStorage.setItem('count', nextCount.toString());
        this.doName();
        // 続き：時間も一緒にPUT・表示できるようにする
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
            placeholder='name'
            value={this.state.name}
            onChangeText={this.doName}
          />
        </View>
        {/* <Button title="GET All DATA" onPress={this.doGetAll} /> */}
        {/* <Button title="GET COUNT" onPress={this.doGetCount} /> */}
        <Button title="PUT DATA" onPress={this.doPut} />
        <Button title="CLEAR ALL" onPress={this.clearAll} />
        {this.state.values.map(data => { return (<Text>{data}</Text>) })}
      </SafeAreaView >
    );
  }
}
