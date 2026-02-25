/**
 * @XmlParser
 * @deprecated Will be removed/changed in future releases
 */

/**
 * @class XmlParser
 * @description XmlParser
 */
export class XmlParser {
  static async parseDataFromXml(xml) {
    return await fetch(xml)
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const xmlData = parser.parseFromString(data, "application/xml");
        return xmlData;
      })
      .catch(console.error);
  }
}
