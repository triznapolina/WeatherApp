import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';
import PrimaryButton from '../components/PrimaryButton';
import WeatherIcon from '../components/WeatherIcon';

export default function WelcomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.illustrationWrapper}>
                    <View style={styles.halo}>
                        <WeatherIcon kind="pc" size={110} />
                    </View>
                </View>

                <View style={styles.textBlock}>
                    <Text style={styles.title}>Погода без сюрпризов</Text>
                    <Text style={styles.subtitle}>
                        Точный прогноз по часам и дням для вашего города — всегда под рукой
                    </Text>
                </View>

                <View style={styles.footer}>
                    <PrimaryButton
                        title="Начать"
                        onPress={() => navigation.navigate('Cities')}
                    />
                    <Pressable
                        onPress={() => navigation.navigate('Cities')}
                        style={styles.laterLink}
                    >
                        <Text style={styles.laterText}>Выбрать город позже</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 24,
        justifyContent: 'space-between',
    },
    illustrationWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    halo: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: COLORS.primary50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textBlock: {
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        lineHeight: 34,
        fontWeight: '700',
        color: COLORS.neutral900,
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 24,
        color: COLORS.neutral600,
    },
    footer: {
        gap: 16,
    },
    laterLink: {
        paddingVertical: 8,
        alignItems: 'center',
    },
    laterText: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.primary500,
    },
});
