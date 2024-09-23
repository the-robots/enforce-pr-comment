const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const token = core.getInput('github_token');  // Get the github_token input
    const octokit = github.getOctokit(token);     // Use the token for GitHub API requests

    const { context } = github;
    const { review, pull_request, repository } = context.payload;

    if (review.state === "approved" && (!review.body || review.body.trim() === "")) {
      await octokit.rest.issues.createComment({
        owner: repository.owner.login,
        repo: repository.name,
        issue_number: pull_request.number,
        body: `@${review.user.login}, approval without a comment is not allowed. Please provide a comment when approving the PR.`
      });

      throw new Error('Approval without a comment is not allowed. Please provide a comment.');
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
