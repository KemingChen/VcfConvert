var fs = require("fs");
var filename = process.argv[2];

getContent(filename).forEach(function(line) {
    var data = line.split(":");
    var tag = data[0];
    var content = data[1];

    if (["END"].indexOf(tag) >= 0) {
        console.log("- - - - - - - - - - - - - - -");
    }
    if (["EMAIL;HOME", "EMAIL;PREF"].indexOf(tag) >= 0) {
        console.log("Email: " + content);
    }
    if (["N", "FN"].indexOf(tag) >= 0) {
        if (tag[0] != 'N')
            console.log("Name: " + content.replace(/;/g, ''));
    }
    if (["N;CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE", "FN;CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE"].indexOf(tag) >= 0) {
        if (tag[0] != 'N')
            console.log("Name: " + BufferString(content));
    }
    if (["TEL;CELL", "TEL;CELL;PREF", "TEL;WORK", "TEL;HOME", "TEL;HOME;PREF", "TEL;VOICE", "TEL;WORK;PREF"].indexOf(tag) >= 0) {
        console.log("Tel: " + content);
    }
    if (["NOTE"].indexOf(tag) >= 0) {
        console.log("Note: " + content);
    }
    if (["NOTE;CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE"].indexOf(tag) >= 0) {
        console.log("Note: " + BufferString(content));
    }
    if (["BDAY"].indexOf(tag) >= 0) {
        console.log("Birthday: " + content);
    }
});

function BufferString(data) {
    data = data.replace(/=/g, '');
    data = data.replace(/;/g, '');
    var buffer = new Buffer(data, 'hex');
    return buffer.toString();
}

function getContent(filename) {
    var array = fs.readFileSync(filename, 'utf-8').split('\r\n');
    var result = [];
    for (var i = 0; i < array.length; i++) {
        var line = array[i];
        if (line.indexOf(":") >= 0) {
            result.push(line);
        } else {
            result[result.length - 1] += line;
        }
    }
    return result;
}
