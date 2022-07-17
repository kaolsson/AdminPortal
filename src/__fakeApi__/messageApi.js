import axios from 'axios';
import deepCopy from '../utils/deepCopy';
import {
    serverConnection,
} from './connectionData';

class MessageApi {
    getMessages(accountID) {
        const apiUrl = serverConnection.baseUrl + serverConnection.messageAccountUrl + serverConnection.slash + accountID;

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
                  resolve(response.data);
                })
                .catch((response) => {
                  console.log('Fail to retrieve messages');
                  reject(new Error(response));
                });
            } else {
              console.log('Fail no token');
              reject(new Error('No token'));
            }
        });
    }

    getMessage(messageID) {
        const apiUrl = serverConnection.baseUrl + serverConnection.messageUrl + serverConnection.slash + messageID;

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
                  resolve(response.data);
                })
                .catch((response) => {
                  console.log('Fail to retrieve message');
                  reject(new Error(response));
                });
            } else {
              console.log('Fail no token');
              reject(new Error('No token'));
            }
        });
    }

    sendMessage(message) {
        const apiUrl = serverConnection.baseUrl + serverConnection.messageUrl;
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
                    customerID: message.customerID,
                    accountID: message.accountID,
                    firstName: message.firstName,
                    lastName: message.lastName,
                    userName: message.userName,
                    email: message.email,
                    phone: message.phone,
                    messageText: message.messageText,
                    messageText2: message.messageText2,
                    messageText3: message.messageText3,
                    siteOrigin: message.siteOrigin,
                    typeOrigin: message.typeOrigin,
                    status: message.status,
                    note: message.note
                }
              );

              axios.post(apiUrl, theBody, theHeaders)
                .then((response) => {
                  resolve(deepCopy(response.data));
                })
                .catch((response) => {
                  console.log('Fail to send message');
                  reject(new Error(response));
                });
            } else {
              console.log('Fail no token');
              reject(new Error('No token'));
            }
        });
    }

    updateMessage(messageID, message) {
        const apiUrl = serverConnection.baseUrl + serverConnection.messageUrl + serverConnection.slash + messageID;
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
                    note: message.note,
                    status: message.status,
                }
              );

              axios.put(apiUrl, theBody, theHeaders)
                .then((response) => {
                  resolve(deepCopy(response.data));
                })
                .catch((response) => {
                  console.log('Fail to update message');
                  reject(new Error(response));
                });
            } else {
              console.log('Fail no token');
              reject(new Error('No token'));
            }
          });
    }
}

export const messageApi = new MessageApi();
