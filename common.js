
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
}