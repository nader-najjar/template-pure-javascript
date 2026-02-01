# template-pure-javascript

JavaScript best practices.

&nbsp;

## 1. Local Development Machine Prerequisites

* Install Nix as per https://nix.dev/install-nix
    * Nix handles all other requirements so that developer machine setup is as minimal as possible
    * Further, it does not matter what version of Nix you have - it guarantees reproducibility

&nbsp;

## 2. Tips

* Run `echo "alias ub='./universal-build'" >> ~/.zshrc` then `source ~/.zshrc` to make `ub` a quick alias for `./universal-build`

&nbsp;

## 3. Build Tasks

### `./universal-build build`
* Installs dependencies according to the pnpm lockfile
* Runs ESLint
* Compiles TypeScript code into JavaScript
* Runs unit tests with code coverage thresholds enforced
* Builds a container image with Podman, set to run the code entrypoint (tagged `<project-name>:latest`)
* Saves the image as `dist/container-image.tar`

### `./universal-build clean`
* Removes temporary build outputs

&nbsp;

## 4. Workflows

### Handling NPM Dependencies
* NPM dependencies should never be manually edited. Always use one of these flows to add/remove/update
  * If manual edits cause drift with the lockfile, run `./universal-build install` to regenerate the lockfile (again, this command should never have to be executed - use the below instead)
* To add a dependency:
  * `devDependencies`: `./universal-build add -D <package-name>`
  * `dependencies`: `./universal-build add <package-name>`
* To remove a dependency:
  * `devDependencies`: `./universal-build remove -D <package-name>`
  * `dependencies`: `./universal-build remove <package-name>`
* To update a dependency:
  * `devDependencies`: `./universal-build add -D <package-name>@<version>`
  * `dependencies`: `./universal-build add <package-name>@<version>`
* To update all dependencies to latest compatible versions:
  * `./universal-build update --latest`

### Adding A Toolchain Dependency
1) Search https://search.nixos.org/packages for the package name
2) Add the appropriate package to the package list in the `flake.nix` file
3) If the dependency is in a different channel than the current `nixpkgs` version, run the workflow for "Updating Nix `nixpkgs` Version"

### Updating Nix `nixpkgs` Version
1) Modify the version of `inputs.nixpkgs.url` in the `flake.nix` file to the desired version, according to https://status.nixos.org
2) Run `./universal-build --update-nix-flake-lockfile` to update the `flake.lock` lockfile
3) Commit both files to version control

### Updating Node Version
* Follow the steps in the workflow "Adding A Toolchain Dependency", using `Node` as the package name
* Update references to the node version in `package.json`
* The `tsconfig.json` may need to be updated as well

### Updating PNPM Version
* Do not update PNPM with the usual notice banner and update command
* Follow the steps in the workflow "Adding A Toolchain Dependency", using `pnpm` as the package name

&nbsp;

## 5. IDE Setup

### IntelliJ IDEA Ultimate
1) Open the IntelliJ welcome splash screen, and make sure the `Multi-Project Workspace` plugin is installed (https://plugins.jetbrains.com/plugin/24765-multi-project-workspace)
2) Click `New Project` and select type `Workspace`, don't add any projects yet, and click `Create`
3) Run `./universal-build --print-node-and-pnpm-paths-for-ide` to get the local nix installation of the Node version and pnpm version specified in the flake
4) Go to `Settings -> Languages & Frameworks -> JavaScript Runtime`, then select both the Node and the pnpm paths from step 3 (make sure to do both)
5) Right click the workspace in the project view and click `Add Projects to Workspace` and select this cloned repository folder
6) Correctly configure the project structure under File -> Project Structure -> Modules (mark sources, tests, etc.)

### Visual Studio Code
1) Open an empty Visual Studio Code startup window (important!!)
2) Run `./universal-build --print-node-and-pnpm-paths-for-ide` to get the local nix installation of the Node version and pnpm version specified in the flake
3) Go to folder settings JSON (`cmd+shift+p -> Preferences: Open Folder Settings (JSON)`), and configure the `node` and `pnpm` paths by adding the following. By placing this in your folder settings rather than the user/workspace settings, it will ensure you can properly configure this per-repository:
   * `"nodejs-runtime.executablePath": "<node-path-from-step-2>"`
   * `"npm.packageManager": "pnpm"`
   * `"pnpm.path": "<pnpm-path-from-step-2>"`
4) Click `File -> Add Folder to Workspace` and select this cloned repository

&nbsp;

## 6. References

### Nix
* Installation: https://nix.dev/install-nix
* Nix Versions: https://status.nixos.org
* Nix Package Search: https://search.nixos.org/packages
