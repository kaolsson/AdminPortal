// import { subDays, subHours } from 'date-fns';
import deepCopy from '../utils/deepCopy';
import axios from 'axios';

import {
    serverConnection,
} from './connectionData';

// const now = new Date();

class ProductsApi {
    getProducts(accountID) {
      const apiUrl = serverConnection.baseUrl + serverConnection.getProductUrl + serverConnection.slash + accountID;
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

          axios.get(apiUrl, theHeaders)
            .then((response) => {
              resolve(deepCopy(response.data));
            })
            .catch((response) => {
              console.log('Fail add new product');
              reject(new Error(response));
            });
        } else {
          console.log('Fail no token');
          reject(new Error('No token'));
        }
      });
    }

    getProductPicklist(accountID) {
        const apiUrl = serverConnection.baseUrl + serverConnection.getProductPicklistUrl + serverConnection.slash + accountID;
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
                  resolve(deepCopy(response.data));
                })
                .catch((response) => {
                  console.log('Fail to get product picklist');
                  reject(new Error(response));
                });
            } else {
              console.log('Fail no token');
              reject(new Error('No token'));
            }
        });
    }

    editProduct(record) {
      const apiUrl = serverConnection.baseUrl + serverConnection.newProductUrl;
      console.log(record);
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
                data: {
                    record
                }
            }
          );

          axios.post(apiUrl, theBody, theHeaders)
            .then((response) => {
              resolve(deepCopy(response.data));
            })
            .catch((response) => {
              console.log('Fail add new product');
              reject(new Error(response));
            });
        } else {
          console.log('Fail no token');
          reject(new Error('No token'));
        }
      });
    }
}

export const productApi = new ProductsApi();
