import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ThemeContext } from '../theme/ThemeContext';

const Header = ({
  title = '',
  showBack = false,
  onBackPress,
  rightIcon,
  onRightPress,
  centerTitle = true,
  style,
}) => {
  const { theme } = useContext(ThemeContext);
  const { spacing, borderRadius, fontSizes, fontWeights } = theme;

  return (
    <View
      style={[
        styles.header,
        {
          padding: spacing.md,
          backgroundColor: theme.headerBackground,
        },
        style,
      ]}
    >
      {/* Left / Back Button */}
      {showBack ? (
        <TouchableOpacity
          onPress={onBackPress}
          activeOpacity={0.7}
          style={[
            styles.iconButton,
            { borderRadius: borderRadius.full },
          ]}
        >
          <Icon name="arrow-left" size={fontSizes.xl} color={theme.textColor} />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconPlaceholder} />
      )}

      {/* Title */}
      <Text
        style={{
          flex: 1,
          textAlign: centerTitle ? 'center' : 'left',
          color: theme.textColor,
          fontSize: fontSizes.lg,
          fontWeight: fontWeights.bold,
          marginRight: centerTitle ? spacing.xxl : 0,
        }}
        numberOfLines={1}
      >
        {title}
      </Text>

      {/* Right Icon (optional) */}
      {rightIcon ? (
        <TouchableOpacity
          onPress={onRightPress}
          activeOpacity={0.7}
          style={[
            styles.iconButton,
            { borderRadius: borderRadius.full },
          ]}
        >
          <Icon name={rightIcon} size={fontSizes.xl} color={theme.textColor} />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconPlaceholder} />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
  },
});
