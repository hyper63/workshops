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
`host` is the domain name of the service and the `app` is the application name of the hyper 
service.



