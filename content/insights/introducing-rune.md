---
title: "Introducing Rune: Project Tasks Should Be CLI Commands"
description: "Make is powerful but complex for everyday project tasks. Just is simpler, but it has no colon namespaces. So I built Rune — a task runner with a different approach."
date: "2026-09-10T10:00:00.000Z"
tags: [golang, cli, task-runner, open-source]
readTime: 6
---

I didn't set out to build a task runner.

The world doesn't lack options. There's Make. There's Just. There are Taskfile, Mage, and plenty of others. I tried them in that order — and each one taught me exactly what I actually wanted.

**Make is powerful, but it's complex for everyday project tasks.** I don't need a build system that reasons about artifacts and timestamps just to run my tests. And passing values through `ENV=var` workarounds never felt like a command interface.

**Just is much closer.** Positional arguments work, the syntax is pleasant, and for a while I thought I was done. But it has no colon namespaces — I couldn't write `db:migrate`. And there's no such thing as a boolean flag.

So I built Rune, with a different approach:

> **A project task should be treated more like a CLI command than a shell recipe.**

---

## Tasks as Commands, Not Recipes

Most task runners model the world like this:

```text
task → shell commands
```

Rune models it like this:

```text
command
├── name
├── namespace
├── description
├── arguments
├── flags
├── confirmation
├── dependencies
└── execution
```

The shell command is only one part. The command itself has an interface — and that interface should be explicit. That single decision shapes everything in Rune.

---

## The Runefile

A `Runefile` at your project root turns into a self-documenting CLI:

```text
#[Build the application binary]
build target="dev" --race?:
    go build {{race}} -o ./bin/app ./...

#[Run unit and integration tests]
test: build
    go test ./...

#[Reset the database schema]
#[confirm: This will permanently delete all database data.]
db:fresh:
    dropdb --if-exists app_dev && createdb app_dev

#[Forward arbitrary commands to Docker Compose]
compose *args:
    docker compose {{args}}
```

Then the project tells you how it works:

```bash
rune                           # list all available tasks
rune build                     # run with defaults
rune build production --race   # with arguments and flags
rune build --help              # auto-generated per-task help
rune --dry-run release         # simulate without executing
```

No separate documentation to drift out of sync. The task definition **is** the source of truth.

---

## The Colon I Wanted

The feature that started all of this — namespaced commands, straight from my Laravel Artisan background:

```text
db:migrate
db:seed
db:fresh
make:model
```

When I see `db:migrate`, I immediately understand the relationship between `db` and `migrate`. It's a tiny namespace, and namespaces act like command groups:

```bash
rune db        # discover tasks inside the 'db' namespace
rune db --help
```

---

## Flags, Not Environment Variables

Boolean flags are declared right in the signature with `--<name>?`:

```text
build target="dev" --race?:
    go build {{race}} ./...
```

```bash
rune build
rune build --race
rune build production --race
```

When `--race` is passed, `{{race}}` expands to `--race`. When omitted, it expands to nothing. No `ENV=var` workarounds. And if you mistype a flag, Rune suggests the intended one:

```bash
rune build --rce
# ✗ Unknown option: --rce
# Did you mean: --race
```

For tools that accept arbitrary arguments, there's explicit passthrough:

```text
compose *args:
    docker compose {{args}}
```

```bash
rune compose exec api sh -c "echo 'Health check'" --user=root
```

---

## Dangerous Commands Should Say So

Once you think about tasks as commands, another problem becomes obvious. Not every command is harmless:

```text
test, lint, build     ← safe
db:fresh, db:wipe     ← destructive
```

So destructive tasks get a built-in confirmation prompt:

```text
#[Reset the database schema]
#[confirm: This will permanently delete all database data.]
db:fresh:
    dropdb --if-exists app_dev && createdb app_dev
```

The philosophy: **make accidental execution difficult while keeping intentional automation easy.** Interactive use prompts for confirmation. CI bypasses it with `-y`. And `--dry-run` shows the full execution plan without running anything:

```bash
rune --dry-run release
```

```text
[dry-run] Execution plan for 'release':
  1. build
     $ go build ./...
  2. test
     $ go test ./...
  3. release
     $ ./release.sh
```

Dependencies also come with guarantees: deterministic ordering, deduplication (a shared dependency runs exactly once), cycle detection, and fail-fast execution.

---

## How It Compares

|  | Make | Just | Rune |
| :--- | :---: | :---: | :---: |
| Positional arguments | `ENV=var` | ✓ | ✓ |
| Boolean flags (`--flag`) | ✗ | ✗ | ✓ |
| Auto-generated `--help` | ✗ | ✗ | ✓ |
| Colon namespaces (`db:fresh`) | ✗ | ✗ | ✓ |
| Interactive confirmation | ✗ | ✗ | ✓ |
| Shell completion | Partial | Partial | ✓ |
| Dependency deduplication | ✓ | ✗ | ✓ |

Rune also ships console UI helpers (`rune info`, `rune warn`, `rune done`, `rune fail`, `rune error`) for status output inside your recipes, and tab completion for Bash, Zsh, and Fish.

---

## Try It

**Homebrew (macOS / Linux)**

```bash
brew install octopyid/tap/rune
```

**Go**

```bash
go install github.com/octopyid/rune/cmd/rune@latest
```

The project is open source under the MIT license. Source, documentation, and issue tracker live at [github.com/octopyid/rune](https://github.com/octopyid/rune).

---

## What Rune Is Not

Rune organizes and runs tasks. It does not try to manage your entire project lifecycle. It is not a build system, a CI/CD platform, a deployment tool, a package manager, a scheduler, or a scripting language.

If a feature doesn't directly improve how tasks are **defined, discovered, invoked, or protected** — it doesn't belong in Rune.

---

## Why It Exists

Make thinks in terms of build targets. Just provides a great interface for project recipes. Rune asks: *what if the project task itself were a CLI command?*

Then things like these make sense: `db:migrate` is a namespaced command. `build production --race` has an argument and a flag. `db:fresh` requires confirmation because it's destructive. And `rune --help` works because the project itself has a CLI interface.

I'm not expecting everyone to abandon Make or Just. They're mature projects, and both solve real problems well. I'd rather Rune be useful to developers who look at:

```bash
rune make:model User --force
```

and think: *"Yep. That's exactly how I want my project commands to work."*

Because that's how Rune started. Make felt complex for simple project tasks. Just felt right, but it had no colons. And apparently, I wanted a colon badly enough to write an entire program for it.

Sometimes that's all the reason a side project needs.
