import JSonManager from './json-manager.js';
import {init, handlers, updateMap, updateFields} from "./input.js";

const test = await (await fetch('./data/arbresremarquablesparis.json')).json();

let jsm;

handlers.onKeyApply = (path, key) => {
    jsm.addMap(path, key);
    updateMap(jsm.getMap_HTML());
}
handlers.onMapClick = (key) => {
    jsm.removeMap(key);
    updateMap(jsm.getMap_HTML());
}
handlers.onImport = (json) => {
    jsm = new JSonManager(json);
    updateFields(jsm.getInputFields_HTML());
    updateMap(jsm.getMap_HTML());
    init();
}
handlers.onExport = () => {
    jsm.parseMap();
    const blob = new Blob([jsm.export()], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = $("#file-name").val() || "export.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};

window.JSonManager = JSonManager;
