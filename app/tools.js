module.exports = {

    getTemplate: function (tempalte) {
        switch (tempalte) {
            case "Überschrift":
                return 1;
            case "Textfeld":
                return 6;
            case "Single-Choice":
                return 3;
            case "Multiple-Choice":
                return 3;
            case "Datum+Zeit":
                return 7;
            case "Datum":
                return 4;
            case "Zeit":
                return 5;
            default:
                return undefined
        }
    },

    defineBoolean: function (value) {
        return value === "ja" ? false : true;
    },

    multiselectRequired: function (type) {
        return type === 'Multiple-Choice';
    },

    addQuestionDetails: function (row, question) {

    const keys = Object.keys(row);

    // if row has property 'answer1' question details must be given
    if (keys.includes('answer1')) {

        let did = 1;
        for (const key of keys) {
            if (key === 'answer' + did) {

                let value = row['connected' + did];
                let connections = [];

                // if value is not empty push treated connection values to array
                if (value) {
                    let rawConnections = value.split(",");
                    rawConnections.forEach(function (connection) {
                        let int = parseInt(connection, 10) - 2;
                        connections.push(int);
                    })
                }

                let details = {
                    did: did,
                    answer: row['answer' + did],
                    connectedValues: connections,
                };

                // push details object into property
                question.detail.push(details);
                did++
            }
        }
    }
}

};