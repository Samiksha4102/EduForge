import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import EasyPayment from '../assets/images/easyPayment.svg';
import EasyPaymentIcon from '../assets/images/easyPaymentIcon.svg';
import FastDelivery from '../assets/images/fastDelivery.svg';
import FastDeliveryIcon from '../assets/images/fastDeliveryIcon.svg';
import OrderFood from '../assets/images/orderFood.svg';
import OrderFoodIcon from '../assets/images/orderFoodIcon.svg';

const { width, height } = Dimensions.get('window');

const slides = [
    {
        id: '1',
        image: OrderFood,
        icon: OrderFoodIcon,
        title: 'Order For Food',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    },
    {
        id: '2',
        image: EasyPayment,
        icon: EasyPaymentIcon,
        title: 'Easy Payment',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    },
    {
        id: '3',
        image: FastDelivery,
        icon: FastDeliveryIcon,
        title: 'Fast Delivery',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    },
];

export default function OnboardingScreen() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
        } else {
            router.replace('/login');
        }
    };

    const handleSkip = () => {
        router.replace('/login');
    };

    const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / width);
        setCurrentIndex(index);
    };

    const renderItem = ({ item }: { item: typeof slides[0] }) => (
        <View style={styles.slide}>
            {/* Top Image Section */}
            <View style={styles.imageContainer}>
                <item.image width={width} height={'100%'} preserveAspectRatio="xMidYMid slice" />
            </View>

            {/* Bottom Content Section */}
            <View style={styles.contentContainer}>
                <View style={styles.iconContainer}>
                    <item.icon width={40} height={40} />
                </View>

                <Text style={styles.title}>{item.title}</Text>

                <Text style={styles.description}>
                    {item.description}
                </Text>

                {/* Spacer to push content up a bit to leave room for static controls if they heavily overlap, 
                    but here we have plenty of space in the black box. */}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            <FlatList
                ref={flatListRef}
                data={slides}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={onMomentumScrollEnd}
                keyExtractor={(item) => item.id}
                bounces={false}
                scrollEventThrottle={32}
            />

            {/* Absolute Controls */}

            {/* Skip Button */}
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipText}>Skip {'>'}</Text>
            </TouchableOpacity>

            {/* Bottom Controls (Pagination & Button) */}
            <View style={styles.bottomControls}>
                {/* Pagination Dots */}
                <View style={styles.pagination}>
                    {slides.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                {
                                    backgroundColor: index === currentIndex ? '#F97316' : '#4B5563',
                                    width: index === currentIndex ? 24 : 8,
                                },
                            ]}
                        />
                    ))}
                </View>

                {/* Next/Get Started Button */}
                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                    <Text style={styles.nextButtonText}>
                        {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    slide: {
        width: width,
        height: height,
        alignItems: 'center',
    },
    imageContainer: {
        width: width,
        height: height * 0.65, // Takes up top 60-65%
    },
    contentContainer: {
        width: width,
        height: height * 0.45,
        backgroundColor: '#000000',
        marginTop: -50, // Overlap the image
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30,
        paddingTop: 40,
        alignItems: 'center',
    },
    iconContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#F97316', // Orange
        marginBottom: 16,
        textAlign: 'center',
    },
    description: {
        fontSize: 14,
        color: '#FFFFFF',
        textAlign: 'center',
        lineHeight: 20,
        opacity: 0.8,
        maxWidth: '90%',
    },
    skipButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 10,
        padding: 10,
    },
    skipText: {
        color: '#F97316',
        fontSize: 16,
        fontWeight: '600',
    },
    bottomControls: {
        position: 'absolute',
        bottom: 50,
        width: '100%',
        alignItems: 'center',
        gap: 30,
    },
    pagination: {
        flexDirection: 'row',
        gap: 6,
    },
    dot: {
        height: 6,
        borderRadius: 3,
    },
    nextButton: {
        backgroundColor: '#F97316', // Orange
        paddingVertical: 16,
        paddingHorizontal: 40,
        borderRadius: 30,
        width: '80%',
        alignItems: 'center',
    },
    nextButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
});
