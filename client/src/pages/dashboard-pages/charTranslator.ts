import { YandexTranslator } from '@translate-tools/core/translators/YandexTranslator';
const translator = new YandexTranslator();

async function CharTranslator(data: string, languageReduxString: string) {
  let counter: number = 0;
  let translatedString: string = '';
  const targetLanguage: string = languageReduxString;
  const stringLength: number = data.length;

  //finally found a practical use for a while statement
  while (counter < stringLength) {
    console.log(
      `Characters to be translated: ${stringLength} 
      \n
      Characters translated: ${counter}.`
    );

    //taking chunks of 10k chars at a time. yandex's limit.
    const slicedStr = data.slice(counter, counter + 10000);

    //need to do this if statement for typescript to make yandex translator happy.
    if (
      targetLanguage != 'de' &&
      targetLanguage != 'es' &&
      targetLanguage != 'fr' &&
      targetLanguage != 'it'
    ) {
      return 'Error: Unknown Language Selected.';
    }

    const translating: string = await translator
      .translate(slicedStr, targetLanguage, 'en')
      .then((translate) => (translatedString = translatedString + translate));

    counter = counter + 10000;
  }

  console.log('Translation done! Returning...');
  return translatedString;
}

export { CharTranslator };
