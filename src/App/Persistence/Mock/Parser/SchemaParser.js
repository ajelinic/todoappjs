/**
 * @class SchemaParser
 * @description SchemaParser
 */
export class SchemaParser {
  async parseFromUrl(schemaUrl) {
    const response = await fetch(schemaUrl);
    if (!response.ok) {
      throw new Error(
        `[SchemaParser] Failed to fetch schema: ${schemaUrl} (${response.status})`
      );
    }

    const xmlText = await response.text();
    const xmlDocument = new DOMParser().parseFromString(
      xmlText,
      "application/xml"
    );

    return this.extractSchema(xmlDocument);
  }

  extractSchema(xmlDocument) {
    const tableElements = xmlDocument.querySelectorAll("dataTable");
    const stores = [...tableElements].map((table) => {
      const name = table.querySelector("dataTableName")?.textContent?.trim();
      const keyPath = table.querySelector("keyPath")?.textContent?.trim();
      const indexes = [...table.querySelectorAll("indexes > index")]
        .map((index) => index.textContent?.trim())
        .filter((index) => typeof index === "string" && index.length > 0);

      return { name, keyPath, indexes };
    });

    return {
      stores: stores.filter((store) => store.name && store.keyPath),
    };
  }
}
