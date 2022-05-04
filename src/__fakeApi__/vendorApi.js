import axios from 'axios';
import {
    serverConnection,
} from './connectionData';

class VendorApi {
  getVendor(accountID) {
    const apiUrl = serverConnection.baseUrl + serverConnection.orgUrl + serverConnection.slash + accountID;

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

  updateVendor(accountID, record) {
        const apiUrl = serverConnection.baseUrl + serverConnection.orgUrl + serverConnection.slash + accountID;

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

              axios.put(apiUrl, theBody, theHeaders)
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

  logoUpload(fileObj, accountID) {
    const apiUrl = serverConnection.baseUrl + serverConnection.logoUrl + serverConnection.slash + accountID;

    return new Promise((resolve, reject) => {
      const accessToken = window.localStorage.getItem('accessToken');

      if (accessToken) {
        const tokenTitle = 'token: ';
        const Authorization = tokenTitle + accessToken;
        const metaData = ['{"Account": "', accountID, '", "docType": "tax", "description": "This is a document."}'].join('');

        console.log(metaData);
        const formData = new FormData();
        formData.append(
          'document',
          fileObj,
          fileObj.name
        );
        formData.append(
            'meta',
            metaData
          );

        const theHeaders = {
          headers: {
            Accept: '*',
            Authorization
          }
        };

        axios.post(apiUrl, formData, theHeaders)
          .then((response) => {
            resolve(response);
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

  getLogo(accountID) {
    const apiUrl = serverConnection.baseUrl + serverConnection.logoUrl + serverConnection.slash + accountID;

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

export const vendorApi = new VendorApi();
