import React, { useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';
import DayChip from '../components/DayChip';
import WeekRow from '../components/WeekRow';
import FilterTabs from '../components/FilterTabs';

const WEEK_CHIPS = [
    { id: '1', day: 'Пт', date: '13', selected: true },
    { id: '2', day: 'Сб', date: '14', selected: false },
    { id: '3', day: 'Вс', date: '15', selected: false },
    { id: '4', day: 'Пн', date: '16', selected: false },
    { id: '5', day: 'Вт', date: '17', selected: false },
    { id: '6', day: 'Ср', date: '18', selected: false },
    { id: '7', day: 'Чт', date: '19', selected: false },
];

const WEEK_ROWS = [
    { id: '1', day: 'Сегодня', condition: 'Облачно', icon: 'pc', high: '+19°', low: '+9°' },
    { id: '2', day: 'Суббота', condition: 'Небольшой дождь', icon: 'cloud', high: '+14°', low: '+8°' },
    { id: '3', day: 'Воскресенье', condition: 'Дождь', icon: 'cloud', high: '+12°', low: '+7°' },
    { id: '4', day: 'Понедельник', condition: 'Пасмурно', icon: 'cloud', high: '+10°', low: '+5°' },
    { id: '5', day: 'Вторник', condition: 'Ясно', icon: 'sun', high: '+11°', low: '+3°' },
    { id: '6', day: 'Среда', condition: 'Переменная облачность', icon: 'pc', high: '+13°', low: '+4°' },
    { id: '7', day: 'Четверг', condition: 'Облачно', icon: 'cloud', high: '+9°', low: '+2°' },
];

export default function WeekForecastScreen({ navigation }) {
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
                    <Text style={styles.subtitle}>Минск · 13–19 ноября</Text>
                </View>
            </View>

            <View style={styles.chipsRow}>
                {WEEK_CHIPS.map((chip) => (
                    <DayChip key={chip.id} day={chip.day} date={chip.date} selected={chip.selected} />
                ))}
            </View>

            <FilterTabs tabs={tabs} active={filter} onChange={setFilter} />
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
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
        </SafeAreaView>
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
