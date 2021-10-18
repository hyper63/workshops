<h1 align="center">⚡️ hyper query workshop ⚡️</h1>
<p align="center">In this workshop, we will explore the hyper Data query and bulk service methods. With these two powerful methods you can
accomplish so much of your complex data needs without having to tightly couple your business logic to the persistent data service.</p>

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

Login in to https://dashboard.hyper.io and go to your 'mario-wiki-[initials]' app and copy the connection string.

Create a `.env` file in the `query` folder and add your connection string as a HYPER env variable:

```
HYPER=[your connection string]
```


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

As we continue to build our API, we want to provide the ability to find all the
characters that made an appearance in a Mario Universe game. For example, which characters
made an appearance in `Donkey Kong`? In our data store we have characters and we have games, each of these document types have a unique identifiers, and we have another document
type called `appearances` these documents contain the game identifier and the character identifier to associate the characters with the games. Since a character can appear in multiple games and a game can have more than one character we need a special document 
type that maps these associations. In our setup, we created some associations so that we could get started. In our API, we are going to create a new endpoint `characters/_query`, when the developer sends a post with a game_id specified, we will need to return all of the
character names for a given game. 

* POST /api/characters/_query?game_id=game-1

In the `api/characters/_query.js` file, lets modify the `post` function to perform this
query.

``` js
import { hyper } from 'hyper-connect'

export async function post(_req, res) {
  // 📝 NOTE: you may want to check if the game_id document exists
  // before running the query.
  const result = await hyper.data.query({
    type: 'appearance',
    game_id: req.query.game_id
  }, { fields: ['character_id', 'character_name'] })
  
  return res.send(result.docs)
}
```

With `hyper.data.query` we can provide a query object that requests to filter all documents using the following criteria: the document type should equal 'appearance' and
the document `game_id` should equal the `game_id` being provided on the query string. 

#### About the hyper.data.query method

The query method is a powerful mechanism that enables you to write complex queries using
object notation, which makes it easy to construct your filter using functions.

The method takes two arguments: selector and options

#### Selector

The selector argument is an object that describes how you would like to filter the store, so if you left it empty `{}` then you would retrieve all of the documents in the store. If you set it to `{ type: 'character' }` then you are asking hyper to only return the documents that contain a type property that equals 'character'. There are several operators that you can use when crafting your selector.

Basically, when you provide the selector `{type: 'character' }`, you are using an implicit operator called `$eq` (equals) to instruct the hyper data store how you would like to filter the documents. `{ type: { $eq: 'character' }}`

> To see more information about selectors [Read our docs](https://docs.hyper.io/query-selector)


#### Options

- fields - array of strings specifying the fields you would like to return in the results
- limit - number of documents you would like to return
- sort - array of objects specifying the properties you would like to sort on
- use_index - string to specify a specific index to optimize the query.

#### Exercise

Now that we have created a feature to get all the characters by a game id, lets create a query
to get all the games by a character id, in the `api/games/_query.js` modify the post function using hyper to get all of the game names and id's by querying the hyper data store.

Test Case:

``` sh
curl -X POST localhost:3000/api/games/_query?character_id=character-1 | npx prettyjson
```


### Bulk

Refactor create/update [characters, games]

This refactor should use bulk to add the model, plus the relation table, maybe 
check to see the related model exists first.

---

## Summary

In this workshop, we looks at two advanced features of the hyper Data service, `bulk` and `query`. With `bulk` you can provide an array of documents and the bulk service can insert, update or remove these documents in a batch process. Using the `query` method, you can provide complex query filters against your data store in an object syntax. By combining these selectors you can narrow your returned list, which can be sorted and only return specific fields in the documents. The `query` method provides you a rich set of tools to create specific result sets.

## Did you enjoy this workshop?

- [Subscribe to hyper videos](https://youtube.com/c/hypervideos)

In the next workshop, we will learn about the list, remove, and update methods for the hyper data service.

[Next Workshop](../)

> DISCLAIMER: This is example code that is mainly created to demo the features of the hyper demo service as 
> quickly as possible, when using hyper for production, please add the proper safety checks and handle 
> well structured error messages when returned from the service.
