import React, { Component } from 'react';
import { Alert, Button, Text, TextInput, StyleSheet, View, SafeAreaView } from 'react-native';
import Message from './Message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'database access',
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
        AsyncStorage.getAllKeys()
          .then((keys) => {
            var values2 = [];
            keys.sort().forEach(key => {
              console.log('key', key)
              if (key === "count") { return; };
              console.log('values', values2)
              AsyncStorage.getItem(key.toString())
                .then((value) => {
                  console.log('pushまえ', values2)
                  values2.push(value);
                  console.log('aaa', value);
                  this.setState({
                    values: values2
                  })
                })
            });
          });
      } catch (error) {
        console.log('error', error);
      }
    }
    this.onload();

    // doId = 
    this.doId = (text) => {
      this.setState({ id: text })
      console.log("doid:" + this.state.id);
    };

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
        this.getAllData();
        this.setState({
          name: ''
        })
        // 続き：時間も一緒にPUT・表示できるようにする
        // あとgitにpushする
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
        this.setState({
          value: []
        })
      } catch (e) {
        // clear error
      }
      console.log('Clear Done.')
    }

    // this.doGet = () => {
    //   try {
    //     AsyncStorage.getItem('MyData_' + this.state.id)
    //       .then((data) => {
    //         if (data !== null) {
    //           var obj = JSON.parse(data);
    //           this.setState({
    //             id: obj.id,
    //             name: obj.name,
    //           });
    //         } else {
    //           Alert.alert('no data!');
    //         }
    //       });
    //   } catch (error) {
    //     console.log(error);
    //     Alert.alert(errir);
    //   }
    // }

    this.doGetCount = () => {
      try {
        AsyncStorage.getItem("count")
          .then((item) => {
            if (item !== null) {
              console.log("count:", item);
            } else {
              console.log("not count");
            }
          })
      } catch (error) {
        console.log('error', error)
      }
    }

    this.getAllData = () => {
      try {
        AsyncStorage.getAllKeys()
          .then((keys) => {
            console.log(keys);

            // this.setState({
            //   values: keys,
            // })
          });
      } catch (error) {
        console.log('error', error);
      }
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
        {this.state.values.map(data => { return (<Text key={data}>{data}</Text>) })}
      </SafeAreaView >
    );
  }
}
