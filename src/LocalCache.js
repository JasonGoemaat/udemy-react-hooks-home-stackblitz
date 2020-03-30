const values = {};
window.values = values;

const obj = {
    get: (key, dft) => {
        if (!values[key]) {
            const str = localStorage.getItem(key);
            if (str) {
                const v = JSON.parse(str);
                values[key] = v;
            } else {
                values[key] = dft;
            }
        }
        return values[key];
    },
    set: (key, obj) => {
        values[key] = obj;
        localStorage.setItem(key, JSON.stringify(obj));
    }
};

window.lc = obj;

export default obj;