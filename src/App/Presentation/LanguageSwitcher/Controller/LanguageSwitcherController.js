import { AbstractController } from "../../../../base/Abstracts/AbstractController.js";
import { LanguageSwitcherClient } from "../../../Client/LanguageSwitcher/LanguageSwitcherClient.js";
import { TranslationService } from "../../../Utils/Translation/TranslationService.js";
import "../../../View/components/molecules/language-switcher/language-switcher.js";

/**
 * @class LanguageSwitcherController
 * @description LanguageSwitcherController
 */
export class LanguageSwitcherController extends AbstractController {
  static shouldAutoExecute() {
    return true;
  }

  constructor() {
    super();
    this.languageSwitcherClient = new LanguageSwitcherClient();
    this.translationService = new TranslationService();
    this.switcherView = null;
    this.areEventsBound = false;

    this.handleLanguageChange = this.handleLanguageChange.bind(this);
  }

  getMountSelector() {
    return "#language-switcher-feature";
  }

  async indexAction() {
    await this.bootstrap();

    const currentLocale = await this.languageSwitcherClient.getCurrentLocale();
    const viewData = await this.getViewData(currentLocale);

    await this.renderSwitcher(viewData);
    this.bindEvents();
    this.announceLocaleChanged(currentLocale);
  }

  async bootstrap() {
    await Promise.all([
      this.languageSwitcherClient.bootstrap(),
      this.translationService.bootstrap(),
    ]);
  }

  async renderSwitcher(viewData) {
    const mountPoint = await this.getMountPoint(this.getMountSelector());
    mountPoint.innerHTML = "";

    const switcherView = this.createView("language-switcher-molecule", viewData);
    mountPoint.appendChild(switcherView);

    this.switcherView = switcherView;
  }

  bindEvents() {
    if (!this.switcherView || this.areEventsBound) {
      return;
    }

    this.switcherView.addEventListener("language:change", this.handleLanguageChange);
    this.areEventsBound = true;
  }

  async handleLanguageChange(event) {
    const nextLocale = await this.languageSwitcherClient.setCurrentLocale(
      event?.detail?.locale
    );

    await this.refreshView(nextLocale);
    this.announceLocaleChanged(nextLocale);
  }

  async refreshView(locale = null) {
    if (!this.switcherView) {
      return;
    }

    const currentLocale =
      locale ?? (await this.languageSwitcherClient.getCurrentLocale());
    const viewData = await this.getViewData(currentLocale);

    this.switcherView.data = viewData;
  }

  announceLocaleChanged(locale) {
    document.dispatchEvent(
      new CustomEvent("app:locale-changed", {
        detail: {
          locale,
        },
      })
    );
  }

  async getViewData(locale) {
    const supportedLocales = this.languageSwitcherClient.getSupportedLocales();
    const translationKeys = this.createTranslationKeys(supportedLocales);
    const glossary = await this.translationService.transList(translationKeys, {
      locale,
    });

    return {
      label: glossary["language.switcher.label"],
      currentLocale: locale,
      locales: supportedLocales.map((supportedLocale) => {
        return {
          value: supportedLocale.code,
          label: glossary[supportedLocale.labelKey],
        };
      }),
    };
  }

  createTranslationKeys(supportedLocales) {
    return [
      "language.switcher.label",
      ...supportedLocales.map((supportedLocale) => {
        return supportedLocale.labelKey;
      }),
    ];
  }
}

export default LanguageSwitcherController;
