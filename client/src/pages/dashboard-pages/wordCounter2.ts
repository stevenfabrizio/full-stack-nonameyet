import { YandexTranslator } from '@translate-tools/core/translators/YandexTranslator';
const translator = new YandexTranslator();

async function CharCounter(data: string) {
  const strLength: number = data.length;
  let counter: number = 0;
  let concatTranslatedStr: string = '';

  while (counter < strLength) {
    const translating = await translator
      .translate(data, 'de', 'en')
      .then(
        (translate) => (concatTranslatedStr = concatTranslatedStr + translate)
      );

    //yandex can only do 10k chars per request
    counter + 10000;
  }

  console.log('schlepper schlepper schlepper');
  return concatTranslatedStr;
}

export { CharCounter };
