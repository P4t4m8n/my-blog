import { defaultLocale, locales } from "./constants";
export const i18n = {
  defaultLocale,
  locales: locales.map((locale) => locale.locale),
};

export type Locale = (typeof i18n)["locales"][number];
