---
week: 6
slug: self-referential-agents
title: Self-Referential Agents
summary: Definability of truth, Lobian cooperation in open-source game theory, and why self-reference
  matters for understanding LLM personas.
prerequisites: |
  First-order logic. Gödel's first incompleteness theorem, Tarski's undefinability theorem, Löb's theorem, and the box operator of provability logic. Normal-form games and Nash equilibrium. LLM training: pretraining, fine-tuning, RLHF. Measure-theoretic probability, for one supplementary reading.
objectives: ''
ngoIntro: |
  It increasingly seems hard to explain intelligent agency without some concept of self-reference. This week focuses on three strands of thinking. Firstly, Christiano's definability of truth paper finds a way around Tarski's core undefinability of truth result (which inspired later work on Garrabrant induction and reflective oracles). The second thread is Lobian cooperation in open-source game theory. Demski's Probabilistic Payor's Lemma? post ties these two threads together.

  Finally, see Nostalgebraist's post The Void for some intuitions on why self-reference is important for understanding LLM personas.
readings:
- id: definability-of-truth-in-probabilistic-logic
  tier: main
  title: Definability of truth in probabilistic logic
  authors: Paul Christiano et al.
  type: paper
  minutes: 45
  prerequisites: |
    Tarski's undefinability theorem. Gödel's first incompleteness theorem.
  year: 2013
  url: https://intelligence.org/files/DefinabilityTruthDraft.pdf
  note: The source doc does not label this week's first list as "Main readings"; treated as main here
    for consistency.
- id: open-source-game-theory-is-weird
  tier: main
  title: Open-source game theory is weird
  authors: Andrew Critch
  type: post
  minutes: 15
  prerequisites: |
    Normal-form games and Nash equilibrium.
  url: https://acritch.com/osgt-is-weird/
  note: Paired with the next reading as a single bullet in the source doc.
- id: robust-cooperation-in-the-prisoner-s-dilemma
  tier: main
  title: Robust cooperation in the prisoner's dilemma
  authors: Barasz et al.
  type: paper
  minutes: 45
  prerequisites: |
    Löb's theorem and the box operator of provability logic.
  year: 2014
  url: https://arxiv.org/abs/1401.5577
- id: probabilistic-payor-s-lemma
  tier: main
  title: Probabilistic Payor's Lemma?
  authors: Abram Demski
  type: post
  minutes: 20
  prerequisites: |
    Both threads above: probabilistic logic, and open-source game theory.
  year: 2023
  url: https://www.lesswrong.com/posts/ZWhJcHPmRaXAPAK5k/probabilistic-payor-lemma
- id: the-void
  tier: main
  title: The Void
  authors: nostalgebraist
  type: post
  minutes: 120
  prerequisites: |
    LLM training: pretraining, fine-tuning, RLHF.
  year: 2025
  url: https://nostalgebraist.tumblr.com/post/785766737747574784/the-void
  note: Very long. Budget accordingly, or assign it a week ahead.
- id: what-would-i-do-self-prediction-in-simple-algorithms
  tier: supplementary
  title: What would I do? Self-prediction in simple algorithms
  authors: Scott Garrabrant
  type: post
  minutes: 15
  prerequisites: ''
  url: https://www.lesswrong.com/posts/PiXS9kE4qX68KveCt/what-would-i-do-self-prediction-in-simple-algorithms
- id: procrastination-in-probabilistic-logic
  tier: supplementary
  title: Procrastination in probabilistic logic
  authors: Benja Fallenstein
  type: paper
  minutes: 20
  prerequisites: |
    Löb's theorem.
  url: https://intelligence.org/files/ProbabilisticLogicProcrastinates.pdf
- id: self-referential-probability
  tier: supplementary
  title: Self-referential probability
  authors: Catrin Campbell-Moore
  type: book
  minutes: 60
  prerequisites: |
    Formal logic and measure-theoretic probability.
  url: https://philpapers.org/rec/CAMSP-5
  excerpt: Chapter 5, which is more or less self-contained
- id: intuitive-self-models
  tier: supplementary
  title: Intuitive self-models
  authors: Steven Byrnes
  type: post
  minutes: 180
  prerequisites: ''
  url: https://www.lesswrong.com/s/qhdHbCJ3PYesL9dde
  excerpt: Full sequence
- id: in-logical-time-all-games-are-iterated-games
  tier: supplementary
  title: In logical time, all games are iterated games
  authors: Abram Demski
  type: post
  minutes: 15
  prerequisites: ''
  year: 2018
  url: https://www.lesswrong.com/posts/dKAJqBDZRMMsaaYo5/in-logical-time-all-games-are-iterated-games
- id: the-persona-selection-model
  tier: supplementary
  title: The Persona Selection Model
  authors: Samuel Marks, Jack Lindsey and Chris Olah
  type: post
  minutes: 30
  prerequisites: ''
  year: 2026
  url: https://alignment.anthropic.com/2026/psm/
---

Your own framing for this week goes here. This file's body is rendered as
Markdown below Ngo's introduction, under the heading "Notes for this cohort".
Delete this placeholder text once you have written your own.
