
'use strict'

class COMMON {
    static #isReady = false;

    /**
     * JQuery의 $(document).ready(callback)과 같은 역할을 하는 함수. 
     * 페이지 로드 완료 후 딱 한번 실행시킨다.
     * @param {*} callback 페이지 로드 완료 후 실행시킬 콜백함수이다.
     * @param {*} context  callack 함수에 전달되는 파라미터다.
     */
    static documentReady(callback, context) {
        if (this.#isReady === true) {
            return;
        }
        this.#isReady = true;
        let readyList = [];
        let readyFired = false;
        let readyEventHandlersInstalled = false;

        const ready = () => {
            if (!readyFired) {
                readyFired = true;
                for (let i = 0; i < readyList.length; i++) {
                    readyList[i].fn.call(window, readyList[i].ctx);
                }
                readyList = [];
            }
        }

        const readyStateChange = () => {
            if (document.readyState === "complete") {
                ready();
            }
        }

        if (typeof callback !== "function") {
            throw new TypeError("callback for documentReady(fn) must be a function");
        }

        if (readyFired) {
            setTimeout(function () { callback(context); }, 1);
            return;
        } else {
            readyList.push({ fn: callback, ctx: context });
        }
        if (document.readyState === "complete") {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", ready, false);
                window.addEventListener("load", ready, false);
            } else {
                // must be IE
                document.attachEvent("onreadystatechange", readyStateChange);
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    }

    /**
     * DOM을 선택한다. JQuery $(selector)와 역할이 같다
     * @param {*} sel DOM 선택자(string) 이다.
     * @param {*} scope DOM 선택 범위가 되는 엘리먼트다. 지정하지 않으면 document가 된다.
     * @return 선택된 DOM이 있으면 DOM 리스트를 반환, 없으면 undefined를 반환한다.
     */
    static selector(sel, scope) {
        if (!sel) {
            throw "selector() requires at least 1 parameter : first parameter is select string";
        }

        if (typeof sel !== "string") {
            throw "selector() first parameter must be string";
        }

        if (scope && typeof scope !== "object") {
            throw "selector() second parameter must be object : second parameter requires element";
        }

        const elem = scope || document;
        const ret = elem.querySelectorAll(sel);
        return (ret.length > 0) ? ret : undefined;
    }

    /**
     * 선택된 DOM에 CSS를 입힌다.
     * css(first, second [,third])
     * @param first 파라미터가 second까지만 사용되면 first 파라미터는 css property:value 형태의 opject이며, third까지 사용되면 css property이다.
     * @param secend 파라미터가 second까지만 사용되면 second 파라미터는 string 타입의 DOM 선택자 또는 DOM이며, third까지 사용되면 css property value이다.
     * @param third DOM선택자 또는 DOM이다
     * ex) 
     * COMMON.css('color', 'red', 'p')
     * COMMON.css({'color':'blue', 'font-size':'12px'},'p')
     */
    static css() {
        if (arguments.length === 3) {
            for (let i = 0; i < arguments.length - 1; i++) {
                if ("string" !== typeof arguments[i]) {
                    throw "css() first and second parameter must be string";
                } 
            }
            if ("object" !== typeof arguments[arguments.length - 1] && "string" !== typeof arguments[arguments.length - 1]) {
                throw "css() third parameter must be element or string";
            }
        } else if (arguments.length === 2) {
            if ("object" !== typeof arguments[0]) {
                throw "css() first parameter must be string";
            } 
            if ("object" !== typeof arguments[1] && "string" !== typeof arguments[1]) {
                throw "css() second parameter must be element or string";
            }
        } else {
            throw "css() parameter length requires 2 and 3";
        }

        if (arguments.length === 3) {
            const prop = arguments[0], value = arguments[1];
            const temp = arguments[arguments.length - 1]
            const elem = ("string" === typeof temp) ? document.querySelectorAll(temp) : temp;
            if (elem instanceof NodeList) {
                for (let e of elem) {
                    e.style[prop] = value;
                }
            } else {
                elem.style[prop] = value
            }
        } else {
            const props = arguments[0];
            const temp = arguments[1];
            const elem = ("string" === typeof temp) ? document.querySelectorAll(temp) : temp;
            if (elem instanceof NodeList) { 
                for (let key in props) {
                    for (let e of elem) {
                        e.style[key] = props[key];
                    }
                }
            } else {
                for (let key in props) {
                    elem.style[key] = props[key];
                }
            }
        }
    }
}