/**
 * @XmlParser
 */

import { UtilsFactory } from "../UtilsFactory.js";

export class XmlParser {
  static parseDataFromXml(xml) {
    let xmlHttp = UtilsFactory.createXMLHttpRequest();
    xmlHttp.open("GET", xml, false);
    xmlHttp.send();
    return xmlHttp.responseXML;
  }
}
