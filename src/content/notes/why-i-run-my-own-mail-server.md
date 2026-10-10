---
title: "Why I Run My Own Mail Server (1,500 Emails a Day)"
description: "The standard advice is 'never run your own mail server.' But for Indonesian government systems, self-hosting email is the pragmatic choice — 1,500 transactional emails a day, clean since 2022."
date: "2026-10-10T06:00:00.000Z"
tags: [email, infrastructure, self-hosted, poste]
readTime: 5
---

"Don't run your own mail server."

It's one of those pieces of advice every developer hears early and repeats forever. And honestly? For most people, it's correct. Email deliverability is a swamp of IP reputation, spam filters, and DNS arcana. Pay someone else to wade through it.

But I run my own mail server. It sends around 1,500 emails a day. It has done so, without deliverability problems, since 2022.

Here's why it makes sense — and the unglamorous checklist that makes it work.

## It started with Gmail's limits

The mail server exists for SIOPEN, the government procurement marketplace I built and run for two regencies. The system sends transactional notifications to stakeholders: tender cancellations, addendums, deadline reminders — the kind of email that absolutely has to arrive.

In the beginning, outgoing mail went through Gmail's SMTP. It worked fine until it didn't. As transaction volume grew, we kept hitting Gmail's sending limits, and every limit hit meant notifications silently not going out. For a procurement system, a notification that never arrives isn't a minor inconvenience — it's a stakeholder missing a deadline.

## The real reason is procurement, not ideology

Most self-hosted email articles talk about privacy or independence. Mine is more boring: **government procurement needs fixed pricing.**

Indonesian government procurement runs on annual contracts with fixed prices. Metered SaaS billing — a few cents per thousand emails, scaling with volume — doesn't fit that model. You can't put "somewhere between $X and $Y depending on usage" into a procurement document and expect it to survive the process.

A mail server on a VPS is a fixed cost for the year. The procurement paperwork understands fixed costs. That alone settled the decision.

(The other reasons helped: full control over the queue, no per-email cost anxiety as volume grows, and data staying on infrastructure we manage.)

## The setup: poste.io and four DNS records

I run [poste.io](https://poste.io) on the client's VPS — a single Docker container that bundles SMTP, IMAP, webmail, and an admin panel. One container, one volume, done. I'm not interested in assembling Postfix + Dovecot + SpamAssassin by hand like it's 2009.

The software is the easy part. What actually determines whether your mail lands in inboxes is DNS. Four records, all correct, no exceptions:

- **SPF** — declares which servers may send mail for your domain.
- **DKIM** — cryptographically signs outgoing mail so receivers can verify it wasn't tampered with.
- **DMARC** — tells receivers what to do when SPF or DKIM fail, and where to send reports.
- **Reverse DNS (PTR)** — your mail server's IP must resolve back to its hostname. Many providers set this in their panel; without it, a lot of mail gets rejected outright.

Get those four right and you've handled the large majority of deliverability. Everything else is monitoring.

## Trust, but verify

I check the setup regularly with [mail-tester.com](https://www.mail-tester.com) — it scores your configuration out of 10. Ours consistently lands near 10. It's a five-minute ritual that catches DNS drift before it becomes a deliverability problem.

The numbers, for the record: around 1,500 transactional emails per day across both SIOPEN installations — spiking past 3,000 a day in peak months, when agencies rush to hit procurement targets before deadlines. Running clean since 2022. No spam-folder sagas, no blacklist drama.

## When I'd still pay for SaaS

Self-hosting email isn't free — it costs attention. IP reputation is yours to protect, the server needs monitoring like everything else, and when something breaks at the SMTP level, there's no vendor support line.

It works here because the conditions are right: predictable transactional volume (not marketing blasts), a dedicated IP with clean history, and full control of DNS. If I were sending bulk marketing mail, or couldn't guarantee the IP's reputation, I'd pay for a transactional email service without hesitation.

> **Run your own mail server when the economics and the constraints point that way — not as a statement, and not by default.**

For two government procurement systems sending 1,500 notifications a day on a fixed annual budget, the math was never close.
