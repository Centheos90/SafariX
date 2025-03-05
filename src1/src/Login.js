import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const submitHandler = () => {
    if (!email || !password) {
      setAlertMessage('Please fill in all fields');
      setShowAlert(true);
      return;
    }

    setLoading(true);
    axios
      .post('https://react-api-tan-beta.vercel.app/user/login', {
        email,
        password,
      })
      .then(res => {
        console.log(res.data);
        storeData(res.data.token, res.data.firstName);
        setLoading(false);
        setAlertMessage('Log in Successfully!');
        setShowAlert(true);
        // setTimeout(10000);
        navigation.navigate('home');
      })
      .catch(error => {
        console.log(error.response?.data || error.message);
        setLoading(false);
        setAlertMessage(error.response?.data?.message || 'No account found!!');
        setShowAlert(true);
      });
  };

  const storeData = async (token, firstName) => {
    try {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('firstName', firstName);
      console.log('Data Stored');
    } catch (e) {
      console.log('Failed to store data');
    }
  };

  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.container}>
      <StatusBar hidden={true} />
      <SafeAreaView style={[styles.container, {justifyContent: 'center'}]}>
        {/* Header */}
        <Animatable.View animation="fadeInDown" style={styles.header}>
          <Text style={styles.heading}>Welcome Back!</Text>
          <Text style={styles.subHeading}>Login to continue</Text>
        </Animatable.View>

        {/* Form */}
        <Animatable.View animation="fadeInDown" style={styles.form}>
          {/* Email Input */}
          <Animatable.View animation="fadeInDown" delay={200}>
            <TextInput
              onChangeText={setEmail}
              style={styles.inputBox}
              placeholder="Email"
              placeholderTextColor="#999"
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </Animatable.View>

          {/* Password Input */}
          <Animatable.View animation="fadeInDown" delay={400}>
            <TextInput
              secureTextEntry
              onChangeText={setPassword}
              style={styles.inputBox}
              placeholder="Password"
              placeholderTextColor="#999"
              autoCapitalize="none"
            />
          </Animatable.View>

          {/* Forgot Password */}
          <TouchableOpacity
            onPress={() => {
              setAlertMessage('Feature coming soon!');
              setShowAlert(true);
            }}
            style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <Animatable.View animation="fadeInDown" delay={600}>
            <TouchableOpacity
              onPress={submitHandler}
              style={styles.submitBtn}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color="black" />
              ) : (
                <Text style={styles.submitBtnText}>Login</Text>
              )}
            </TouchableOpacity>
          </Animatable.View>

          {/* Signup Link */}
          <Animatable.View
            animation="fadeInDown"
            delay={800}
            style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('signup')}>
              <Text style={styles.footerLink}>Signup</Text>
            </TouchableOpacity>
          </Animatable.View>
        </Animatable.View>
      </SafeAreaView>

      {/* Custom Alert Modal */}
      <Modal
        visible={showAlert}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAlert(false)}>
        <TouchableWithoutFeedback onPress={() => setShowAlert(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.alertBox}>
              <Text style={styles.alertTitle}>Alert</Text>
              <Text style={styles.alertMessage}>{alertMessage}</Text>
              <TouchableOpacity
                onPress={() => setShowAlert(false)}
                style={styles.alertButton}>
                <Text style={styles.alertButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </LinearGradient>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  form: {
    width: '90%',
    alignSelf: 'center',
  },
  inputBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginTop: 15,
    width: '100%',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    color: '#fff',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
  },
  submitBtn: {
    backgroundColor: '#fff',
    width: '100%',
    height: 50,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  submitBtnText: {
    color: '#6a11cb',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#fff',
    fontSize: 16,
  },
  footerLink: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertBox: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  alertMessage: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  alertButton: {
    backgroundColor: '#6a11cb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  alertButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
