// import { subDays, subHours } from 'date-fns';
import deepCopy from '../utils/deepCopy';
import axios from 'axios';
import {
    serverConnection,
} from './connectionData';
import getBaseUrl from './baseUrl';

class TemplatesApi {
    getTemplates(accountID) {
        const apiUrl = getBaseUrl() + serverConnection.getTemplateListUrl + serverConnection.slash + accountID;
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
        const apiUrl = getBaseUrl() + serverConnection.getTemplateUrl + serverConnection.slash + templateID;
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
    const apiUrl = getBaseUrl() + serverConnection.newTemplateUrl;
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
