export const formatData = (data) => {
  const keys = data[0];
  let i = 0;
  let dataToReturn = [];
  let result;
  while (i < data.length) {
    if (i !== 0) {
        console.log(i, "is what here");
      const values = data[i];
      result = Object.assign.apply(
        {},
        keys.map((v, i) => ({ [v]: values[i] }))
      );
      dataToReturn.push(result);
    }
    i++;
  }
  return dataToReturn;
};
