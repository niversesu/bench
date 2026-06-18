{ pkgs, ... }:

{
  # Enable Node.js and Bun for the dev environment
  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_22;
    npm.enable = true;
    bun = {
      enable = true;
      package = pkgs.bun;
    };
  };

  # Shell configuration
  enterShell = ''
    echo "DelphiTools devenv loaded!"
    echo "Node.js: $(node --version)"
    echo "Bun: $(bun --version)"
  '';
}
