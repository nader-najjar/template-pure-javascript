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

### Adding A Toolchain Dependency
1) Search https://search.nixos.org/packages for the package name
2) Add the appropriate package to the package list in the `flake.nix` file

### Updating Nix `nixpkgs` Version
1) Modify the version of `inputs.nixpkgs.url` in the `flake.nix` file to the desired version, according to https://status.nixos.org
2) Run `./universal-build --update-nix-flake` to update the `flake.lock` lockfile
3) Commit both files to version control

&nbsp;

## 5. IDE Setup

### WebStorm
1) Run `./universal-build --print-node-and-pnpm-paths-for-ide` to get the local nix installation of the Node version and pnpm version specified in the flake.
2) Go to `Settings -> Languages & Frameworks -> Node.js`, then select the Node and the pnpm paths from step 1 (make sure to do both)

### Visual Studio Code
1) ???

&nbsp;

## 6. References

### Nix
* Installation: https://nix.dev/install-nix
* Nix Versions: https://status.nixos.org
* Nix Package Search: https://search.nixos.org/packages
