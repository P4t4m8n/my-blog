import { create } from "zustand";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { DictionaryModel, LanguageType } from "@/models/dictionary.model";

interface LanguageState {
  lang: LanguageType;
  dict: DictionaryModel | null;
  setLanguage: (lang: LanguageType) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  lang: "en",
  dict: null,
  setLanguage: async (lang: LanguageType) => {
    set({ lang });
    const dict = await getDictionary(lang);
    set({ dict });
  },
}));
