import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import WeatherIcon from './WeatherIcon';

export default function HourCard({ time, temp, icon = 'pc', isActive = false }) {
  return (
    <View style={[styles.card, isActive ? styles.cardActive : styles.cardDefault]}>
      <Text style={[styles.time, isActive ? styles.textWhite : styles.textGray]}>
        {time}
      </Text>
      <WeatherIcon kind={icon} size={26} />
      <Text style={[styles.temp, isActive ? styles.textWhite : styles.textDark]}>
        {temp}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 64,
    height: 92,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardDefault: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.neutral200,
  },
  cardActive: {
    backgroundColor: COLORS.primary500,
  },
  time: {
    fontSize: 12,
    fontWeight: '500',
  },
  temp: {
    fontSize: 14,
    fontWeight: '600',
  },
  textWhite: {
    color: COLORS.white,
  },
  textGray: {
    color: COLORS.neutral600,
  },
  textDark: {
    color: COLORS.neutral900,
  },
});
