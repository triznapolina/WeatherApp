import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';
import LoadState from '../components/LoadState';
import useFetch from '../hooks/useFetch';
import { api } from '../api/client';
import { useSettings } from '../context/SettingsContext';
import { formatTemp } from '../utils/temperature';

export default function SubscriptionsScreen({ navigation }) {
    const { settings } = useSettings();
    const { data, loading, error, reload } = useFetch(() => api.getSubscriptions(), []);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardTop}>
                <Text style={styles.city}>
                    №{item.id} · {item.cityName}
                </Text>
                <Text style={[styles.badge, item.willNotifyNow ? styles.badgeOn : styles.badgeOff]}>
                    {item.willNotifyNow ? 'Сработает' : 'Ожидание'}
                </Text>
            </View>
            <Text style={styles.line}>{item.email}</Text>
            <Text style={styles.line}>
                Порог: {formatTemp(item.threshold, settings.units)} · сейчас{' '}
                {formatTemp(item.currentTemp, settings.units)}
            </Text>
            <Text style={styles.date}>{new Date(item.createdAt).toLocaleString('ru-RU')}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Text style={styles.backArrow}>←</Text>
                </Pressable>
                <View>
                    <Text style={styles.title}>История подписок</Text>
                    <Text style={styles.subtitle}>Создано на сервере</Text>
                </View>
            </View>

            <LoadState loading={loading} error={error} onRetry={reload}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                    ListEmptyComponent={
                        <View style={styles.empty}>
                            <Text style={styles.emptyTitle}>История пуста</Text>
                            <Text style={styles.emptyText}>Оформите подписку на экране города</Text>
                        </View>
                    }
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                />
            </LoadState>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: COLORS.neutral100 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        paddingHorizontal: 24,
        paddingTop: 12,
        marginBottom: 20,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.neutral200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backArrow: { fontSize: 18, fontWeight: '600', color: COLORS.neutral900 },
    title: { fontSize: 22, fontWeight: '600', color: COLORS.neutral900 },
    subtitle: { fontSize: 12, fontWeight: '500', color: COLORS.neutral600, marginTop: 2 },
    list: { paddingHorizontal: 24, paddingBottom: 28 },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.neutral200,
        padding: 14,
    },
    cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    city: { fontSize: 15, fontWeight: '600', color: COLORS.neutral900 },
    badge: { fontSize: 11, fontWeight: '700', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, overflow: 'hidden' },
    badgeOn: { backgroundColor: COLORS.primary50, color: COLORS.primary500 },
    badgeOff: { backgroundColor: COLORS.neutral100, color: COLORS.neutral600 },
    line: { fontSize: 13, color: COLORS.neutral600, marginTop: 4 },
    date: { fontSize: 11, color: COLORS.neutral300, marginTop: 6 },
    empty: { alignItems: 'center', paddingVertical: 48 },
    emptyTitle: { fontSize: 16, fontWeight: '600', color: COLORS.neutral900 },
    emptyText: { fontSize: 13, color: COLORS.neutral600, marginTop: 6 },
});
