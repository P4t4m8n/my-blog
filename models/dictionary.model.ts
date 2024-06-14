interface Navigation {
  home: string;
  blog: string;
  about: string;
  contact: string;
  search: string;
  login: string;
  logout: string;
  profile: string;
  editor: string;
}

interface Footer {
  copy: string;
}

interface Sections {
  latest: string;
  most_Popular: string;
  most_Commented: string;
  most_Viewed: string;
  categories: string;
  tags: string;
}

interface Article {
  read_More: string;
  min: string;
  by: string;
  no_Comments: string;
  comments: string;
  leave_Comment: string;
  read: string;
  like: string;
  details: string;
  share: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  whatsapp: string;
  create_At: string;
  update_At: string;
  minutes: string;
  read_Time: string;
  thanks: string;
}

interface Form {
  submit: string;
  email: string;
  last_Name: string;
  first_Name: string;
  username: string;
  save: string;
  password: string;
  number: string;
  title: string;
  date_liked: string;
  actions: string;
}

interface Settings {
  settings: string;
  edit: string;
  delete: string;
}

export interface DictionaryModel {
  navigation: Navigation;
  footer: Footer;
  sections: Sections;
  article: Article;
  form: Form;
  settings: Settings;
}

export type LanguageType = "he" | "en";

