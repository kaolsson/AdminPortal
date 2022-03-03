import createResourceId from '../utils/createResourceId';
import { sign, JWT_SECRET, JWT_EXPIRES_IN } from '../utils/jwt';
import wait from '../utils/wait';
import axios from 'axios';
import {
    serverConnection,
} from './connectionData';

const users = [
  {
    customerID: '5e86809283e28b96d2d38537',
    accountNumber: 'QT-5e86809283',
    accountID: '5e86809283e28b96d2d38537',
    title: 'Ms',
    firstName: 'Maggie',
    middleInitial: 'W',
    lastName: 'Chen',
    userName: 'maggie.chen',
    avatar: '/static/mock-images/avatars/avatar-maggie_chen.png',
    email: 'maggie@qomotax.com',
    phone: '408 123 1212',
    password: 'Password123!',
    address1: '600 S Abel Street',
    address2: 'Floor 4, Unit 409',
    zipCode: '95001',
    city: 'Milpitas',
    state: 'California',
    country: 'United States',
    countryCode: 'US',
    dateAdded: '09/11/2021',
    lastLogin: '10/11/2021',
    status: 'active',
  }
];

class AuthApi {
  login({ email, password }) {
    const apiUrl = serverConnection.baseUrl + serverConnection.loginUrl;

    const loginBody = JSON.stringify(
      {
        email,
        password
      }
    );

    const theHeaders = {
      headers: {
        'Content-Type': 'text/plain',
        Accept: '*',
      }
    };

    return new Promise((resolve, reject) => {
      axios.post(apiUrl, loginBody, theHeaders)
        .then((response) => {
          resolve(response.data.token);
        })
        .catch((response) => {
            console.log(response);
            reject(new Error('Email or password wrong'));
        });
    });
  }

  async register({ email, name, password }) {
    await wait(1000);

    return new Promise((resolve, reject) => {
      try {
        // Check if a user already exists
        let user = users.find((_user) => _user.email === email);

        if (user) {
          reject(new Error('User already exists'));
          return;
        }

        user = {
          id: createResourceId(),
          avatar: null,
          email,
          name,
          password,
          plan: 'Standard'
        };

        users.push(user);

        const accessToken = sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        resolve(accessToken);
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  me(accessToken) {
    const apiUrl = serverConnection.baseUrl + serverConnection.meUrl;

    const tokenTitle = 'token: ';
    const Authorization = tokenTitle + accessToken;

    const theHeaders = {
      headers: {
        'Content-Type': 'text/plain',
        Accept: '*',
        Authorization
      }
    };

    return new Promise((resolve, reject) => {
      axios.get(apiUrl, theHeaders)
        .then((response) => {
          console.log(response.data.user);
          resolve(response.data.user);
        })
        .catch((response) => {
          reject(new Error(response.data));
          console.log(response.data);
        });
    });
  }

  update(type, user) {
    const apiUrl = serverConnection.baseUrl + serverConnection.meUrl;
    const actionType = type; // update

    console.log(type);

    const theBody = JSON.stringify(
      {
        actionType,
        user
      }
    );

    return new Promise((resolve, reject) => {
      const accessToken = window.localStorage.getItem('accessToken');

      if (accessToken) {
        const tokenTitle = 'token: ';
        const Authorization = tokenTitle + accessToken;
        const theHeaders = {
          headers: {
            'Content-Type': 'text/plain',
            Accept: '*',
            Authorization
          }
        };
        axios.put(apiUrl, theBody, theHeaders)
          .then((response) => {
            console.log(response.data.user);
            resolve(response.data.user);
          })
          .catch((response) => {
            reject(new Error(response.data));
          });
      } else {
        reject(new Error('No token'));
      }
    });
  }

  forgotPassword(userEmail) {
    console.log(userEmail);
    const apiUrl = serverConnection.baseUrl + serverConnection.authUrl;
    const authType = 1;

    const theBody = JSON.stringify(
      {
        authType,
        userEmail
      }
    );

    const theHeaders = {
      headers: {
        'Content-Type': 'text/plain',
        Accept: '*'
      }
    };

    return new Promise((resolve, reject) => {
      axios.post(apiUrl, theBody, theHeaders)
        .then((response) => {
          resolve(response.data);
        })
        .catch((response) => {
          reject(new Error(response.data));
          console.log(response.data);
        });
    });
  }

  forgotPasswordSubmit(userEmail, code, newPassword) {
    const apiUrl = serverConnection.baseUrl + serverConnection.authUrl;
    const authType = 2;

    const theBody = JSON.stringify(
      {
        authType,
        userEmail,
        code,
        newPassword
      }
    );

    const theHeaders = {
      headers: {
        'Content-Type': 'text/plain',
        Accept: '*'
      }
    };

    return new Promise((resolve, reject) => {
      axios.post(apiUrl, theBody, theHeaders)
        .then((response) => {
          resolve(response.data);
        })
        .catch((response) => {
          reject(new Error(response.data));
          console.log(response.data);
        });
    });
  }

  resendCode(userEmail) {
    const apiUrl = serverConnection.baseUrl + serverConnection.authUrl;
    const authType = 3;

    const theBody = JSON.stringify(
      {
        authType,
        userEmail
      }
    );

    const theHeaders = {
      headers: {
        'Content-Type': 'text/plain',
        Accept: '*'
      }
    };

    return new Promise((resolve, reject) => {
      axios.post(apiUrl, theBody, theHeaders)
        .then((response) => {
          resolve(response.data);
        })
        .catch((response) => {
          reject(new Error(response.data));
          console.log(response.data);
        });
    });
  }
}

export const authApi = new AuthApi();
