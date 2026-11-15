import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

export default function DayChip({ day, date, selected = false }) {
  return (
    <View style={[styles.chip, selected ? styles.chipSelected : styles.chipDefault]}>
      <Text style={[styles.chipDay, selected ? styles.textWhite : styles.textGray]}>
        {day}
      </Text>
      <Text style={[styles.chipDate, selected ? styles.textWhite : styles.textDark]}>
        {date}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    width: 40,
    height: 64,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  chipDefault: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.neutral200,
  },
  chipSelected: {
    backgroundColor: COLORS.primary500,
  },
  chipDay: {
    fontSize: 12,
    fontWeight: '500',
  },
  chipDate: {
    fontSize: 16,
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
