import en from './locales/en.json';
import zhHans from './locales/zh-hans.json';
import zhHant from './locales/zh-hant.json';

export const languages = {
  en: 'English',
  'zh-hans': '简体中文',
  'zh-hant': '繁體中文',
} as const;

export const defaultLang = 'en';

export type Lang = keyof typeof languages;

const translations: Record<Lang, typeof en> = {
  en,
  'zh-hans': zhHans,
  'zh-hant': zhHant,
};

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: string): string {
    const keys = key.split('.');
    let value: unknown = translations[lang];
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    return typeof value === 'string' ? value : key;
  };
}

export function getLocalizedPath(path: string, lang: Lang): string {
  if (lang === defaultLang) return path;
  return `/${lang}${path === '/' ? '' : path}`;
}
