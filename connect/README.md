<h1 align="center">⚡️ hyper connect workshop ⚡️</h1>
<p align="center">In this workshop, we will dive deeper into hyper-connect and learn some more Data service methods</p>

---

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [What is hyper-connect?](#what-is-hyper-connect?)
- [Update a character](#update-a-character)
- [Remove a character](#remove-a-character)
- [List characters](#list-characters)
- [Summary](#summary)

---

## Introduction 

👋🏻 Greetings, Thank you for taking the time to learn hyper with us, in this workshop, we
will dive a little deeper into hyper-connect the deno/nodejs hyper client. But first, if you
have not taken the [Hello World](../hello-world) workshop, please consider to take that workshop
first, we will be building on the concepts we learned in previous workshops.

> NOTE: Please be sure to take the [Hello World](../hello-world) workshop before taking this workshop.

As we started in the hello-world workshop, we will be building out a "Mario Wiki API", and through these
workshops, we will cover all of the hyper core services. The best way to learn is by doing, so in order 
to get the most out of these workshops, take the time to actually do the work, not just watch or copy
and paste.

The hyper Data Service is a JSON API that focuses on Document Data Storage, document stores gives
developers the ability to keep their business logic clean separated from their services. With our
JSON API, you can create, read, update and delete JSON Documents. In the previous workshop, we covered
create and read, in this workshop, we will cover update, delete and list. 

---

## Prerequisites

What do I need to know to take this workshop?

- HTTP/JSON APIs 
- Javascript (async/await promises)
- git/Github (you will need a github account)

> NOTE: We will be using deno a Javascript server runtime for this workshop, https://deno.land

---

## What is hyper-connect?

hyper-connect is a deno/nodejs client module that you import into your application as a 
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

hyper-connect uses the connection string and your command to create the http client request. A 
request is an object that instructs the http client how to submit to a server.

> 🎓 For more information about the Request object - https://developer.mozilla.org/en-US/docs/Web/API/Request

For example, if I call `await hyper.data.update(...)` hyper-connect takes the connection string information and the command information `hyper.[service].[action]` and constructs a http request.

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

hyper-connect also handles the response and returns the result, if the response is not a 2XX response,
then a rejected promise is returned with the error supplied as the argument in the catch function.

---

## Update a Character

In the previous workshop, we learned how to add a document to hyper and to retrieve a document from hyper, in this workshop, we will learn how to update a document. The update method for hyper.data takes two arguments, an identifier and the updated document. hyper completely replaces the document, so you must 
send a full document to hyper. 

> QUESTION: Why does hyper take the entire document to perform an update? This is intentional by design
> You should keep your documents small and domain focused, this allows for better scale. If you want
> to learn more about document database design check out this blog post https://blog.hyper.io/document-database-design 




---

## Remove a Character

---

## List Characters







