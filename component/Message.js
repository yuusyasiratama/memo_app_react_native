import React, { Component } from 'react';
import { Alert, Button, Text, TextInput, StyleSheet, View, SafeAreaView } from 'react-native';

export default class Message extends Component {
  // _onPressButton() {
  //   alert('You tapped the button!');
  //   const aaa = "aaa";
  // }

  render() {
    return (
      <Text>message {this.props.name}</Text>
      // const [text, onChangeText] = React.useState("Useless Text");
      // <SafeAreaView>
      //   <View>
      //     <Text>Hello, I am...</Text>
      //     <TextInput
      //       style={{
      //         height: 40,
      //         borderColor: 'gray',
      //         borderWidth: 1,
      //       }}
      //       placeholder="wright text"
      //     // value={aaa}
      //     />
      //   </View>
      //   <Button
      //     onPress={_onPressButton}
      //     title="send"
      //     color="#841584"
      //     accessibilityLabel="Learn more about this purple button"
      //   />
      // </SafeAreaView>

    );
  }
}
