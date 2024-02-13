export default function Comparator(_custom, _default, _config) {
    var _default_arrs = {
        keys: Object.keys(_default),
        values: Object.values(_default)
    },
    res = {};
    _default_arrs.values.forEach((default_value, i) => {
        if (_custom.hasOwnProperty(_default_arrs.keys[i])) {
            res[_default_arrs.keys[i]] = _custom[_default_arrs.keys[i]]
        } else {
            res[_default_arrs.keys[i]] = default_value;
        }
    })
    return res;
}