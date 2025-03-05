import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddContact = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [token, setToken] = useState('');

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const token = await AsyncStorage.getItem('token');
    setToken(token);
  };

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

  const submitHandler = () => {
    if (!firstName || !lastName || !email || !address || !phone) {
      showCustomAlert('All fields are required');
      return;
    }
    console.log(firstName, lastName, email, address, phone);
    if (!validateEmail(email)) {
      return;
    }
    setLoading(true);
    setTimeout(500);

    axios
      .post(
        'https://react-api-tan-beta.vercel.app/contact',
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          address: address,
          phone: phone,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      )
      .then(res => {
        console.log(res.data);
        showCustomAlert('New Contact Added!');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          onChangeText={text => {
            setFirstName(text);
          }}
          style={styles.inputBox}
          placeholderTextColor="#000000"
          placeholder="First Name"
        />
        <TextInput
          onChangeText={text => {
            setLastName(text);
          }}
          style={styles.inputBox}
          placeholderTextColor="#000000"
          placeholder="Last Name"
        />

        <TextInput
          onChangeText={text => {
            setEmail(text);
            validateEmail(text);
          }}
          style={styles.inputBox}
          placeholderTextColor="#000000"
          placeholder="Email"
        />
        {emailError ? <Text style={styles.errormsg}>{emailError}</Text> : null}
        <TextInput
          onChangeText={text => {
            setAddress(text);
          }}
          style={styles.inputBox}
          placeholderTextColor="#000000"
          placeholder="Address"
        />
        <TextInput
          onChangeText={text => {
            setPhone(text);
          }}
          style={styles.inputBox}
          placeholderTextColor="#000000"
          placeholder="Phone"
        />
        <Animatable.View
          animation="fadeIn"
          delay={600}
          style={{width: '100%', alignItems: 'center'}}>
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
      </View>
    </View>
  );
};

export default AddContact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  inputBox: {
    padding: 10,
    backgroundColor: '#dfe8f9',
    marginTop: 15,
    width: '90%',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    color: '#000000',
  },
  formContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  submitBtn: {
    backgroundColor: '#fff',
    width: '90%',
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
    fontSize: 20,
    fontWeight: 'bold',
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
  errormsg: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});
