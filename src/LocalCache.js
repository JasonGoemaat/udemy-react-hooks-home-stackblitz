/**
 * Usage:
 * 
 * LocalCache.get('name', 'Jason')
 * 
 * This will get the last value entered for 'name' with a default of 'Jason'.
 * 
 * LocalCache.set('name', 'Brian')
 * 
 * This will update the 'name' value to 'Brian'.
 * 
 * `values` starts as an empty object and caches accessed values while the
 * app is running.  When a 
 */

const values = {};

const obj = {
    get: (key, dft) => {
        // if we have it already this session, use the value
        if (values[key]) {
            return values[key];
        }

        // check localStorage
        const str = localStorage.getItem(key);
        if (str) {
            const v = JSON.parse(str);
            values[key] = v; // save for future calls this session
            return v;
        }
        
        // we didn't find it in localStorage, use default (but save to values so we
        // don't need to check localStorage again this session)
        values[key] = dft;
        return dft;
    },
    set: (key, obj) => {
        // save in session variable for speed
        values[key] = obj;

        // save to local storage to preserve past page loads
        localStorage.setItem(key, JSON.stringify(obj));
    }
};

window.lc = obj;

export default obj;