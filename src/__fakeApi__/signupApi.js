import axios from 'axios';
import deepCopy from '../utils/deepCopy';
import {
    serverConnection,
} from './connectionData';

class SignupApi {
    getSignups(accountID) {
        const apiUrl = serverConnection.baseUrl + serverConnection.signupAccountUrl + serverConnection.slash + accountID;

        return new Promise((resolve, reject) => {
            const accessToken = window.localStorage.getItem('accessToken');

            if (accessToken) {
              const tokenTitle = 'token: ';
              const Authorization = tokenTitle + accessToken;

              const theHeaders = {
                headers: {
                  Accept: '*',
                  Authorization
                }
              };

              axios.get(apiUrl, theHeaders)
                .then((response) => {
                  console.log(response.data);
                  resolve(response.data);
                })
                .catch((response) => {
                  console.log('Fail to retrieve sign ups');
                  reject(new Error(response));
                });
            } else {
              console.log('Fail no token');
              reject(new Error('No token'));
            }
        });
    }

    getSignup(messageID) {
        const apiUrl = serverConnection.baseUrl + serverConnection.signupUrl + serverConnection.slash + messageID;

        return new Promise((resolve, reject) => {
            const accessToken = window.localStorage.getItem('accessToken');

            if (accessToken) {
              const tokenTitle = 'token: ';
              const Authorization = tokenTitle + accessToken;

              const theHeaders = {
                headers: {
                  Accept: '*',
                  Authorization
                }
              };

              axios.get(apiUrl, theHeaders)
                .then((response) => {
                  console.log(response.data);
                  resolve(response.data);
                })
                .catch((response) => {
                  console.log('Fail to retrieve sign up');
                  reject(new Error(response));
                });
            } else {
              console.log('Fail no token');
              reject(new Error('No token'));
            }
        });
    }

    updateSignup(messageID, signupBody) {
        const apiUrl = serverConnection.baseUrl + serverConnection.signupUrl + serverConnection.slash + messageID;
        console.log(signupBody);
        console.log(apiUrl);
        return new Promise((resolve, reject) => {
            const accessToken = window.localStorage.getItem('accessToken');

            if (accessToken) {
              const tokenTitle = 'token: ';
              const Authorization = tokenTitle + accessToken;

              const theHeaders = {
                headers: {
                  Accept: '*',
                  Authorization
                }
              };

              const theBody = JSON.stringify(
                {
                    messageID,
                    note: signupBody.note,
                    status: signupBody.status,
                }
              );

              axios.put(apiUrl, theBody, theHeaders)
                .then((response) => {
                  resolve(deepCopy(response.data));
                })
                .catch((response) => {
                  console.log('Fail to update signup');
                  reject(new Error(response));
                });
            } else {
              console.log('Fail no token');
              reject(new Error('No token'));
            }
          });
    }
}

export const signupApi = new SignupApi();
