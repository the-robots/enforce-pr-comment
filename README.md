# 🪄 Enforce PR Approval Comment

This Action enforces reviewers to add a comment when marking a pull request as approved.

## Usage

To use this action, include it in your workflow as follows:

```yaml
name: Enforce PR Approval Comment

on:
  pull_request_review:
    types: [submitted]

jobs:
  enforce-comment:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Enforce PR approval comment
        uses: the-robots/enforce-pr-comment@v1.0.4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}

