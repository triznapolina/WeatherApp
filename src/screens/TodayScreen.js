import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';
import PrimaryButton from '../components/PrimaryButton';
import HourCard from '../components/HourCard';
import WeatherIcon from '../components/WeatherIcon';
import InfoCard from '../components/InfoCard';
import { useSettings } from '../context/SettingsContext';
import { formatTemp } from '../utils/temperature';
import LoadState from '../components/LoadState';
import useFetch from '../hooks/useFetch';
import { api } from '../api/client';

const MIN_HOURS = 1;

export default function TodayScreen({ navigation, route }) {
    const { cityId } = route.params;
    const { data: city, loading, error, reload } = useFetch(() => api.getCity(cityId), [cityId]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <LoadState loading={loading} error={error} onRetry={reload}>
                {city && <TodayContent city={city} navigation={navigation} />}
            </LoadState>
        </SafeAreaView>
    );
}

function TodayContent({ city, navigation }) {
    const { settings } = useSettings();
    const units = settings.units;
    const HOURLY_DATA = city.hourly;
    const MAX_HOURS = HOURLY_DATA.length;
    const METRICS_DATA = [
        { id: 'wind', value: `${city.wind} м/с`, label: 'Ветер' },
        { id: 'humidity', value: `${city.humidity}%`, label: 'Влажность' },
        { id: 'pressure', value: `${city.pressure}`, label: 'Давление' },
    ];

    const [hoursCount, setHoursCount] = useState(3);

    const increase = () => setHoursCount((prev) => Math.min(MAX_HOURS, prev + 1));
    const decrease = () => setHoursCount((prev) => Math.max(MIN_HOURS, prev - 1));

    const visibleHours = HOURLY_DATA.slice(0, hoursCount);
    const avgTemp = Math.round(
        visibleHours.reduce((sum, h) => sum + h.temp, 0) / visibleHours.length
    );

    return (
        <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Text style={styles.backArrow}>←</Text>
                </Pressable>
                <View style={styles.headerTitle}>
                    <Text style={styles.dateText}>{city.dateLabel}</Text>
                    <Text style={styles.cityText}>{city.name}</Text>
                </View>
                <Pressable style={styles.searchBtn} onPress={() => navigation.navigate('Settings')}>
                    <Text style={styles.searchIcon}>⚙</Text>
                </Pressable>
            </View>

            <View style={styles.heroCard}>
                <View style={styles.heroTop}>
                    <View>
                        <Text style={styles.tempDisplay}>{formatTemp(city.temp, units)}</Text>
                        <Text style={styles.conditionText}>{city.condition}</Text>
                        <Text style={styles.feelsLikeText}>Ощущается как {formatTemp(city.feelsLike, units)}</Text>
                    </View>
                    <WeatherIcon kind={city.icon} size={72} />
                </View>

                <View style={styles.heroBottom}>
                    <Text style={styles.minMaxText}>Макс {formatTemp(city.max, units)}</Text>
                    <Text style={styles.minMaxText}>Мин {formatTemp(city.min, units)}</Text>
                    {/* Условный рендеринг через тернарный оператор */}
                    <Text style={styles.minMaxText}>
                        {hoursCount >= 4 ? 'Вечером прохладнее' : `Осадки ${city.precip}%`}
                    </Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>По часам</Text>

            <InfoCard>
                <View style={styles.counterCard}>
                    <View>
                        <Text style={styles.counterTitle}>Часов в прогнозе</Text>
                        <Text style={styles.counterAvg}>Средняя температура: {formatTemp(avgTemp, units)}</Text>
                    </View>
                    <View style={styles.counterControls}>
                        <Pressable
                            onPress={decrease}
                            disabled={hoursCount === MIN_HOURS}
                            style={[styles.stepBtn, hoursCount === MIN_HOURS && styles.stepBtnDisabled]}
                        >
                            <Text style={styles.stepText}>−</Text>
                        </Pressable>
                        <Text style={styles.counterValue}>{hoursCount}</Text>
                        <Pressable
                            onPress={increase}
                            disabled={hoursCount === MAX_HOURS}
                            style={[styles.stepBtn, hoursCount === MAX_HOURS && styles.stepBtnDisabled]}
                        >
                            <Text style={styles.stepText}>+</Text>
                        </Pressable>
                    </View>
                </View>
            </InfoCard>

            {hoursCount === MAX_HOURS && (
                <Text style={styles.limitHint}>Достигнут максимум — доступно {MAX_HOURS} часов</Text>
            )}

            <FlatList
                horizontal
                data={visibleHours}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <HourCard
                        time={item.time}
                        temp={formatTemp(item.temp, units)}
                        icon={item.icon}
                        isActive={index === 0}
                    />
                )}
                ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.hourlyStrip}
            />

            <Text style={styles.sectionTitle}>Подробнее</Text>
            <View style={styles.metricsRow}>
                {METRICS_DATA.map((metric) => (
                    <View key={metric.id} style={styles.metricCard}>
                        <View style={styles.metricBadge} />
                        <View>
                            <Text style={styles.metricValue}>{metric.value}</Text>
                            <Text style={styles.metricLabel}>{metric.label}</Text>
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.buttonWrapper}>
                <PrimaryButton
                    title="Прогноз на неделю"
                    onPress={() => navigation.navigate('WeekForecast', { cityId: city.id })}
                />
                <View style={{ height: 12 }} />
                <PrimaryButton
                    title="Подписаться на уведомления"
                    variant="secondary"
                    onPress={() => navigation.navigate('Subscribe', { cityId: city.id })}
                />
                <View style={{ height: 12 }} />
                <PrimaryButton
                    title="Настройки"
                    variant="secondary"
                    onPress={() => navigation.navigate('Settings')}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: COLORS.neutral100 },
    scrollContent: { paddingHorizontal: 24, paddingTop: 12, paddingBottom: 28 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    dateText: { fontSize: 12, fontWeight: '500', color: COLORS.neutral600 },
    cityText: { fontSize: 22, fontWeight: '600', color: COLORS.neutral900, marginTop: 2 },
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
    headerTitle: { flex: 1, marginHorizontal: 12 },
    searchBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.neutral200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchIcon: { fontSize: 16 },
    heroCard: {
        backgroundColor: COLORS.primary500,
        borderRadius: 24,
        padding: 20,
        marginBottom: 24,
        shadowColor: COLORS.primary500,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 24,
        elevation: 6,
    },
    heroTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    tempDisplay: { fontSize: 64, lineHeight: 72, fontWeight: '700', color: COLORS.white },
    conditionText: { fontSize: 15, fontWeight: '600', color: COLORS.white, marginTop: 4 },
    feelsLikeText: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.white,
        opacity: 0.9,
        marginTop: 4,
    },
    heroBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.2)',
    },
    minMaxText: { fontSize: 13, fontWeight: '600', color: COLORS.white },
    sectionTitle: { fontSize: 16, fontWeight: '600', color: COLORS.neutral900, marginBottom: 12 },
    counterCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    counterTitle: { fontSize: 14, fontWeight: '600', color: COLORS.neutral900 },
    counterAvg: { fontSize: 12, color: COLORS.neutral600, marginTop: 4 },
    counterControls: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    stepBtn: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: COLORS.primary500,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepBtnDisabled: { backgroundColor: COLORS.neutral200 },
    stepText: { fontSize: 20, fontWeight: '700', color: COLORS.white },
    counterValue: {
        minWidth: 20,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.neutral900,
    },
    limitHint: { fontSize: 12, color: COLORS.warning500, fontWeight: '600', marginBottom: 12 },
    hourlyStrip: { marginBottom: 24 },
    metricsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 28,
    },
    metricCard: {
        flex: 1,
        height: 96,
        backgroundColor: COLORS.white,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.neutral200,
        padding: 12,
        justifyContent: 'space-between',
    },
    metricBadge: { width: 28, height: 28, borderRadius: 8, backgroundColor: COLORS.primary50 },
    metricValue: { fontSize: 16, fontWeight: '600', color: COLORS.neutral900 },
    metricLabel: { fontSize: 12, fontWeight: '500', color: COLORS.neutral600 },
    buttonWrapper: { marginTop: 4 },
});
