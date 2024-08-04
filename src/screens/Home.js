import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, ScrollView, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import initialJobData from '../screens/initialJobData';

const Home = () => {
    const [jobData, setJobData] = useState(initialJobData);
    const [showFilters, setShowFilters] = useState(true);
    const [titleFilter, setTitleFilter] = useState('');
    const [companyFilter, setCompanyFilter] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [selectedJob, setSelectedJob] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigation = useNavigation();

    const applyFilters = () => {
        const filteredJobs = initialJobData.filter(
            (job) =>
                job.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
                job.company.toLowerCase().includes(companyFilter.toLowerCase()) &&
                job.location.toLowerCase().includes(locationFilter.toLowerCase())
        );
        setJobData(filteredJobs);
        setShowFilters(false);
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const renderJobItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleViewDetails(item)}>
            <View style={styles.jobItem}>
                <Text style={styles.jobTitle}>{item.title}</Text>
                <Text style={styles.jobCompany}>{item.company}</Text>
                <Text style={styles.jobLocation}>{item.location}</Text>
                <Text style={styles.jobDescription}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    );

    const handleViewDetails = (job) => {
        setSelectedJob(job);
        setIsModalVisible(true);
    };

    const handleApply = () => {
        setIsModalVisible(false);
        navigation.navigate('Apply', { job: selectedJob });
    };

    const renderJobDetailsModal = () => {
        if (!selectedJob) {
            return null;
        }

        return (
            <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{selectedJob.title}</Text>
                        <Text style={styles.modalCompany}>{selectedJob.company}</Text>
                        <Text style={styles.modalLocation}>{selectedJob.location}</Text>
                        <Text style={styles.modalDescription}>{selectedJob.description}</Text>
                        <TouchableOpacity onPress={handleApply}>
                            <Text style={styles.modalApplyMethod}>{selectedJob.applyMethod}</Text>
                        </TouchableOpacity>
                        <Button title="Close" onPress={() => setIsModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Job Finder</Text>
            <Text style={styles.subHeading}>Solution By Zeeveture.lk</Text>

            <View style={styles.filterContainer}>
                {showFilters ? (
                    <>
                        <View style={styles.row}>
                            <View style={styles.filterColumn}>
                                <Text style={styles.filterLabel}>Title</Text>
                                <TextInput style={styles.filterInput} value={titleFilter} onChangeText={(text) => setTitleFilter(text)} />
                            </View>

                            <View style={styles.filterColumn}>
                                <Text style={styles.filterLabel}>Company</Text>
                                <TextInput style={styles.filterInput} value={companyFilter} onChangeText={(text) => setCompanyFilter(text)} />
                            </View>

                            <View style={styles.filterColumn}>
                                <Text style={styles.filterLabel}>Location</Text>
                                <TextInput style={styles.filterInput} value={locationFilter} onChangeText={(text) => setLocationFilter(text)} />
                            </View>
                        </View>

                        <Button title="Apply Filters" onPress={applyFilters} />
                    </>
                ) : (
                    <Button title="Show Filters" onPress={toggleFilters} />
                )}
            </View>

            <ScrollView>
                <FlatList data={jobData} keyExtractor={(item) => item.id} renderItem={renderJobItem} />
            </ScrollView>
            {renderJobDetailsModal()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 16,
        marginLeft:45
    },
    subHeading: {
        color: 'green',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 150,
        marginTop: -20,
    },
    filterContainer: {
        marginBottom: 16,
        marginTop: 20,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    filterColumn: {
        flex: 1,
        marginRight: 8,
        marginBottom: 16,
    },
    filterLabel: {
        fontSize: 16,
        marginBottom: 4,
    },
    filterInput: {
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
    jobItem: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    jobTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    jobCompany: {
        fontSize: 16,
        color: '#555',
        marginBottom: 4,
    },
    jobLocation: {
        fontSize: 16,
        color: '#555',
        marginBottom: 4,
    },
    jobDescription: {
        fontSize: 14,
        color: '#777',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        width: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    modalCompany: {
        fontSize: 18,
        color: '#555',
        marginBottom: 8,
    },
    modalLocation: {
        fontSize: 16,
        color: '#555',
        marginBottom: 8,
    },
    modalDescription: {
        fontSize: 14,
        color: '#777',
        marginBottom: 8,
    },
    modalApplyMethod: {
        fontSize: 14,
        color: 'blue',
        marginBottom: 8,
    },
});

export default Home;