import axios from 'axios';
import deepCopy from '../utils/deepCopy';
import {
    serverConnection,
} from './connectionData';

class OrderApi {
    getOrders(accountID) {
        const apiUrl = serverConnection.baseUrl + serverConnection.orderAccontUrl + serverConnection.slash + accountID;

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
                  console.log('Fail response');
                  reject(new Error(response));
                });
            } else {
              console.log('Fail no token');
              reject(new Error('No token'));
            }
        });
    }

    updateOrder(order) {
        const apiUrl = serverConnection.baseUrl + serverConnection.orderUrl + serverConnection.slash + order.orderID;
        console.log(order);
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
                    order
                }
              );

              axios.put(apiUrl, theBody, theHeaders)
                .then((response) => {
                  resolve(deepCopy(response.data));
                })
                .catch((response) => {
                  console.log('Fail to update order');
                  reject(new Error(response));
                });
            } else {
              console.log('Fail no token');
              reject(new Error('No token'));
            }
          });
    }
}

export const orderApi = new OrderApi();
