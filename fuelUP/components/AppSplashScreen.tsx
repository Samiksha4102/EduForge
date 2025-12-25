import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import FuelUpIcon from '../assets/images/fuelUpIcon.svg';

const { width } = Dimensions.get('window');

export const AppSplashScreen = ({ onFinish }: { onFinish: () => void }) => {
    useEffect(() => {
        const hideNativeSplash = async () => {
            try {
                await SplashScreen.hideAsync();
            } catch (e) {
                console.warn('Error hiding native splash:', e);
            }
        };

        hideNativeSplash();

        // Simulate loading time
        const timer = setTimeout(() => {
            onFinish();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                {/* Logo Image */}
                <FuelUpIcon
                    width={331}
                    height={331}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        // Dashed blue lines in the design suggest centering, handled by container
    },
});
