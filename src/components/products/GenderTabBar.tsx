import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FontSize, FontWeight, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { GenderTab } from '@/store/slices/productsSlice';

interface GenderTabBarProps {
  active: GenderTab;
  onSelect: (gender: GenderTab) => void;
}

const TABS: { key: GenderTab; label: string }[] = [
  { key: 'mens', label: 'Masculino' },
  { key: 'womens', label: 'Feminino' },
];

export function GenderTabBar({ active, onSelect }: GenderTabBarProps) {
  const theme = useTheme();

  return (
    <View
      accessibilityRole="tablist"
      style={[
        styles.container,
        { backgroundColor: theme.backgroundElement, borderColor: theme.border },
      ]}>
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <Pressable
            key={tab.key}
            style={[
              styles.tab,
              isActive && {
                backgroundColor: theme.primary,
              },
            ]}
            onPress={() => onSelect(tab.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={tab.label}>
            <Text
              style={[
                styles.label,
                { color: isActive ? '#FFFFFF' : theme.textSecondary },
                isActive && styles.labelActive,
              ]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: Radius.md,
    borderWidth: 1,
    padding: Spacing.half,
    marginHorizontal: Spacing.three,
    marginTop: Spacing.three,
  },
  tab: {
    flex: 1,
    minHeight: 44,
    paddingVertical: Spacing.two,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
  labelActive: {
    fontWeight: FontWeight.semibold,
  },
});
