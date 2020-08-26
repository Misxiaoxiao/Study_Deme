import React, { useState } from 'react';
import Button from './components/Button/button';
import Alert, { AlertType } from './components/Alert/alert';
import { library } from '@fortawesome/fontawesome-svg-core';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Icon from './components/Icon/icon';
import Transition from './components/Transition/transition';
// 添加图标
library.add(fas);
function App() {
    var _a = useState(true), show = _a[0], setShow = _a[1];
    return (React.createElement("div", { className: "App" },
        React.createElement("header", { className: "App-header" },
            React.createElement(Icon, { icon: 'search', theme: 'danger', size: 'lg' }),
            React.createElement(Menu, { defaultIndex: '0', onSelect: function (i) { alert(i); }, mode: 'horizontal' },
                React.createElement(MenuItem, null, "cool link"),
                React.createElement(MenuItem, null, "cool link1"),
                React.createElement(SubMenu, { title: "dropdown" },
                    React.createElement(MenuItem, null, "dropdown 1"),
                    React.createElement(MenuItem, null, "dropdown 2")),
                React.createElement(MenuItem, null, "cool link2")),
            React.createElement(Button, { autoFocus: true, onClick: function (e) { e.preventDefault(); alert(123); } }, "default"),
            React.createElement(Button, { disabled: true }, "default disabled"),
            React.createElement(Button, { btnType: 'primary', size: 'lg' }, "primary large"),
            React.createElement(Button, { btnType: 'primary', size: 'sm' }, "primary small"),
            React.createElement(Button, { btnType: 'link', href: "http://www.baidu.com", target: "_blank" }, "link"),
            React.createElement(Button, { disabled: true, btnType: 'link', href: "http://www.baidu.com" }, "link disabled"),
            React.createElement(Button, { btnType: 'danger' }, "danger"),
            React.createElement(Alert, { description: '123131' }),
            React.createElement(Alert, { message: 'alert-title', description: 'alert-description', alertType: AlertType.Success }),
            React.createElement(Alert, { message: 'alert-title', description: 'alert-description', alertType: AlertType.Danger }),
            React.createElement(Alert, { message: 'alert-title', description: 'alert-description', alertType: AlertType.warning }),
            React.createElement(Button, { onClick: function () { setShow(!show); } }, "toggle"),
            React.createElement(Transition, { in: show, timeout: 300, animation: 'zoom-in-left' },
                React.createElement("p", null,
                    "Edit ",
                    React.createElement("code", null, "src/App.tsx"),
                    " and save to reload.")),
            React.createElement(Transition, { in: show, timeout: 300, animation: 'zoom-in-left' },
                React.createElement(Button, null, "123")),
            React.createElement("br", null),
            React.createElement("a", { className: "App-link", href: "https://reactjs.org", target: "_blank", rel: "noopener noreferrer" }, "Learn React"))));
}
export default App;
