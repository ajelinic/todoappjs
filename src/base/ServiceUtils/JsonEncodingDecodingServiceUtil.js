/**
 * @JsonEncodingDecodingServiceUtil
 */

/**
 * @class JsonEncodingDecodingServiceUtil
 * @description JsonEncodingDecodingServiceUtil
 */
export class JsonEncodingDecodingServiceUtil {
  static jsonDecode(value) {
    return JSON.parse(value);
  }

  static jsonEncode(value) {
    return JSON.stringify(value);
  }
}
