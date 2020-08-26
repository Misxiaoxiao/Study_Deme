import React, { useState } from 'react';
import classNames from 'classnames';
export var AlertType;
(function (AlertType) {
    AlertType["Success"] = "success";
    AlertType["Default"] = "default";
    AlertType["Danger"] = "danger";
    AlertType["warning"] = "warning";
})(AlertType || (AlertType = {}));
var Alert = function (props) {
    var _a;
    var className = props.className, message = props.message, alertType = props.alertType, description = props.description, closeable = props.closeable, onClose = props.onClose;
    var _b = useState(true), show = _b[0], setShow = _b[1];
    var classes = classNames('alert', className, (_a = {},
        _a["alert-" + alertType] = alertType,
        _a["alert-" + closeable] = closeable,
        _a));
    var handleClose = function () {
        onClose && onClose();
        setShow(!show);
    };
    return (React.createElement("div", { className: classes, style: { display: show ? 'block' : 'none' } },
        closeable && (React.createElement("div", { className: "alert-close-btn", onClick: function () { handleClose(); } }, "\u00D7")),
        message && (React.createElement("div", { className: "alert-message" }, message)),
        description && (React.createElement("div", { className: "alert-description" }, description))));
};
Alert.defaultProps = {
    closeable: true,
    alertType: AlertType.Default,
    message: '标题'
};
export default Alert;
