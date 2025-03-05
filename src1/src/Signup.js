import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

GoogleSignin.configure({
  webClientId:
    '1012468882226-emv5hus68hkf1gbq4s02qmh8obcgqpqc.apps.googleusercontent.com',
});

const Signup = () => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isUserExist, setUserExist] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const validateEmail = useCallback(email => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid Gmail address');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  }, []);

  const showCustomAlert = message => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const signInResult = await GoogleSignin.signIn();

      let idToken = signInResult.data?.idToken;
      if (!idToken) {
        idToken = signInResult.idToken;
      }
      if (!idToken) {
        throw new Error('No ID token found');
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      console.log('User logged in successfully');
      navigation.navigate('home');
    } catch (err) {
      console.log(err);
      showCustomAlert('Failed to sign in with Google');
    }
  }

  const submitHandler = () => {
    if (!firstName || !lastName || !email || !password) {
      showCustomAlert('All fields are required');
      return;
    }
    if (!validateEmail(email)) {
      return;
    }
    setLoading(true);
    setTimeout(checkEmail, 500);
  };

  const checkEmail = () => {
    axios
      .get('https://react-api-tan-beta.vercel.app/user/checkEmail/' + email)
      .then(res => {
        if (res.data.isAvailable) {
          setUserExist(true);
          setLoading(false);
        } else {
          setUserExist(false);
          createNewUser();
        }
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  const createNewUser = () => {
    axios
      .post('https://react-api-tan-beta.vercel.app/user/signup', {
        firstName,
        lastName,
        email,
        password,
      })
      .then(res => {
        console.log(res.data);
        storeData(res.data.token, res.data.firstName);
        setLoading(false);
        setAlertMessage('Sign Up Successfully!');
        setShowAlert(true);
        navigation.navigate('home');
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        showCustomAlert('Failed to create account');
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
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={[styles.container, {justifyContent: 'center'}]}>
        {/* Header */}
        <Animatable.View animation="fadeInDown" style={styles.header}>
          <Text style={styles.heading}>Create Your Account</Text>
        </Animatable.View>

        {/* Form */}
        <Animatable.View animation="fadeInDown" style={styles.form}>
          {/* First Name Input */}
          <Animatable.View animation="fadeInDown" delay={200}>
            <TextInput
              onChangeText={setFirstName}
              style={styles.inputBox}
              placeholder="First Name"
              placeholderTextColor="#999"
            />
          </Animatable.View>

          {/* Last Name Input */}
          <Animatable.View animation="fadeInDown" delay={400}>
            <TextInput
              onChangeText={setLastName}
              style={styles.inputBox}
              placeholder="Last Name"
              placeholderTextColor="#999"
            />
          </Animatable.View>

          {/* Email Input */}
          <Animatable.View animation="fadeInDown" delay={600}>
            <TextInput
              onChangeText={text => {
                setEmail(text);
                validateEmail(text);
              }}
              style={styles.inputBox}
              placeholder="Email"
              placeholderTextColor="#999"
              keyboardType="email-address"
            />
          </Animatable.View>
          {emailError ? (
            <Text style={styles.errormsg}>{emailError}</Text>
          ) : null}
          {isUserExist && (
            <Animatable.View animation="fadeIn" delay={800}>
              <Text style={styles.errormsg}>User already exists</Text>
            </Animatable.View>
          )}

          {/* Password Input */}
          <Animatable.View animation="fadeInDown" delay={800}>
            <TextInput
              secureTextEntry
              onChangeText={setPassword}
              style={styles.inputBox}
              placeholder="Password"
              placeholderTextColor="#999"
            />
          </Animatable.View>

          {/* Submit Button */}
          <Animatable.View animation="fadeInDown" delay={1000}>
            <TouchableOpacity
              onPress={submitHandler}
              style={styles.submitBtn}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color="black" />
              ) : (
                <Text style={styles.submitBtnText}>Submit</Text>
              )}
            </TouchableOpacity>
          </Animatable.View>

          {/* Login Link */}
          <Animatable.View
            animation="fadeInDown"
            delay={1200}
            style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
              <Text style={styles.footerLink}>Login</Text>
            </TouchableOpacity>
          </Animatable.View>

          {/* Google Sign In Button */}
          <Animatable.View
            animation="fadeInDown"
            delay={1400}
            style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={onGoogleButtonPress}
              style={styles.googleBtn}>
              <Image
                source={require('./assets/google.png')}
                style={{width: 24, height: 24}}
              />
              <Text style={styles.googleBtnText}>Sign in with Google</Text>
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

export default Signup;

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
  errormsg: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
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
  googleBtn: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '80%',
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
  googleBtnText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
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
