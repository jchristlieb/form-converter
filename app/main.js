'use strict';

const pathToInputFile = './data/input/Fragebogen.xlsx';
const pathToOutputFile = './data/output/';
const nameOfOutputFile = 'form';

const tools = require('./tools');
const {v4: uuidv4} = require('uuid');
const excelToJson = require('convert-excel-to-json');
const input = excelToJson({
    sourceFile: pathToInputFile,
    header: {
        rows: 1
    },
    columnToKey: {
        A: 'mandatory',
        B: 'type',
        C: 'content',
        D: 'answer1',
        E: 'connected1',
        F: 'answer2',
        G: 'connected2',
        H: 'answer3',
        I: 'connected3',
        J: 'answer4',
        K: 'connected4',
        L: 'answer5',
        M: 'connected5',
        N: 'answer6',
        O: 'connected6',
        P: 'answer7',
        Q: 'connected7',
        R: 'answer8',
        S: 'connected8',
        T: 'answer9',
        U: 'connected9',
        V: 'answer10',
        W: 'connected10'
    }
});

// declare form constant
const form = [];
let qid = 0;

// iterate over each row of the excel file sheet called "Fragen"
input.Fragen.forEach(function (row) {

    // create question properties
    let question = {};
    question.qid = qid;
    question.quuid = uuidv4();
    question.mandatory = row.mandatory;
    question.qtext = row.content;
    question.template = tools.getTemplate(row.type);
    question.multiselect = tools.multiselectRequired(row.type);
    question.detail = [];
    tools.addQuestionDetails(row, question);

    // push question to form
    form.push(question);
    qid++;
});


// write input into json file
const result = JSON.stringify(form);
const fs = require('fs');
fs.writeFile(pathToOutputFile + nameOfOutputFile + '.json', result, function (err, result) {
    if (err) console.log('error', err);
});
