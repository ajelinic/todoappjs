/**
 * @Fetcher
 */

export class Fetcher {
  static async fetch(request) {
    const response = await fetch(request);
    return await response.json();
  }
}
