import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomTabInset, FontSize, FontWeight, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const HINTS = [
  {
    title: 'Login simulado',
    body: 'Entre com qualquer e-mail e senha válidos. Não há cadastro nem autenticação real.',
  },
  {
    title: 'Catálogo',
    body: 'Use as abas Masculino e Feminino e os filtros de categoria para navegar pelos produtos da API.',
  },
  {
    title: 'Detalhes',
    body: 'Toque em um card para ver imagens, descrição, preço e desconto do produto.',
  },
  {
    title: 'Sair',
    body: 'O botão Sair encerra a sessão simulada e volta para a tela de login.',
  },
];

export default function ExploreScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
      edges={['top']}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: BottomTabInset + Spacing.five },
        ]}
        showsVerticalScrollIndicator={false}>
        <Text
          style={[styles.title, { color: theme.text }]}
          accessibilityRole="header">
          Explore
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          ShopDark — moda premium com visual escuro. Esta aba explica o que já existe no app.
        </Text>

        <View style={styles.cards}>
          {HINTS.map((hint) => (
            <View
              key={hint.title}
              style={[
                styles.card,
                {
                  backgroundColor: theme.backgroundElement,
                  borderColor: theme.border,
                },
              ]}>
              <Text style={[styles.cardTitle, { color: theme.text }]}>
                {hint.title}
              </Text>
              <Text style={[styles.cardBody, { color: theme.textSecondary }]}>
                {hint.body}
              </Text>
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
  },
  content: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    gap: Spacing.three,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.regular,
    lineHeight: 22,
  },
  cards: {
    gap: Spacing.two,
  },
  card: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  cardTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
  },
  cardBody: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.regular,
    lineHeight: 22,
  },
});
