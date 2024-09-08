/**
 * @JsonEncodingDecodingUtil
 */

export class JsonEncodingDecodingUtil {
  static jsonDecode(value) {
    return JSON.parse(value);
  }

  static jsonEncode(value) {
    return JSON.stringify(value);
  }
}
