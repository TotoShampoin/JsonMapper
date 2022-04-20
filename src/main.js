import JSonManager from './json-manager.js';
import {init, handlers, updateMap, updateFields} from "./input.js";
import {preview_input, preview_output} from "./preview.js";

let jsm;

handlers.onKeyApply = (path, key) => {
    if(!jsm) return;
    jsm.addMap(path, key);
    updateMap(jsm.getMap_HTML());
}
handlers.onMapClick = (key) => {
    if(!jsm) return;
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
    if(!jsm) return;
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
handlers.onPreview = () => {
    if(!jsm) return;
    jsm.parseMap();
    preview_input(jsm.input);
    preview_output(jsm.output);
}

window.JSonManager = JSonManager;
