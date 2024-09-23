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
```

## Expected output

The check will fail.

<img width="879" alt="Screenshot 2024-09-23 at 2 17 05 PM" src="https://github.com/user-attachments/assets/b8d2dbb1-2636-4974-b0a9-d4d47ac5b5e7">

A comment will be added to the pull request.
<img width="838" alt="Screenshot 2024-09-23 at 2 17 27 PM" src="https://github.com/user-attachments/assets/86c44cb6-bd07-4f12-a3f4-8f5247949f5b">

If you need the pull request to be stopped, you would need to turn on branch-protection to require all checks to pass.

### Branch Protection Setup (Required)

To ensure that a pull request cannot be merged unless a reviewer provides a comment with their approval, you must enable branch protection rules on the relevant branch (e.g., main, develop). This will ensure that the GitHub Action becomes a required status check and must pass before the pull request is merged.
How to Enable Branch Protection Rules

- Go to the Repository Settings:
   In your repository, click on the Settings tab.
   In the left sidebar, click on Branches under the "Code and automation" section.

- Add a Branch Protection Rule:
   Scroll down to the Branch protection rules section and click Add rule.
   In the Branch name pattern field, enter the branch name you want to protect (e.g., main or develop).

- Require Status Checks to Pass Before Merging:
   Check the box for "Require status checks to pass before merging".
   In the list of status checks, ensure the action (Enforce PR Approval Comment) is selected. If you don’t see it listed, run the action on a PR first, and it will appear in the list.

- Optionally, enable "Require branches to be up to date before merging" to ensure the branch is synced with the base branch.

- Require Pull Request Reviews:
   Optionally, you can enable "Require pull request reviews before merging" and set a required number of reviewers.

- Save the Rule:
        Click Create or Update rule to apply the branch protection rule.

Example Use Case:

With branch protection rules enabled, when a reviewer approves a PR without leaving a comment, the Enforce PR Approval Comment action will fail, and the pull request will be blocked from merging until a valid comment is provided along with the approval.

Why This is Important

The branch protection rule ensures that the status check from the GitHub Action is enforced, making it impossible for a PR to be merged until all checks (including this action) pass. Without this, reviewers can approve and merge a pull request even if they haven't provided a comment.
