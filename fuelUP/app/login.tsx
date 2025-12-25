import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LoginImg from '../assets/images/loginImg.svg';

export default function LoginScreen() {
    const router = useRouter();

    const handleLogin = () => {
        router.replace('/(tabs)');
    };

    const handleSignUp = () => {
        router.replace('/(tabs)');
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Food Bowl Image */}
            <View style={styles.imageContainer}>
                <LoginImg
                    width={300}
                    height={300}
                />
            </View>

            {/* Content */}
            <View style={styles.contentContainer}>
                <Text style={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
                </Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Log In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                        <Text style={styles.signUpButtonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 150, // Circular
    },
    contentContainer: {
        width: '100%',
        paddingHorizontal: 40,
        paddingBottom: 60,
        alignItems: 'center',
    },
    description: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 14,
        marginBottom: 40,
        lineHeight: 20,
        opacity: 0.9,
    },
    buttonContainer: {
        width: '100%',
        gap: 16,
    },
    loginButton: {
        backgroundColor: '#EF4444', // Red/Coral color
        paddingVertical: 16,
        borderRadius: 30,
        width: '100%',
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    signUpButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 16,
        borderRadius: 30,
        width: '100%',
        alignItems: 'center',
    },
    signUpButtonText: {
        color: '#F97316', // Orange color matching design
        fontSize: 18,
        fontWeight: '600',
    },
});
