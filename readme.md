# Excel to JSON form converter

The app converts `.xlsx` files into a valid `.json` format.

## Requirements

In order to run the application the following software is required:
* node
* npm

## Getting started

To run the program you need to execute `main.js`. By default the app uses `form-converter/data/input/Fragenbogen.xlsx` 
as input file and writes the output into `form-converter/data/output`.

### Define input and output variables

Within `main.js` you may adjust the following variables for your needs:

* `pathToInputFile`
* `pathToOutputFile`
* `nameOfOutputFile`

## Troubleshooting 
If you can not execute `main.js` you may need to configure your IDE with the 
execution environment for this app:

* node interpreter: e.g. `/usr/local/bin/node`
* working directory: `path/to/form-converter`
* execution file: `form-converter/app/main.js`
