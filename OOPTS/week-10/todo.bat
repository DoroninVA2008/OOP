@echo off
node -e "import('./src/services/cli.js').then(m => m.cliService(...process.argv.slice(2)))" %*