/**
 * @class CsvParser
 * @description CsvParser
 */
export class CsvParser {
  async parseFromUrl(csvUrl, delimiter = ",") {
    const response = await fetch(csvUrl, {
      method: "get",
      headers: {
        "content-type": "text/csv;charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error(
        `[CsvParser] Failed to fetch CSV: ${csvUrl} (${response.status})`
      );
    }

    const csvText = await response.text();
    return this.csvToArray(csvText, delimiter);
  }

  csvToArray(csvData, delimiter = ",") {
    const rows = csvData.split(/\r\n|\n/).filter((row) => row.length > 0);
    if (rows.length < 2) {
      return [];
    }

    const header = rows[0].split(delimiter).map((value) => value.trim());

    return rows
      .slice(1)
      .map((row) => row.split(delimiter))
      .filter((columns) => columns.length === header.length)
      .map((columns) => {
        const result = {};
        header.forEach((key, index) => {
          result[key] = (columns[index] ?? "").trim();
        });
        return result;
      });
  }
}
