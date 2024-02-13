export default {
    name: "app.default",
    template: `<div class="webos-showcase-app" tabindex="0"><div class="webos-showcase-app-toolbar">
        <div class="webos-showcase-app-toolbar-title">
            <img src="{icon}" class="webos-showcase-app-toolbar-icon"></img>
            <div class="webos-showcase-app-toolbar-text">{title}</div>
        </div>
        <div class="webos-showcase-app-toolbar-controls"></div>
    </div>
    <div class="webos-showcase-app-content">
        <div class="webos-showcase-app-content-root">
        </div>
    </div>
    <div class="webos-showcase-app-content-mask" tabindex="0"></div>
</div>`,
    type: "dom",
    defaultValue: {
        icon: "./system/System Assets/icons/application.png",
        title: "Application"
    }
}