import { AbstractPresentationController } from "../../../../base/Abstracts/AbstractPresentationController.js";
import { LanguageSwitcherPresentationFactory } from "../LanguageSwitcherPresentationFactory.js";
import "../../../View/components/molecules/language-switcher/language-switcher.js";

/**
 * @class LanguageSwitcherController
 * @description LanguageSwitcherController
 */
export class LanguageSwitcherController extends AbstractPresentationController {
  static FACTORY_CLASS = LanguageSwitcherPresentationFactory;

  static shouldAutoExecute() {
    return true;
  }

  getMountSelector() {
    return this.getConfig().getMountSelector();
  }

  async indexAction() {
    this.initializeControllerState();
    await this.bootstrap();

    const currentLocale = await this.getFactory()
      .createLanguageSwitcherClient()
      .getCurrentLocale();
    const viewData = await this.getFactory()
      .createLanguageSwitcherViewDataResolver()
      .resolve(currentLocale);

    this.switcherView = await this.renderViewAtMount(
      "language-switcher-molecule",
      viewData,
      this.getMountSelector()
    );
    this.bindEvents();
    this.announceLocaleChanged(currentLocale);
  }

  initializeControllerState() {
    if (this.isInitialized) {
      return;
    }

    this.switcherView = null;
    this.areEventsBound = false;
    this.isBootstrapped = false;
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.isInitialized = true;
  }

  async bootstrap() {
    if (this.isBootstrapped) {
      return;
    }

    const factory = this.getFactory();
    await Promise.all([
      factory.createLanguageSwitcherClient().bootstrap(),
      factory.createGlossaryClient().bootstrap(),
    ]);
    this.isBootstrapped = true;
  }

  bindEvents() {
    if (!this.switcherView || this.areEventsBound) {
      return;
    }

    this.switcherView.addEventListener("language:change", this.handleLanguageChange);
    this.areEventsBound = true;
  }

  async handleLanguageChange(event) {
    const nextLocale = await this.getFactory()
      .createLanguageSwitcherEventHandler()
      .changeLocale(event?.detail?.locale);

    await this.refreshView(nextLocale);
    this.announceLocaleChanged(nextLocale);
  }

  async refreshView(locale = null) {
    if (!this.switcherView) {
      return;
    }

    const viewData = await this.getFactory()
      .createLanguageSwitcherViewDataResolver()
      .resolve(locale);

    this.switcherView.data = viewData;
  }

  announceLocaleChanged(locale) {
    document.dispatchEvent(
      new CustomEvent(this.getConfig().getLocaleChangedEventName(), {
        detail: {
          locale,
        },
      })
    );
  }
}

export default LanguageSwitcherController;
