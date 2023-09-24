function getWindow() {
    if (typeof window !== "undefined") return window;
}

const win = getWindow();

export const storeInfoUser = async (data) => {
    try {
        const dataJson = JSON.stringify(data);
        win.localStorage.setItem("info", dataJson);
    } catch (error) {
        return;
    }
};

export const getInfoUser = () => {
    try {
        const dataJson = win.localStorage.getItem("info");
        return JSON.parse(dataJson || "{}");
    } catch (error) {
        return null
    }
};