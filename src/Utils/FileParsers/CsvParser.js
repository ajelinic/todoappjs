/**
 * @XmlParser
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

  static csvToArray(data, delimiter = "|") {
    const headers = data.slice(0, data.indexOf("\r")).split(delimiter);
    const rows = data.slice(data.indexOf("\n") + 1).split("\n");

    const glossaryArr = rows.map(function (row) {
      const values = row.split(delimiter);
      const el = headers.reduce(function (object, header, index) {
        object[header] = values[index];
        return object;
      }, {});
      return el;
    });
    return glossaryArr;
  }
}
