'use strict';

const pathToInputFile = './data/input/rekon-raw.xlsx';
const pathToOutputFile = './data/output/rekon/';
const nameOfOutputFile = 'glasbruch';

const tools = require('./tools');
const {v4: uuidv4} = require('uuid');
const excelToJson = require('convert-excel-to-json');
const input = excelToJson({
    sourceFile: pathToInputFile,
    header: {
        rows: 1
    },
    columnToKey: {
        A: 'type',
        B: 'content',
        C: 'answer1',
        D: 'connected1',
        E: 'answer2',
        F: 'connected2',
        G: 'answer3',
        H: 'connected3',
        I: 'answer4',
        J: 'connected4',
        K: 'answer5',
        L: 'connected5',
        M: 'answer6',
        N: 'connected6',
        O: 'answer7',
        P: 'connected7',
        Q: 'answer8',
        R: 'connected8',
        S: 'answer9',
        T: 'connected9',
        U: 'answer10',
        V: 'connected10',
        W: 'answer11',
        X: 'connected11',
        Y: 'answer12',
        Z: 'connected12',
        AA: 'answer13',
        AB: 'connected13',
        AC: 'answer14',
        AD: 'connected14',
        AE: 'answer15',
        AF: 'connected15',
        AG: 'answer16',
        AH: 'connected16',
        AI: 'answer17',
        AJ: 'connected17',
        AK: 'answer18',
        AL: 'connected18',
        AM: 'answer19',
        AN: 'connected19',
        AO: 'answer20',
        AP: 'connected20',
        AQ: 'answer21',
        AR: 'connected21',
        AS: 'answer22',
        AT: 'connected22',
        AU: 'answer23',
        AV: 'connected23',
        AW: 'answer24',
        AX: 'connected24',
        AY: 'answer25',
        AZ: 'connected25',
        BA: 'answer26',
        BB: 'connected26',
        BC: 'answer27',
        BD: 'connected27',
        BE: 'answer28',
        BF: 'connected28'
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
    question.mandatory = false;
    question.qtext = row.content;
    question.template = tools.getTemplate(row.type);
    question.hidden = false;
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
