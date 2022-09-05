// import fs from 'fs';
import {
    serverConnection,
} from './connectionData';

const getBaseUrl = () => {
    if (process.env.NODE_ENV === 'production') {
        return serverConnection.baseUrlProd;
    }
    return serverConnection.baseUrlDev;
};

export default getBaseUrl;
