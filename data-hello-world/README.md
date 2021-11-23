<h1 align="center">👋🏻 Hello World Workshop 👋🏻</h1>
<p align="center">The hyper "hello world" workshop</p>

---

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Configuration](#configuration)
- [Create Character](#create-character)
- [Get Character](#get-character)
- [Summary](#summary)
- [Appendix A](#appendix-a)

---

## Introduction

In this workshop, we will be creating some API endpoints for our Mario Wiki web
application, the Mario wiki web application contains detailed information about
the Mario Universe, its characters and its games.

In this intro to hyper, we will do the following:

- [ ] Setup a developer hyper instance
- [ ] use hyper to create a mario character document
- [ ] use hyper to get a mario character document

> 👉 Highly recommend using gitpod.io for this workshop, it will pre configure
> the workshop environment, if you do not want to use gitpod, see Appendix A

[Open in Gitpod](https://gitpod.io#https://github.com/hyper63/workshops/tree/master/hello-world)

---

## Prerequisites

> If you are not using gitpod, then you need to have deno installed -
> https://deno.land/install

> What do I need to know in order to do this workshop?

- HTTP/JSON APIs
- Javascript
- ExpressJS/Opine
- git/github

We will be using Deno as our server runtime, but you don't need to worry about
that for this workshop.

---

## Setup

For our setup, we have two options, create an app on the hyper cloud or run a
local instance of hyper.

To create a hyper app service in the cloud, go to https://dashboard.hyper.io
sign in with your github account and create a new application. When you create
your new application, copy the connection string and place it in a `.env` file

```
HYPER=[connection string here]
```

> NOTE: make sure you are in the `hello-world` directory in the workshops repo

---

🚀 Now we are ready to start the server! 🚀

> NOTE: make sure you are in a terminal in the `hello-world` directory

```sh
./scripts/start.sh
```

---

## Create Character

There is a file in the `api` folder

- create-character.js - this is where we will add our functionality.

```
# Allow a client to create a mario character

As an API client      
I want to send a JSON Document      

Example:

{
  "id": "character-1",
  "type": "character",
  "name": "Mario",
  "description": "The most popular character in the Mario Universe"
}
```

In your editor, open `api/create-character.js` and lets do the following:

- import hyper connect

```js
import { connect } from "hyper-connect";

const hyper = connect(Deno.env.get("HYPER"));
```

- call `data.add` to add the new character document

```js
export default async function (_req, res) {
  const result = await hyper.data.add(_req.body);
  return res.send(result);
}
```

---

## Get Character

There is a file in the `api` folder

- get-character.js - this is where we will add our functionality.

```
# Allow a client to retreive a mario character

As an API client      
I want to request a document by id

GET /api/characters/1
```

In your editor open `api/get-character.js` and do the following:

```js
import { connect } from "hyper-connect";

const hyper = connect(Deno.env.get("HYPER"));

export default async function (_req, res) {
  const character = await hyper.data.get(_req.params.id);
  return res.send(character);
}
```

## Summary

In this short workshop, we setup a hyper local service, and created two API
endpoints to handle creating Mario characters and retreiving characters by
identifier.

Lets check our implementation:

Add some characters

```curl
curl -X POST localhost:3000/api/characters -H 'content-type: application/json' \
-d '{"id": "character-1", "name": "Mario", "description": "Leading character in Mario Universe" }'


curl -X POST localhost:3000/api/characters -H 'content-type: application/json' \
-d '{"id": "character-2", "name": "Luigi", "description": "Marios partner" }'


curl -X POST localhost:3000/api/characters -H 'content-type: application/json' \
-d '{"id": "character-3", "name": "Bowser", "description": "Marios number one enemy" }'
```

Get some characters

```curl
curl localhost:3000/api/characters/character-1 | npx prettyjson
curl localhost:3000/api/characters/character-2 | npx prettyjson
curl localhost:3000/api/characters/character-3 | npx prettyjson
```

In this workshop, we walked through setting up a local environment for hyper and
implemented two API endpoints, a create character endpoint and a get character
endpoint. Using hyper connect we were able to create and read json documents
with very clear commands.

- hyper.data.add
- hyper.data.get

---

## Did you enjoy this workshop?

- [Subscribe to hyper videos](https://youtube.com/c/hypervideos)

In the next workshop, we will learn about the list, remove, and update methods
for the hyper data service.

[Next Workshop](../connect)

> DISCLAIMER: This is example code that is mainly created to demo the features
> of the hyper demo service as quickly as possible, when using hyper for
> production, please add the proper safety checks and handle well structured
> error messages when returned from the service.
