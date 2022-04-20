const $input = $("#preview-input");
const $output = $("#preview-output");

export const preview_input = (json) => {
    if(Array.isArray(json)) {
        $input.html(JSON.stringify(json[0], null, 4));
    } else {
        $input.html(JSON.stringify(json, null, 4));
    }
}

export const preview_output = (json) => {
    if(Array.isArray(json)) {
        $output.html(JSON.stringify(json[0], null, 4));
    } else {
        $output.html(JSON.stringify(json, null, 4));
    }
}
