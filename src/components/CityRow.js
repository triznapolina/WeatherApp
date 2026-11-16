import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import WeatherIcon from './WeatherIcon';
import { useSettings } from '../context/SettingsContext';
import { formatTemp } from '../utils/temperature';

export default function CityRow({ city, onPress }) {
    const { settings } = useSettings();
    const isMine = city.name === settings.city; // условный рендеринг: «Мой город»
    return (
        <Pressable onPress={onPress} style={styles.row}>
            <View style={styles.left}>
                <Text style={styles.name}>{city.name}</Text>
                <Text style={styles.sub}>
                    {city.country} · {city.condition}
                </Text>
                {isMine && <Text style={styles.mine}>Мой город</Text>}
            </View>
            <WeatherIcon kind={city.icon} size={32} />
            <Text style={styles.temp}>{formatTemp(city.temp, settings.units)}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    row: {
        minHeight: 68,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: COLORS.white,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.neutral200,
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    left: { flex: 1 },
    name: { fontSize: 16, fontWeight: '600', color: COLORS.neutral900 },
    sub: { fontSize: 12, color: COLORS.neutral600, marginTop: 2 },
    mine: { fontSize: 11, fontWeight: '600', color: COLORS.primary500, marginTop: 2 },
    temp: { fontSize: 18, fontWeight: '700', color: COLORS.neutral900, minWidth: 48, textAlign: 'right' },
});
