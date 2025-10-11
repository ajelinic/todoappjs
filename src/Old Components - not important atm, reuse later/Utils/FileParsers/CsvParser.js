/**
 * @CsvParser
 * @deprecated Will be removed/changed in future releases
 */

export class CsvParser {
  static async parseDataFromCsv(csv) {
    let parsedData = await this.getData(csv);
    return this.csvToArray(parsedData);
  }

  static async getData(csv) {
    const response = await fetch(csv, {
      method: "get",
      headers: {
        "content-type": "text/csv;charset=UTF-8",
      },
    });
    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    } else {
      return await response.text();
    }
  }

  static csvToArray(data, delimiter = ",") {
    let splited = data.split(/\r\n|\n/);
    let header, row;
    let glossaryArr = [];
    header = splited[0].split(delimiter);

    for (let i = 1; i < splited.length; i++) {
      row = splited[i].split(delimiter);
      if (row.length == header.length) {
        let glossaryObj = {};
        for (let j = 0; j < header.length; j++) {
          glossaryObj[header[j]] = row[j];
        }
        glossaryArr.push(glossaryObj);
      }
    }

    return glossaryArr;
  }
}
