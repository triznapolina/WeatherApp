import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';
import PrimaryButton from '../components/PrimaryButton';
import HourCard from '../components/HourCard';
import WeatherIcon from '../components/WeatherIcon';

const HOURLY_DATA = [
  { id: '1', time: 'Сейчас', temp: '+18°', icon: 'pc', isActive: true },
  { id: '2', time: '15:00', temp: '+19°', icon: 'sun', isActive: false },
  { id: '3', time: '16:00', temp: '+19°', icon: 'pc', isActive: false },
  { id: '4', time: '17:00', temp: '+17°', icon: 'pc', isActive: false },
  { id: '5', time: '18:00', temp: '+15°', icon: 'cloud', isActive: false },
];

const METRICS_DATA = [
  { id: 'wind', value: '4 м/с', label: 'Ветер' },
  { id: 'humidity', value: '72%', label: 'Влажность' },
  { id: 'pressure', value: '748', label: 'Давление' },
];

export default function TodayScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Шапка экрана */}
        <View style={styles.header}>
          <View>
            <Text style={styles.dateText}>Пятница, 13 ноября</Text>
            <Text style={styles.cityText}>Минск</Text>
          </View>
          <Pressable style={styles.searchBtn}>
            <Text style={styles.searchIcon}>🔍</Text>
          </Pressable>
        </View>

        {/* Главная карточка погоды */}
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View>
              <Text style={styles.tempDisplay}>+18°</Text>
              <Text style={styles.conditionText}>Облачно с прояснениями</Text>
              <Text style={styles.feelsLikeText}>Ощущается как +16°</Text>
            </View>
            <WeatherIcon kind="pc" size={72} />
          </View>

          <View style={styles.heroBottom}>
            <Text style={styles.minMaxText}>Макс +19°</Text>
            <Text style={styles.minMaxText}>Мин +9°</Text>
            <Text style={styles.minMaxText}>Осадки 10%</Text>
          </View>
        </View>

        {/* Секция «По часам» */}
        <Text style={styles.sectionTitle}>По часам</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hourlyStrip}
        >
          {HOURLY_DATA.map((item) => (
            <HourCard
              key={item.id}
              time={item.time}
              temp={item.temp}
              icon={item.icon}
              isActive={item.isActive}
            />
          ))}
        </ScrollView>

        {/* Секция «Подробнее» */}
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

        {/* Кнопка перехода к прогнозу на неделю */}
        <View style={styles.buttonWrapper}>
          <PrimaryButton
            title="Прогноз на неделю"
            onPress={() => navigation.navigate('WeekForecast')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.neutral100,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 28,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.neutral600,
  },
  cityText: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.neutral900,
    marginTop: 2,
  },
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
  searchIcon: {
    fontSize: 16,
  },
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
  tempDisplay: {
    fontSize: 64,
    lineHeight: 72,
    fontWeight: '700',
    color: COLORS.white,
  },
  conditionText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.white,
    marginTop: 4,
  },
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
  minMaxText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.white,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.neutral900,
    marginBottom: 12,
  },
  hourlyStrip: {
    gap: 8,
    marginBottom: 24,
  },
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
  metricBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: COLORS.primary50,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.neutral900,
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.neutral600,
  },
  buttonWrapper: {
    marginTop: 4,
  },
});
