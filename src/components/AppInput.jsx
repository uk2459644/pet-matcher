import React, { useContext } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { ThemeContext } from '../theme/ThemeContext';

export default function AppInput({ label, placeholder, value, onChangeText, error }) {
  const { theme } = useContext(ThemeContext);
  const { spacing, fontSizes, fontWeights, borderRadius } = theme;

  return (
    <View style={{ marginBottom: spacing.lg }}>
      <Text
        style={{
          color: theme.textColor,
          fontSize: fontSizes.base,
          fontWeight: fontWeights.medium,
          marginBottom: spacing.xs,
        }}
      >
        {label}
      </Text>

      <TextInput
        placeholder={placeholder}
        placeholderTextColor={theme.textSecondary}
        value={value}
        onChangeText={onChangeText}
        style={[
          styles.input,
          {
            backgroundColor: theme.cardBackground,
            borderRadius: borderRadius.md,
            color: theme.textColor,
            padding: spacing.md,
            fontSize: fontSizes.md,
            borderWidth: error ? 1.5 : 0,
            borderColor: error ? theme.primaryButtonBackground : 'transparent',
          },
        ]}
      />
      {error ? (
        <Text
          style={{
            color: theme.textTertiary || '#EF4444',
            fontSize: fontSizes.sm,
            marginTop: spacing.xs,
          }}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 56,
  },
});
