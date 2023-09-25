function getWindow() {
    if (typeof window !== "undefined") return window;
}

const win = getWindow();

export const storeInfoUser = async (data) => {
    const dataJson = JSON.stringify(data);
    win.localStorage.setItem("info", dataJson);
};

export const getInfoUser = () => {
    const dataJson = win.localStorage.getItem("info");
    return JSON.parse(dataJson || "{}");
};