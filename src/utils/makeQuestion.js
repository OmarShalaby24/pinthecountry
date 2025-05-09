"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeQuiz = exports.makeQuestion = void 0;
var countries = require("./Countries.json");
// console.log(countries[0]);
var makeQuestion = function () {
    var _a;
    var options = __spreadArray([], countries, true);
    var count = countries.length;
    var answer = options[Math.floor(Math.random() * count)];
    var code = answer.code;
    count--;
    options = options.filter(function (c) { return c !== answer; });
    // console.log('after choosing an answer');
    // console.log({answer});
    // console.log({options});
    var choices = [answer.name];
    for (var i = 0; i < 2; i++) {
        var pickedCountry = options[Math.floor(Math.random() * count)];
        var choice = pickedCountry.name;
        count--;
        options = options.filter(function (c) { return c !== pickedCountry; });
        choices = __spreadArray(__spreadArray([], choices, true), [choice], false);
        // console.log('after choosing an option');
        // console.log({choice});
        // console.log({options});
    }
    //shuffle options
    var randomPositionForAnswer = Math.floor(Math.random() * 3);
    _a = [
        choices[randomPositionForAnswer],
        choices[0],
    ], choices[0] = _a[0], choices[randomPositionForAnswer] = _a[1];
    return { answer: answer, choices: choices, code: code };
};
exports.makeQuestion = makeQuestion;
var makeQuiz = function (numberOfQuestions) {
    var answers = [];
    var options = [];
    var imagePaths = [];
    for (var i = 0; i < numberOfQuestions; i++) {
        var _a = (0, exports.makeQuestion)(), answer = _a.answer, choices = _a.choices, code = _a.code;
        if (answers.includes(answer.name)) {
            i--;
            continue;
        }
        answers.push(answer.name);
        options.push(choices);
        imagePaths.push("../assets/images/flags/".concat(code, ".png"));
    }
    return { answers: answers, options: options, imagePaths: imagePaths };
};
exports.makeQuiz = makeQuiz;
console.log((0, exports.makeQuiz)(10));
