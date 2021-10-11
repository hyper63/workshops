<h1 align="center">⚡️ hyper query workshop ⚡️</h1>
<p align="center">In this workshop, we will explore the hyper Data query and bulk service methods. With these two powerful methods you can
accomplish so much of your complex data needs without having to tightly couple your business logic to the persistant data service.</p>

---

## Table of Contents

- [Introduction](#introduction)
- [Prequisites](#prerequisites)
- [Setup](#setup)
- [Query and Bulk](#query-and-bulk)
- [Summary](#summary)

---

## Introduction

👋🏻 Greetings, Welcome to the hyper workshops, in the Query workshop, we will learn about the most advanced features of the hyper Data service. The hyper Data service is an API or boundary between your business logic and a structured persistent store. The purpose of this boundary is to isolate the applications buisness logic which is specific to your application from the data service which can be a general purpose solution. By creating this boundary, you can rapidly iterate or experiement with your application in a continuous feedback loop.

Why experiments? Do you every really know what you are building until you build it? The answer often is "Yes" on the third re-write! 😃

In this workshop, We will continue to build out our Mario Wiki API. And we will showcase the 'query' and 'bulk' functionality of the hyper Data service.

## Prerequisites

What do I need to know to take this workshop?

- HTTP/JSON APIs
- Javascript (async/await promises)
- git/Github (you will need a github account)

> NOTE: We will be using deno a Javascript server runtime for this workshop, https://deno.land

---

## Setup

We need to initialize our project, if you have not already, launch this project in gitpod.io. 

* [Launch in Gitpod](https://gitpod.io#https://github.com/hyper63/workshops)
* Setup Local hyper data service:

💻 In a new terminal do the following:

``` sh
cd query
./scripts/setup.js
```

💻 In a new terminal start our API server:

```
cd query
./scripts/start.sh
```

---

## Query and Bulk

### Query

* POST /api/characters/_query 

* POST /api/games/_query

### Bulk

Refactor create/update [characters, games]

This refactor should use bulk to add the model, plus the relation table, maybe 
check to see the related model exists first.

---

## Summary



