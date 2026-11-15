import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import WeatherIcon from './WeatherIcon';
import { useSettings } from '../context/SettingsContext';
import { formatTemp } from '../utils/temperature';

export default function WeekRow({ day, condition, icon, high, low, isFavorite, onToggleFavorite }) {
    const { settings } = useSettings();
    return (
        <View style={styles.rowCard}>
            <View style={styles.rowLeft}>
                <Text style={styles.rowDay}>{day}</Text>
                <Text style={styles.rowCondition}>{condition}</Text>
                {isFavorite && <Text style={styles.favBadge}>В избранном</Text>}
            </View>

            <View style={styles.rowRight}>
                <WeatherIcon kind={icon} size={32} />
                <View style={styles.tempsBlock}>
                    <Text style={styles.tempHigh}>{formatTemp(high, settings.units)}</Text>
                    <Text style={styles.tempLow}>{formatTemp(low, settings.units)}</Text>
                </View>
                <Pressable
                    onPress={onToggleFavorite}
                    hitSlop={8}
                    style={[styles.starBtn, isFavorite && styles.starBtnActive]}
                >
                    <Text style={[styles.star, isFavorite && styles.starOn]}>
                        {isFavorite ? '★' : '☆'}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    rowCard: {
        minHeight: 64,
        backgroundColor: COLORS.white,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.neutral200,
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rowLeft: { flex: 1, paddingRight: 8 },
    rowDay: { fontSize: 14, fontWeight: '600', color: COLORS.neutral900 },
    rowCondition: { fontSize: 12, color: COLORS.neutral600, marginTop: 2 },
    favBadge: { fontSize: 11, fontWeight: '600', color: COLORS.primary500, marginTop: 2 },
    rowRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    tempsBlock: { alignItems: 'flex-end', minWidth: 36 },
    tempHigh: { fontSize: 14, fontWeight: '600', color: COLORS.neutral900 },
    tempLow: { fontSize: 12, color: COLORS.neutral600, marginTop: 2 },
    starBtn: {
        width: 32,
        height: 32,
        borderRadius: 10,
        backgroundColor: COLORS.neutral100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    starBtnActive: { backgroundColor: COLORS.primary50 },
    star: { fontSize: 18, color: COLORS.neutral600 },
    starOn: { color: COLORS.warning500 },
});
