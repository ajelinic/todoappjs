/**
 * @XmlParser
 */

import { UtilsFactory } from "../UtilsFactory.js";

export class XmlParser {
  static parseDataFromXml(xml) {
    console.log(xml)
    debugger;
    let xmlHttp = UtilsFactory.createXMLHttpRequest();
    xmlHttp.open("GET", xml, false);
    xmlHttp.send();
    return xmlHttp.responseXML;
  }
}
