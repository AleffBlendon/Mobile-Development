import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { LoadingIndicator } from '@/components/ui/LoadingIndicator';
import {
    FontSize,
    FontWeight,
    MaxContentWidth,
    Radius,
    Spacing,
} from '@/constants/theme';
import { useProductDetail } from '@/hooks/use-product-detail';
import { useTheme } from '@/hooks/use-theme';
import {
    CATEGORY_LABELS,
    CategorySlug,
} from '@/store/slices/productsSlice';
import { formatUsd, getFinalPrice, hasDiscount } from '@/utils/price';

interface ProductDetailScreenProps {
  productId: number;
}

export function ProductDetailScreen({ productId }: ProductDetailScreenProps) {
  const theme = useTheme();
  const router = useRouter();
  const { product, loading, error, retry } = useProductDetail(productId);

  // Thumbnail index for the image gallery
  const [activeImage, setActiveImage] = useState(0);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: theme.background }]}
        edges={['top']}>
        <BackButton onPress={handleBack} theme={theme} />
        <LoadingIndicator message="Carregando produto..." fullScreen />
      </SafeAreaView>
    );
  }

  // ── Error ─────────────────────────────────────────────────────────────────
  if (error || !product) {
    return (
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: theme.background }]}
        edges={['top']}>
        <BackButton onPress={handleBack} theme={theme} />
        <View style={styles.feedbackWrapper}>
          <ErrorMessage
            message={error ?? 'Produto não encontrado.'}
            onRetry={retry}
          />
        </View>
      </SafeAreaView>
    );
  }

  // ── Content ───────────────────────────────────────────────────────────────
  const discountedPrice =
    getFinalPrice(product.price, product.discountPercentage);
  const showDiscount = hasDiscount(product.discountPercentage);
  const categoryLabel =
    CATEGORY_LABELS[product.category as CategorySlug] ?? product.category;
  const images = product.images?.length ? product.images : [product.thumbnail];

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
      edges={['top']}>

      {/* ── Back button (above scroll) ── */}
      <BackButton onPress={handleBack} theme={theme} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        {/* ── Image gallery ── */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: images[activeImage] }}
            style={styles.mainImage}
            contentFit="contain"
            transition={250}
          />

          {/* Discount badge */}
          {showDiscount ? (
            <View style={[styles.discountBadge, { backgroundColor: theme.error }]}>
              <Text style={styles.discountBadgeText}>
                -{Math.round(product.discountPercentage)}%
              </Text>
            </View>
          ) : null}
        </View>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.thumbnailStrip}>
            {images.map((uri, idx) => (
              <Pressable
                key={`${uri}-${idx}`}
                onPress={() => setActiveImage(idx)}
                accessibilityRole="button"
                accessibilityLabel={`Imagem ${idx + 1} de ${images.length}`}
                hitSlop={4}
                style={[
                  styles.thumbnailWrapper,
                  {
                    borderColor:
                      idx === activeImage ? theme.primary : theme.border,
                  },
                ]}>
                <Image
                  source={{ uri }}
                  style={styles.thumbnail}
                  contentFit="cover"
                  transition={150}
                />
              </Pressable>
            ))}
          </ScrollView>
        )}

        {/* ── Info card ── */}
        <View
          style={[
            styles.infoCard,
            { backgroundColor: theme.backgroundElement, borderColor: theme.border },
          ]}>
          {/* Category pill */}
          <View
            style={[
              styles.categoryPill,
              { backgroundColor: theme.backgroundSelected },
            ]}>
            <Text style={[styles.categoryText, { color: theme.textSecondary }]}>
              {categoryLabel}
            </Text>
          </View>

          {/* Title */}
          <Text style={[styles.title, { color: theme.text }]}>
            {product.title}
          </Text>

          {/* Pricing */}
          <View style={styles.pricingRow}>
            <Text style={[styles.currentPrice, { color: theme.primary }]}>
              {formatUsd(discountedPrice)}
            </Text>
            {showDiscount && (
              <View style={styles.originalPriceGroup}>
                <Text
                  style={[
                    styles.originalPrice,
                    { color: theme.textSecondary },
                  ]}>
                  {formatUsd(product.price)}
                </Text>
                <View
                  style={[
                    styles.savingsPill,
                    { backgroundColor: theme.success + '22' },
                  ]}>
                  <Text style={[styles.savingsText, { color: theme.success }]}>
                    Economize {formatUsd(product.price - discountedPrice)}
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Divider */}
          <View
            style={[styles.divider, { backgroundColor: theme.border }]}
          />

          {/* Description */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Descrição
            </Text>
            <Text
              style={[styles.description, { color: theme.textSecondary }]}>
              {product.description}
            </Text>
          </View>

          {/* Extra info grid */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Informações
            </Text>
            <View style={styles.infoGrid}>
              <InfoRow label="Categoria" value={categoryLabel} theme={theme} />
              <InfoRow
                label="Desconto"
                value={
                  showDiscount
                    ? `${product.discountPercentage.toFixed(1)}%`
                    : 'Sem desconto'
                }
                theme={theme}
              />
              <InfoRow
                label="Preço original"
                value={formatUsd(product.price)}
                theme={theme}
              />
              <InfoRow
                label="Preço final"
                value={formatUsd(discountedPrice)}
                theme={theme}
                highlight
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Sub-components ──────────────────────────────────────────────────────────

interface BackButtonProps {
  onPress: () => void;
  theme: ReturnType<typeof import('@/hooks/use-theme').useTheme>;
}

function BackButton({ onPress, theme }: BackButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.backButton,
        { backgroundColor: theme.backgroundElement, borderColor: theme.border },
        pressed && styles.backButtonPressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel="Voltar">
      <Text style={[styles.backIcon, { color: theme.text }]}>←</Text>
      <Text style={[styles.backLabel, { color: theme.text }]}>Voltar</Text>
    </Pressable>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
  theme: ReturnType<typeof import('@/hooks/use-theme').useTheme>;
  highlight?: boolean;
}

function InfoRow({ label, value, theme, highlight = false }: InfoRowProps) {
  return (
    <View style={[styles.infoRow, { borderBottomColor: theme.borderSubtle }]}>
      <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
        {label}
      </Text>
      <Text
        style={[
          styles.infoValue,
          { color: highlight ? theme.primary : theme.text },
          highlight && styles.infoValueHighlight,
        ]}>
        {value}
      </Text>
    </View>
  );
}

// ── Styles ──────────────────────────────────────────────────────────────────

const THUMBNAIL_SIZE = 60;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.six,
    maxWidth: MaxContentWidth,
    width: '100%',
    alignSelf: 'center',
  },

  // Back button
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    minHeight: 44,
    marginHorizontal: Spacing.three,
    marginTop: Spacing.two,
    marginBottom: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Radius.full,
    borderWidth: 1,
    gap: Spacing.one,
  },
  backButtonPressed: {
    opacity: 0.7,
  },
  backIcon: {
    fontSize: FontSize.lg,
    lineHeight: FontSize.lg + 2,
  },
  backLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },

  // Image gallery
  imageContainer: {
    width: '100%',
    aspectRatio: 4 / 5,
    maxHeight: 600,
    position: 'relative',
    backgroundColor: '#111',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: Spacing.three,
    right: Spacing.three,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: Radius.sm,
  },
  discountBadgeText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: '#FFFFFF',
  },

  // Thumbnail strip
  thumbnailStrip: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    gap: Spacing.two,
    flexDirection: 'row',
  },
  thumbnailWrapper: {
    width: THUMBNAIL_SIZE,
    height: THUMBNAIL_SIZE,
    borderRadius: Radius.sm,
    borderWidth: 2,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },

  // Info card
  infoCard: {
    marginHorizontal: Spacing.three,
    marginTop: Spacing.two,
    borderRadius: Radius.xl,
    borderWidth: 1,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  categoryPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: Radius.full,
  },
  categoryText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    lineHeight: 28,
    flexShrink: 1,
  },

  // Pricing
  pricingRow: {
    gap: Spacing.two,
  },
  currentPrice: {
    fontSize: FontSize.display,
    fontWeight: FontWeight.bold,
    letterSpacing: -0.5,
  },
  originalPriceGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    flexWrap: 'wrap',
  },
  originalPrice: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.regular,
    textDecorationLine: 'line-through',
  },
  savingsPill: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: Radius.full,
  },
  savingsText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
  },

  // Sections
  divider: {
    height: 1,
    marginVertical: Spacing.one,
  },
  section: {
    gap: Spacing.two,
  },
  sectionTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
  },
  description: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.regular,
    lineHeight: 22,
  },

  // Info grid
  infoGrid: {
    gap: 0,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: Spacing.two,
    paddingVertical: Spacing.two,
    borderBottomWidth: 1,
  },
  infoLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.regular,
    flexShrink: 0,
  },
  infoValue: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    flex: 1,
    textAlign: 'right',
  },
  infoValueHighlight: {
    fontWeight: FontWeight.bold,
  },

  // Feedback states
  feedbackWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
});
