import React, { useContext } from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { ThemeContext } from '../theme/ThemeContext';

export default function AppButton({ title, onPress, loading, disabled }) {
  const { theme } = useContext(ThemeContext);
  const { spacing, fontSizes, fontWeights, borderRadius } = theme;

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      style={[
        styles.button,
        {
          backgroundColor: isDisabled
            ? theme.cardBackground
            : theme.primaryButtonBackground,
          borderRadius: borderRadius.full,
          padding:theme.spacing.md,
          opacity: isDisabled ? 0.7 : 1,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={theme.primaryButtonText} />
      ) : (
        <Text
          style={{
            color: isDisabled ? theme.textSecondary : theme.primaryButtonText,
            fontSize: fontSizes.md,
            fontWeight: fontWeights.bold,
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
