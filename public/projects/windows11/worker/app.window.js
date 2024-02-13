import $ from "../lib/@quickqueryselector/quickqueryselector.js";
import App_Move_Worker from "./app.move.js";
import APP_DEFAULT_SETTINGS from "../system/Configs/app.default.config.js";
import Module_Comparator from "../lib/@comparator-obj-ots/comparator.js";
import Module_Templateify from "../lib/@templateify/templateify.js";
import App_Default_Template from "../system/Templates/app.default.template.js";
import WebOS_AppData from "../system/App Data/app.data.js";
import System_Path from "../system/path.js";

export default function AppWindow(data, callback) {
    var name = data.name;
    var appManifest = data.appManifest;
    var config = data.config;
    if (config) {
        if (!Object.prototype.toString.call(config) === '[object Object]') { } else {
            config = Module_Comparator(config, APP_DEFAULT_SETTINGS);
        }
    }
    var app = Module_Templateify(App_Default_Template, {
        icon: System_Path.systemIcons + appManifest.icon,
        title: config.title
    });
    app.style.width = config.fullscreen ? "100vw" : (config.width > window.innerWidth ? window.innerWidth : config.width) + "px";
    app.style.height = config.fullscreen ? "calc(100vh - 48px)" : (config.height > window.innerHeight ? window.innerHeight : config.height) + "px";
    app.style.left = config.fullscreen ? 0 : (config.x < 0 ? 0 : config.x > window.innerWidth - 32 ? window.innerWidth - 32 : config.x) + "px";
    app.style.top = config.fullscreen ? 0 : (config.y < 0 ? 0 : config.y > window.innerHeight - 74 ? window.innerHeight - 74 : config.y) + "px";
    $(".webos-showcase").appendChild(app);
    app.focus();
    if (config.toolbar == false) {
        app.querySelector(".webos-showcase-app-toolbar").remove();
        app.querySelector(".webos-showcase-app-content").style.height = "100%";
    } else {
        if (config.minimizable == true) {
            app.querySelector(".webos-showcase-app-toolbar-controls").innerHTML += `<div class="webos-showcase-app-toolbar-control mini"><img class="webos-showcase-app-toolbar-control-icon" src="${System_Path.systemControlIcons}minimize.png"></div>`;
            app.querySelector(".webos-showcase-app-toolbar-control.mini").addEventListener("click", () => {

            })
        }
        if (config.fullscreenable == true) {
            app.querySelector(".webos-showcase-app-toolbar-controls").innerHTML += `<div class="webos-showcase-app-toolbar-control full"><img class="webos-showcase-app-toolbar-control-icon" src="${System_Path.systemControlIcons}maxmin.png"></div>`;
            app.querySelector(".webos-showcase-app-toolbar-control.full").addEventListener("click", () => {

            })
        }
        if (config.closable == true) {
            app.querySelector(".webos-showcase-app-toolbar-controls").innerHTML += `<div class="webos-showcase-app-toolbar-control close"><img class="webos-showcase-app-toolbar-control-icon" src="${System_Path.systemControlIcons}close.png"></div>`;
            app.querySelector(".webos-showcase-app-toolbar-control.close").addEventListener("click", () => {
                callback.stop(data.id);
            })
        }
    }
    data.addToBar(app);
    callback = callback ? callback : {};
    new App_Move_Worker({
        app: app,
        mask: app.querySelector(".webos-showcase-app-content-mask"),
        pos_preview: $(".webos-showcase-app-position-preview"),
        toolbar: config.toolbar == true ? app.querySelector(".webos-showcase-app-toolbar") : document.createElement("div"),
        toolbar_controls: config.toolbar == true ? app.querySelector(".webos-showcase-app-toolbar-controls") : document.createElement("div"),
        toolbar_toggle_full: config.fullscreenable == true && config.toolbar == true ? app.querySelector(".webos-showcase-app-toolbar-control.full") : document.createElement("div")
    }, config, {
        close: callback.stop
    });
    return app;
}