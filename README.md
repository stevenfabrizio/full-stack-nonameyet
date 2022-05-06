# wikipedia-translator

Live Link: https://wikipedia-translator.herokuapp.com/

---

Welcome to my wikipedia translator project. I was originally more interested in fetching the 'Talk' section of the articles and doing something with that but there isn't an API for it. 

The second most interesting part of Wikipedia for me are the articles in other languages. The tone of the written words as well as the reference lists are often different. Here is an example of what I am talking about:

![Napolean III](https://cdn.discordapp.com/attachments/840740146176851979/971321175936483358/unknown.png)

There are limitations with the app as it stands. Often you need to be a bit intuitive with comparing topics one-to-one. Example:

![Napolean III](https://cdn.discordapp.com/attachments/840740146176851979/971344745173495898/unknown.png)

Other times you just won't find what you're looking for. A lot of the time you will get empty results.

---

How I made it:

The backend is an Express server with a PostgresQL database. Users can register and login with it. One thing to add in the future is saving past searches into the database that can be retrieved by the user. Also learning and adding JWT would be ideal.

The frontend is React. There are routes for login, register and the dashboard. There are nested routes of search and translate within the dashboard. Many of the variables are stored in the redux store because I use them in different components.

There is a fetch request to get serach results for a query. There is another fetch request when you hit Translate for nonparsed HTML article content. The non english article is translated unparsed with Yandex translate. Yandex can only serve 10k characters at a time so I splice the unparsed string and concatenate it once translated. Then it is parsed with html-react-parser and rendered.

---

![Register](https://cdn.discordapp.com/attachments/840740146176851979/972024421462188072/unknown.png)

![Search](https://cdn.discordapp.com/attachments/840740146176851979/972024619211051068/unknown.png)

![Spinner](https://cdn.discordapp.com/attachments/840740146176851979/972024879077552199/unknown.png)

![Translated](https://cdn.discordapp.com/attachments/840740146176851979/972025617602183188/unknown.png)

---
