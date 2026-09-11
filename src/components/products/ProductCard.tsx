import { Image } from 'expo-image';
import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import {
    FontSize,
    FontWeight,
    Radius,
    Spacing,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import {
    CATEGORY_LABELS,
    CategorySlug,
    Product,
} from '@/store/slices/productsSlice';
import { formatUsd, getFinalPrice, hasDiscount } from '@/utils/price';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}

function ProductCardComponent({ product, onPress }: ProductCardProps) {
  const theme = useTheme();
  const discountedPrice = getFinalPrice(product.price, product.discountPercentage);
  const categoryLabel =
    CATEGORY_LABELS[product.category as CategorySlug] ?? product.category;
  const showDiscount = hasDiscount(product.discountPercentage);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.backgroundElement,
          borderColor: theme.border,
        },
        pressed && styles.pressed,
      ]}
      onPress={() => onPress(product)}
      accessibilityRole="button"
      accessibilityLabel={`Ver detalhes de ${product.title}`}>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: product.thumbnail }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />

        {showDiscount && (
          <View style={[styles.badge, { backgroundColor: theme.error }]}>
            <Text style={styles.badgeText}>
              -{Math.round(product.discountPercentage)}%
            </Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View
          style={[
            styles.categoryPill,
            { backgroundColor: theme.backgroundSelected },
          ]}>
          <Text
            style={[styles.categoryText, { color: theme.textSecondary }]}
            numberOfLines={1}>
            {categoryLabel}
          </Text>
        </View>

        <Text
          style={[styles.title, { color: theme.text }]}
          numberOfLines={2}
          ellipsizeMode="tail">
          {product.title}
        </Text>

        <View style={styles.pricingRow}>
          <Text
            style={[styles.currentPrice, { color: theme.primary }]}
            numberOfLines={1}>
            {formatUsd(discountedPrice)}
          </Text>
          {showDiscount && (
            <Text
              style={[styles.originalPrice, { color: theme.textSecondary }]}
              numberOfLines={1}>
              {formatUsd(product.price)}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}

export const ProductCard = memo(ProductCardComponent);

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    flex: 1,
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.97 }],
  },
  imageWrapper: {
    width: '100%',
    aspectRatio: 1,
    position: 'relative',
    backgroundColor: '#111',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  badge: {
    position: 'absolute',
    top: Spacing.two,
    right: Spacing.two,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: Radius.xs,
  },
  badgeText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: '#FFFFFF',
  },
  content: {
    padding: Spacing.three,
    gap: Spacing.one,
  },
  categoryPill: {
    alignSelf: 'flex-start',
    maxWidth: '100%',
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: Radius.full,
    marginBottom: Spacing.one,
  },
  categoryText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  title: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    lineHeight: 22,
    minHeight: 44,
  },
  pricingRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.two,
    marginTop: Spacing.one,
    flexWrap: 'wrap',
  },
  currentPrice: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    flexShrink: 1,
  },
  originalPrice: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.regular,
    textDecorationLine: 'line-through',
    flexShrink: 1,
  },
});
