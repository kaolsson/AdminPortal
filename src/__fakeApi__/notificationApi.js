import axios from 'axios';
import {
    serverConnection,
} from './connectionData';

class NotificationApi {
  getNotifications(customerID) {
    const apiUrl = serverConnection.baseUrl + serverConnection.notificationUrl + serverConnection.slash + customerID;

    return new Promise((resolve, reject) => {
        const accessToken = window.localStorage.getItem('accessToken');
        console.log('Here 1');

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

export const notificationApi = new NotificationApi();
