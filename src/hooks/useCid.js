import { useState } from 'react';

export default function useCid() {
    const getCid = () => {
        const cidString = localStorage.getItem('cid');
        const userCid = JSON.parse(cidString);
        return userCid;
    };

    const [cid, setCid] = useState(getCid());

    const saveCid = (userCid) => {
        localStorage.setItem('cid', JSON.stringify(userCid));
        setCid(userCid.cid);
    };

    return {
        setCid: saveCid,
        cid
    };
}
