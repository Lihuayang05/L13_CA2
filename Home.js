import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const datasetId = "d_688b934f82c1059ed0a6993d2a829089";
const url = `https://data.gov.sg/api/action/datastore_search?resource_id=${datasetId}&limit=5000`;

const Home = ({ navigation }) => {
    const [data, setData] = useState([]); // Stores the fetched data
    const [filteredData, setFilteredData] = useState([]); // Stores the filtered data
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedZone, setSelectedZone] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(jsonData => {
                const records = jsonData.result.records;
                setData(records);
                setFilteredData(records); // Show all data initially
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    // Filter function based on school name, zone, and type
    const handleSearch = () => {
        let filtered = data;

        if (searchQuery) {
            filtered = filtered.filter(item =>
                item.school_name && item.school_name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedZone) {
            filtered = filtered.filter(item =>
                item.zone_code && item.zone_code.toLowerCase().includes(selectedZone.toLowerCase())
            );
        }

        if (selectedType) {
            filtered = filtered.filter(item =>
                item.mainlevel_code && item.mainlevel_code.toLowerCase().includes(selectedType.toLowerCase())
            );
        }

        setFilteredData(filtered);
    };

    // Watch for changes in search query, zone, or type
    useEffect(() => {
        handleSearch();
    }, [searchQuery, selectedZone, selectedType]);

    // Function to assign colors based on school type
    const getSchoolTypeColor = (schoolType) => {
        switch (schoolType) {
            case 'PRIMARY':
                return { backgroundColor: '#FFEB3B', textColor: '#3E2723' };
            case 'SECONDARY':
                return { backgroundColor: '#B3E5FC', textColor: '#0277BD' };
            case 'JUNIOR COLLEGE':
                return { backgroundColor: '#C8E6C9', textColor: '#388E3C' };
            case 'MIXED LEVELS':
                return { backgroundColor: '#FFCC80', textColor: '#E65100' };
            default:
                return { backgroundColor: '#E0E0E0', textColor: '#757575' };
        }
    };

    return (
        <View style={styles.container}>

            {/* Header Section */}
            <Text style={styles.header}>Explore Singapore Schools</Text>

            {/* Search Box */}
            <TextInput
                style={styles.searchBox}
                placeholder="Search by school name..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            {/* Filter Section */}
            <View style={styles.filterContainer}>
                <View style={styles.pickerContainer}>
                    <Text style={styles.label}>Filter by Zone:</Text>
                    <Picker
                        selectedValue={selectedZone}
                        style={styles.picker}
                        onValueChange={(itemValue) => setSelectedZone(itemValue)}
                    >
                        <Picker.Item label="All Zones" value="" />
                        <Picker.Item label="South" value="SOUTH" />
                        <Picker.Item label="North" value="NORTH" />
                        <Picker.Item label="East" value="EAST" />
                        <Picker.Item label="West" value="WEST" />
                    </Picker>
                </View>

                <View style={styles.pickerContainer}>
                    <Text style={styles.label}>Filter by School Type:</Text>
                    <Picker
                        selectedValue={selectedType}
                        style={styles.picker}
                        onValueChange={(itemValue) => setSelectedType(itemValue)}
                    >
                        <Picker.Item label="All Types" value="" />
                        <Picker.Item label="Primary" value="PRIMARY" />
                        <Picker.Item label="Secondary" value="SECONDARY" />
                        <Picker.Item label="Junior College" value="JUNIOR COLLEGE" />
                        <Picker.Item label="Mixed Levels" value="MIXED LEVELS" />
                    </Picker>
                </View>
            </View>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#FF6F61" />
                </View>
            ) : filteredData.length === 0 ? (
                <Text style={styles.noResults}>No Schools Found</Text>
            ) : (
                <FlatList
                    data={filteredData}
                    keyExtractor={item => item._id.toString()}
                    renderItem={({ item }) => {
                        const { backgroundColor, textColor } = getSchoolTypeColor(item.mainlevel_code);
                        return (
                            <TouchableOpacity
                                style={[styles.item, { backgroundColor }]}
                                onPress={() => navigation.navigate('Details', { item })}
                            >
                                <Text style={[styles.title, { color: textColor }]}>{item.school_name || 'No School Name Available'}</Text>
                                <Text style={[styles.details, { color: textColor }]}>
                                    Zone: {item.zone_code || 'No Zone Available'} | Type: {item.mainlevel_code || 'No Type Available'}
                                </Text>
                            </TouchableOpacity>
                        );
                    }}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
    },
    header: {
        fontSize: 36,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 20,
        color: '#FF6F61',
    },
    searchBox: {
        height: 50,
        width: '100%',
        borderColor: '#FF6F61',
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 15,
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        shadowColor: '#B0BEC5',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 2,
    },
    filterContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    pickerContainer: {
        width: '48%',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#B0BEC5',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 2,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
        color: '#FF6F61',
    },
    picker: {
        height: 45,
        width: '100%',
        borderColor: '#FF6F61',
        borderWidth: 1,
        marginBottom: 15,
        borderRadius: 8,
        backgroundColor: '#FFF1F0',
    },
    item: {
        width: '100%',
        padding: 20,
        marginBottom: 15,
        borderRadius: 10,
        shadowColor: '#BDC3C7',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
    },
    details: {
        fontSize: 14,
        marginTop: 5,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
});

export default Home;
