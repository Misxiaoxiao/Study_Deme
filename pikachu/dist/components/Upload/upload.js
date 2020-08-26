var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useRef, useState } from 'react';
import Axios from 'axios';
import UploadList from './uploadList';
import Dragger from './dragger';
export var Upload = function (props) {
    var action = props.action, defaultFileList = props.defaultFileList, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, beforeUpload = props.beforeUpload, onChange = props.onChange, onRemove = props.onRemove, header = props.header, name = props.name, data = props.data, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, children = props.children, drag = props.drag;
    var fileInput = useRef(null);
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    var handleRemove = function (file) {
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return item.uid !== file.uid; });
        });
        onRemove && onRemove(file);
    };
    var updateFileList = function (updateFile, updateObj) {
        setFileList(function (prevList) {
            return prevList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    {
                        return __assign({}, file);
                    }
                }
            });
        });
    };
    var handleClick = function () {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (!files)
            return;
        uploadFiles(files);
        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };
    var uploadFiles = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            if (!beforeUpload) {
                post(file);
            }
            else {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (processedFile) {
                        post(processedFile);
                    });
                }
                else if (result !== false) {
                    post(file);
                }
            }
        });
    };
    var post = function (file) {
        var _file = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            pertent: 0,
            raw: file,
        };
        setFileList(function (prevList) { return (__spreadArrays([_file], prevList)); });
        var formData = new FormData();
        formData.append(name || file.name, file);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        Axios.post(action, formData, {
            headers: __assign(__assign({}, header), { 'Content-Type': 'multipart/form-data' }),
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    updateFileList(_file, { pertent: percentage, status: 'uploading' });
                    if (onProgress) {
                        onProgress(percentage, file);
                    }
                }
            }
        })
            .then(function (resp) {
            updateFileList(_file, { status: 'success' });
            onSuccess && onSuccess(resp.data, file);
            onChange && onChange(file);
        })
            .catch(function (err) {
            updateFileList(_file, { status: 'error' });
            onError && onError(err, file);
            onChange && onChange(file);
        });
    };
    return (React.createElement("div", { className: "viking-upload-component" },
        React.createElement("div", { className: "viking-upload-input", style: { display: 'inline-block' }, onClick: handleClick },
            drag ? (React.createElement(Dragger, { onFile: function (files) { uploadFiles(files); } }, children)) : children,
            React.createElement("input", { className: "viking-file-input", onChange: handleFileChange, style: { display: 'none' }, type: "file", ref: fileInput, accept: accept, multiple: multiple })),
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove })));
};
Upload.defaultProps = {
    name: 'file'
};
export default Upload;
