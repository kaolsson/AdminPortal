import axios from 'axios';
import {
    serverConnection,
} from './connectionData';

class OrderApi {
    getOrders(orderID) {
        const apiUrl = serverConnection.baseUrl + serverConnection.orderAccontUrl + serverConnection.slash + orderID;

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
}

export const orderApi = new OrderApi();
