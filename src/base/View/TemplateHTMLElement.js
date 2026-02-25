/**
 * @class TemplateHTMLElement
 */

/**
 * @class TemplateHTMLElement
 * @description TemplateHTMLElement
 */
export class TemplateHTMLElement extends HTMLElement {
  updateView(html) {
    this.innerHTML = html;
  }

  async loadTemplate() {
    const { templatePath, moduleUrl } = this.constructor;
    if (!templatePath || !moduleUrl) {
      throw new Error(
        `[TemplateHTMLElement] Missing templatePath/moduleUrl in ${this.constructor.name}`
      );
    }
    const url = new URL(templatePath, moduleUrl);
    const res = await fetch(url);
    if (!res.ok)
      throw new Error(`Failed to load template: ${url} (${res.status})`);
    return res.text();
  }

  async renderTemplate() {
    const html = await this.loadTemplate();
    this.updateView(html);
  }
}
