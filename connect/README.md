<h1 align="center">⚡️ hyper connect workshop ⚡️</h1>
<p align="center">In this workshop, we will dive deeper into hyper-connect and learn some more Data service methods</p>

---

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [What is hyper-connect?](#what-is-hyper-connect)
- [Setup](#setup)
- [Update a character](#update-a-character)
- [Remove a character](#remove-a-character)
- [List characters](#list-characters)
- [Summary](#summary)

---

## Introduction 

👋🏻 Greetings, Thank you for taking the time to learn hyper with us, in this workshop, we
will dive a little deeper into `hyper-connect`, the deno/nodejs hyper client. But first, if you
have not taken the [Hello World](../hello-world) workshop, please consider taking that workshop
first, we will be building on the concepts we learned in previous workshops.

> You'll want to complete the [Hello World](../hello-world) workshop before taking this workshop.

We'll continue building out the "Mario Wiki API". We will cover all of the core hyper services. The best way to learn is by doing. In order to get the most out of these workshops, take the time to actually do the work, not just watch or copy and paste.

The hyper Data Service is a JSON API that focuses on Document Data Storage, document stores gives
developers the ability to keep their business logic cleanly separated from the services tier. With our
JSON API, you can create, read, update, delete, list, and query JSON Documents. In the previous workshop, we covered create and read, in this workshop, we will cover update, delete and list. 

---

## Prerequisites

What do I need to know to take this workshop?

- HTTP/JSON APIs 
- Javascript (async/await promises)
- git/Github (you will need a github account)

> NOTE: We will be using deno a Javascript server runtime for this workshop, https://deno.land

---

## What is hyper-connect ?

`hyper-connect` is a deno/esm nodejs client module that you import into your application as a 
dependency to provide some syntatic sugar to connect with the hyper API. The client takes
a connection string that is provided via an environment variable to build http client calls.

The connection string looks like a URL, because we leverage the `URL` parser to extract the
required components to build a http Request to the hyper service.

```
[protocol]://[key]:[secret]@[host]/[app]
```

The protocol can be either `http` for local hyper, `https` for custom hyper, or `cloud` for
the hyper cloud service. The `key` and `secret` are part of creating the `JWT` or jsonwebtoken.
The `key` is the `sub` claim in the token, and the `secret` is used to sign the token. The
`host` is the domain name of the service and the `app` is the application name of hyper services.

`hyper-connect` uses the connection string and your command to create the HTTP client request. A request is an object that instructs the HTTP client on how to submit to a server.

> 🎓 For more information about the Request object - https://developer.mozilla.org/en-US/docs/Web/API/Request

For example, if I call `await hyper.data.update(...)`, `hyper-connect` takes the connection string information and the command information `hyper.[service].[action]` and constructs an HTTP request.


```
PUT /data/mario-wiki-dev/1
Host: localhost:6363
Content-Type: application/json
Authorization: Bearer ${token}

{
  "id": "1",
  "name": "Mario",
  "description": "Better description"
}
```

`hyper-connect` also handles the response and returns the result. If the response is not a 2XX response, a rejected promise is returned with the error supplied as the argument in the catch function.

---

## Setup

Before we get started coding, we need to initialize our project. Run the setup script to download and run a hyper instance:

``` sh
cd connect
./scripts/hyper.sh
```

In another terminal lets setup our hyper data service:

``` sh
cd connect
./scripts/setup.js
```

In another terminal lets start our API server:

``` sh
cd connect
./scripts/start.sh
```

---

## Update Character

In the previous workshop, we learned how to add a document to `hyper` and to retrieve a document from `hyper`. In this workshop, we will learn how to update a document. The update method for hyper.data takes two arguments, an identifier, and the updated document. hyper completely replaces the document, so you must 
send a full document to hyper. 

> QUESTION: Why does hyper take the entire document to perform an update? This is intentional by design.
> You should keep your documents small and domain-focused, this allows for better scale. If you want
> to learn more about document database design check out this blog post https://blog.hyper.io/document-database-design#assessment 

In the `api/update-character.js` file, lets re-write the updateCharacter API handler:

``` js
import { hyper } from 'https://x.nest.land/hyper-connnect@0.0.7/proxy.js'

export default async function(req, res) {
  const result = await hyper.data.update(req.params.id, req.body)
  return res.send(result)
}
```

To verify the update is successful, let's use curl to send an update:

In a new terminal window:

``` sh
curl -X PUT localhost:3000/api/characters/1 \
-H 'Content-Type: application/json' \
-d '{"id": "1", "type": "character", "name": "Mario", "description": "updating mario document" }'
```

---

## Remove a Character

To remove a document from a hyper data service, we will use the `data.remove` method. In `api/remove-character.js` lets re-write the function like so:

``` js
import { hyper } from 'https://x.nest.land/hyper-connnect@0.0.7/proxy.js'

export default async function(req, res) {
  const result = await hyper.data.remove(req.params.id)
  return res.send(result)
}

```

And we can verify using curl

``` sh
curl -X DELETE localhost:3000/api/characters/1
```

---

## List Characters

In order to showcase the list command, we need to seed the database with a bunch of Mario
Universe characters. Let use the seed script to do this:

``` sh
./scripts/setup.sh
```

> NOTE: You can run `./scripts/setup.sh` multiple times in case you get your data out of whack, it will
> reseed your data service with the characters.json file. Make sure you are in the `connect` folder in
> your terminal.

The list method for the `hyper` Data service gives several options:

* list all with default limit of 1000
* list with specified limit
* list using a range - start, end
* list by specific keys

### List all example

``` js
const xs = await hyper.data.list()
```

### List with a specific limit

``` js
const xs = await hyper.data.list({limit: 10})
```

### List with a key range

``` js
const xs = await hyper.data.list({start: '2', end: '3' })
```

### List with a set of keys

``` js
const xs = await hyper.data.list({keys: ['1', '3', '4']})
```

For our API, we are going to list all of the documents, then filter 
documents that are type 'character'

In your editor open `api/list-characters.js` and re-write the function:

``` js
import { hyper } from 'https://x.nest.land/hyper-connect@0.0.7/proxy.js'

const byType = doctype => doc => doc.type === doctype

export default async function (_req, res) {
  const docs = await hyper.data.list()
  const characters = docs.filter(byType('character'))
  return res.send(characters)
}
```

To verify, lets use a curl command:

``` sh
curl localhost:3000/api/characters | npx prettyjson
```


## Summary

In this workshop, we learned about `hyper-connect` and the data API to update, remove and list documents from a hyper Data service.

hyper Data service gives you common document DB methods to work with document data, you will notice some common practices when working with document data. For example, every document has
a `type` property that basically lets the developer what type of document it is. 

By keeping your data service general and your business logic in your application layer,
many changes can occur in just that layer, without having to modify your data service. In the next workshops, we will talk more about some advanced functionality of the data service.
By keeping your data service general you business logic and rules reside in your application layer,
which means that many changes can occur in just that layer, without having to change rules in your
data service. In the next workshops, we will talk more about some advanced functionality of the 
data service.



