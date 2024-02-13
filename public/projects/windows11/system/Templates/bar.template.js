export default {
    name: "bar.app",
    template: `<div class="webos-taskbar-app"><div class="webos-taskbar-app-icon"><img class="webos-taskbar-app-icon-image" src="{url}"></img></div></div>`,
    type: "dom",
    defaultValue: {
        url: "./system/System Assets/icons/application.png"
    }
}