---
title: "Why I Built Rune: When a Small Frustration Turns Into a New Tool"
description: "I didn't set out to build a task runner. It started with Laravel, a colon, and a question: what should a project task actually be?"
date: "2026-09-09T10:00:00.000Z"
tags: [golang, cli, task-runner, open-source]
---

I didn't set out to build a task runner.

If you had asked me a few months ago whether the world needed another one, my answer would probably have been: *"Absolutely not."* There's Make. There's Just. There are Taskfile, Mage, and plenty of others. The problem is not a lack of options.

And yet, here I am, building another one. It's called **Rune**.

The funny part is that Rune didn't start because I thought existing tools were bad. It started because I wanted something slightly different. And, as is often the case with software projects, "slightly different" eventually turned into "I guess I'm building this now."

---

## It Started with Laravel

I've been using Laravel for quite a while. One of the things I've always enjoyed isn't necessarily a specific feature, but the overall developer experience — and a small part of that experience is **Artisan**.

You can run:

```bash
php artisan migrate
php artisan db:seed
php artisan make:model User
php artisan make:controller UserController --migration
```

Everything feels like a command. Commands have arguments, options, namespaces, and help. There's a clear mental model:

```text
command
├── arguments
├── options
├── description
└── behavior
```

I never really thought much about it. It was just... nice.

Then I started working more with Go and Dart. And that's when I started missing it.

---

## Moving to Go and Dart

As my projects shifted, I still had the same kinds of repetitive commands. Run tests. Build something. Generate code. Run migrations. Start development services.

```bash
go test ./...
go build ./...
golangci-lint run
dart test
dart run build_runner build
```

None of these are hard to remember individually. But a project accumulates them. And then someone new joins the team, and you have to explain: *"Run this command, but first make sure you have this environment variable. And for this one, use this flag."*

That's when a task runner starts making sense. Instead of remembering implementation details, you define a project interface:

```bash
rune test
rune build
rune lint
rune db:migrate
```

The project tells you how it works.

---

## My First Stop: Make

Naturally, I started with Make. It's everywhere, proven, and powerful.

A simple Makefile is perfectly pleasant:

```makefile
test:
	go test ./...

build:
	go build .
```

But then I wanted to pass arguments. `make deploy ENV=staging` works — Make is not broken. It is simply a different abstraction. The more I used Make for project tasks, the more I felt like I was using a **build system to implement a CLI**.

I didn't need Make to know about build artifacts, timestamps, and file dependencies. I just wanted to define commands.

---

## Then I Found Just

**Just** was much closer to what I wanted:

```justfile
test:
    go test ./...

deploy environment:
    ./deploy.sh {{environment}}
```

Now I could write `just deploy staging`. Much nicer.

At this point I thought: *"Okay. This is it. I'm done."*

I was not done.

---

## I Wanted a Colon

There was one small detail. I like namespaced commands — probably from my Artisan background:

```text
db:migrate
db:seed
make:model
make:controller
deploy:staging
```

When I see `db:migrate`, I immediately understand the relationship between `db` and `migrate`. It's a tiny namespace.

But Just doesn't support recipe names in that form. The alternative would be `foo-bar` — and there's nothing wrong with that. But then I had one of those moments every programmer should learn to recognize:

> *"It's a small thing, but..."*

That sentence has probably created more software than most programming languages.

---

## Tasks Should Be Commands

The biggest conceptual decision I made was this:

> **A project task should be treated more like a CLI command than a shell recipe.**

Instead of just:

```text
task → shell commands
```

I wanted:

```text
command
├── name
├── namespace
├── description
├── arguments
├── options
├── confirmation
├── dependencies
└── execution
```

The shell command is only one part. The command itself has an interface — and that interface should be explicit.

---

## Attributes: The Interface Layer

One of the design choices I particularly like is how the interface lives right in the signature:

```text
#[Generate a new model]
make:model name --force?:
    go run ./cmd/make {{name}} {{force}}
```

The description is an attribute. The argument and the flag are declared in the signature. The task tells Rune: *this command has a description, accepts a positional argument, and has an optional boolean flag.* And Rune uses that to provide help, validation, shell completion, and confirmation prompts.

The information stays close to the command itself. No separate documentation. No README that drifts out of sync. The task definition **is** the source of truth.

---

## Dangerous Commands Should Say So

Once you think about tasks as commands, another problem becomes obvious. Not every command is harmless:

```text
test, lint, build     ← safe
db:fresh, db:wipe     ← destructive
```

So Rune supports confirmation:

```text
#[Reset the database schema]
#[confirm: This will permanently delete all database data.]
db:fresh:
    dropdb --if-exists app_dev && createdb app_dev
```

The philosophy: **make accidental execution difficult while keeping intentional automation easy.**

Interactive use prompts for confirmation. CI bypasses it with `-y`. Dry-run never triggers it.

---

## What Rune Is Today

Rune is still a young project. The syntax can evolve. The attribute system can improve. Some ideas will probably turn out to be unnecessary, and some things I currently like may prove to be bad decisions.

But the core idea feels right:

> **Treat project tasks as first-class CLI commands.**

Make thinks in terms of build targets. Just provides a great interface for project recipes. Rune asks: *what if the project task itself were a CLI command?*

Then things like these make sense: `db:migrate` is a namespaced command. `make:model User` has an argument. `make:model User --force` has a boolean flag. `db:fresh` requires confirmation because it's destructive. And `rune --help` works because the project itself has a CLI interface.

---

## Maybe That's the Real Point

I'm not expecting everyone to abandon Make or Just. They're mature projects, and both solve real problems well. Rune doesn't need to win that competition.

I'd rather Rune be useful to developers who look at:

```bash
rune make:model User --force
```

and think: *"Yep. That's exactly how I want my project commands to work."*

Because that's how Rune started for me. I wanted a tool that felt natural. I wanted project tasks to feel like commands.

And, apparently, I wanted a colon badly enough to write an entire program for it.

Sometimes that's all the reason a side project needs.
