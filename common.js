
'use strict'

class COMMON {
    static #isReady = false;

    /**
     * JQuery의 $(document).ready(callback)과 같은 역할을 하는 함수. 
     * 페이지 로드 완료 후 딱 한번 실행시킨다.
     * @param {*} callback 페이지 로드 완료 후 실행시킬 콜백함수 
     * @param {*} context  callack 함수에 전달되는 파라미터
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
     * @param {*} sel DOM을 선택하기 위한 string 값이다.
     * @param {*} scope DOM 선택 범위가 되는 엘리먼트다. 지정하지 않으면 document가 된다.
     * return 선택된 DOM이 있으면 DOM 리스트를 반환 없으면 undefined를 반환
     */
    static selector(sel, scope) {
        if (!sel) {
            throw "selector requires at least 1 parameter : first parameter is select string";
        }

        if (typeof sel !== "string") {
            throw "first parameter must be string";
        }

        if (scope && typeof scope !== "object") {
            throw "second parameter must be object : second parameter requires element object";
        }

        const elem = scope || document;
        const ret = elem.querySelectorAll(sel);
        return (ret.length > 0) ? ret : undefined;
    }
}