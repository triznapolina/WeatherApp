import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

export default function PrimaryButton({ title, onPress, disabled = false }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
        disabled && styles.buttonDisabled,
      ]}
    >
      <Text style={[styles.label, disabled && styles.labelDisabled]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 12,
    backgroundColor: COLORS.primary500,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary500,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.24,
    shadowRadius: 12,
    elevation: 4,
  },
  buttonPressed: {
    backgroundColor: COLORS.primary600,
  },
  buttonDisabled: {
    backgroundColor: COLORS.neutral200,
    shadowOpacity: 0,
    elevation: 0,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
  labelDisabled: {
    color: COLORS.neutral300,
  },
});
