import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { FontSize, FontWeight, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { CATEGORY_LABELS, CategorySlug } from '@/store/slices/productsSlice';

interface CategoryPickerProps {
  categories: CategorySlug[];
  active: CategorySlug;
  onSelect: (category: CategorySlug) => void;
}

export function CategoryPicker({
  categories,
  active,
  onSelect,
}: CategoryPickerProps) {
  const theme = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      style={styles.scrollView}>
      {categories.map((slug) => {
        const isActive = slug === active;
        return (
          <Pressable
            key={slug}
            style={[
              styles.chip,
              {
                backgroundColor: isActive
                  ? theme.primary
                  : theme.backgroundElement,
                borderColor: isActive ? theme.primary : theme.border,
              },
            ]}
            onPress={() => onSelect(slug)}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={CATEGORY_LABELS[slug]}>
            <Text
              style={[
                styles.label,
                { color: isActive ? '#FFFFFF' : theme.textSecondary },
                isActive && styles.labelActive,
              ]}>
              {CATEGORY_LABELS[slug]}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    gap: Spacing.two,
    flexDirection: 'row',
  },
  chip: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
  labelActive: {
    fontWeight: FontWeight.semibold,
  },
});
