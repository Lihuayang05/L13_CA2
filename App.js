import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Home';
import DetailsScreen from './Details';
import { Image, Text, View, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

const HeaderWithLogo = () => (
    <View style={styles.headerContainer}>
        <Image
            source={{ uri: 'https://www.moe.gov.sg/-/media/images/news/moe-logo.jpg' }}
            style={styles.logo}
        />
        <Text style={styles.headerTitle}>SG Schools</Text>
    </View>
);

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#f86054',
                        elevation: 0,
                    },
                    headerTintColor: '#fff',
                    headerTitle: () => <HeaderWithLogo />,
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: '' }} />
                <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Details' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
    },
    logo: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
});
