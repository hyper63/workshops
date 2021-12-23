<h1 align="center">⚡️ hyper cache workshop ⚡️</h1>
<p align="center">
Welcome to cache counters, have you ever wanted to display a dashboard of metrics?

Great!

You know a lousy way to do that is to run a query to count the number of some
criteria every time someone would like to see some metrics. Why? It taxes your
transactional database system for read.

A better approach is to use a cache, the cache can be incremented and
decremented over time, then when you need to display some numbers, you call the
cache. Noice! 🤑

</p>

---

## Table of Contents

- [Introduction](#introduction)
- [Prequisites](#prerequisites)
- [Setup](#setup)
- [Cache Counters](#cache-counters)
- [Summary](#summary)

---

## Introduction

The hyper cache is a JSON API that allows you to store JSON data in a key, value
store. You can `add`, `get`, `set`, and `remove` key, value pairs to this cache,
using `hyper-connect`s cache SDK.

```js
import { connect } from "hyper-connect";
const hyper = connect(Deno.env.get("HYPER"));

await hyper.cache.add("key", { value: 1 }, "1h"); // here we add a document of {value: 1} to the key 'key' and it will be available from the cache for `1 hour`
```

---

## Prequisites

> What do I need to know to get the most out of this workshop?

- Javascript
- JSON/https
- Opine
- async/await (promises)

> What will I need for this workshop?

- hyper account (its Free!): Sign up here https://dashboard.hyper.io, to create
  an application, click the `Add Application` button, or use a previous workshop
  application. Make sure you enable the `Cache Service`.

---

## Setup

create .env

Sign into https://dashboard.hyper.io, choose your app or create an app, then
copy the connection string.

Create a .env file and on the first line add the following:

```text
HYPER=[connection string]
```

> Replace `[connection string]` with your copied connection string from
> `hyper.io`

Lets setup our database by running the following script.

```
./scripts/setup.sh
```

Excellent!

---

## Cache Counters

We have 3 objectives to the Cache Counters workshop,

1. when we request the `/api/stats` endpoint, we want to receive a json document
   with the number of characters and games.
1. when we add a character or game, we want to increment the number of
   characters or games to our cache.
1. when we remove a character or game, we want to decrement the number of
   characters or games in our cache.

> Note, we want to leverage the cache if it is available, but if it is
> unavailable for some reason, we want to query the data service to get the
> counts of the characters and games as a fall back mechanism.

Get stats for characters and games:

`GET /api/stats`

Return the total count of games and characters, in order to do this, we want to
create a chain that will try to get the stats document from the cache, if
available, return the document, if not, then query the database and build a new
stats cache document. We can use a promise chain and if the stats cache document
is not found, we reject the promise and then query the data service to create
the stats document, store the document in the cache and return the results.

`api/stats.js`

```js
function aggregateCounters(acc, doc) {
  if (Object.keys(acc).includes(doc.type)) {
    acc[doc.type] = acc[doc.type] + 1;
  }
  return acc;
}

export async function get({ hyper }, res) {
  function queryCounters() {
    return hyper.data.list({ limit: 1000 })
      .then(({ docs }) =>
        docs.reduce(aggregateCounters, { game: 0, character: 0 })
      );
  }
  const result = await hyper.cache.get("counters").catch(queryCounters);

  res.send(result);
}
```

Increment stats document by document type:

`POST /api/characters`

`POST /api/games`

You will notice, we already have these API endpoints defined, but we would like
to compose the endpoint to not only call the `data.add` function, but to also
call the `cache.set` function to increment the document type counter in the
stats document.

`api/characters/index.js`

```js
export async function post({ hyper, body }, res) {
  function increment(result) {
    return hyper.cache.get("counters")
      .then((counters) =>
        hyper.cache.set("counters", {
          ...counters,
          character: counters.character + 1,
        })
      )
      .then(() => result);
  }
  const result = await hyper.data.add(body).then(increment);
  return res.send(result);
}
```

`api/games/index.js`

```js
export async function post({ hyper, body }, res) {
  function increment(result) {
    return hyper.cache.get("counters")
      .then((counters) =>
        hyper.cache.set("counters", { ...counters, game: counters.game + 1 })
      )
      .then(() => result);
  }
  const result = await hyper.data.add(body).then(increment);
  return res.send(result);
}
```

Decrement stats document by document type:

`DELETE /api/characters/:id`

`DELETE /api/games/:id`

On these endpoints, we would like to make an additional call to decrement the
stats model, so that we can keep the cache accurate and fresh.

`api/characters/[id].js`

```js
export async function del({ hyper, params }, res) {
  function decrement(result) {
    return hyper.cache.get("counters")
      .then((counters) =>
        hyper.cache.set("counters", {
          ...counters,
          character: counters.character - 1,
        })
      )
      .then(() => result);
  }
  const result = await hyper.data.remove(params.id).then(decrement);
  return res.send(result);
}
```

`api/games/[id].js`

```js
export async function del({ hyper, params }, res) {
  function decrement (result) {
    return hyper.cache.get('counters')
      .then(counters => 
        hyper.cache.set('counters', {...counters, game: counters.game - 1 })
      )
      .then(() => result)
  }
  const result = await hyper.data.remove(params.id).then(decrement);
  return res.send(result);
}}
```

### Advanced

Now, this will work, but it is a bit repeatitive and verbose. What if we just
had a generic set of functions that would provide as an extension to the
hyper-connect object.

```js
hyper.ext.counters.inc(key);
hyper.ext.counters.dec(key);
hyper.ext.counters.counts();
```

### hyper-connect extensions

When instanciating hyper-connect, we get a hyper object, we will extend that
object adding an `ext` property and then adding `counters` to the extension
property.

create a new folder called `services` and a new file within the folder called
`counters.js`

`services/counters.js`

```js
const of = Promise.resolve;

export default function (hyper) {
  const getCounter = (k) => hyper.cache.get(k).then((v) => ([k, v]));
  const incCounter = ([k, v]) => hyper.cache.set(k, v + 1);
  const decCounter = ([k, v]) => hyper.cache.set(k, v - 1);
  const always = (v) => () => v;
  const aggregateCounters = (acc, doc) => ({ ...acc, [doc.key]: doc.value });

  function inc(key) {
    return function (x) {
      if (x.ok) {
        return ok(`counters-${key}`)
          .then(getCounter)
          .then(setCounter)
          .then(always(x));
      }
      return Promise.reject(x);
    };
  }

  function dec(key) {
    return function (x) {
      if (x.ok) {
        return ok(key)
          .then(getCounter)
          .then(decCounter)
          .then(always(x));
      }
      return Promise.reject(x);
    };
  }

  function counts() {
    return hyper.cache.query("counters-*")
      .reduce(aggregateCounters, {});
  }

  hyper = {
    ...hyper,
    ext: {
      ...hyper.ext,
      counters: {
        inc,
        dec,
        counts,
      },
    },
  };

  return hyper;
}
```

By creating this extension and attaching it to the hyper object when assigned to
the request object, we can make these helper functions available to the endpoint
handlers and dramatically simplify the code.

`server.js`

```js
import counters from './services/counters.js'
...
// compose counters ext on hyper-connect
const hyper = compose(counters, connect)(Deno.env.get('HYPER'))
```

`api/stats.js`

```js
const of = Promise.resolve
export async function get({hyper), res}) {
  const result = await hyper.ext.counters.counts()
  return res.send(result)    
}
```

`api/games/index.js`

```js
const of = Promise.resolve;

export async function post({ hyper, body }, res) {
  const result = await of(body)
    .then(hyper.data.add)
    .then(hyper.ext.counters.inc("game"));

  return res.send(result);
}
```

`api/characters/index.js`

```js
const of = Promise.resolve;

export async function post({ hyper, body }, res) {
  const result = await of(body)
    .then(hyper.data.add)
    .then(hyper.ext.counters.inc("character"));

  return res.send(result);
}
```

`api/characters/[id].js`

```js
const of = Promise.resolve

export async function delete({ hyper, body }, res) {
  const result = await of(body)
    .then(hyper.data.remove)
    .then(hyper.ext.counters.dec('character'));

  return res.send(result);
}
```

`api/games/[id].js`

```js
const of = Promise.resolve

export async function delete({ hyper, body }, res) {
  const result = await of(body)
    .then(hyper.data.remove)
    .then(hyper.ext.counters.dec('game'));

  return res.send(result);
}
```

---

## Summary

Thank you for taking this workshop, by completing the workshop, you learned
about caching and counters, and how to leverage hyper cache to create composable
counters that provide clear stats for our data models. You also can see the
advantage of using stratified design and creating generic extensions on the
hyper object that handled some general functionality for creating counters.

---
