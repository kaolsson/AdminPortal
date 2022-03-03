import axios from 'axios';
import {
    serverConnection,
} from './connectionData';

class VendorApi {
  getVendor(orgID) {
    const apiUrl = serverConnection.baseUrl + serverConnection.orgUrl + serverConnection.slash + orgID;

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

//    const vendor = {
//      id: '5e86809283e28b96d2d38537',
//      avatar: '/static/mock-images/avatars/avatar-maggie_chen.png',
//      email: 'contact@qomotax.com',
//      phone: '408 378 2300',
//      title: 'Ms',
//      name: 'QomoTax',
//      firstName: 'Tax',
//      lastName: 'Taxson',
//      password: 'Password123!',
//      plan: 'Premium',
//      address1: '880 E Campbell Ave',
//      zipCode: '95008',
//      city: 'Campbell',
//      state: 'California',
//      country: 'United States'
//    };

//    return Promise.resolve(vendor);
  }
}

export const vendorApi = new VendorApi();
