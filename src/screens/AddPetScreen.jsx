import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../theme/ThemeContext';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import ImagePickerCard from '../components/ImagePickerCard';
import { Formik } from 'formik';
import { petValidationSchema } from '../utils/validationSchema';
import { Screens } from '../global/Screen';
import Header from '../components/Header';

export default function AddPetScreen({ navigation }) {
    const { theme } = useContext(ThemeContext);
    const { spacing, fontSizes, fontWeights } = theme;

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSave = async (values, { resetForm }) => {
        setLoading(true);
        try {
           
            navigation.navigate(Screens.ConfirmPetScreen, {
                pet: {
                    ...values,
                    image, 
                },
            });
        } catch (err) {
            Alert.alert('Error', 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            {/* HEADER */}
            <Header 
            title='Add Pet'  
            onBackPress={()=>navigation?.goBack()}
            showBack={true}/>
            {/* BODY */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    padding: spacing.lg,
                    paddingBottom: spacing.xxxl * 2,
                }}
            >
                {/* IMAGE PICKER */}
                <ImagePickerCard image={image} onPick={setImage} />

                {/* FORM */}
                <Formik
                    initialValues={{ name: '', breed: '', age: '' }}
                    validationSchema={petValidationSchema}
                    onSubmit={handleSave}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={{ marginTop: spacing.xxl }}>
                            <AppInput
                                label="Pet's Name"
                                placeholder="Enter your pet's name"
                                value={values.name}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                error={touched.name && errors.name}
                            />

                            <AppInput
                                label="Breed"
                                placeholder="e.g., Golden Retriever"
                                value={values.breed}
                                onChangeText={handleChange('breed')}
                                onBlur={handleBlur('breed')}
                                error={touched.breed && errors.breed}
                            />

                            <AppInput
                                label="Age"
                                placeholder="Enter age in years/months"
                                value={values.age}
                                onChangeText={handleChange('age')}
                                onBlur={handleBlur('age')}
                                keyboardType="numeric"
                                error={touched.age && errors.age}
                            />

                            <View style={{ marginTop: spacing.xxl }}>
                                <AppButton
                                    title={loading ? 'Saving...' : 'Save Pet'}
                                    onPress={handleSubmit}
                                    loading={loading}
                                />
                            </View>
                        </View>
                    )}
                </Formik>
            </ScrollView>
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
