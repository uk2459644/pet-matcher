import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import { ThemeContext } from '../theme/ThemeContext';

export default function ImagePickerCard({ image, onPick }) {
  const { theme } = useContext(ThemeContext);
  const { spacing, fontSizes, fontWeights, borderRadius } = theme;

  const pickImage = async () => {
    const options = {
      mediaType: 'photo',
      quality: 0.7,
    };
    const result = await launchImageLibrary(options);
    if (result?.assets?.[0]?.uri) {
      onPick(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity
      onPress={pickImage}
      activeOpacity={0.8}
      style={{
        alignItems: 'center',
        borderRadius: borderRadius.xl,
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: theme.borderColor,
        paddingVertical: spacing.xxl,
        paddingHorizontal: spacing.xxl,
        backgroundColor: theme.backgroundColor,
      }}
    >
      {image ? (
        <Image
          source={{ uri: image }}
          style={{
            width: 120,
            height: 120,
            borderRadius: borderRadius.full,
          }}
        />
      ) : (
        <>
          <View
            style={{
              height: 96,
              width: 96,
              borderRadius: borderRadius.full,
              backgroundColor: theme.cardBackground,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: spacing.md,
            }}
          >
            <Icon name="pets" size={fontSizes.xxxl} color={theme.primaryButtonBackground} />
          </View>
          <Text
            style={{
              color: theme.textColor,
              fontSize: fontSizes.lg,
              fontWeight: fontWeights.bold,
              marginBottom: spacing.xs,
            }}
          >
            Upload Photo
          </Text>
          <Text
            style={{
              color: theme.textSecondary,
              fontSize: fontSizes.sm,
              textAlign: 'center',
              marginBottom: spacing.md,
            }}
          >
            Tap to add a photo
          </Text>
          <View
            style={{
              backgroundColor: theme.primaryButtonBackground + '33',
              borderRadius: borderRadius.full,
              paddingVertical: spacing.sm,
              paddingHorizontal: spacing.xl,
            }}
          >
            <Text
              style={{
                color: theme.primaryButtonBackground,
                fontWeight: fontWeights.bold,
                fontSize: fontSizes.sm,
              }}
            >
              Choose Image
            </Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
}
