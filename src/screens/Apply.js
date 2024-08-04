import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const Apply = ({ route, navigation }) => {
    const { job } = route.params;
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [age, setAge] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [idNo, setIdNo] = useState('');
    const [cvImage, setCvImage] = useState(null);

    const handleImageUpload = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                const source = { uri: response.assets[0].uri };
                setCvImage(source);
            }
        });
    };

    const handleSubmit = () => {
        // Validate form fields
        if (!fullName || !address || !age || !contactNo || !idNo ) {
            Alert.alert(
                'Incomplete Form',
                'Please fill in all fields and upload your CV image.',
                [{ text: 'OK' }]
            );
            return;
        }

        // Process form submission
        const applicationData = {
            fullName,
            address,
            age,
            contactNo,
            idNo,
            cvImage,
        };
        console.log('Application Data:', applicationData);
        // Add your submission logic here

        // Display success alert and navigate to home
        Alert.alert(
            'Application Submitted',
            'Your job application has been submitted successfully!',
            [
                { text: 'OK', onPress: () => navigation.navigate('Home') }
            ]
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.title}>Apply for {job.title}</Text>
                    <Text style={styles.company}>Company: {job.company}</Text>
                    <Text style={styles.location}>Location: {job.location}</Text>
                    <Text style={styles.description}>{job.description}</Text>
                </View>
                <Text style={styles.header}>Your Details</Text>
                <TextInput style={styles.input} placeholder="Full Name" value={fullName} onChangeText={setFullName} />
                <TextInput style={styles.input} placeholder="Address" value={address} onChangeText={setAddress} />
                <TextInput style={styles.input} placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" />
                <TextInput style={styles.input} placeholder="Contact Number" value={contactNo} onChangeText={setContactNo} keyboardType="phone-pad" />
                <TextInput style={styles.input} placeholder="ID Number" value={idNo} onChangeText={setIdNo} />
                <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
                    <Text style={styles.uploadButtonText}>
                        {cvImage ? 'Change CV Image' : 'Upload CV Image'}
                    </Text>
                </TouchableOpacity>
                {cvImage && (
                    <Image source={cvImage} style={styles.image} />
                )}
                <Button title="Submit Application" onPress={handleSubmit} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 16,
    },
    container: {
        padding: 16,
        backgroundColor: '#f8f9fa',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    company: {
        fontSize: 18,
        marginBottom: 4,
        color: '#555',
    },
    location: {
        fontSize: 18,
        marginBottom: 4,
        color: '#555',
    },
    description: {
        fontSize: 16,
        marginBottom: 8,
        color: '#777',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    input: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    uploadButton: {
        padding: 15,
        backgroundColor: '#007bff',
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    uploadButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginBottom: 16,
    },
});

export default Apply;