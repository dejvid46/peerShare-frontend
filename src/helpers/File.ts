import FileContainer from "./FileContainer";

interface Config{
    file: File,
    channel: RTCDataChannel,
    interval: number,
    id_from: string;
    id_to: string;
    chunkSize: number,
	
    onBegin: (file: File) => void,
    onEnd: (file: File) => void,
    onProgress: (file: OnProgress) => void
}

interface ReceiverConfig{
    onBegin: (file: any) => void,
    onEnd: (file: any) => void,
    onProgress: (file: any) => void
}

interface OnProgress {
    currentPosition: number,
    maxChunks: number,
    uuid: string
}

export const FileConfig = {
    Send: function(config: Config) {
        const file = config.file;
        const socket = config.channel;

        const chunkSize = config.chunkSize || 40 * 1000; // 64k max sctp limit (AFAIK!)
        let sliceId = 0;
        const cacheSize = chunkSize;

        const chunksPerSlice = Math.floor(Math.min(100000000, cacheSize) / chunkSize);
        const sliceSize = chunksPerSlice * chunkSize;
        const maxChunks = Math.ceil(file.size / chunkSize);

        // uuid is used to uniquely identify sending instance
        const uuid = (Math.random() * new Date().getTime()).toString(36).toUpperCase().replace( /\./g , '-');

        socket.send(JSON.stringify({
            uuid: uuid,
            maxChunks: maxChunks,
            size: file.size,
            id_from: config.id_from,
            id_to: config.id_to,
            name: file.name,
            lastModifiedDate: file.lastModified,
            type: file.type,
            start: true
        }));

        config.onBegin(file);

        let blob, reader = new FileReader();
        reader.onloadend = function(evt) {
            if (evt.target && evt.target.readyState == FileReader.DONE) {
                addChunks(file.name, evt.target.result, function() {
                    sliceId++;
                    if ((sliceId + 1) * sliceSize < file.size) {
                        blob = file.slice(sliceId * sliceSize, (sliceId + 1) * sliceSize);
                        reader.readAsArrayBuffer(blob);
                    } else if (sliceId * sliceSize < file.size) {
                        blob = file.slice(sliceId * sliceSize, file.size);
                        reader.readAsArrayBuffer(blob);
                    } else {
                        socket.send(JSON.stringify({
                            uuid: uuid,
                            maxChunks: maxChunks,
                            size: file.size,
                            id_from: config.id_from,
                            id_to: config.id_to,
                            name: file.name,
                            lastModifiedDate: file.lastModified,
                            type: file.type,
                            end: true
                        }));

                        const url = URL.createObjectURL(file);
                        config.onEnd(file);
                    }
                });
            }
        };

        blob = file.slice(sliceId * sliceSize, (sliceId + 1) * sliceSize);
        reader.readAsArrayBuffer(blob);

        let numOfChunksInSlice;
        let currentPosition = 0;
        let hasEntireFile;
        let chunks: Array<number> = [];

        function addChunks(fileName: string, binarySlice: any, callback: () => void) {
            numOfChunksInSlice = Math.ceil(binarySlice.byteLength / chunkSize);
            for (var i = 0; i < numOfChunksInSlice; i++) {
                var start = i * chunkSize;
                chunks[currentPosition] = binarySlice.slice(start, Math.min(start + chunkSize, binarySlice.byteLength));

                FileConverter.ArrayBufferToDataURL(chunks[currentPosition], function(str: string) {
                    socket.send(JSON.stringify({
                        uuid: uuid,
                        value: str,
                        currentPosition: currentPosition,
                        maxChunks: maxChunks
                    }));
                });

                currentPosition++;
            }

            if (config.onProgress) {
                config.onProgress({
                    currentPosition: currentPosition,
                    maxChunks: maxChunks,
                    uuid: uuid
                });
            }

            if (currentPosition == maxChunks) {
                hasEntireFile = true;
            }

            if (config.interval == 0 || typeof config.interval == 'undefined')
                callback();
            else
                setTimeout(callback, config.interval);
        }
    },

    Receiver: function(config: ReceiverConfig) {
        var packets: any = { };

        function receive(chunk: MessageEvent) {
            const chunkBody = JSON.parse(chunk.data);
            if (chunkBody.start && !packets[chunkBody.uuid]) {
                packets[chunkBody.uuid] = [];
                if (config.onBegin) config.onBegin(chunkBody);
            }

            if (!chunkBody.end && chunkBody.value) packets[chunkBody.uuid].push(chunkBody.value);

            if (chunkBody.end) {
                var _packets = packets[chunkBody.uuid];
                var finalArray: any = [], length = _packets.length;

                for (var i = 0; i < length; i++) {
                    if (!!_packets[i]) {
                        FileConverter.DataURLToBlob(_packets[i], function(buffer: any) {
                            finalArray.push(buffer);
                        });
                    }
                }

                var blob = new Blob(finalArray, { type: chunk.type });

                if (!blob.size) console.error('Something went wrong. Blob Size is 0.');

                if (config.onEnd) {
                    const newFile =  new File([blob], chunkBody.name);
                    config.onEnd({uuid: chunkBody.uuid, blob: blob, file: newFile});
                };
            }

            if (chunkBody.value && config.onProgress) config.onProgress({uuid: chunkBody.uuid, currentPosition: chunkBody.currentPosition});
        }

        return {
            receive: receive
        };
    },
};

export function SaveToDisk(uuid: string, fileBlob: Blob, fileName: string) {
    const url = URL.createObjectURL(fileBlob);
    var hyperlink = document.createElement('a');
    hyperlink.href = url;
    hyperlink.target = '_blank';
    hyperlink.download = fileName || url;

    var mouseEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    });

    hyperlink.dispatchEvent(mouseEvent);
    (window.URL || window.webkitURL).revokeObjectURL(hyperlink.href);
    document.body.insertBefore(hyperlink, document.body.firstChild);
    FileContainer.instance.deleteFile(uuid);
}

// ________________
// FileConverter.js
var FileConverter = {
    ArrayBufferToDataURL: function(buffer: any, callback: any) {

        // getting blob from array-buffer
        var blob = new Blob([buffer]);

        // reading file as binary-string
        var fileReader = new FileReader();
        fileReader.onload = function(e) {
            e.target && callback(e.target.result);
        };
        fileReader.readAsDataURL(blob);
    },
    DataURLToBlob: function(dataURL: any, callback: any) {
        var binary = atob(dataURL.substr(dataURL.indexOf(',') + 1)),
            i = binary.length,
            view = new Uint8Array(i);

        while (i--) {
            view[i] = binary.charCodeAt(i);
        }

        callback(new Blob([view]));
    }
};
