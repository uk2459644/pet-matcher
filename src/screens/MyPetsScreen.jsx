import React, { useContext, useEffect, useState, useCallback } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { ThemeContext } from '../theme/ThemeContext';
import Header from '../components/Header';
import { RandomDogImageURL } from '../global/constants';

export default function MyPetsScreen({ navigation }) {
  const { theme ,toggleTheme} = useContext(ThemeContext);
  const { spacing, borderRadius, fontSizes, fontWeights } = theme;

  const [dogImage, setDogImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch random dog image
  const fetchDog = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(RandomDogImageURL);
      const data = await res.json();

      if (data.status === 'success') {
        setDogImage(data.message);
      } else {
        throw new Error('Invalid response from API');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load dog image.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDog();
  }, [fetchDog]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDog();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Header */}
      <Header title="My Pets" rightIcon={"sun"} onRightPress={toggleTheme} />

      {/* Content */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: spacing.md,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.textColor}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {loading && (
          <ActivityIndicator size="large" color={theme.primaryButtonBackground} />
        )}

        {!loading && error && (
          <Text
            style={{
              color: 'red',
              marginTop: spacing.lg,
              fontSize: fontSizes.md,
              textAlign: 'center',
            }}
          >
            {error}
          </Text>
        )}

        {!loading && !error && dogImage && (
          <View
            style={{
              width: '100%',
             
            }}
          >
            <Image
              source={{ uri: dogImage }}
              style={{
                width: '100%',
                height: 350,
                borderRadius: borderRadius.md,
              }}
              resizeMode="cover"
            />

            <Text
              style={{
                color: theme.textColor,
                fontSize: fontSizes.md,
                fontWeight: fontWeights.medium,
                textAlign: 'center',
                marginTop: spacing.lg,
              }}
            >
              Here’s a random dog for you.
            </Text>

            <TouchableOpacity
              onPress={fetchDog}
              activeOpacity={0.8}
              style={{
                marginTop: spacing.lg,
                alignSelf: 'center',
                backgroundColor: theme.primaryButtonBackground,
                paddingVertical: spacing.md,
                paddingHorizontal: spacing.xl,
                borderRadius: borderRadius.full,
              }}
            >
              <Text
                style={{
                  color: theme.primaryButtonText,
                  fontWeight: fontWeights.bold,
                  fontSize: fontSizes.base,
                }}
              >
                Fetch Another
              </Text>
            </TouchableOpacity>

             <Text
              style={{
                color: theme.textTertiary,
                fontSize: fontSizes.md,
                fontWeight: fontWeights.medium,
                textAlign: 'center',
                marginTop: spacing.lg,
              }}
            >
              or pull down to refresh.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
