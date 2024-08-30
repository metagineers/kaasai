
![kaasai-banner](./public/banner.jpg)

# KaasAI

KaasAI is short for Knowledge as a Service using AI.

It is a marketplace platform that allows anyone to create an AI Powered Curated Knowledge Base in minutes using prompt engineering and optionally augmenting that with Retrieval Augmented Generation (RAG) sources such as documents, websites, videos and more. In future, custom LLM models fine tuning facilities can also be added.

These AI based knowledge base can then be accessed by patrons for an access fee in bought using EDU tokens. Creators can set how much EDU tokens are needed to purchase credits needed to access the knowlegde base. Credits are sold in up to three tiers with each tier having a different price and a different number of credits.

Patrons that has enough credits can then access the knowlegde base in the form of an intelligence CoPilot chatbot that can generate further educational content such as flashcards, quizzes, assignments, coursework materials and more.

Currently the platfrm is free for creators to use, the platform is built with a freemium model in mind. In the future, a platform fee may be charged and taken from creators EDU revenue generated from the sales of credits.

# Technical Notes

## Note

At the code level the project has been adapted from a crowdfunding project as a base template/hence some references are refering to crowdfunding specific terms and naming conventions. This will be fully adapted with the knowledge base specific terminology in the near future.

## Installation

### Environment Variables

The project uses ThirdWeb SDK for the smart contract interactions. You will need to create at least a free account and get your client ID.

To run this project, you will need to add the following environment variables to your .env file (.env.local if run locally):

`CLIENT_ID`

To learn how to create a client ID, refer to the [client documentation](https://portal.thirdweb.com/typescript/v5/client). 

## Run locally

Install dependencies

```bash
yarn
```

Start development server

```bash
yarn dev
```

Create a production build

```bash
yarn build
```

Preview the production build

```bash
yarn start
```

