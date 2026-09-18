---
name: diagnosing-bugs
description: Systematically reproduce, isolate, and fix software defects.
---

# Diagnosing Bugs

Use this skill when the user asks to investigate a defect, regression,
unexpected output, failed test, or runtime error.

## Objectives

1. Reproduce the failure.
2. Separate symptoms from root causes.
3. Inspect the smallest relevant area of the codebase.
4. Form and test hypotheses.
5. Apply the smallest safe fix.
6. Verify the fix with tests or direct reproduction.

## Procedure

### 1. Establish the failure

Record:

- expected behavior
- actual behavior
- reproduction steps
- relevant error output
- affected environment

### 2. Inspect evidence

Read the relevant source files, tests, logs, configuration, and recent
changes before modifying code.

### 3. Test hypotheses

Prefer evidence-producing actions over speculative edits.

### 4. Apply the fix

Make the smallest change that resolves the verified root cause.

### 5. Verify

Run the relevant tests and reproduce the original workflow.

## Constraints

- Do not hide errors without resolving their cause.
- Do not make unrelated refactors during a bug fix.
- Do not claim success without verification.
