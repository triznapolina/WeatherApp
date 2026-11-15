import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

export default function FormField({ label, error, children }) {
    return (
        <View style={styles.field}>
            <Text style={styles.label}>{label}</Text>
            {children}
            {!!error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    field: { marginBottom: 16 },
    label: { fontSize: 13, fontWeight: '600', color: COLORS.neutral900, marginBottom: 6 },
    error: { fontSize: 12, color: COLORS.danger500, marginTop: 6 },
});
