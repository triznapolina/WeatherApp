import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';
import PrimaryButton from '../components/PrimaryButton';
import FormField from '../components/FormField';
import InfoCard from '../components/InfoCard';
import LoadState from '../components/LoadState';
import useFetch from '../hooks/useFetch';
import useForm from '../hooks/useForm';
import { api } from '../api/client';
import { validateSubscription } from '../utils/validators';
import { useSettings } from '../context/SettingsContext';
import { formatTemp } from '../utils/temperature';

export default function SubscribeScreen({ navigation, route }) {
    const { cityId } = route.params;
    const { data: city, loading, error, reload } = useFetch(() => api.getCity(cityId), [cityId]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <LoadState loading={loading} error={error} onRetry={reload}>
                {city && <SubscribeForm city={city} navigation={navigation} />}
            </LoadState>
        </SafeAreaView>
    );
}

function SubscribeForm({ city, navigation }) {
    const { settings } = useSettings();
    const [created, setCreated] = useState(null);

    const { values, errors, submitting, submitError, handleChange, handleSubmit } = useForm({
        initialValues: { email: settings.email, threshold: '' },
        validate: validateSubscription,
        onSubmit: async (v) => {
            const subscription = await api.createSubscription({
                cityId: city.id,
                email: v.email.trim(),
                threshold: Number(v.threshold),
            });
            setCreated(subscription);
        },
    });

    return (
        <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Text style={styles.backArrow}>←</Text>
                </Pressable>
                <View>
                    <Text style={styles.title}>Подписка на уведомления</Text>
                    <Text style={styles.subtitle}>{city.name}</Text>
                </View>
            </View>

            <InfoCard title="Как это работает">
                <Text style={styles.line}>
                    Мы пришлём письмо, когда температура в городе опустится до заданного порога или ниже.
                </Text>
            </InfoCard>

            <View style={styles.form}>
                <FormField label="E-mail" error={errors.email}>
                    <TextInput
                        value={values.email}
                        onChangeText={handleChange('email')}
                        placeholder="name@example.com"
                        placeholderTextColor={COLORS.neutral300}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={[styles.input, !!errors.email && styles.inputError]}
                    />
                </FormField>

                <FormField label="Порог температуры, °C (от -50 до 50)" error={errors.threshold}>
                    <TextInput
                        value={values.threshold}
                        onChangeText={handleChange('threshold')}
                        placeholder="Например, 10"
                        placeholderTextColor={COLORS.neutral300}
                        keyboardType="numbers-and-punctuation"
                        style={[styles.input, !!errors.threshold && styles.inputError]}
                    />
                </FormField>
            </View>

            {!!submitError && <Text style={styles.serverError}>{submitError}</Text>}

            {created && (
                <InfoCard title={`Подписка №${created.id} создана`}>
                    <Text style={styles.line}>Город: {created.cityName}</Text>
                    <Text style={styles.line}>Порог: {formatTemp(created.threshold, settings.units)}</Text>
                    <Text style={styles.line}>
                        Сейчас {formatTemp(created.currentTemp, settings.units)} —{' '}
                        {created.willNotifyNow ? 'уведомление сработает сразу' : 'уведомление пока не нужно'}
                    </Text>
                </InfoCard>
            )}

            <View style={styles.buttons}>
                <PrimaryButton
                    title={submitting ? 'Отправка…' : 'Подписаться'}
                    onPress={handleSubmit}
                    disabled={submitting}
                />
                <PrimaryButton
                    title="История подписок"
                    variant="secondary"
                    onPress={() => navigation.navigate('Subscriptions')}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: COLORS.neutral100 },
    content: { paddingHorizontal: 24, paddingTop: 12, paddingBottom: 28 },
    header: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 20 },
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
    title: { fontSize: 20, fontWeight: '600', color: COLORS.neutral900 },
    subtitle: { fontSize: 12, fontWeight: '500', color: COLORS.neutral600, marginTop: 2 },
    line: { fontSize: 13, color: COLORS.neutral600, marginTop: 2 },
    form: { marginTop: 12 },
    input: {
        height: 48,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.neutral200,
        backgroundColor: COLORS.white,
        paddingHorizontal: 14,
        fontSize: 15,
        color: COLORS.neutral900,
    },
    inputError: { borderColor: COLORS.danger500 },
    serverError: { fontSize: 14, fontWeight: '600', color: COLORS.danger500, marginBottom: 12 },
    buttons: { gap: 12, marginTop: 4 },
});
