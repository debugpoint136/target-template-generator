export function getDropdownOptions(name) {
    const json = require(`../../json/fields/${name}.js`);
    const options = json.filter(item => item.values_restricted === false)
                        .map(listObj => {
                            let tmp = {};
                            tmp[listObj.text] = listObj.values;
                            return tmp
                        });
    let result = {}
    Object.keys(options).forEach(elem => {
        const entry = options[elem];
        const key = Object.keys(entry)[0];
        const values = entry[key];

        result[key] = formatForDropDown(values);
    })

    return result;
}

function formatForDropDown(list) {
    return list.map((d, i) => ({ key: d, text: d, value: d }))
}