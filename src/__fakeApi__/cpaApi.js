import axios from 'axios';
import deepCopy from '../utils/deepCopy';

import {
    serverConnection,
} from './connectionData';

class CpaApi {
  getCpas(orgID) {
    const apiUrl = serverConnection.baseUrl + serverConnection.cpaUrl + serverConnection.slash + orgID;

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

  getCpa(cpaID) {
    const apiUrl = serverConnection.baseUrl + serverConnection.indCpaUrl + serverConnection.slash + cpaID;

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

  addCpa(cpa) {
    const apiUrl = serverConnection.baseUrl + serverConnection.cpaAdminUrl;

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
                cpa
            }
          );

          axios.post(apiUrl, theBody, theHeaders)
            .then((response) => {
              resolve(deepCopy(response.data));
            })
            .catch((response) => {
              console.log('Fail add new CPA');
              reject(new Error(response));
            });
        } else {
          console.log('Fail no token');
          reject(new Error('No token'));
        }
    });
  }

  updateCpa(cpaID, cpa) {
    const apiUrl = serverConnection.baseUrl + serverConnection.indCpaUrl + serverConnection.slash + cpaID;

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
                cpa
            }
          );

          axios.put(apiUrl, theBody, theHeaders)
            .then((response) => {
              resolve(deepCopy(response.data.user));
            })
            .catch((response) => {
              console.log('Fail update CPA');
              reject(new Error(response));
            });
        } else {
          console.log('Fail no token');
          reject(new Error('No token'));
        }
    });
  }

  deleteCpa(cpaID) {
    const apiUrl = serverConnection.baseUrl + serverConnection.indCpaUrl + serverConnection.slash + cpaID;

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
}

export const cpaApi = new CpaApi();
