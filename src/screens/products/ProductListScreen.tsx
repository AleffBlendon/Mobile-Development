import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import {
    FlatList,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
    type ListRenderItem,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CategoryPicker } from '@/components/products/CategoryPicker';
import { GenderTabBar } from '@/components/products/GenderTabBar';
import { ProductCard } from '@/components/products/ProductCard';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { LoadingIndicator } from '@/components/ui/LoadingIndicator';
import {
    BottomTabInset,
    FontSize,
    FontWeight,
    MaxContentWidth,
    Radius,
    Spacing,
} from '@/constants/theme';
import { useLogout } from '@/hooks/use-logout';
import { useProducts } from '@/hooks/use-products';
import { useTheme } from '@/hooks/use-theme';
import { Product } from '@/store/slices/productsSlice';

export function ProductListScreen() {
  const theme = useTheme();
  const router = useRouter();
  const logout = useLogout();
  const { width } = useWindowDimensions();
  const numColumns = width >= 768 ? 3 : 2;
  const {
    products,
    loading,
    error,
    activeCategory,
    activeGender,
    categories,
    selectCategory,
    selectGender,
    retry,
  } = useProducts();

  const handleProductPress = useCallback(
    (product: Product) => {
      router.push(`/product/${product.id}` as never);
    },
    [router],
  );

  const renderItem: ListRenderItem<Product> = useCallback(
    ({ item, index }) => (
      <View
        style={[
          styles.cardWrapper,
          index % numColumns === 0 ? styles.cardLeft : styles.cardRight,
        ]}>
        <ProductCard product={item} onPress={handleProductPress} />
      </View>
    ),
    [handleProductPress, numColumns],
  );

  const renderEmpty = () => {
    if (loading) return null;
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🛍</Text>
        <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
          Nenhum produto encontrado nesta categoria.
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
      edges={['top']}>

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text
          style={[styles.headerTitle, { color: theme.text }]}
          numberOfLines={1}
          accessibilityRole="header">
          Produtos
        </Text>
        <Pressable
          onPress={logout}
          hitSlop={8}
          style={({ pressed }) => [
            styles.logoutButton,
            {
              borderColor: theme.border,
              backgroundColor: theme.backgroundElement,
            },
            pressed && styles.logoutButtonPressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Sair da conta">
          <Text style={[styles.logoutLabel, { color: theme.textSecondary }]}>
            Sair
          </Text>
        </Pressable>
      </View>

      {/* ── Gender tabs ── */}
      <GenderTabBar active={activeGender} onSelect={selectGender} />

      {/* ── Category chips ── */}
      <CategoryPicker
        categories={categories}
        active={activeCategory}
        onSelect={selectCategory}
      />

      {/* ── Content ── */}
      {error ? (
        <ErrorMessage
          message={error}
          onRetry={retry}
          style={styles.errorMessage}
        />
      ) : loading ? (
        <LoadingIndicator message="Carregando produtos..." fullScreen />
      ) : (
        <FlatList
          data={products}
          key={numColumns}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          numColumns={numColumns}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={[
            styles.listContent,
            products.length === 0 && styles.listContentEmpty,
            { paddingBottom: BottomTabInset + Spacing.four },
          ]}
          showsVerticalScrollIndicator={false}
          initialNumToRender={6}
          windowSize={7}
          removeClippedSubviews={Platform.OS === 'android'}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.one,
  },
  headerTitle: {
    flex: 1,
    marginRight: Spacing.two,
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    letterSpacing: -0.3,
  },
  logoutButton: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  logoutButtonPressed: {
    opacity: 0.6,
  },
  logoutLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
  listContent: {
    paddingHorizontal: Spacing.two,
    paddingTop: Spacing.two,
    flexGrow: 1,
  },
  listContentEmpty: {
    flexGrow: 1,
  },
  cardWrapper: {
    flex: 1,
    padding: Spacing.one,
  },
  cardLeft: {
    paddingLeft: Spacing.two,
    paddingRight: Spacing.one,
  },
  cardRight: {
    paddingLeft: Spacing.one,
    paddingRight: Spacing.two,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Spacing.six,
    gap: Spacing.two,
  },
  emptyIcon: {
    fontSize: 40,
  },
  emptyText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    textAlign: 'center',
    paddingHorizontal: Spacing.five,
  },
  errorMessage: {
    marginTop: Spacing.four,
  },
});
