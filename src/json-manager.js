const getJSONfields = (json) => {
    if(Array.isArray(json) && json[0] && typeof json[0] === 'object') {
        /**
         * @type {{key: string, count: number, content: any, everywhere: boolean}}
         */
        const fields = [];
        json.forEach(element => {
            for(const key in element) {
                const field = fields.find(field => field.key === key);
                if(!field) {
                    fields.push({
                        key: key,
                        count: 1,
                        content: typeof element[key] === 'object' ? getJSONfields(element[key]) : typeof element[key],
                    });
                } else {
                    field.count++;
                }
            }
        });
        return fields.map(field => ({
            ...field,
        }));
    }
    if(Array.isArray(json)) {
        return json.map(element => ({
            key: '',
            count: 1,
            content: typeof element === 'object' ? getJSONfields(element) : typeof element,
        }));
    }
    if(typeof json === 'object' && json !== null) {
        return Object.keys(json).map(key => ({
            key,
            count: 1,
            content: typeof json[key] === 'object' ? getJSONfields(json[key]) : typeof json[key],
        }));
    }
    return null;
}

const getJSONfields_HTML = (fields, parent = "") => {
    const html = fields.map(field => `
        <div class="jsfield" data-path="${parent}${field.key}">
            ${field.key && `<div class="jsfield__key">${field.key}</div>`}
            <div class="jsfield__content">${
            (typeof field.content === 'object' && field.content !== null)
                ? getJSONfields_HTML(field.content, `${parent}${field.key}.`)
                : field.content
            }</div>
        </div>
    `).join('');
    return html;
}

class JSonManager {
    /** @type {any} */ input;
    /** @type {any} */ output;
    map = [];
    constructor(json) {
        this.input = json;
        this.map = [];
    }
    getInputFields() { return getJSONfields(this.input) }
    getInputFields_HTML() {
        const fields = this.getInputFields();
        return getJSONfields_HTML(fields)
    }
    addMap(input_path, output_key) {
        if(this.map.find(map => map.output_key === output_key)) return false;
        this.map.push({
            input_path,
            output_key,
        });
        return true;
    }
    removeMap(output_key) {
        this.map = this.map.filter(map => map.output_key !== output_key);
    }
    getMap_HTML() {
        const html = this.map.map(map => `
            <div class="jsmap" data-path="${map.input_path}" data-key="${map.output_key}">
            <div class="jsmap__output">${map.output_key}</div> ⇐
                <div class="jsmap__input">${map.input_path}</div>
            </div>
        `).join('');
        return html;
    }
    parseMap() {
        this.output = this.input.map(element => this.map.reduce((output, map) => {
            const input_path = map.input_path.split('.');
            const output_key = map.output_key;
            let current = element;
            input_path.forEach(path => {
                current = current[path];
            });
            output[output_key] = current;
            return output;
        }, {}));
    }
    export() {
        return JSON.stringify(this.output);
    }
}

export default JSonManager;
