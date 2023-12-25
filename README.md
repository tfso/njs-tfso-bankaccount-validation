# njs-tfso-bankaccount-validation
Validation of IBAN and BBAN numbers and other country specific bank account formats. Extendable with custom validations

# Rules
## Swedish Bban rules is implemented based on this document:
https://www.bankgirot.se/globalassets/dokument/anvandarmanualer/bankernaskontonummeruppbyggnad_anvandarmanual_sv.pdf
EG25001000540
EG250010005400000100026173878

## Change log
The [CHANGELOG.md](CHANGELOG.md) is automatically generated by [`auto-changelog`](https://github.com/CookPete/auto-changelog) by analysing PR, tags and commits.

# Contribution
You are welcome to contribute to the project by creating a pull request. Please follow the guidelines below to 
contribute effectively.

## Creating a Pull Request (PR)
To create a pull request, follow these steps:
### 1. Clone the repository

### 2. Create branch

- Create a new branch for your feature or bug fix.

```shell
git checkout -b feature/your-feature
```

### 2. Make Changes

- Make your changes and ensure they follow our coding standards.

### 3. Commit Changes

- Include `#deploy_branch` in your commit message in order to create a prerelease of your branch

```shell
git add .
git commit -m "Descriptive commit message #deploy_branch"
```

### 4. Push Changes

- Push your changes to the repository.

```shell
git push origin feature/your-feature
```

### 5. Open a Pull Request

- Go this repository on GitHub
- Click on "New Pull Request."
- Provide a detailed description of your changes.
- Add a reviewer to your pull request.

## Prerelease
If you need to test your branch during development, create a commit that includes `#deploy_branch` in the commit message. 
This will trigger a prerelease, allowing you to test in your project without creating a full package release. 

### CICD rules
- auto prerelease on commit message `#deploy_branch`
- auto prerelease from `main` branch

## Release
To create a new official release that update the `latest` release of the package, follow these steps:

### 1. Merge to Master
   - Ensure your changes are merged into the main branch.
### 2. Draft a New Release
   - Go to the GitHub repository.
   - Click on the "Releases" tab.
   - Click "Draft a new release."
### 3. Tag the Release
   - Choose a version number following semantic versioning (e.g., v1.0.0).
   - Provide release notes summarizing the changes since the last release.
### 4. Publish the Release
   - Click "Publish release" to make it official.

Thank you for your contribution!