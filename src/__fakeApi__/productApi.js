import { subDays, subHours } from 'date-fns';
import deepCopy from '../utils/deepCopy';
import axios from 'axios';

import {
    serverConnection,
} from './connectionData';

const now = new Date();

class ProductsApi {
  getProducts() {
    const products = [
      {
        productID: '5ece2c077e39da27658aa8a9',
        productStatus: 'active',
        productName: 'Charlie Tulip Dress',
        productCategory: 'tax',
        productSubCategory: 'Audit',
        productPrice: 23.99,
        productQuantity: 1,
        productDescription: 'Thia is the product description',
        productOwner: 'Mr Product Owner',
        productPictureUrl: '',
        priceCurrency: '$',
        note: 'this is a note',
        dateAdded: subDays(now, 1).getTime(),
        dateUpdated: subHours(now, 3).getTime(),
      },
      {
        id: '5ece2c0d16f70bff2cf86cd8',
        productStatus: 'inactive',
        productName: 'Kenneths shose',
        productCategory: 'tax',
        productSubCategory: 'Audit',
        productPrice: 23.99,
        productQuantity: 1,
        productDescription: 'Thia is the product description',
        productOwner: 'Mr Product Owner',
        productPictureUrl: '/static/mock-images/products/product_2.jpeg',
        priceCurrency: '$',
        note: 'this is a note',
        dateAdded: subDays(now, 1).getTime(),
        dateUpdated: subHours(now, 4).getTime(),
      },
      {
        id: '5ece2c123fad30cbbff8d060',
        productStatus: 'active',
        productName: 'Charlie Tulip Dress',
        productCategory: 'other',
        productSubCategory: 'Audit',
        productPrice: 23.99,
        productQuantity: 1,
        productDescription: 'Thia is the product description',
        productOwner: 'Mr Product Owner',
        productPictureUrl: '/static/mock-images/products/product_2.jpeg',
        priceCurrency: '$',
        note: 'this is a note',
        dateAdded: subDays(now, 1).getTime(),
        dateUpdated: subHours(now, 5).getTime(),
      },
      {
        id: '5ece2c1be7996d1549d94e34',
        productStatus: 'active',
        productName: 'Charlie Tulip Dress',
        productCategory: 'payroll',
        productSubCategory: 'Audit',
        productPrice: 23.99,
        productQuantity: 1,
        productDescription: 'Thia is the product description',
        productOwner: 'Mr Product Owner',
        productPictureUrl: '/static/mock-images/products/product_2.jpeg',
        priceCurrency: '$',
        note: 'this is a note',
        dateAdded: subDays(now, 1).getTime(),
        dateUpdated: subHours(now, 6).getTime(),
      }
    ];

    return Promise.resolve(products);
  }

  newProduct(record) {
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
