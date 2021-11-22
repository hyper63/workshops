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
const of = Promise.resolve
export async function get({hyper), res}) {
  of('stats')
    .then(hyper.cache.get)
    // query data service if cache counters not found
    .catch(() => 
      hyper.data.query({$or: [{type: 'character'}, {type: 'game'}]})
        .then(result => result.docs.reduce((a, d) => {
          a[d.type] = a[d.type] + 1
          return a 
        }, {game: 0, character: 0}))
    )
    .then(stats => res.send(stats))
    
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
import { always, inc, lensProp, over } from "ramda";

const of = Promise.resolve;

export async function post({ hyper, body }, res) {
  const setStats = (type) =>
    (doc) => hyper.cache.set("stats", over(lensProp(type), inc, doc));
  const incrementStats = (type) =>
    hyper.cache.get("stats").then(setStats(type));

  const result = await of(body)
    .then(hyper.data.add)
    .then(
      (result) => incrementStats("character").then(always(result)),
    );

  return res.send(result);
}
```

`api/games/index.js`

```js
import { always, inc, lensProp, over } from "ramda";

const of = Promise.resolve;

export async function post({ hyper, body }, res) {
  const setStats = (type) =>
    (doc) => hyper.cache.set("stats", over(lensProp(type), inc, doc));
  const incrementStats = (type) =>
    hyper.cache.get("stats").then(setStats(type));

  const result = await of(body)
    .then(hyper.data.add)
    .then(
      (result) => incrementStats("game").then(always(result)),
    );

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
import { always, dec, lensProp, over } from "ramda";

const of = Promise.resolve;

export async function delete({ hyper, body }, res) {
  const setStats = (type) =>
    (doc) => hyper.cache.set("stats", over(lensProp(type), dec, doc));
  const decrementStats = (type) =>
    hyper.cache.get("stats").then(setStats(type));

  const result = await of(body)
    .then(hyper.data.remove)
    .then(
      (result) => decrementStats("character").then(always(result)),
    );

  return res.send(result);
}
```

`api/games/[id].js`

```js
import { always, dec, lensProp, over } from "ramda";

const of = Promise.resolve;

export async function delete({ hyper, body }, res) {
  const setStats = (type) =>
    (doc) => hyper.cache.set("stats", over(lensProp(type), dec, doc));
  const decrementStats = (type) =>
    hyper.cache.get("stats").then(setStats(type));

  const result = await of(body)
    .then(hyper.data.remove)
    .then(
      (result) => decrementStats("game").then(always(result)),
    );

  return res.send(result);
}
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

TODO: Generic Implementation

By creating this extension and attaching it to the hyper object when assigned to
the request object, we can make these helper functions available to the endpoint
handlers and dramatically simplify the code.

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
