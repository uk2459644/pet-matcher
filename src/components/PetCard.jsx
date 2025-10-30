import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../theme/ThemeContext';

export default function PetCard({ pet }) {
  const { theme } = useContext(ThemeContext);
  const { spacing, borderRadius, fontSizes, fontWeights } = theme;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        styles.card,
        {
          backgroundColor: theme.cardBackground,
          borderRadius: borderRadius.lg,
          shadowColor: theme.mode === 'light' ? '#000' : '#000',
        },
      ]}
      onPress={() => console.log('Tapped:', pet.name)}
    >
      <View
        style={{
          borderRadius: borderRadius.md,
          overflow: 'hidden',
          backgroundColor: theme.borderColor,
        }}
      >
        <Image
          source={{ uri: pet.image }}
          style={{
            width: '100%',
            aspectRatio: 1,
            borderRadius: borderRadius.md,
          }}
          resizeMode="cover"
        />
      </View>

      <View style={{ marginTop: spacing.sm,
        paddingHorizontal:spacing.sm,
        paddingBottom:spacing.sm
         }}>
        <Text
          style={{
            fontSize: fontSizes.md,
            fontWeight: fontWeights.semibold,
            color: theme.textColor,
          }}
        >
          {pet.name}
        </Text>
        <Text
          style={{
            fontSize: fontSizes.sm,
            fontWeight: fontWeights.regular,
            color: theme.textSecondary,
          }}
        >
          {pet.breed}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginBottom: 16,
    elevation: 2,
  },
});
