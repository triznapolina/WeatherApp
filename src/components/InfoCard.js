import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

export default function InfoCard({ title, children }) {
    return (
        <View style={styles.card}>
            {title ? <Text style={styles.title}>{title}</Text> : null}
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.neutral200,
        padding: 14,
        marginBottom: 12,
    },
    title: { fontSize: 14, fontWeight: '600', color: COLORS.neutral900, marginBottom: 8 },
});
