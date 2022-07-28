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

# For help
run `yarn main --help`