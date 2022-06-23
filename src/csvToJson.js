// export default (csv) => {
//     const lines = csv.split('\n');
//     const result = [];
//     const headers = lines[0].split(',');
//     for (let i = 1; i < lines.length; i++) {
//         const obj = {};
//         const currentline = lines[i].split(',');
//         for (let j = 0; j < headers.length; j++) {
//             obj[headers[j]] = currentline[j];
//         }
//         result.push(obj);
//     }
//     return result;
// }

// This is a csv that can contain strings which contain commas.
export default (csv) => {
    const data = Papa.parse(csv);
    if(data.errors.length) {
        throw data.errors;
    }
    const result = [];
    const header = data.data[0];
    for (let i = 1; i < data.data.length; i++) {
        const obj = {};
        const currentline = data.data[i];
        for (let j = 0; j < header.length; j++) {
            obj[header[j]] = currentline[j];
        }
        result.push(obj);
    }
    return result;
}