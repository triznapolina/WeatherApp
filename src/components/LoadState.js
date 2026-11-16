import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import PrimaryButton from './PrimaryButton';

export default function LoadState({ loading, error, onRetry, children }) {
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary500} />
        <Text style={styles.hint}>Загрузка…</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Не удалось загрузить данные</Text>
        <Text style={styles.errorText}>{error}</Text>
        <View style={styles.retry}>
          <PrimaryButton title="Повторить" onPress={onRetry} />
        </View>
      </View>
    );
  }
  return children;
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, minHeight: 240 },
  hint: { fontSize: 14, color: COLORS.neutral600, marginTop: 12 },
  errorTitle: { fontSize: 16, fontWeight: '600', color: COLORS.neutral900 },
  errorText: { fontSize: 13, color: COLORS.danger500, textAlign: 'center', marginTop: 8 },
  retry: { alignSelf: 'stretch', marginTop: 20 },
});
