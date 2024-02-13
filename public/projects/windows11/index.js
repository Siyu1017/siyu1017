"use strict";

import APP_DEFAULT_SETTINGS from "./system/Configs/app.default.config.js";
import Module_Comparator from "./lib/@comparator-obj-ots/comparator.js";
import Module_Templateify from "./lib/@templateify/templateify.js";
import Bar_App_Template from "./system/Templates/bar.template.js";
import Start_Item_Template from "./system/Templates/start.template.js";
import App_Default_Template from "./system/Templates/app.default.template.js";
import System_Path from "./system/path.js";
import $ from "./lib/@quickqueryselector/quickqueryselector.js";
// import WebOS_AppData from "./system/App Data/app.data.js";
import App_Window_Worker from "./worker/app.window.js";
import SystemHandler from "./system/handler.js";

import Cmd from "./system/Program Files/sys/cmd/cmd.js";

var WebOS_AppData = {};

(function () {
    var WebOS = {};
    WebOS.config = {

    }
    WebOS.defaultSettings = {
        pinnedApps: ["fileexplorer", "browser"],
        controls: [["wifi", "sound", "battery"], ["time", "notify"]],
        toolbarButtons: ["taskview"],
        noToolBar: ["handler", "taskview"],
        installed: ["taskview", "fileexplorer", "browser", "error"],
        systemApps: ["fileexplorer", "browser"] //, "store", "calculator", "painter"]
    }
    WebOS.paths = System_Path;
    WebOS.runningApps = {
        foreground: {}
    }
    WebOS.appStatus = {
        running: []
    }
    WebOS.randomID = (n, c) => { var c = c || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', r = '', l = c.length; for (let i = 0; i < n; i++) { r += c.charAt(Math.floor(Math.random() * l)); } return r; };
    WebOS.registeredApps = [];
    WebOS.wholeAppList = ["taskview", "fileexplorer", "browser"]; // , "calculator", "painter", "store"];
    WebOS.install = (name, callbacks) => {
        var App = new WebOS.App(name, callbacks.execute);
        callbacks.callback(App);
    }
    WebOS.isFunction = function (functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }
    WebOS.AppWindow = App_Window_Worker;

    WebOS.App = class {
        constructor (name) {
            if (WebOS.registeredApps.indexOf(name) > -1) return {};
            WebOS.registeredApps.push(name);
            this.name = name;
            this.callback = callback;
            this.running = false;
            this.config = APP_DEFAULT_SETTINGS;
            this.isToolBarButton = false;
            this.barIconElement = null;
            try {
                fetch(WebOS.paths.appProgramFiles + this.name + "/manifest.json").then((res) => {
                    if ((res.status >= 200 && res.status < 300) || res.ok == true) {
                        return res.json();
                    } else {
                        return null;
                    }
                }).then((res) => {
                    this.appProgram = res != null ? import(WebOS.paths.appProgramFiles + this.name + "/" + res.script) : null;
                    this.appManifest = res;
                    return res;
                });
            } catch (e) { console.log(e); };
            if (config) {
                if (!Object.prototype.toString.call(config) === '[object Object]') { } else {
                    this.config = Module_Comparator(config, APP_DEFAULT_SETTINGS);
                }
            }
            if (WebOS.defaultSettings.pinnedApps.concat(WebOS.defaultSettings.toolbarButtons).includes(this.name)) {
                var bar_icon = this.addToBar();
                this.barIconElement = bar_icon;
                if (WebOS.defaultSettings.toolbarButtons.includes(this.name)) {
                    this.isToolBarButton = true;
                }
            }
            WebOS.runningApps[this.name] = this;
        }
    }
    
    WebOS.addIcon = (name) => {
        var element = document.createElement("div");
        if (this.barIconElement != null) {

        } else {
            if (WebOS.defaultSettings.toolbarButtons.includes(this.name)) {
                element = Module_Templateify(Start_Item_Template, {
                    url: WebOS_AppData[this.name].icon
                })
                $(".webos-taskbar-start-group").appendChild(element);
            } else if (WebOS.defaultSettings.pinnedApps.includes(this.name)) {
                element = Module_Templateify(Bar_App_Template, {
                    url: WebOS.paths.systemIcons + WebOS_AppData[this.name].icon
                });
                $(".webos-taskbar-apps-pinned").appendChild(element);
            } else {
                element = Module_Templateify(Bar_App_Template, {
                    url: WebOS.paths.systemIcons + WebOS_AppData[this.name].icon
                });
                $(".webos-taskbar-apps-default").appendChild(element)
            }
            var count = 0;
            element.addEventListener("click", () => {
                if (count > 0) {
                    return this.app_element.focus();
                }
                this.execute();
                count++;
            })
            this.barIconElement = element;
            return element;
        }
    }
    WebOS.removeIcon = (name) => {

    }
    WebOS.App = class {
        runningApps = {};
        update() {
            WebOS.runningApps.foreground[this.name] = this;
        }
        constructor(appName, callback, config) {
            if (WebOS.registeredApps.indexOf(appName) > -1) return {};
            WebOS.registeredApps.push(appName);
            this.name = appName;
            this.callback = callback;
            this.running = false;
            this.config = APP_DEFAULT_SETTINGS;
            this.isToolBarButton = false;
            this.barIconElement = null;
            try {
                fetch(WebOS.paths.appProgramFiles + this.name + "/manifest.json").then((res) => {
                    if ((res.status >= 200 && res.status < 300) || res.ok == true) {
                        return res.json();
                    } else {
                        return null;
                    }
                }).then((res) => {
                    this.appProgram = res != null ? import(WebOS.paths.appProgramFiles + this.name + "/" + res.script) : null;
                    this.appManifest = res;
                    return res;
                });
            } catch (e) { console.log(e); };
            if (config) {
                if (!Object.prototype.toString.call(config) === '[object Object]') { } else {
                    this.config = Module_Comparator(config, APP_DEFAULT_SETTINGS);
                }
            }
            if (WebOS.defaultSettings.pinnedApps.concat(WebOS.defaultSettings.toolbarButtons).includes(this.name)) {
                var bar_icon = this.addToBar();
                this.barIconElement = bar_icon;
                if (WebOS.defaultSettings.toolbarButtons.includes(this.name)) {
                    this.isToolBarButton = true;
                }
            }
            WebOS.runningApps.foreground[this.name] = this;
            this.update();

            if (callback) {
                callback(this);
            }
        }
        async execute(callback) {
            var app_id = this.isToolBarButton == true ? false : WebOS.randomID(24);
            /*
            if (this.barIconElement == null) {
                this.addToBar();
            }
            if (WebOS.defaultSettings.pinnedApps.includes(this.name)) {
                this.barIconElement.classList.add("active");
                this.barIconElement.classList.add("running");
            } else if (WebOS.defaultSettings.toolbarButtons.includes(this.name)) {
                this.barIconElement.classList.add("active");
            }*/
            if (this.isToolBarButton == false) {
                this.runningApps[app_id] = {
                    app_element: null
                }
            }
            /*app_element.onblur = () => {
                this.barIconElement.classList.remove("active");
            }
            app_element.onfocus = () => {
                this.barIconElement.classList.add("active");
            }
            if (this.callback) {
                this.callback({
                    app: app_element,
                    id: app_id,
                    icon: this.barIconElement
                })
            }*/
            if (!this.appProgram) {
                await fetch(WebOS.paths.appProgramFiles + this.name + "/manifest.json").then((res) => {
                    if ((res.status >= 200 && res.status < 300) || res.ok == true) {
                        return res.json();
                    } else {
                        return null;
                    }
                }).then((res) => {
                    this.appProgram = res != null ? import(WebOS.paths.appProgramFiles + this.name + "/" + res.script) : null;
                    this.appManifest = res;
                    return res;
                });
            }
            this.appProgram.then((module) => {
                WebOS.isFunction(module.Execute) == true ? module.Execute({
                    id: app_id,
                    icon: this.barIconElement,
                    config: this.config,
                    name: this.name,
                    addToBar: this.addToBar,
                    appManifest: this.appManifest,
                    stop: this.stop
                }) : null;
            })
            this.update();
            return {
                app: null,
                id: app_id,
                icon: this.barIconElement
            }
        }
        addToBar(app_element) {
            var element = document.createElement("div");
            if (this.barIconElement != null) {

            } else {
                if (WebOS.defaultSettings.toolbarButtons.includes(this.name)) {
                    element = Module_Templateify(Start_Item_Template, {
                        url: WebOS.paths.systemIcons + WebOS_AppData[this.name].icon
                    })
                    $(".webos-taskbar-start-group").appendChild(element);
                    var count = 0;
                    element.addEventListener("click", () => {
                        if (count > 0) {
                            return app_element.focus();
                        }
                        this.execute();
                        count++;
                    })
                } else if (WebOS.defaultSettings.pinnedApps.includes(this.name)) {
                    element = Module_Templateify(Bar_App_Template, {
                        url: WebOS.paths.systemIcons + WebOS_AppData[this.name].icon
                    });
                    $(".webos-taskbar-apps-pinned").appendChild(element);
                    var count = 0;
                    element.addEventListener("click", () => {
                        if (count > 0) {
                            return app_element.focus();
                        }
                        this.execute();
                        count++;
                    })
                } else {
                    element = Module_Templateify(Bar_App_Template, {
                        url: WebOS.paths.systemIcons + WebOS_AppData[this.name].icon
                    });
                    $(".webos-taskbar-apps-default").appendChild(element);
                }
                this.barIconElement = element;
                return element;
            }
        }
        stop(app_id) {
            if (this.isToolBarButton == true) {
                delete this.runningApps.app_element;
                return this.update();
            }
            this.runningApps[app_id].app_element.remove();
            delete this.runningApps[app_id];
            if (!Object.keys(this.runningApps).length > 0) {
                this.barIconElement.classList.remove("running");
                this.barIconElement.classList.remove("active");
            }
            this.update();
        }
        unregister() {

        }
    }
    var delay = (delayInms) => { return new Promise(resolve => setTimeout(resolve, delayInms)); };
    window.onload = async () => {
        $(".webos-taskbar-apps").addEventListener('wheel', function (event) {
            var delta = event.deltaY || event.detail || event.wheelDelta;
            if (delta < 0) {
                $(".webos-taskbar-apps").scrollTo({
                    behavior: "smooth",
                    left: $(".webos-taskbar-apps").scrollLeft - 300
                })
            } else {
                $(".webos-taskbar-apps").scrollTo({
                    behavior: "smooth",
                    left: $(".webos-taskbar-apps").scrollLeft + 300
                })
            }
            event.preventDefault();
        });
        
        WebOS.defaultSettings.installed.forEach(app => {
            fetch(WebOS.paths.appProgramFiles + app + "/manifest.json").then((res) => {
                if ((res.status >= 200 && res.status < 300) || res.ok == true) {
                    return res.json();
                } else {
                    return null;
                }
            }).then((res) => {
                WebOS_AppData[app] = res;
                console.log(new WebOS.App(app, null, res.config || {}))
            });
            /*
            if (WebOS.defaultSettings.toolbarButtons.includes(app)) {
                $(".webos-taskbar-start-group").appendChild(Module_Templateify(Start_Item_Template, {
                    url: WebOS_AppData[app].icon
                }))
            } else if (WebOS.defaultSettings.pinnedApps.includes(app)) {
                $(".webos-taskbar-apps-pinned").appendChild(Module_Templateify(Bar_App_Template, {
                    url: WebOS_AppData[app].icon
                }))
            } else {
                $(".webos-taskbar-apps-default").appendChild(Module_Templateify(Bar_App_Template, {
                    url: WebOS_AppData[app].icon
                }))
            }
            */
        })

        /*var script = document.createElement("script");
        script.src = "./system/Program Files/WebOS/taskview/app.js"
        document.head.appendChild(script);*/

        /*
        window.onerror = (err) => {
            new WebOS.App("error").execute();
            WebOS.AppWindow({
                name: Math.random(),
                appManifest: {
                    "icon": "Windows Icons/Stop.ico"
                },
                config: {
                    title: "Error",
                    movable: true
                }
            }).querySelector(".webos-showcase-app-content-root").innerHTML = err;
        }
        */

        window.onerror = (err) => {
            document.body.innerHTML += `<div class="error" style="position: fixed;top: 0;left: 0;z-index: 9999999999999999999999999999999999999999;color: #fff;width: 100vw;height: 100vh;background: #3973aa;font-family: Segoe UI;padding: 0 4rem;user-select: none;">            <div style="font-size: 6rem;
    margin-bottom: 10px;
">:(</div><div style="
    font-size: 21px;
">您的裝置發生問題，因此必須重新啟動。</div><div style="
    font-size: 21px;
    margin: 0 0 25px;
">我們剛剛正在收集某些錯誤資訊，接著我們會為您重新啟動。</div><div style="
    font-size: 21px;
    margin: 0 0 25px;
">0% 已完成</div><div style="
    word-break: break-all;
">{{qrcode}}</div>`;
            /*setInterval(() => {
                WebOS.runningApps.foreground.error.execute();
            }, 100)*/
        }

        var error = new WebOS.App("error", (e) => {
            // e.execute()
        });

        await delay(500)
        $(".webos-loading").classList.remove("active");
    }
    window.WebOS = WebOS;
})();