import System_Default_Settings from "./system.default.config.js";

var configs = {
    width: {
        value: 420,
        type: "number",
        name: "width"
    },
    height: {
        value: 300,
        type: "number",
        name: "height"
    },
    x: {
        value: window.innerWidth / 2 - 420 / 2,
        type: "number",
        name: "x"
    },
    y: {
        value: (window.innerHeight - System_Default_Settings.barHeight) / 2 - 300 / 2,
        type: "number",
        name: "y"
    },
    center: {
        value: false,
        type: "boolean",
        name: "center"
    },
    minWidth: {
        value: 0,
        type: "number",
        name: "minWidth"
    },
    minHeight: {
        value: 0,
        type: "number",
        name: "minHeight"
    },
    maxWidth: {
        value: null,
        type: "number",
        name: "maxWidth"
    },
    maxHeight: {
        value: null,
        type: "number",
        name: "maxHeight"
    },
    resizable: {
        value: true,
        type: "boolean",
        name: "resizable"
    },
    movable: {
        value: true,
        type: "boolean",
        name: "movable"
    },
    minimizable: {
        value: true,
        type: "boolean",
        name: "minimizable"
    },
    closable: {
        value: true,
        type: "boolean",
        name: "closable"
    },
    fullscreen: {
        value: false,
        type: "boolean",
        name: "fullscreen"
    },
    fullscreenable: {
        value: true,
        type: "boolean",
        name: "fullscreenable"
    },
    title: {
        value: "Application",
        type: "string",
        name: "title"
    },
    icon: {
        value: "",
        type: "string",
        name: "icon"
    },
    show: {
        value: true,
        type: "boolean",
        name: "show"
    },
    autoHideCursor: {
        value: false,
        type: "boolean",
        name: "autoHideCursor"
    },
    backgroundColor: {
        value: "rgb(241, 241, 241)",
        type: "string",
        name: "backgroundColor"
    },
    hasShadow: {
        value: true,
        type: "boolean",
        name: "hasShadow"
    },
    opacity: {
        value: 1,
        type: "number",
        name: "opacity"
    },
    darkTheme: {
        value: false,
        type: "boolean",
        name: "darkTheme"
    },
    transparent: {
        value: false,
        type: "boolean",
        name: "transparent"
    },
    showinbar: {
        value: true,
        type: "boolean",
        name: "showinbar"
    },
    toolbar: {
        value: true,
        type: "boolean",
        name: "toolbar"
    },
    backgroundRunning: {
        value: false,
        type: "boolean",
        name: "backgroundRunning"
    }
}

export default configs