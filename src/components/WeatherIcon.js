import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

export default function WeatherIcon({ kind = 'pc', size = 26 }) {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {kind !== 'cloud' && (
        <View
          style={[
            styles.sun,
            {
              width: size * 0.5,
              height: size * 0.5,
              borderRadius: size * 0.25,
              right: size * 0.1,
              top: size * 0.05,
            },
          ]}
        />
      )}
      {kind !== 'sun' && (
        <View
          style={[
            styles.cloud,
            {
              width: size * 0.8,
              height: size * 0.45,
              borderRadius: size * 0.225,
              left: size * 0.05,
              bottom: size * 0.1,
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  sun: {
    position: 'absolute',
    backgroundColor: COLORS.warning500,
  },
  cloud: {
    position: 'absolute',
    backgroundColor: COLORS.cloudGray,
  },
});
