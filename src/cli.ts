/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/glob/glob.d.ts" />
/// <reference path="../typings/minimist/minimist.d.ts" />

import Runner from "./runner";
import File from "./file";
import * as Formatters from "./formatters/";

import * as fs from "fs";
import * as glob from "glob";
import * as minimist from "minimist";

let argv = minimist(process.argv.slice(2));
let format = "default";
let output = "";
let files: Array<File> = [];

if (argv["f"] !== undefined || argv["format"] !== undefined) {
    if (argv["f"] !== undefined) {
        format = argv["f"];
    } else {
        format = argv["format"];
    }
}

if (argv["h"] !== undefined || argv["help"] !== undefined) {
    output = output + "Usage: aoc [options] [file ...]\n";
    output = output + "\n";
    output = output + "Options:\n";
    output = output + "  -h, --help       display this help\n";
    output = output + "  -f, --format     output format (standard, total)\n";
    output = output + "  -v, --version    current version\n";
} else if (argv["v"] !== undefined || argv["version"] !== undefined) {
    let raw = fs.readFileSync(__dirname + "/../package.json", "utf8");
    output = output + JSON.parse(raw).version + "\n";
} else if (argv._[0] === undefined) {
    output = output + "Supply filename\n";
} else {
    for (const file of argv._) {
        glob.sync(file).forEach(function (filename: string) {
            let file = new File(filename, fs.readFileSync(filename, "utf8"));
            files.push(file);
        } );
    }

    Runner.run(files);

    switch (format) {
        case "total":
            output = Formatters.Total.output(files);
            break;
        case "json":
            output = Formatters.Json.output(files);
            break;
        default:
            output = Formatters.Standard.output(files);
    }
}

process.stdout.write(output, () => {
    let count = 0;
    files.forEach((file) => { count = count + file.get_issues().length; });

    if (count > 0) {
        process.exit(1);
    }
});