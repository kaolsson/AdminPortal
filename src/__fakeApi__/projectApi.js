import axios from 'axios';
import deepCopy from '../utils/deepCopy';
import {
    serverConnection,
} from './connectionData';

class ProjectApi {
  fileUpload(fileObj, caseID) {
    const apiUrl = serverConnection.baseUrl + serverConnection.fileUrl;

    return new Promise((resolve, reject) => {
      const accessToken = window.localStorage.getItem('accessToken');

      if (accessToken) {
        const tokenTitle = 'token: ';
        const Authorization = tokenTitle + accessToken;
        const metaData = ['{"caseID": "', caseID, '", "docType": "tax", "description": "This is a document."}'].join('');

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

//        const hello = 'hello';
//        const formData2 = JSON.stringify(
//            {
//                hello
//            }
//          );

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

  fileDelete(documentID) {
    const apiUrl = serverConnection.baseUrl + serverConnection.fileUrl + serverConnection.slash + documentID;

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

  fileDownload(documentID) {
    const apiUrl = serverConnection.baseUrl + serverConnection.fileUrl + serverConnection.slash + documentID;

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

  getProjects() {
    const apiUrl = serverConnection.baseUrl + serverConnection.projectUrl;

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

    getProject(caseID) {
        const apiUrl = serverConnection.baseUrl + serverConnection.projectUrl + serverConnection.slash + caseID;

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

    createProject(project) {
        const apiUrl = serverConnection.baseUrl + serverConnection.projectUrl;
        console.log(project);
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
                    project
                }
              );

              axios.post(apiUrl, theBody, theHeaders)
                .then((response) => {
                  resolve(deepCopy(response.data));
                })
                .catch((response) => {
                  console.log('Fail to create project');
                  reject(new Error(response));
                });
            } else {
              console.log('Fail no token');
              reject(new Error('No token'));
            }
        });
    }

    updateProject(project) {
        const apiUrl = serverConnection.baseUrl + serverConnection.projectUrl + serverConnection.slash + project.caseID;

        console.log(project);
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
                    project
                }
              );

              axios.put(apiUrl, theBody, theHeaders)
                .then((response) => {
                  resolve(deepCopy(response.data));
                })
                .catch((response) => {
                  console.log('Fail update project');
                  reject(new Error(response));
                });
            } else {
              console.log('Fail no token');
              reject(new Error('No token'));
            }
        });
    }
}

export const projectApi = new ProjectApi();
