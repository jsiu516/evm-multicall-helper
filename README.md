# Prerequisite
- Nodejs v16 or later
- Yarn or Npm

make sure run `yarn install` before using the script

# How to run
## To get the support interface
run `yarn main supportInterface <contractAddress>`\
Example: `yarn main supportInterface 0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D`

## To get the tokenURIs
run `yarn main tokenUrls <contractAddress> <numerical set>`\
Example: `yarn main tokenUrls 0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D 10-96,105`
You will get the tokenURI for tokenId #10-#96, #105
## To get the tokenId by index
run `yarn main tokenByIndex <contractAddress> <numerical set>`\
Example: `yarn main tokenByIndex 0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D 10-96,105`
You will get the tokenByIndex for index 10-96, 105

# Chain/Network Specification
This script also support Polygon and Cronos.\
You can specify `-c` for chain and `-n` for network\
chain: `ethereum`, `polygon`, `cronos` (default: `ethereum`)\
network: `mainnet`, `testnet` (default: `mainnet`)\
Example: `yarn main tokenUrls 0x7019d273a7384c75f9598f1a5494f106a76e4f23 5-10 -c cronos -n testnet`\
Explain: You are getting the tokenUrl of `#5-#10` from the contract `0x7019d273a7384c75f9598f1a5494f106a76e4f23` in `Cronos Testnet`.\
ref: https://testnet.cronoscan.com/address/0x7019d273a7384c75f9598f1a5494f106a76e4f23

# For help
run `yarn main --help`