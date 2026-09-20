---
week: 5
slug: the-concept-of-concepts
title: The Concept of Concepts
summary: 'Past behaviourist notions of generalization: concepts as parts of a world-model, from predictive
  processing, circuits, and frameworks for overlapping hypotheses.'
prerequisites: ''
objectives: ''
ngoIntro: |
  I suspect that our understanding of generalization is confused because we're treating it as an implicitly behaviorist concept, rather than thinking in terms of the internal representations learned by models. In particular, it seems productive to think in terms of the concept of "concepts", by which I mean something like a part of one's world-model.

  This week tries to narrow in on concepts from a few different directions. The first readings focus on the predictive processing/active inference approach, which focuses on generative models rather than just discriminative models. The second reading looks at concepts inside neural networks, specifically understood as circuits.

  The latter two readings explore two different theoretical frameworks which allow the representation of multiple overlapping concepts (rather than just mutually exclusive Bayesian hypotheses).
readings:
- id: book-review-surfing-uncertainty
  tier: main
  title: 'Book Review: Surfing Uncertainty'
  authors: Scott Alexander
  type: post
  minutes: 35
  prerequisites: ''
  year: 2017
  url: https://slatestarcodex.com/2017/09/05/book-review-surfing-uncertainty/
  note: The source doc's bullet reads "Predictive processing and its perceptual control theory" and links
    these two posts.
- id: translating-predictive-coding-into-perceptual-control
  tier: main
  title: Translating Predictive Coding Into Perceptual Control
  authors: Scott Alexander
  type: post
  minutes: 20
  prerequisites: |
    Continues the review above. Read *Book Review: Surfing Uncertainty* first.
  year: 2019
  url: https://slatestarcodex.com/2019/03/20/translating-predictive-coding-into-perceptual-control/
- id: zoom-in-an-introduction-to-circuits
  tier: main
  title: 'Zoom In: An Introduction to Circuits'
  authors: Chris Olah et al.
  type: paper
  minutes: 40
  prerequisites: |
    Assumes convolutional networks: layers, channels, learned features.
  year: 2020
  url: https://distill.pub/2020/circuits/zoom-in/
- id: an-intuitive-guide-to-garrabrant-induction
  tier: main
  title: An intuitive guide to Garrabrant induction
  authors: Mark Xu
  type: post
  minutes: 40
  prerequisites: |
    Assumes probability and the idea of a Dutch book, plus the observation that a Bayesian agent cannot coherently be uncertain about a mathematical fact.
  year: 2021
  url: https://markxu.com/writing/logical-induction/
- id: loss-as-the-inconsistency-of-a-probabilistic-dependency-graph
  tier: main
  title: Loss as the Inconsistency of a Probabilistic Dependency Graph
  authors: Oliver Richardson
  type: paper
  minutes: 60
  prerequisites: |
    Bayesian networks, KL divergence and basic information theory.
  year: 2022
  url: https://arxiv.org/abs/2202.11862
- id: condensation
  tier: supplementary
  title: Condensation
  authors: Abram Demski
  type: post
  minutes: 30
  prerequisites: ''
  url: https://www.lesswrong.com/posts/BstHXPgQyfeNnLjjp/condensation
- id: towards-a-formal-scientific-epistemology
  tier: supplementary
  title: Towards a formal scientific epistemology
  authors: Richard Ngo
  type: post
  minutes: 20
  prerequisites: ''
  url: https://www.mindthefuture.info/p/towards-a-formal-scientific-epistemology
- id: how-an-algorithm-feels-from-the-inside
  tier: supplementary
  title: How an algorithm feels from the inside
  authors: Eliezer Yudkowsky
  type: post
  minutes: 10
  prerequisites: ''
  year: 2008
  url: https://www.lesswrong.com/posts/yA4gF5KrboK2m2Xu7/how-an-algorithm-feels-from-inside
- id: on-goal-models
  tier: supplementary
  title: On goal-models
  authors: Richard Ngo
  type: post
  minutes: 15
  prerequisites: ''
  url: https://www.lesswrong.com/posts/MEkafPJfiSFbwCjET/on-goal-models
- id: public-static-what-is-abstraction
  tier: supplementary
  title: 'Public static: what is abstraction?'
  authors: John Wentworth
  type: post
  minutes: 20
  prerequisites: ''
  year: 2021
  url: https://www.lesswrong.com/posts/vDGvHBDuMtcPd8Lks/public-static-what-is-abstraction
- id: radical-probabilism
  tier: supplementary
  title: Radical Probabilism
  authors: Abram Demski
  type: post
  minutes: 30
  prerequisites: |
    Assumes Bayesian updating and Jeffrey conditionalisation.
  year: 2020
  url: https://www.lesswrong.com/posts/xJyY5QkQvNJpZLJRo/radical-probabilism-1
---

Your own framing for this week goes here. This file's body is rendered as
Markdown below Ngo's introduction, under the heading "Notes for this cohort".
Delete this placeholder text once you have written your own.
