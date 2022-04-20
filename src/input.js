export const handlers = {
    onKeyApply: (path, key) => {},
    onFieldClick: (path) => {},
    onMapClick: (key) => {},
    onImport: (e) => {},
    onExport: (e) => {},
}

const $fields = $("#json-fields");
const $map = $("#map-zone");
const $new_key = $("#new-key");
const $key_apply = $("#json-new-key");
const $import = $("#import");
const $export = $("#export");

/* listens drag over $import */
$(`label[for="import"]`).on('dragover', function(event) {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'copy';
});
$(`label[for="import"]`).on('drop', function(event) {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        handlers.onImport(JSON.parse(event.target.result));
    };
    reader.readAsText(file);
});

$import.on('change', function(event) {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        handlers.onImport(JSON.parse(event.target.result));
    };
    reader.readAsText(file);
});

$export.on('click', function(event) {
    event.preventDefault();
    handlers.onExport();
});

export const init = () => {
    $fields.find(".jsfield:not([data-key])").on("click", function(event) {
        event.stopPropagation();
        handlers.onFieldClick($(this).data("path"));
        $fields.find(".jsfield").removeClass("jsfield--selected");
        $(this).addClass("jsfield--selected");
    });
    
    $key_apply.on('submit', function(event) {
        event.preventDefault();
        $new_key.val($new_key.val().trim());
        const $selected = $(".jsfield--selected");
        if($new_key.val() === "") {
            $new_key.val($selected.children(".jsfield__key").text());
        }
        if($map.find(`[data-key="${$new_key.val()}"]`).length) {
            $new_key.val("");
            return;
        }
        if($selected[0]) {
            const path = $selected.data("path");
            const key = $new_key.val();
            handlers.onKeyApply(path, key);
            $new_key.val("");
            $selected.removeClass("jsfield--selected");
        }
    });
}

export const updateFields = (html) => {
    $fields.html(html);
}

export const updateMap = (html) => {
    $map.html(html);
    $fields.find(`.jsfield`).removeAttr("data-key");
    $map.find(".jsmap").each(function() {
        const path = $(this).data("path");
        const key = $(this).data("key");
        $fields.find(`[data-path="${path}"]`).attr("data-key", key);
    }).on("click", function(event) {
        event.stopPropagation();
        handlers.onMapClick($(this).data("key"));
    });
};
