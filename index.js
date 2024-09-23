const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    // Retrieve the GitHub token from the environment
    const token = process.env.GITHUB_TOKEN || core.getInput('GITHUB_TOKEN');
    const octokit = github.getOctokit(token);
    const { context } = github;
    const { review, pull_request, repository } = context.payload;

    // Check if the review is an approval and has no comment
    if (review.state === "approved" && (!review.body || review.body.trim() === "")) {
      // Post a comment on the pull request notifying the user
      await octokit.rest.issues.createComment({
        issue_number: pull_request.number,
        owner: repository.owner.login,
        repo: repository.name,
        body: `@${review.user.login}, approval without a comment is not allowed. Please provide a comment when approving the PR.`
      });

      throw new Error(`Approval without a comment is not allowed. Please provide a comment.`);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
