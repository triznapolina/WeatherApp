import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

export default function PrimaryButton({ title, onPress, disabled = false, variant = 'primary' }) {
    const isSecondary = variant === 'secondary';
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                styles.button,
                isSecondary ? styles.buttonSecondary : styles.buttonPrimary,
                pressed && (isSecondary ? styles.secondaryPressed : styles.buttonPressed),
                disabled && styles.buttonDisabled,
            ]}
        >
            <Text
                style={[
                    styles.label,
                    isSecondary ? styles.labelSecondary : styles.labelPrimary,
                    disabled && styles.labelDisabled,
                ]}
            >
                {title}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonPrimary: {
        backgroundColor: COLORS.primary500,
        shadowColor: COLORS.primary500,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.24,
        shadowRadius: 12,
        elevation: 4,
    },
    buttonSecondary: {
        backgroundColor: COLORS.white,
        borderWidth: 1.5,
        borderColor: COLORS.primary500,
    },
    buttonPressed: { backgroundColor: COLORS.primary600 },
    secondaryPressed: { backgroundColor: COLORS.primary50 },
    buttonDisabled: {
        backgroundColor: COLORS.neutral200,
        borderColor: COLORS.neutral200,
        shadowOpacity: 0,
        elevation: 0,
    },
    label: { fontSize: 16, fontWeight: '600' },
    labelPrimary: { color: COLORS.white },
    labelSecondary: { color: COLORS.primary500 },
    labelDisabled: { color: COLORS.neutral300 },
});
