export function Execute(data) {
    WebOS.AppWindow(data, {
        stop: data.stop,
    }).querySelector(".webos-showcase-app-content-root").innerHTML = "Error";
}
