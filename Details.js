import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';

const Details = ({ route }) => {
    const { item } = route.params;

    const {
        school_name,
        address,
        postal_code,
        telephone_no,
        fax_no,
        email_address,
        mrt_desc,
        bus_desc,
        principal_name,
        first_vp_name,
        second_vp_name,
        third_vp_name,
        zone_code,
        type_code,
        nature_code,
        session_code,
        mainlevel_code,
        sap_ind,
        autonomous_ind,
        gifted_ind,
        ip_ind,
        mothertongue1_code,
        mothertongue2_code,
        mothertongue3_code,
        url_address
    } = item;

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{school_name || 'No School Name Available'}</Text>

            {/* Address & Postal Code Section */}
            <View style={styles.card}>
                <Text style={styles.label}>Address:</Text>
                <Text style={styles.text}>{address || 'No Address Available'}, {postal_code || 'No Postal Code Available'}</Text>
            </View>

            {/* Contact Info Section */}
            <View style={styles.card}>
                <Text style={styles.label}>Contact Information:</Text>
                <Text style={styles.text}>Telephone: {telephone_no || 'N/A'}</Text>
                <Text style={styles.text}>Fax: {fax_no || 'N/A'}</Text>
                <Text style={styles.text}>Email: <Text style={styles.link} onPress={() => Linking.openURL(`mailto:${email_address}`)}>{email_address || 'N/A'}</Text></Text>
            </View>

            {/* Transport Info Section */}
            <View style={styles.card}>
                <Text style={styles.label}>Transport Information:</Text>
                <Text style={styles.text}>MRT Stations: {mrt_desc || 'N/A'}</Text>
                <Text style={styles.text}>Bus Services: {bus_desc || 'N/A'}</Text>
            </View>

            {/* School Details Section */}
            <View style={styles.card}>
                <Text style={styles.label}>School Details:</Text>
                <Text style={styles.text}>Zone: {zone_code || 'N/A'}</Text>
                <Text style={styles.text}>Type: {type_code || 'N/A'}</Text>
                <Text style={styles.text}>Nature: {nature_code || 'N/A'}</Text>
                <Text style={styles.text}>Session: {session_code || 'N/A'}</Text>
                <Text style={styles.text}>Main Level: {mainlevel_code || 'N/A'}</Text>
            </View>

            {/* Special Information Section */}
            <View style={styles.card}>
                <Text style={styles.label}>Special Information:</Text>
                <Text style={styles.text}>SAP: {sap_ind || 'N/A'}</Text>
                <Text style={styles.text}>Autonomous: {autonomous_ind || 'N/A'}</Text>
                <Text style={styles.text}>Gifted: {gifted_ind || 'N/A'}</Text>
                <Text style={styles.text}>IP: {ip_ind || 'N/A'}</Text>
            </View>

            {/* Mother Tongue Languages Section */}
            <View style={styles.card}>
                <Text style={styles.label}>Mother Tongue Languages:</Text>
                <Text style={styles.text}>{mothertongue1_code || 'N/A'}</Text>
                <Text style={styles.text}>{mothertongue2_code || 'N/A'}</Text>
                <Text style={styles.text}>{mothertongue3_code || 'N/A'}</Text>
            </View>

            {/* Website Section */}
            <View style={styles.card}>
                <Text style={styles.label}>Website:</Text>
                <Text style={styles.link} onPress={() => Linking.openURL(url_address)}>{url_address || 'N/A'}</Text>
            </View>

            {/* Principal & Vice Principals Section */}
            <View style={styles.card}>
                <Text style={styles.label}>Principal:</Text>
                <Text style={styles.text}>{principal_name || 'N/A'}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>Vice Principals:</Text>
                <Text style={styles.text}>{first_vp_name || 'N/A'}</Text>
                <Text style={styles.text}>{second_vp_name || 'N/A'}</Text>
                <Text style={styles.text}>{third_vp_name || 'N/A'}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FAFAFA',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#2C3E50',
        textAlign: 'center',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        marginBottom: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
        borderLeftWidth: 4,
        borderLeftColor: '#3498DB',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#34495E',
        marginBottom: 6,
    },
    text: {
        fontSize: 14,
        color: '#7F8C8D',
    },
    link: {
        fontSize: 14,
        color: '#3498DB',
        textDecorationLine: 'underline',
        fontWeight: '600',
    },
});

export default Details;
