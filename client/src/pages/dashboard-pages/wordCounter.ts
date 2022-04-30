import { YandexTranslator } from '@translate-tools/core/translators/YandexTranslator';
const translator = new YandexTranslator();

async function charCounter(data: string) {
  let strLength: number = data.length;

  //time to translate
  //yandex only allows 10k chars translated per request.
  if (strLength < 10001) {
    let sendIt: string = '';

    const Slice1 = await translator
      .translate(data, 'de', 'en')
      .then((translate) => (sendIt = translate));

    return sendIt;
  }

  if (10000 < strLength && strLength < 20001) {
    let sendIt: string = '';

    const Slice1 = await translator
      .translate(data.slice(0, 10000), 'de', 'en')
      .then((translate) => (sendIt = translate));

    const Slice2 = await translator
      .translate(data.slice(10000), 'de', 'en')
      .then((translate) => (sendIt = sendIt + translate));
    return sendIt;
  }

  if (20000 < strLength && strLength < 30001) {
    let sendIt: string = '';

    const Slice1 = await translator
      .translate(data.slice(0, 10000), 'de', 'en')
      .then((translate) => (sendIt = translate));

    const Slice2 = await translator
      .translate(data.slice(10001, 20000), 'de', 'en')
      .then((translate) => (sendIt = sendIt + translate));

    const Slice3 = await translator
      .translate(data.slice(20001), 'de', 'en')
      .then((translate) => (sendIt = sendIt + translate));

    return sendIt;
  }

  if (30000 < strLength && strLength < 40001) {
    let sendIt: string = '';

    const Slice1 = await translator
      .translate(data.slice(0, 10000), 'de', 'en')
      .then((translate) => (sendIt = translate));

    const Slice2 = await translator
      .translate(data.slice(10001, 20000), 'de', 'en')
      .then((translate) => (sendIt = sendIt + translate));

    const Slice3 = await translator
      .translate(data.slice(20001, 30000), 'de', 'en')
      .then((translate) => (sendIt = sendIt + translate));

    const Slice4 = await translator
      .translate(data.slice(30001), 'de', 'en')
      .then((translate) => (sendIt = sendIt + translate));

    return sendIt;
  }

  return console.log('schlomo moho');
}

export { charCounter };
