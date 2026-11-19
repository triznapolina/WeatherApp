import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';
import WeatherIcon from '../components/WeatherIcon';
import DayChip from '../components/DayChip';

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
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Text style={styles.backArrow}>←</Text>
          </Pressable>
          <View>
            <Text style={styles.title}>Прогноз на неделю</Text>
            <Text style={styles.subtitle}>Минск · 13–19 ноября</Text>
          </View>
        </View>

        <View style={styles.chipsRow}>
          {WEEK_CHIPS.map((chip) => (
            <DayChip
              key={chip.id}
              day={chip.day}
              date={chip.date}
              selected={chip.selected}
            />
          ))}
        </View>

        <View style={styles.listContainer}>
          {WEEK_ROWS.map((row) => (
            <View key={row.id} style={styles.rowCard}>
              <View style={styles.rowLeft}>
                <Text style={styles.rowDay}>{row.day}</Text>
                <Text style={styles.rowCondition}>{row.condition}</Text>
              </View>

              <View style={styles.rowRight}>
                <WeatherIcon kind={row.icon} size={32} />
                <View style={styles.tempsBlock}>
                  <Text style={styles.tempHigh}>{row.high}</Text>
                  <Text style={styles.tempLow}>{row.low}</Text>
                </View>
              </View>
            </View>
          ))}
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
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
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
  backArrow: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.neutral900,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.neutral900,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.neutral600,
    marginTop: 2,
  },
  chipsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  listContainer: {
    gap: 8,
  },
  rowCard: {
    height: 64,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.neutral200,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLeft: {
    flex: 1,
    paddingRight: 8,
  },
  rowDay: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.neutral900,
  },
  rowCondition: {
    fontSize: 12,
    color: COLORS.neutral600,
    marginTop: 2,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  tempsBlock: {
    alignItems: 'flex-end',
    minWidth: 36,
  },
  tempHigh: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.neutral900,
  },
  tempLow: {
    fontSize: 12,
    color: COLORS.neutral600,
    marginTop: 2,
  },
});
