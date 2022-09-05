import deepCopy from '../utils/deepCopy';
import axios from 'axios';
import {
    serverConnection,
} from './connectionData';
import getBaseUrl from './baseUrl';

const findContactByUsername = (contacts, username) => {
  const contact = contacts.find((_contact) => _contact.username === username);

  return contact || null;
};

const findThreadById = (threads, threadId) => {
  const thread = threads.find((_threadId) => _threadId.id === threadId);

  return thread || null;
};

// This means that we are looking for ONE_TO_ONE thread
const findThreadByOtherParticipantId = (threads, participantId) => {
  const thread = threads.find((_thread) => {
    if (_thread.type !== 'ONE_TO_ONE') {
      return false;
    }

    const participant = _thread.participants.find((_participant) => (_participant.id
      === participantId));

    return !!participant;
  });

  return thread || null;
};

class ChatApi {
  getContacts() {
    const apiUrl = getBaseUrl() + serverConnection.chatUrl;

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
              resolve(response.data.data.contacts);
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

  searchContacts(query) {
    const apiUrl = getBaseUrl() + serverConnection.chatUrl;

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
              let foundContacts = response.data.data.contacts;
              if (query) {
                const cleanQuery = query.toLowerCase().trim();
                foundContacts = foundContacts.filter((contact) => (contact.name.toLowerCase().includes(cleanQuery)));
              }
              resolve(deepCopy(foundContacts));
                      resolve(response.data.data.contacts);
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

  getParticipants(threadKey) {
    const participants = [];

    // Thread key might be an ID if thread type is GROUP
    // otherwise it represents an username
    const apiUrl = getBaseUrl() + serverConnection.chatUrl;

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
                const thread = findThreadById(response.data.data.threads, threadKey);
                if (thread) {
                    participants.push(...thread.participants);
                } else {
                    const contact = findContactByUsername(response.data.data.contacts, threadKey);

                    if (contact) {
                        participants.push({
                            id: contact.id,
                            avatar: contact.avatar,
                            name: contact.name,
                            username: contact.username
                        });
                    }
                }
                resolve(deepCopy(participants));
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

  getThreads() {
    const apiUrl = getBaseUrl() + serverConnection.chatUrl;

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
              resolve(response.data.data.threads);
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

  getThread(threadKey) {
    const apiUrl = getBaseUrl() + serverConnection.chatUrl;
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
              let thread = findThreadById(response.data.data.threads, threadKey);
              if (thread) {
                resolve(deepCopy(thread));
                return;
              }

              // At this point, thread key should represent an existing contact
              // If no contact found, the user is trying a shady route
              // If contact exists, user might want to start a new conversation
              const contact = findContactByUsername(response.data.data.contacts, threadKey);
              if (!contact) {
                reject(new Error('Unable to find the contact'));
                return;
              }

              // This could return a null if no thread found
              thread = findThreadByOtherParticipantId(response.data.data.threads, contact.id);
              resolve(deepCopy(thread));
            })
            .catch((response) => {
              console.log('Fail response');
              console.log(response);
              reject(new Error(response));
            });
        } else {
          console.log('Fail no token');
          reject(new Error('No token'));
        }
    });
  }

  markThreadAsSeen(threadId) {
    const apiUrl = getBaseUrl() + serverConnection.chatUrl + serverConnection.slash + threadId;

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

          const data = 'empty body';
          const theBody = JSON.stringify(
            {
              data
            }
          );

          axios.put(apiUrl, theBody, theHeaders)
            .then((response) => {
                console.log(response);
                resolve(true);
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

  addMessage(threadId, participants, body) {
    // Adding a new message to a thread can by done in 3 ways
    // 1) By specifying a thread id, this means that the thread already exists
    // 2) By specifying the other user id (if ONE_TO_ONE thread), thread might exist
    // 3) By specifying a list of recipients, thread might already exist
    const apiUrl = getBaseUrl() + serverConnection.chatUrl;
    console.log(threadId, participants, body);
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

          const message = {
            threadID: threadId,
            attachments: [],
            body,
            contentType: 'text',
            participants
          };

          const theBody = JSON.stringify(
            {
              message
            }
          );

          axios.post(apiUrl, theBody, theHeaders)
            .then((response) => {
                console.log(response);
                resolve(true);
            })
            .catch((response) => {
              console.log('Fail response');
              console.log(response);
              reject(new Error(response));
            });
        } else {
          console.log('Fail no token');
          reject(new Error('No token'));
        }
    });
  }
}

export const chatApi = new ChatApi();
