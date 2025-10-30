import React from 'react';
import { View, Text } from 'react-native';


/**
 * Row for key-value data
 */
const DetailRow = ({ label, value, theme }) => {
  const { spacing, fontSizes } = theme;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: spacing.sm,
      }}
    >
      <Text
        style={{
          color: theme.textSecondary,
          fontSize: fontSizes.md,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          color: theme.textColor,
          fontSize: fontSizes.md,
          textAlign: 'right',
        }}
      >
        {value}
      </Text>
    </View>
  );
};

export default DetailRow;


