import React, { useContext } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../theme/ThemeContext';
import AppButton from '../components/AppButton';
import { Screens } from '../global/Screen';
import DetailRow from '../components/DetailRow';


export default function SubmissionSuccessScreen({ route, navigation }) {
    const { theme } = useContext(ThemeContext);
    const { spacing, fontSizes, fontWeights, borderRadius } = theme;

    const { pet = {} } = route.params || {};
    const { image, name, breed, age } = pet;

    return (
        <SafeAreaView style={[styles.container, {
            backgroundColor: theme.backgroundColor, paddingVertical: spacing.xxl,
            paddingHorizontal: spacing.lg,
        }]}>
            <ScrollView
                contentContainerStyle={{
                    alignItems: 'center',
                }}
            >
                {/* Pet Image */}
                <View
                    style={{
                        width: '100%',
                        maxWidth: 400,
                        borderRadius: borderRadius.lg,
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

                {/* Title */}
                <Text
                    style={{
                        fontSize: fontSizes.xxxl,
                        fontWeight: fontWeights.bold,
                        color: theme.textColor,
                        textAlign: 'center',
                        marginBottom: spacing.sm,
                    }}
                >
                    Submission Successful!
                </Text>

                {/* Subtitle */}
                <Text
                    style={{
                        fontSize: fontSizes.md,
                        color: theme.textSecondary,
                        textAlign: 'center',
                        marginBottom: spacing.xxl,
                    }}
                >
                    Your pet's profile has been created.
                </Text>

                {/* Details Card */}
                <View
                    style={{
                        width: '100%',
                        maxWidth: 400,
                        backgroundColor: theme.cardBackground,
                        borderRadius: borderRadius.lg,
                        padding: spacing.xxl,
                        borderColor: theme.borderColor,
                        borderWidth: 1,
                        marginBottom: spacing.xxl,
                    }}
                >
                    <Text
                        style={{
                            color: theme.textColor,
                            fontSize: fontSizes.lg,
                            fontWeight: fontWeights.bold,
                            marginBottom: spacing.md,
                        }}
                    >
                        Here are the details:
                    </Text>

                    <DetailRow label="Pet's Name" value={name || 'Buddy'} theme={theme} />
                    <DetailRow label="Pet's Breed" value={breed || 'Golden Retriever'} theme={theme} />
                    <DetailRow label="Age" value={age || '3 years'} theme={theme} />
                </View>


            </ScrollView>
            {/* Buttons */}
            <AppButton
                title="Submit Another"
                onPress={() => navigation.navigate(Screens.AddPetScreen)}
            />

            <TouchableOpacity
                onPress={() => navigation.navigate(Screens.BottomTabs)}
                activeOpacity={0.9}
                style={{
                    borderRadius: borderRadius.full,
                    backgroundColor: theme.primaryButtonBackground + '33',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: spacing.md,
                    padding: spacing.md,
                }}
            >
                <Text
                    style={{
                        color: theme.textColor,
                        fontSize: fontSizes.base,
                        fontWeight: fontWeights.bold,
                    }}
                >
                    View My Pets
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
});
