import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../theme/ThemeContext';
import AppButton from '../components/AppButton';
import { Screens } from '../global/Screen';
import DetailRow from '../components/DetailRow';
import Header from '../components/Header';
import { WEBHOOK_URL } from '../global/constants';

export default function ConfirmPetScreen({ route, navigation }) {
  const { theme } = useContext(ThemeContext);
  const { spacing, fontSizes, fontWeights, borderRadius } = theme;

  const { pet = {} } = route.params || {};
  const { image, name, breed, age } = pet;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  
  const handleConfirm = async () => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          breed,
          age,
         
          image,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit data');
      }

      const data = await response.json().catch(() => ({}));

      navigation.navigate(Screens.ConfirmSucessScreen, { pet: { ...pet, response: data } });
    } catch (err) {
      console.error('Submit Error:', err);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* HEADER */}
      <Header title={"Pet's Details"} showBack={true} onBackPress={()=>navigation?.goBack()} />
      {/* BODY */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          padding: spacing.lg,
        }}
      >
         <View
                  style={{
                    width: '100%',
                    maxWidth: 400,
                    borderRadius: borderRadius.md,
                    overflow: 'hidden',
                    marginBottom: spacing.xxl,
                  }}
                >
                  <ImageBackground
                    source={{
                      uri:
                        image ||
                        'https://lh3.googleusercontent.com/aida-public/AB6AXuD4eULIk0I7x74d-a7DU5LlV9DY5I-k_c6Bh1NBb4LwnABS-HFCfx4Tmibh6Ci1LCEaGGs5C__0d_TpTUruu7ryT8psHCzGEaQJUf2vKGw1G62bVauGd-JbtgwbFV7Zft0nSQ_DwItdPl5xPOAWsgAZc60CKeLde-lXNHCQohzezeR_9Oa8H-lk3Q3uglvM8OKEap4CRa2u8Mf7hKkb_iP6xth8hL9k5otdpqQPGeFhWwXqQnez2sXH5EE95njVmT8RlXIHXeVtHzm7',
                    }}
                    style={{
                      width: '100%',
                      height: 320,
                    }}
                    resizeMode="cover"
                  />
                </View>
        {/* Details Card */}
        <View
          style={{
            backgroundColor: theme.cardBackground,
            borderRadius: borderRadius.lg,
            padding: spacing.xxl,
          }}
        >
          <DetailRow label="Name" value={name || 'Buddy'} theme={theme} />
          <DetailRow label="Breed" value={breed || 'Golden Retriever'} theme={theme} />
          <DetailRow label="Age" value={age || '2 years'} theme={theme} />
        
        </View>

        {/* Error Message */}
        {error && (
          <Text
            style={{
              color: 'red',
              marginTop: spacing.lg,
              textAlign: 'center',
            }}
          >
            {error}
          </Text>
        )}
      </ScrollView>

      {/* FOOTER */}
      <View
        style={{
          padding: spacing.lg,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: theme.borderColor,
          backgroundColor: theme.backgroundColor,
        }}
      >
        {loading ? (
          <View
            style={{
              height: 56,
              borderRadius: borderRadius.full,
              backgroundColor: theme.primaryButtonBackground,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator color={theme.primaryButtonText} size="small" />
            <Text
              style={{
                color: theme.primaryButtonText,
                fontWeight: fontWeights.bold,
                fontSize: fontSizes.base,
                marginTop: spacing.xs,
              }}
            >
              Submitting...
            </Text>
          </View>
        ) : (
          <AppButton title="Confirm Submission" onPress={handleConfirm} />
        )}

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
          style={{
            height: 56,
            borderRadius: borderRadius.full,
            borderWidth: 1,
            borderColor: theme.primaryButtonBackground + '80',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: spacing.md,
          }}
        >
          <Text
            style={{
              color: theme.primaryButtonBackground,
              fontWeight: fontWeights.bold,
              fontSize: fontSizes.base,
            }}
          >
            Edit Details
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
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
});
