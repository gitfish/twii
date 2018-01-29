# Analyst Desktop
Analyst Desktop Application

## Pre-installation
# allow chromedriver to install for tests
SET CHROMEDRIVER_CDNURL=http://diacnexus.immi.gov.au/cloud-mirror/chromedriver/

or

export CHROMEDRIVER_CDNURL=http://diacnexus.immi.gov.au/cloud-mirror/chromedriver/

# node sass environment variable
SET SASS_BINARY_SITE=http://diacnexus.immi.gov.au/cloud-mirror/node-sass

or

export SASS_BINARY_SITE=http://diacnexus.immi.gov.au/cloud-mirror/node-sass

## Installing Dependencies
npm install

## Starting the server
npm run start

## Building with the default config
npm run build-watch

## Building with the mock config
npm run build-watch-mock


