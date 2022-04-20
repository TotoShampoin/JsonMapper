import JSonManager from './json-manager.js';

const test = await (await fetch('./data/arbresremarquablesparis.json')).json();

const jsm = new JSonManager(test);

console.log(jsm.getInputFields());

$("#json-fields").html(jsm.getInputFields_HTML());



window.JSonManager = JSonManager;
