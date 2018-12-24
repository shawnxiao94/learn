    !function (a, b) {
        var c = a.documentElement, d = "orientationchange" in window ? "orientationchange" : "resize", e = function () {
            var a = c.clientWidth;
            a && (a >= 750 && (a = 750), c.style.fontSize = 100 * (a / 750) + "px")
        };
        a.addEventListener && (b.addEventListener(d, e, !1), e())
    }(document, window);