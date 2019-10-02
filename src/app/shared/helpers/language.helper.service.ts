export class LanguageHelperService {

  static parseLanguage(languageResult: any) {
    let max = 0;
    let defaultLang = null;
    const countedLanguages = {};

    for (const key of languageResult) {
      if (countedLanguages.hasOwnProperty(key)) {
        countedLanguages[key] = countedLanguages[key] + 1;
      } else {
        const obj = {};
        obj[key] = 1;
        Object.assign(countedLanguages, obj);
      }
    }

    for (const key in countedLanguages) {
      const value = countedLanguages[key];
      if (value > max) {
        max = value;
        defaultLang = key;
      }
    }

    console.log(countedLanguages, languageResult);

    return defaultLang;
  }

  static parseLanguageArray(languageResult: any) {
    const languages = [];

    for (const key in languageResult) {
      languages.push(key);
    }

    return languages;
  }

  static parseLanguageList(languageResult: any) {
    return this.parseLanguageArray(languageResult).join(', ');
  }

  static parseLanguageCount(languageResult: any) {
    return this.parseLanguageArray(languageResult).length;
  }
}
