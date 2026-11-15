import React from 'react';
import { View, Text, TextInput, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';
import PrimaryButton from '../components/PrimaryButton';
import FormField from '../components/FormField';
import InfoCard from '../components/InfoCard';
import FilterTabs from '../components/FilterTabs';
import useForm from '../hooks/useForm';
import { validateSettings } from '../utils/validators';
import { useSettings } from '../context/SettingsContext';

const UNIT_TABS = [
    { key: 'C', label: '°C' },
    { key: 'F', label: '°F' },
];

export default function SettingsScreen({ navigation }) {
    const { settings, updateSettings, resetSettings } = useSettings();

    const { values, errors, submitted, handleChange, handleSubmit, reset } = useForm({
        initialValues: { city: '', email: '', units: settings.units },
        validate: validateSettings,
        onSubmit: (v) =>
            updateSettings({ city: v.city.trim(), email: v.email.trim(), units: v.units }),
    });

    const handleReset = () => {
        reset();
        resetSettings();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <Text style={styles.backArrow}>←</Text>
                    </Pressable>
                    <Text style={styles.title}>Настройки</Text>
                </View>

                <InfoCard title="Текущие настройки">
                    <Text style={styles.line}>Город: {settings.city}</Text>
                    <Text style={styles.line}>
                        E-mail: {settings.email ? settings.email : 'не указан'}
                    </Text>
                    <Text style={styles.line}>Единицы: °{settings.units}</Text>
                </InfoCard>

                <View style={styles.form}>
                    <FormField label="Город" error={errors.city}>
                        <TextInput
                            value={values.city}
                            onChangeText={handleChange('city')}
                            placeholder="Например, Брест"
                            placeholderTextColor={COLORS.neutral300}
                            style={[styles.input, !!errors.city && styles.inputError]}
                        />
                    </FormField>

                    <FormField label="E-mail для ежедневной рассылки" error={errors.email}>
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

                    <FormField label="Единицы температуры">
                        <FilterTabs tabs={UNIT_TABS} active={values.units} onChange={handleChange('units')} />
                    </FormField>
                </View>

                {submitted && <Text style={styles.success}>Настройки сохранены</Text>}

                <View style={styles.buttons}>
                    <PrimaryButton title="Сохранить" onPress={handleSubmit} />
                    <PrimaryButton title="Сбросить" variant="secondary" onPress={handleReset} />
                </View>
            </ScrollView>
        </SafeAreaView>
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
    title: { fontSize: 22, fontWeight: '600', color: COLORS.neutral900 },
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
    success: { fontSize: 14, fontWeight: '600', color: '#16A34A', marginBottom: 12 },
    buttons: { gap: 12 },
});
