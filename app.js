/* =========================================================
   KID LOCAL
   INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    const pointerFine =
        window.matchMedia(
            "(pointer: fine)"
        ).matches;


    /* =====================================================
       ARCHIVE FILTER
    ===================================================== */

    const filters =
        document.querySelectorAll(".filter");

    const archiveCards =
        document.querySelectorAll(".archive-card");


    filters.forEach(filter => {

        filter.addEventListener("click", () => {

            const selected =
                filter.dataset.filter;


            filters.forEach(item => {
                item.classList.remove("active");
            });

            filter.classList.add("active");


            archiveCards.forEach(card => {

                const year =
                    card.dataset.year;


                if (
                    selected === "all" ||
                    selected === year
                ) {

                    card.style.display = "";

                    requestAnimationFrame(() => {

                        card.style.opacity = "1";
                        card.style.transform =
                            "translateY(0)";

                    });

                } else {

                    card.style.opacity = "0";

                    card.style.transform =
                        "translateY(20px)";

                    setTimeout(() => {

                        card.style.display = "none";

                    }, 250);

                }

            });

        });

    });


    /* =====================================================
       HERO VINYL PARALLAX
    ===================================================== */

    const hero =
        document.querySelector(".hero");

    const vinyl =
        document.querySelector(".hero-depth-object");

    const orbitOne =
        document.querySelector(".orbit-one");

    const orbitTwo =
        document.querySelector(".orbit-two");


    if (
        hero &&
        vinyl &&
        pointerFine &&
        !reducedMotion
    ) {

        hero.addEventListener(
            "mousemove",
            event => {

                const rect =
                    hero.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left)
                    / rect.width
                    - .5;

                const y =
                    (event.clientY - rect.top)
                    / rect.height
                    - .5;


                /*
                    Important:

                    We're NOT rotating the vinyl
                    aggressively anymore.

                    The record itself stays
                    viewer-facing.

                    The whole object gets a
                    subtle depth movement.
                */

                const moveX =
                    x * 18;

                const moveY =
                    y * 14;


                vinyl.style.transform =
                    `
                    translate3d(
                        ${moveX}px,
                        ${moveY}px,
                        0
                    )
                    `;


                if (orbitOne) {

                    orbitOne.style.transform =
                        `
                        translate(
                            ${x * 15}px,
                            ${y * 12}px
                        )
                        rotate(17deg)
                        `;
                }


                if (orbitTwo) {

                    orbitTwo.style.transform =
                        `
                        translate(
                            ${x * -20}px,
                            ${y * -16}px
                        )
                        rotate(-22deg)
                        `;
                }

            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                vinyl.style.transform =
                    "translate3d(0,0,0)";

                if (orbitOne) {

                    orbitOne.style.transform =
                        "rotate(17deg)";
                }

                if (orbitTwo) {

                    orbitTwo.style.transform =
                        "rotate(-22deg)";
                }

            }
        );

    }


    /* =====================================================
       FORMAT 3D OBJECT
    ===================================================== */

    const stage =
        document.querySelector(".format-stage");

    const formatObject =
        document.querySelector(".format-3d-object");


    if (
        stage &&
        formatObject &&
        pointerFine &&
        !reducedMotion
    ) {

        stage.addEventListener(
            "mousemove",
            event => {

                const rect =
                    stage.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left)
                    / rect.width
                    - .5;

                const y =
                    (event.clientY - rect.top)
                    / rect.height
                    - .5;


                const rotateY =
                    30 + x * 20;

                const rotateX =
                    -18 - y * 15;


                formatObject.style.transform =
                    `
                    translate(-50%, -50%)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    rotateZ(-5deg)
                    `;

            }
        );


        stage.addEventListener(
            "mouseleave",
            () => {

                formatObject.style.transform =
                    `
                    translate(-50%, -50%)
                    rotateX(-18deg)
                    rotateY(30deg)
                    rotateZ(-5deg)
                    `;

            }
        );

    }


    /* =====================================================
       ARCHIVE CARD MICRO TILT
    ===================================================== */

    const archiveGrid =
        document.querySelector(".archive-grid");


    if (
        archiveGrid &&
        pointerFine &&
        !reducedMotion
    ) {

        archiveCards.forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        (event.clientX - rect.left)
                        / rect.width
                        - .5;

                    const y =
                        (event.clientY - rect.top)
                        / rect.height
                        - .5;


                    card.style.transform =
                        `
                        perspective(800px)
                        rotateX(${y * -3}deg)
                        rotateY(${x * 3}deg)
                        translateY(-4px)
                        `;
                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "translateY(0)";

                }
            );

        });

    }


    /* =====================================================
       FOOTER YEAR
    ===================================================== */

    const year =
        document.getElementById("year");


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       HERO VINYL FLOATING ANIMATION
    ===================================================== */

    if (
        vinyl &&
        !reducedMotion
    ) {

        let start = null;


        const floatAnimation =
            timestamp => {

                if (!start) {
                    start = timestamp;
                }


                const elapsed =
                    timestamp - start;


                const floating =
                    Math.sin(
                        elapsed * 0.0012
                    ) * 5;


                const current =
                    vinyl.style.transform;


                if (!current.includes("translate3d")) {

                    vinyl.style.transform =
                        `
                        translate3d(
                            0,
                            ${floating}px,
                            0
                        )
                        `;

                }


                requestAnimationFrame(
                    floatAnimation
                );

            };


        requestAnimationFrame(
            floatAnimation
        );

    }

});