import { YandexTranslator } from '@translate-tools/core/translators/YandexTranslator';
const translator = new YandexTranslator();

async function CharTranslator(data: string) {
  const stringLength: number = data.length;
  let counter: number = 0;
  let concatTranslatedStr: string = '';

  //finally found a real use for a while statement
  while (counter < stringLength) {
    console.log(
      `Characters to translate: ${stringLength} \nCharacters translated: ${counter}.`
    );

    const slicedStr = data.slice(counter, counter + 10000);

    const translating = await translator
      .translate(slicedStr, 'de', 'en')
      .then(
        (translate) => (concatTranslatedStr = concatTranslatedStr + translate)
      );

    //yandex can only do 10k chars per request
    counter = counter + 10000;
  }

  console.log('Done!');
  return concatTranslatedStr;
}

export { CharTranslator };
