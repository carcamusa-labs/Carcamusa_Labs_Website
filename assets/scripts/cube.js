$(document).ready(function () {
    var autoRotate = true;
    var rotationX = 0;
    var rotationY = 0;
    var isDragging = false;
    var startX, startY;
    var cube = $("#cube");
    var cubeWrapper = $("#cube-wrapper");
    var faces = $(".face");
    var styles = [];
    var perspective = "perspective(32em)";

    function rotateCube() {
        if (autoRotate) {
            rotationX += 0.1;
            rotationY += 0.1;
            faces.each(function (i) {
                let tmp = `rotateX(${rotationX}deg) rotateY(${rotationY}deg) ${styles[i]}`;
                $(this).css("transform", perspective + " " + tmp);
            });
        }
        requestAnimationFrame(rotateCube);
    }

    function initializeCube() {
        faces.each(function (i) {
            let tmp = i < 4 ? `rotateY(${i * 90}deg)` : `rotateX(${Math.pow(-1, i) * 90}deg)`;
            tmp += " translateZ(112px)";
            $(this).css("transform", perspective + " " + tmp);
            styles.push(tmp);
        });
    }

    cubeWrapper.on("mouseenter", function () {
        autoRotate = false;
    });

    cubeWrapper.on("mouseleave", function () {
        autoRotate = true;
    });

    cubeWrapper.on("mousedown", function (e) {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
    });

    $(document).on("mousemove", function (e) {
        if (isDragging) {
            autoRotate = false;
            let deltaX = e.clientX - startX;
            let deltaY = e.clientY - startY;
            startX = e.clientX;
            startY = e.clientY;

            rotationX -= deltaY * 0.5;
            rotationY += deltaX * 0.5;

            faces.each(function (i) {
                let tmp = `rotateX(${rotationX}deg) rotateY(${rotationY}deg) ${styles[i]}`;
                $(this).css("transform", perspective + " " + tmp);
            });
        }
    });

    $(document).on("mouseup", function () {
        isDragging = false;
        autoRotate = true;
    });

    initializeCube();
    requestAnimationFrame(rotateCube);
});
