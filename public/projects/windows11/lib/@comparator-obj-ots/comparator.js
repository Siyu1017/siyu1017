export default function Comparator(_custom, _default, _config) {
    var _custom_arrs = {
        keys: Object.keys(_custom),
        values: Object.values(_custom)
    }, _default_arrs = {
        keys: Object.keys(_default),
        values: Object.values(_default)
    },
    res = {};
    _default_arrs.values.forEach(default_value => {
        if (_custom.hasOwnProperty(default_value.name)) {
            if (typeof _custom[default_value.name] === default_value.type) {
                res[default_value.name] = _custom[default_value.name];
            } else {
                res[default_value.name] = default_value.value;
            }
        } else {
            res[default_value.name] = default_value.value;
        }
    })
    return res;
}