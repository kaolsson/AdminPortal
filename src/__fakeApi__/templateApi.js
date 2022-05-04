// import { subDays, subHours } from 'date-fns';
import deepCopy from '../utils/deepCopy';
import axios from 'axios';

import {
    serverConnection,
} from './connectionData';

// const now = new Date();

class TemplatesApi {
    getTemplates(accountID) {
        const apiUrl = serverConnection.baseUrl + serverConnection.getTemplateListUrl + serverConnection.slash + accountID;
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
                console.log(response.data);
                resolve(deepCopy(response.data));
                })
                .catch((response) => {
                console.log('Fail add new template');
                reject(new Error(response));
                });
            } else {
            console.log('Fail no token');
            reject(new Error('No token'));
            }
        });
    }

    getTemplate(templateID) {
        const apiUrl = serverConnection.baseUrl + serverConnection.getTemplateUrl + serverConnection.slash + templateID;
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
                  console.log(response.data);
                  resolve(deepCopy(response.data));
                })
                .catch((response) => {
                  console.log('Fail add new template');
                  reject(new Error(response));
                });
            } else {
              console.log('Fail no token');
              reject(new Error('No token'));
            }
        });
    }

  newTemplate(record) {
    const apiUrl = serverConnection.baseUrl + serverConnection.newTemplateUrl;
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
              console.log('Fail add new template');
              reject(new Error(response));
            });
        } else {
          console.log('Fail no token');
          reject(new Error('No token'));
        }
      });
  }
}

export const templateApi = new TemplatesApi();
