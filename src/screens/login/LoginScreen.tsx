import { router } from 'expo-router';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { simulateLogin } from './login.service';
import { hasErrors, LoginErrors, validateLoginFields } from './login.validation';

import { Button } from '@/components/ui/Button';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Input } from '@/components/ui/Input';
import { FontSize, FontWeight, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useTheme } from '@/hooks/use-theme';
import { setUser } from '@/store/slices/authSlice';

export function LoginScreen() {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

  function handleEmailChange(value: string) {
    setEmail(value);
    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
    if (generalError) setGeneralError('');
  }

  function handlePasswordChange(value: string) {
    setPassword(value);
    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
    if (generalError) setGeneralError('');
  }

  async function handleSubmit() {
    const validation = validateLoginFields({ email, password });
    if (hasErrors(validation)) {
      setErrors(validation);
      return;
    }

    setLoading(true);
    setGeneralError('');

    try {
      const user = await simulateLogin(email.trim());
      dispatch(setUser(user));
      console.log('Login successful, redirecting to /');
      router.replace('/');
    } catch {
      setGeneralError('Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>

          {/* Header / Brand */}
          <View style={styles.brandSection}>
            <View style={[styles.logoMark, { backgroundColor: theme.primary }]}>
              <Text style={styles.logoMarkText}>S</Text>
            </View>
            <Text style={[styles.brandName, { color: theme.text }]} accessibilityRole="header">
              ShopDark
            </Text>
            <Text style={[styles.brandTagline, { color: theme.textSecondary }]}>
              Moda premium ao seu alcance
            </Text>
          </View>

          {/* Form card */}
          <View
            style={[
              styles.formCard,
              { backgroundColor: theme.backgroundElement, borderColor: theme.border },
            ]}>
            <Text style={[styles.formTitle, { color: theme.text }]}>Entrar na sua conta</Text>

            <View style={styles.fields}>
              <Input
                label="E-mail"
                placeholder="seu@email.com"
                value={email}
                onChangeText={handleEmailChange}
                error={errors.email}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                textContentType="emailAddress"
                autoComplete="email"
                returnKeyType="next"
                editable={!loading}
              />

              <Input
                label="Senha"
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChangeText={handlePasswordChange}
                error={errors.password}
                secureTextEntry={!showPassword}
                textContentType="password"
                autoComplete="password"
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
                editable={!loading}
                rightElement={
                  <Pressable
                    onPress={() => setShowPassword((v) => !v)}
                    hitSlop={12}
                    accessibilityRole="button"
                    accessibilityLabel={showPassword ? 'Ocultar senha' : 'Mostrar senha'}>
                    <Text style={[styles.eyeIcon, { color: theme.textSecondary }]}>
                      {showPassword ? 'Ocultar' : 'Mostrar'}
                    </Text>
                  </Pressable>
                }
              />
            </View>

            {/* General error */}
            {generalError ? (
              <ErrorMessage
                message={generalError}
                style={styles.generalErrorBox}
              />
            ) : null}

            <Button
              label="Entrar"
              variant="primary"
              loading={loading}
              onPress={handleSubmit}
              style={styles.submitButton}
              accessibilityLabel="Fazer login"
            />
          </View>

          {/* Footer hint */}
          <Text style={[styles.hint, { color: theme.textSecondary }]}>
            Use qualquer e-mail e senha válidos para entrar
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Spacing.four,
    gap: Spacing.four,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },

  // Brand
  brandSection: {
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.four,
  },
  logoMark: {
    width: 64,
    height: 64,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.one,
  },
  logoMarkText: {
    fontSize: 32,
    fontWeight: FontWeight.bold,
    color: '#FFFFFF',
  },
  brandName: {
    fontSize: FontSize.display,
    fontWeight: FontWeight.bold,
    letterSpacing: -0.5,
  },
  brandTagline: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.regular,
    letterSpacing: 0.2,
  },

  // Form card
  formCard: {
    borderRadius: Radius.xl,
    borderWidth: 1,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  formTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    marginBottom: Spacing.one,
  },
  fields: {
    gap: Spacing.three,
  },

  // Error
  generalErrorBox: {
    marginHorizontal: 0,
    alignSelf: 'stretch',
  },

  // Submit
  submitButton: {
    marginTop: Spacing.one,
  },

  // Eye icon
  eyeIcon: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
  },

  // Footer
  hint: {
    textAlign: 'center',
    fontSize: FontSize.xs,
    fontWeight: FontWeight.regular,
  },
});
