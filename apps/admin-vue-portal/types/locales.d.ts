export type LocaleType = "zh_CN" | "en" | "ru" | "ja" | "ko";


export interface LocaleSetting{
    showPicker: boolean;
    locale: LocalType;
    fallback: LocaleType;
    availableLocales: LocaleType[];
}

