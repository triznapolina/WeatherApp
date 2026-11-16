import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';
import CityRow from '../components/CityRow';
import LoadState from '../components/LoadState';
import useFetch from '../hooks/useFetch';
import { api } from '../api/client';

export default function CitiesScreen({ navigation }) {
    const [query, setQuery] = useState('');
    const [search, setSearch] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => setSearch(query.trim()), 300);
        return () => clearTimeout(timer);
    }, [query]);

    const { data, loading, error, reload } = useFetch(() => api.getCities(search), [search]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Города</Text>
                    <Text style={styles.subtitle}>Выберите город для прогноза</Text>
                </View>
                <Pressable style={styles.pill} onPress={() => navigation.navigate('Subscriptions')}>
                    <Text style={styles.pillText}>Подписки</Text>
                </Pressable>
            </View>

            <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Поиск города"
                placeholderTextColor={COLORS.neutral300}
                style={styles.search}
            />

            <LoadState loading={loading} error={error} onRetry={reload}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <CityRow city={item} onPress={() => navigation.navigate('Today', { cityId: item.id })} />
                    )}
                    ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                    ListEmptyComponent={
                        <View style={styles.empty}>
                            <Text style={styles.emptyTitle}>Ничего не найдено</Text>
                            <Text style={styles.emptyText}>Измените запрос «{search}»</Text>
                        </View>
                    }
                    contentContainerStyle={styles.list}
                    keyboardShouldPersistTaps="handled"
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 12,
        marginBottom: 16,
    },
    title: { fontSize: 22, fontWeight: '600', color: COLORS.neutral900 },
    subtitle: { fontSize: 12, fontWeight: '500', color: COLORS.neutral600, marginTop: 2 },
    pill: {
        height: 36,
        paddingHorizontal: 14,
        borderRadius: 18,
        backgroundColor: COLORS.primary50,
        justifyContent: 'center',
    },
    pillText: { fontSize: 13, fontWeight: '600', color: COLORS.primary500 },
    search: {
        height: 48,
        marginHorizontal: 24,
        marginBottom: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.neutral200,
        backgroundColor: COLORS.white,
        paddingHorizontal: 14,
        fontSize: 15,
        color: COLORS.neutral900,
    },
    list: { paddingHorizontal: 24, paddingBottom: 28 },
    empty: { alignItems: 'center', paddingVertical: 48 },
    emptyTitle: { fontSize: 16, fontWeight: '600', color: COLORS.neutral900 },
    emptyText: { fontSize: 13, color: COLORS.neutral600, marginTop: 6 },
});
