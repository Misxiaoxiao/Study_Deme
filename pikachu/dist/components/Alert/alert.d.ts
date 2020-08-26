import React from 'react';
export declare enum AlertType {
    Success = "success",
    Default = "default",
    Danger = "danger",
    warning = "warning"
}
interface BaseAlertProps {
    className?: string;
    message?: string;
    alertType?: AlertType;
    description?: string;
    closeable?: boolean;
    onClose?: () => void;
}
declare const Alert: React.FC<BaseAlertProps>;
export default Alert;
