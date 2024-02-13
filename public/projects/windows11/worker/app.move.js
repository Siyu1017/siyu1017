import settings from "../system/Configs/system.default.config.js";
import Module_Comparator from "../lib/@comparator-obj-sts/comparator.js";
import System_Path from "../system/path.js";

/**
* Query Selector
* @returns {HTMLElement}
*/
function $(s, a) {
    return a == true ? document.querySelectorAll(s) : document.querySelector(s);
}

function offset(el) {
    var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

function getPosition(element) {
    return { x: offset(element).left, y: offset(element).top };
}

var count = 0;

class Move {
    constructor(elements, config, func, token) {
        var last = {
            x: 0,
            y: 0
        }
        var app_mask = elements.mask;
        var app_pos_preview = elements.pos_preview;
        var app_toolbar = elements.toolbar;
        var app_toolbar_controls = elements.toolbar_controls;
        var app_toolbar_toggle_full = elements.toolbar_toggle_full;
        var app = elements.app;
        var pos = ["lt", "lf", "lb", "rt", "rf", "rb", "f"];
        var app_data = {
            width: 420,
            height: 300,
            left: 0,
            top: 0,
            boundary: null,
            useBoundary: false,
            fullMode: false,
            dragging: false
        }
        if (config.fullscreen == true) {
            app_data.fullMode = true;
            app.style.borderRadius = 0;
            app_data.boundary = "f";
        }
        if (config) {
            if (!Object.prototype.toString.call(config) === '[object Object]') { } else {
                app_data = Module_Comparator(config, app_data);
            }
        }
        var last_pos = null;
        var icon = [System_Path.systemControlIcons + "maxmin.png", System_Path.systemControlIcons + `maximize.png`]

        function formatPos(pos, pre) {
            var res = {
                left: pre == true ? settings.preview : 0,
                top: pre == true ? settings.preview : 0,
                width: pre == true ? window.innerWidth - settings.preview * 2 : window.innerWidth,
                height: pre == true ? (window.innerHeight - settings.barHeight) / 2 - settings.preview * 2 : (window.innerHeight - settings.barHeight) / 2
            }
            if (pos.search("f") > -1) {
                res.height = pre == true ? window.innerHeight - settings.barHeight - settings.preview * 2 : window.innerHeight - settings.barHeight;
            }
            if (pos != "f") {
                res.width = pre == true ? window.innerWidth / 2 - settings.preview * 2 : window.innerWidth / 2;
            }
            if (pos.search("r") > -1) {
                res.left = pre == true ? window.innerWidth / 2 + settings.preview : window.innerWidth / 2;
            }
            if (pos.search("b") > -1) {
                res.top = pre == true ? (window.innerHeight - settings.barHeight) / 2 + settings.preview : (window.innerHeight - settings.barHeight) / 2;
            }
            return pos ? res : null;
        }

        app_toolbar_toggle_full.addEventListener("click", () => {
            if (app_data.boundary == null && app_data.fullMode == false) {
                app_data.useBoundary = false;
            }
            if (app_data.fullMode == false) {
                app.style.left = formatPos("f").left + "px";
                app.style.top = formatPos("f").top + "px";
                app.style.width = formatPos("f").width + "px";
                app.style.height = formatPos("f").height + "px";
                app_toolbar_toggle_full.querySelector("img").src = icon[1];
                app.style.borderRadius = 0;
                app_data.fullMode = true;
            } else {
                app.style.left = (app_data.useBoundary == true ? formatPos(app_data.boundary).left : app_data.left) + "px";
                app.style.top = (app_data.useBoundary == true ? formatPos(app_data.boundary).top : app_data.top) + "px";
                app.style.width = (app_data.useBoundary == true ? formatPos(app_data.boundary).width : app_data.width) + "px";
                app.style.height = (app_data.useBoundary == true ? formatPos(app_data.boundary).height : app_data.height) + "px";
                app_toolbar_toggle_full.querySelector("img").src = icon[0];
                app.style.borderRadius = app_data.useBoundary == true ? 0 : "revert-layer";
                app_data.fullMode = false;
            }
        })

        app_toolbar.addEventListener("mousedown", (e) => {
            if (e.target != app_toolbar_controls && app_toolbar_controls.contains(e.target) == false) {
                last = {
                    x: e.pageX,
                    y: e.pageY
                }
                app_data.dragging = true;
                app_mask.style.display = "block";
                app_mask.focus();
            } else {
                app_data.dragging = false;
                app_mask.style.display = "none";
            }
        })

        document.addEventListener("mousemove", (e) => {
            if (app_data.dragging == false) return;
            app_toolbar_toggle_full.querySelector("img").src = icon[0];
            app.style.width = app_data.width + "px";
            app.style.height = app_data.height + "px";
            app.style.borderRadius = "revert-layer";
            app.style.pointerEvents = "none";
            app.style.userSelect = "none";
            app.style.boxShadow = "revert-layer";
            app_data.fullMode = false;
            app.style.zIndex = "3";
            if (getPosition(app).x + e.pageX - last.x < window.innerWidth - settings.minOver && getPosition(app).x + e.pageX - last.x + app.offsetWidth > settings.minOver + app_toolbar_controls.offsetWidth) {
                app.style.left = getPosition(app).x + e.pageX - last.x + "px";
            }
            if (getPosition(app).y + e.pageY - last.y < window.innerHeight - settings.barHeight - settings.minOver && getPosition(app).y + e.pageY - last.y > 0) {
                app.style.top = getPosition(app).y + e.pageY - last.y + "px";
            }
            var temp_pos = "";
            if (e.pageX < settings.boundary || e.pageX > window.innerWidth - settings.boundary || e.pageY < settings.boundary) {
                app_pos_preview.style.left = (e.pageX < 0 ? 0 : e.pageX > window.innerWidth ? window.innerWidth : e.pageX) + "px";
                app_pos_preview.style.top = (e.pageY < 0 ? 0 : e.pageY > window.innerHeight - settings.barHeight ? window.innerHeight - settings.barHeight : e.pageY) + "px";
                app_pos_preview.classList.add("active");
                if (e.pageX < settings.boundary) {
                    temp_pos += "l";
                    if (e.pageY < settings.boundary) {
                        temp_pos += "t";
                    } else if (e.pageY > window.innerHeight - settings.barHeight - settings.boundary) {
                        temp_pos += "b";
                    } else {
                        temp_pos += "f";
                    }
                } else if (e.pageX > window.innerWidth - settings.boundary) {
                    temp_pos += "r";
                    if (e.pageY < settings.boundary) {
                        temp_pos += "t";
                    } else if (e.pageY > window.innerHeight - settings.barHeight - settings.boundary) {
                        temp_pos += "b";
                    } else {
                        temp_pos += "f";
                    }
                } else {
                    temp_pos = "f"
                }
                if (app_data.boundary != temp_pos) {
                    app_data.boundary = temp_pos;
                }
                if (last_pos != formatPos(temp_pos)) {
                    last_pos = formatPos(temp_pos);
                    app_pos_preview.style.left = formatPos(temp_pos, true).left + "px";
                    app_pos_preview.style.top = formatPos(temp_pos, true).top + "px";
                    app_pos_preview.style.width = formatPos(temp_pos, true).width + "px";
                    app_pos_preview.style.height = formatPos(temp_pos, true).height + "px";
                }
            } else {
                app_pos_preview.classList.remove("active");
                app_data.boundary = null;
                app_pos_preview.style.width = "";
                app_pos_preview.style.height = "";
                app_pos_preview.style.left = (e.pageX < 0 ? 0 : e.pageX > window.innerWidth ? window.innerWidth : e.pageX) + "px";
                app_pos_preview.style.top = (e.pageY < 0 ? 0 : e.pageY > window.innerHeight - settings.barHeight ? window.innerHeight - settings.barHeight : e.pageY) + "px";
            }
            last = {
                x: e.pageX,
                y: e.pageY
            }
        })

        function exit() {
            if (app_data.dragging == false) return;
            app_data.left = getPosition(app).x;
            app_data.top = getPosition(app).y;
            if (app_data.boundary != null) {
                app_data.useBoundary = true
                app.style.left = formatPos(app_data.boundary).left + "px";
                app.style.top = formatPos(app_data.boundary).top + "px";
                app.style.width = formatPos(app_data.boundary).width + "px";
                app.style.height = formatPos(app_data.boundary).height + "px";
                if (app_data.boundary == "f") {
                    app_toolbar_toggle_full.querySelector("img").src = icon[1];
                    app_data.fullMode = true;
                    app_data.useBoundary = false;
                } else {
                    app_toolbar_toggle_full.querySelector("img").src = icon[0];
                }
                app.style.borderRadius = 0;
                app.style.boxShadow = "none";
            } else {
                app_data.useBoundary = false;
                app.style.boxShadow = "revert-layer";
            }
            if (app_data.boundary != "f") {
                app_data.left = getPosition(app).x;
                app_data.top = getPosition(app).y;
            }
            app_data.dragging = false;
            app_mask.style.display = "none";
            app_mask.blur();
            app_pos_preview.classList.remove("active");
            app_pos_preview.style.width = "";
            app_pos_preview.style.height = "";
            app.style.pointerEvents = "unset";
            app.style.userSelect = "unset";
            app.style.zIndex = "unset";
        }

        window.addEventListener("blur", () => { exit() })

        window.addEventListener("mouseup", () => { exit() })
    }
}

export default Move