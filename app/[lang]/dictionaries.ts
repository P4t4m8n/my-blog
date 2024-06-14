type Dictionary = {
    [key: string]: () => Promise<{ [key: string]: string }>;
  };
  
  const dictionaries: Dictionary = {
    en: () =>
      import('../../public/dictionaries/en.json').then((module) => module.default),
    he: () =>
      import('../../public/dictionaries/he.json').then((module) => module.default),
  };
  
  export const getDictionary = async (locale: string) => {
    console.log("locale:", locale)
    const dictionaryLoader = dictionaries[locale];
    if (!dictionaryLoader) {
      throw new Error(`No dictionary found for locale: ${locale}`);
    }
    return dictionaryLoader();
  };
  