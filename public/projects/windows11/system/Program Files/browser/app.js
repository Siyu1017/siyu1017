export function Execute(data) {
    WebOS.AppWindow(data, {
        stop: data.stop
    })
}