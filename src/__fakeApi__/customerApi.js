import axios from 'axios';
import deepCopy from '../utils/deepCopy';
import {
    serverConnection,
} from './connectionData';
import getBaseUrl from './baseUrl';

class CustomerApi {
    getCustomers(orgID) {
        const apiUrl = getBaseUrl() + serverConnection.accountClientUrl + serverConnection.slash + orgID;

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
                  console.log('Fail response');
                  reject(new Error(response));
                });
            } else {
              console.log('Fail no token');
              reject(new Error('No token'));
            }
        });
      }

      getCustomer(customerID) {
        const apiUrl = getBaseUrl() + serverConnection.clientUrl + serverConnection.slash + customerID;

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
                  console.log('Fail response');
                  reject(new Error(response));
                });
            } else {
              console.log('Fail no token');
              reject(new Error('No token'));
            }
        });
      }

      addCustomer(customer) {
        const apiUrl = getBaseUrl() + serverConnection.clientUrl;

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
                    customer
                }
              );

              axios.post(apiUrl, theBody, theHeaders)
                .then((response) => {
                  resolve(deepCopy(response.data));
                })
                .catch((response) => {
                  console.log('Fail add new client');
                  reject(new Error(response));
                });
            } else {
              console.log('Fail no token');
              reject(new Error('No token'));
            }
        });
      }

      updateCustomer(customerID, customer) {
        const apiUrl = getBaseUrl() + serverConnection.clientUrl + serverConnection.slash + customerID;

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
                    customer
                }
              );

              axios.put(apiUrl, theBody, theHeaders)
                .then((response) => {
                  resolve(deepCopy(response.data.user));
                })
                .catch((response) => {
                  console.log('Fail update client');
                  reject(new Error(response));
                });
            } else {
              console.log('Fail no token');
              reject(new Error('No token'));
            }
        });
      }

      deleteCustomer(customerID) {
        const apiUrl = getBaseUrl() + serverConnection.clientUrl + serverConnection.slash + customerID;

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

              axios.delete(apiUrl, theHeaders)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => {
                    if (err.response) {
                        // The client was given an error response (5xx, 4xx)
//                        console.log('API call, fail response: ', err.response.data);
//                        console.log('API call, fail status: ', err.response.status);
//                        console.log('API call, fail header: ', err.response.header);
                        console.error(new Error(err));
                        reject(err.response.status);
                    } else if (err.request) {
                        // The client never received a response, and the request was never left
                        console.log('API call, no responce received, request: ', err.request);
                        err.response.status = 666;
                        reject(new Error(err));
                        } else {
                        // Anything else
                        console.log('Error: ', err.message);
                        err.response.status = 777;
                        reject(new Error(err));
                    }
                });
            } else {
              console.log('Fail no token');
              reject(new Error('No token'));
            }
        });
      }

      getCustomerCpaPickList(orgID) {
        const apiUrl = getBaseUrl() + serverConnection.accountClientCpaPickListUrl + serverConnection.slash + orgID;

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
                  console.log('Fail response');
                  reject(new Error(response));
                });
            } else {
              console.log('Fail no token');
              reject(new Error('No token'));
            }
        });
      }
}

export const customerApi = new CustomerApi();
