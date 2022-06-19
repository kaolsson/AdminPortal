const objFromArrayMsg = (arr, key = 'messageID') => arr.reduce((accumulator, current) => {
  accumulator[current[key]] = current;
  return accumulator;
}, {});

export default objFromArrayMsg;
