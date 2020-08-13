# 자바스크립트 private 라이브러리

개인용도로 사용할 javascript 모듈이나 기능들을 구현함  
ECMA6 문법으로 작성

## common.js
공통용도로 사용할 함수를 구현함

* documentReady(callback, ctx)
JQuery의 $(document).ready(callback)의 [자바스크립트 버전](https://stackoverflow.com/questions/9899372/pure-javascript-equivalent-of-jquerys-ready-how-to-call-a-function-when-t)

```
    // 1. 함수 레퍼런스를 전달
    COMMON.documentReady(function);

    // 2. 람다를 전달
    COMMON.documentReady(() => {
        // ...
    });

    // 3. 함수 레퍼런스와 함수의 레퍼런스의 첫번째 파라미터(context)를 전달
    COMMON.documentReady(function, context);

    // 4. 3번을 람다로 처리
    COMMON.documentReady((context) => {
        //...
    }, context);
```

