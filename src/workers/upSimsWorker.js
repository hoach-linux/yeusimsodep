function processTasks(data) {
    importScripts(
        "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"
    );

    const workBook = XLSX.read(data, { type: "array" });
    const sheetName = workBook.SheetNames[0];
    const worksheet = workBook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    postMessage("finished");
    postMessage(jsonData);
}

self.onmessage = (event) => {
    const data = event.data.data;

    processTasks(data);
};
