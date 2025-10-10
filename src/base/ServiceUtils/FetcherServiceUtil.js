/**
 * @FetcherServiceUtil
 */

export class FetcherServiceUtil {
  static async fetch(request) {
    const response = await fetch(request);
    return await response.json();
  }
}
