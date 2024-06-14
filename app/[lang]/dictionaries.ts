import { DictionaryModel } from "@/models/dictionary.model";

type Dictionary = {
  [key: string]: () => Promise<DictionaryModel>;
};

const dictionaries: Dictionary = {
  en: () =>
    import("../../public/dictionaries/en.json").then(
      (module) => module.default
    ),
  he: () =>
    import("../../public/dictionaries/he.json").then(
      (module) => module.default
    ),
};

export const getDictionary = async (
  locale: string
): Promise<DictionaryModel> => {
  const dictionaryLoader = dictionaries[locale];
  if (!dictionaryLoader) {
    throw new Error(`No dictionary found for locale: ${locale}`);
  }
  return dictionaryLoader();
};
