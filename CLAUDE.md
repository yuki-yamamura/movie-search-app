# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## General Guidelines

- Without user instructions, the following actions are prohibited:
  - Starting tasks
  - Committing to Git
  - Pushing to GitHub
  - Merging PRs
  - Completing tasks
- Accessing `~/.ssh` is prohibited

## Project Overview

Movie search application built with Next.js and TypeScript.

## Repository Structure

```
.
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.yaml
├── public
├── README.md
├── src
│   ├── app
│   │   ├── (models)
│   │   │   ├── movie
│   │   │   │   ├── components
│   │   │   │   │   └── movie-list
│   │   │   │   │       ├── index.tsx
│   │   │   │   │       ├── movie-list.tsx
│   │   │   │   │       └── movie-card.tsx
│   │   │   │   ├── constants
│   │   │   │   │   └── index.ts
│   │   │   │   ├── hooks
│   │   │   │   │   └── useGetMovies.ts
│   │   │   │   ├── logic
│   │   │   │   │   └── api.ts
│   │   │   │   └── types
│   │   │   │       └── movie.ts
│   │   ├── (pages)
│   │   │   ├── page.tsx
│   │   │   ├── page.module.css
│   │   │   └── movies
│   │   │       ├── page.module.css
│   │   │       └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.module.css
│   │   ├── layout.tsx
│   │   ├── error.tsx
│   │   ├── error.module.css
│   │   ├── not-found.module.css
│   │   └── not-found.tsx
│   ├── components
│   │   ├── layout
│   │   └── ui
│   │       └── button
│   │           ├── index.module.css
│   │           └── index.tsx
│   └── utils
│       └── dayjs
│           ├── index.test.ts
│           └── index.ts
└── tsconfig.json
```

## Coding Conventions

### Commit Messages

- Write commit messages in English
- Follow Conventional Commits rules
  - Examples: `feat: add new command line option`, `fix: resolve parsing issue`, `docs: update README`

### Natural Language in Code

- Write code comments and test descriptions in English

### TypeScript Conventions

#### Naming Conventions

- Directory names: kebab-case
- File names: kebab-case
- Component names: PascalCase
- Type names: PascalCase

#### Modules

- Use Named exports unless restricted by libraries or frameworks
- Write `export` at the beginning of the target function or constant
- Relative path imports are only allowed within the same module

```typescript
// OK
import { Foo } from "./foo";

// NG
import { Bar } from "../bar";
```

#### Function Definitions

- Use Arrow Functions in all cases

### React Conventions

#### Basic Component Structure

Components follow these rules:

```typescript
// 1. "use client" directive (for client components)
"use client";

// 2. Internal imports
import { SubComponent } from "./sub-component";

// 3. External library imports
import { useState } from "react";

// 4. Type imports
import type { SomeType } from "@/path/to/types";

// 5. Style imports
import styles from "./index.module.css";

// 6. Props type definition
type Props = {
  prop1: string;
  prop2?: number;
};

// 7. Component implementation (exported as named export)
export const ComponentName = ({ prop1, prop2 }: Props) => {
  // Logic

  // JSX
  return <div className={styles.base}>{/* Content */}</div>;
};
```

- Use early returns when possible instead of conditional rendering in JSX
- Keep JSX as pure markup as much as possible

#### Component Directory Structure

Each component is placed in its own directory and includes the following files:

```
component-name/
├── index.tsx             # Component implementation
├── index.module.css      # Component-specific styles
├── index.stories.ts      # Storybook stories (if needed)
├── use-get-todo.ts       # Hooks used only by this component
└── index.test.ts         # Tests (if needed)
```

#### Separation

- Prioritize server components whenever possible
- Components export only a single component, except when adopting the composition pattern
- When file size becomes large, create child component directories under the parent component directory as needed

#### Type Imports

Use the `import type` syntax for type imports:

```typescript
import type { ComponentPropsWithChildren } from "react";

import type { SomeType } from "@/app/(models)/types/some-type";
```

### CSS Conventions

#### Using CSS Modules

All styles are implemented as CSS modules using the `.module.css` extension:

```css
.base {
  display: flex;
  flex-direction: column;
  row-gap: 24px;
}

.link {
  padding-inline: 12px;

  &:hover {
    background-color: #f7f2f0;
  }
}
```

#### CSS Class Naming Conventions

- Use `.base` class name for the base element
- Use semantic names for elements within components (`.header`, `.content`, `.icon`, etc.)
- For state-representing class names, use the format of target + state (`.linkActive`, `.buttonDisabled`, etc.)

#### Applying Styles

```typescript
import styles from "./index.module.css";

export const Component = () => (
  <div className={styles.base}>
    <span className={styles.label}>Label</span>
  </div>
);
```

#### Variants

- Use Class Variance Authority for component variants
- Use the `cx` utility when combining multiple classes

```typescript
import { cx } from "class-variance-authority";

<div className={cx(styles.base, someCondition && styles.active)}>
```

### Testing Conventions

#### Test File Placement

Test files should be placed in the same directory as the target file, using `.test.ts` or `.test.tsx` extensions.

#### Test Structure

- Adopt the 3A pattern (Arrange, Act, Assert)
- Mock data
  - Create within the same file as the test
  - Create factory functions as needed

## Task Management

- Task management is done through Notion's `Tasks` table
- If a workflow fails midway, defer to user's judgment

### Task Workflow

#### Parent Task

1. Check task status and change to "In Progress" if necessary
2. Check task start date/time and set if necessary (include time)
3. Create a branch from main in Git (branch name: `feature/<task-id>`)
4. Create an empty commit (commit message: `chore: start feature/<task-id>`)
5. Create a PR (`gh pr create --assignee @me --base main --draft`)
   - Title should reference the task title (`【<task-id>】<title>`)
   - Body should be generated from task content (include link to Notion task)
6. Consider implementation plan and communicate to user

#### Task Completion

1. Set PR status to ready
2. Merge PR (`gh pr merge --merge --auto --delete-branch`)
3. Change task status to "Completed"
4. Record task completion date/time (include time)

