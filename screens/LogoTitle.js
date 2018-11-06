import React from 'react';
import {
  Image,
} from 'react-native';

class LogoTitle extends React.Component {
    render() {
      return (
        <Image
          source={require('../assets/images/robot-dev.png')}
          style={{ width: 30, height: 30 }}
        />
      );

    }
  }

