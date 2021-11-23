<h1 align="center">⚡️ hyper cache workshop part 2 ⚡️</h1>
<p align="center">
Welcome to cache hot queries. In this workshop, we will learn how to read from the cache when requesting documents
and update the cache when creating or updating documents. This pattern will keep less read traffic off of your transactional system overtime.
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
- opine/expressJs
- async/await (promises)

> What will I need for this workshop?

- hyper account (its Free!): Sign up here https://dashboard.hyper.io

---

## Setup

create .env

```
./scripts/setup.sh
```

---

## Cache Counters

`GET /api/stats`

Return the total count of games and characters

---

## Summary

---
