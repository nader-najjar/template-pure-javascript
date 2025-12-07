# template-pure-javascript

JavaScript best practices

## Tips
* Run `echo "alias ub='./universal-build'" >> ~/.zshrc` then `source ~/.zshrc` to make `ub` a quick alias for `./universal-build`

&nbsp;

## Build Tasks

### `./universal-build build`
* ???

&nbsp;

## Workflows

### Adding A ???

### Adding A Toolchain Dependency
1) Search https://search.nixos.org/packages for the package name
2) Add the appropriate package to the package list in the `flake.nix` file

### Updating Nix `nixpkgs` Version
1) Modify the version of `inputs.nixpkgs.url` in the `flake.nix` file to the desired version, according to https://status.nixos.org
2) Run `./universal-build --update-nix-flake` to update the `flake.lock` lockfile
3) Commit both files to version control

&nbsp;

## IDE Setup

### WebStorm
1) ???

### Visual Studio Code
1) ???

&nbsp;

## References
* ???
