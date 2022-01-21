import Papa from "papaparse";

export const formatData = (data) => {
  const keys = data[0];
  let i = 0;
  let dataToReturn = [];
  let result;
  while (i < data.length) {
    if (i !== 0) {
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

export const downloadCsvFile = (agenda) => {
  var csv = Papa.unparse(agenda);
  const outputFilename = `results.csv`;
  // file file actions.
  const url = URL.createObjectURL(new Blob([csv]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", outputFilename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
