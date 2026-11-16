import React, { useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';
import DayChip from '../components/DayChip';
import WeekRow from '../components/WeekRow';
import FilterTabs from '../components/FilterTabs';
import LoadState from '../components/LoadState';
import useFetch from '../hooks/useFetch';
import { api } from '../api/client';

export default function WeekForecastScreen({ navigation, route }) {
    const { cityId } = route.params;
    const { data: city, loading, error, reload } = useFetch(() => api.getCity(cityId), [cityId]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <LoadState loading={loading} error={error} onRetry={reload}>
                {city && <WeekContent city={city} navigation={navigation} />}
            </LoadState>
        </SafeAreaView>
    );
}

function WeekContent({ city, navigation }) {
    const WEEK_ROWS = city.week;
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [filter, setFilter] = useState('all');

    const toggleFavorite = (id) => {
        setFavoriteIds((prev) =>
            prev.includes(id)
                ? prev.filter((x) => x !== id)
                : [...prev, id]
        );
    };

    const visibleRows =
        filter === 'all' ? WEEK_ROWS : WEEK_ROWS.filter((row) => favoriteIds.includes(row.id));

    const tabs = [
        { key: 'all', label: 'Все' },
        { key: 'favorites', label: 'Избранное', badge: favoriteIds.length },
    ];

    const renderItem = ({ item }) => (
        <WeekRow
            day={item.day}
            condition={item.condition}
            icon={item.icon}
            high={item.high}
            low={item.low}
            isFavorite={favoriteIds.includes(item.id)}
            onToggleFavorite={() => toggleFavorite(item.id)}
        />
    );

    const header = (
        <View>
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Text style={styles.backArrow}>←</Text>
                </Pressable>
                <View>
                    <Text style={styles.title}>Прогноз на неделю</Text>
                    <Text style={styles.subtitle}>{city.name} · {city.weekRange}</Text>
                </View>
            </View>

            <View style={styles.chipsRow}>
                {WEEK_ROWS.map((chip, index) => (
                    <DayChip key={chip.id} day={chip.short} date={chip.date} selected={index === 0} />
                ))}
            </View>

            <FilterTabs tabs={tabs} active={filter} onChange={setFilter} />
        </View>
    );

    return (
        <FlatList
            data={visibleRows}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={favoriteIds}
            ListHeaderComponent={header}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={
                <View style={styles.empty}>
                    <Text style={styles.emptyTitle}>Пока нет избранных дней</Text>
                    <Text style={styles.emptyText}>Нажмите ☆ у нужного дня во вкладке «Все»</Text>
                </View>
            }
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: COLORS.neutral100 },
    scrollContent: { paddingHorizontal: 24, paddingTop: 12, paddingBottom: 28 },
    header: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 24 },
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
    chipsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    separator: { height: 8 },
    empty: { alignItems: 'center', paddingVertical: 48 },
    emptyTitle: { fontSize: 16, fontWeight: '600', color: COLORS.neutral900 },
    emptyText: { fontSize: 13, color: COLORS.neutral600, marginTop: 6 },
});
