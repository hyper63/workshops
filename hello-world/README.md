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

In this workshop, we will be creating some API endpoints for our Mario Wiki web application, the
Mario wiki web application contains detailed information about the Mario Universe, its characters
and its games. 

In this intro to hyper, we will do the following:

* Setup a developer hyper instance
* use hyper to create a mario character document
* use hyper to get a mario character document

> 👉 Highly recommend using gitpod.io for this workshop, it will pre configure the workshop environment, 
> if you do not want to use gitpod, see Appendix A

[Open in Gitpod](https://gitpod.io#https://github.com/hyper63/workshops/tree/master/hello-world)

---

## Prerequisites

> If you are not using gitpod, then you need to have deno installed - https://deno.land/install

> What do I need to know in order to do this workshop?

- HTTP/JSON APIs
- Javascript
- ExpressJS/Opine
- git/github

We will be using Deno as our server runtime, but you don't need to worry about that for this workshop.

---

## Setup 

Lets setup a local hyper service:

> In a new terminal window, type the following commands:

``` sh
# change directory to hello-world
cd hello-world
# download hyper cli
curl -O https://hyperland.s3.amazonaws.com/hyper
# make it a executable
chmod +x ./hyper
# run service
./hyper
```

---

## Configuration

In order for our ⚡️ `hyper-connect` ⚡️ client to know how to communicate with the hyper service, we 
need to give the client a `Connect String`, for local development our connect string looks like
a url: http://localhost:6363/mario-wiki-dev

> NOTE: make sure you are in the `hello-world` directory in the workshops repo

Let's create a development environment variable in a `.env` file.

``` txt
HYPER=http://localhost:6363/mario-wiki-dev
```

🖥 Now in a new terminal window, run the following command 

``` sh
deno run -A ./scripts/setup.js
```

This will create our development data service for hyper. If you click over to the hyper terminal window you should see that a Database was created.

```
DATA:CREATE_DB: {"date":"2021-10-04T17:39:00.946Z"}
```

🚀 Now we are ready to start the server! 🚀

> NOTE: make sure you are in a terminal in the `hello-world` directory

``` sh
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
  "id": "1",
  "name": "Mario",
  "description": "The most popular character in the Mario Universe"
}
```

In your editor, open `api/create-characer.js` and lets do the following:

- import hyper connect

``` js
import { hyper } from 'https://x.nest.land/hyper-connect@0.0.7/proxy.js'
```

- call `data.add` to add the new character document

``` js
  
export default async function (_req, res) {
  const result = await hyper.data.add(_req.body)
  return res.send(result)
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

``` js
import { hyper } from 'https://x.nest.land/hyper-connect@0.0.7/proxy.js'

export default async function (_req, res) {
  const character = await hyper.data.get(_req.params.id)
  return res.send(character)
}
```

## Summary

In this short workshop, we setup a hyper local service, and created two
API endpoints to handle creating Mario characters and retreiving characters
by identifier.

Lets check our implementation:

Add some characters

``` curl
curl -X POST localhost:3000/api/characters -H 'content-type: application/json' \
-d '{"id": "1", "name": "Mario", "description": "Leading character in Mario Universe" }'


curl -X POST localhost:3000/api/characters -H 'content-type: application/json' \
-d '{"id": "2", "name": "Luigi", "description": "Marios partner" }'


curl -X POST localhost:3000/api/characters -H 'content-type: application/json' \
-d '{"id": "3", "name": "Bowser", "description": "Marios number one enemy" }'

```

Get some characters

``` curl
curl localhost:3000/api/characters/1 | npx json
curl localhost:3000/api/characters/2 | npx json
curl localhost:3000/api/characters/3 | npx json

```

In this workshop, we walked through setting up a local environment for hyper and implemented two 
API endpoints, a create character endpoint and a get character endpoint. Using hyper connect we were 
able to create and read json documents with very clear commands.

- hyper.data.add
- hyper.data.get

---

## Did you enjoy this workshop?

- [Subscribe to hyper videos](https://youtube.com/c/hypervideos)

In the next workshops, we will learn about the list, remove, and update methods for the hyper data service.

> DISCLAIMER: This is example code that is mainly created to demo the features of the hyper demo service as 
> quickly as possible, when using hyper for production, please add the proper safety checks and handle 
> well structured error messages when returned from the service.
