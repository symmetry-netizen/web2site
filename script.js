/* =========================================================
   SYMMETRY WEBSITE
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   CONFIGURATION
========================================================= */

const CONFIG = {

    /*
     * IMPORTANT:
     *
     * Replace these with your Google Drive FILE IDs.
     *
     * The Drive files must be shared as:
     *
     * "Anyone with the link -> Viewer"
     *
     */


    DRIVE: {

        images: {

            logo:
                "GOOGLE_DRIVE_FILE_ID_LOGO",

            hero:
                "GOOGLE_DRIVE_FILE_ID_HERO",

            speaker1:
                "GOOGLE_DRIVE_FILE_ID_SPEAKER_1",

            speaker2:
                "GOOGLE_DRIVE_FILE_ID_SPEAKER_2",

            gallery1:
                "GOOGLE_DRIVE_FILE_ID_GALLERY_1",

            gallery2:
                "GOOGLE_DRIVE_FILE_ID_GALLERY_2",

            gallery3:
                "GOOGLE_DRIVE_FILE_ID_GALLERY_3",

            gallery4:
                "GOOGLE_DRIVE_FILE_ID_GALLERY_4",

            gallery5:
                "GOOGLE_DRIVE_FILE_ID_GALLERY_5",

            gallery6:
                "GOOGLE_DRIVE_FILE_ID_GALLERY_6",

            gallery7:
                "GOOGLE_DRIVE_FILE_ID_GALLERY_7",

            photoSlide1:
                "GOOGLE_DRIVE_FILE_ID_PHOTO_SLIDE_1",

            photoSlide2:
                "GOOGLE_DRIVE_FILE_ID_PHOTO_SLIDE_2",

            photoSlide3:
                "GOOGLE_DRIVE_FILE_ID_PHOTO_SLIDE_3"

        },


        pdfs: {

            photography:
                "GOOGLE_DRIVE_FILE_ID_PHOTOGRAPHY_PDF",

            quiz:
                "GOOGLE_DRIVE_FILE_ID_QUIZ_PDF",

            creativeWriting:
                "GOOGLE_DRIVE_FILE_ID_CREATIVE_WRITING_PDF",

            paperPresentation:
                "GOOGLE_DRIVE_FILE_ID_PAPER_PRESENTATION_PDF",

            sudoku:
                "GOOGLE_DRIVE_FILE_ID_SUDOKU_PDF",

            memeMaking:
                "GOOGLE_DRIVE_FILE_ID_MEME_MAKING_PDF",

            timetable:
                "GOOGLE_DRIVE_FILE_ID_TIMETABLE_PDF"

        }

    },


    /*
     * Official university/SBI payment portal.
     *
     * Replace this with the real portal URL.
     */

    PAYMENT_PORTAL:
        "YOUR_OFFICIAL_SBI_UNIVERSITY_PAYMENT_URL",


    /*
     * Backend endpoint.
     *
     * This will eventually be your Google Apps Script
     * Web App URL or another backend API.
     */

    API_ENDPOINT:
        "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL",


    /*
     * Event information.
     */

    EVENTS: [

        {
            id: "photography",

            name: "Photography",

            description:
                "Capture mathematical beauty through photography.",

            icon:
                "fa-camera",

            guideline:
                "photography"

        },

        {
            id: "quiz",

            name: "Mathematics Quiz",

            description:
                "Test your mathematical knowledge and problem-solving skills.",

            icon:
                "fa-circle-question",

            guideline:
                "quiz"

        },

        {
            id: "creative-writing",

            name: "Creative Writing",

            description:
                "Explore mathematical ideas through creative writing.",

            icon:
                "fa-pen-fancy",

            guideline:
                "creativeWriting"

        },

        {
            id: "paper-presentation",

            name: "Paper Presentation",

            description:
                "Present mathematical research and ideas.",

            icon:
                "fa-file-powerpoint",

            guideline:
                "paperPresentation"

        },

        {
            id: "sudoku",

            name: "Sudoku",

            description:
                "Challenge your logical thinking with mathematical puzzles.",

            icon:
                "fa-table-cells",

            guideline:
                "sudoku"

        },

        {
            id: "meme-making",

            name: "Meme Making",

            description:
                "Create mathematics-related humour and visual content.",

            icon:
                "fa-face-laugh-squint",

            guideline:
                "memeMaking"

        }

    ],


    /*
     * Speaker information.
     */

    SPEAKERS: [

        {
            name:
                "Prof. Neena Gupta",

            role:
                "Professor, Statistics & Mathematical Unit, Indian Statistical Institute, Kolkata",

            topic:
                "Fermat's Descent Principle",

            image:
                "speaker1"

        },

        {
            name:
                "Prof. Koyel Das",

            role:
                "Professor, Mathematics and Statistics, IISER Kolkata",

            topic:
                "Understanding Cognitive Neuroscience through the Lens of Machine Learning",

            image:
                "speaker2"

        }

    ]

};
/* =========================================================
   SPONSOR SLIDESHOW — ONE AT A TIME
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const sponsors =
        Array.from(
            document.querySelectorAll(".sponsor")
        );

    if (!sponsors.length) return;


    const currentLabel =
        document.getElementById("sponsorCurrent");

    const totalLabel =
        document.getElementById("sponsorTotal");

    if (totalLabel) {

        totalLabel.textContent =
            String(sponsors.length).padStart(2, "0");

    }


    let currentIndex = 0;


    function updateCounter(index) {

        if (!currentLabel) return;

        currentLabel.textContent =
            String(index + 1).padStart(2, "0");

    }


    function showSlide(index) {

        sponsors.forEach(sponsor => {

            sponsor.classList.remove(
                "active",
                "previous"
            );

        });

        if (sponsors[index]) {

            sponsors[index]
                .classList.add("active");

        }

        updateCounter(index);

    }


    /*
       Show the first sponsor immediately.
    */

    showSlide(currentIndex);


    /*
       Advance to the next sponsor every 4 seconds.
    */

    setInterval(() => {

        const oldIndex =
            currentIndex;

        currentIndex =
            (currentIndex + 1) % sponsors.length;


        /*
           Move current sponsor out.
        */

        if (sponsors[oldIndex]) {

            sponsors[oldIndex]
                .classList.remove("active");

            sponsors[oldIndex]
                .classList.add("previous");

        }


        /*
           Bring the next sponsor in.
        */

        if (sponsors[currentIndex]) {

            sponsors[currentIndex]
                .classList.add("active");

        }

        updateCounter(currentIndex);


        /*
           Clean up after animation.
        */

        setTimeout(() => {

            sponsors.forEach(sponsor => {

                sponsor.classList.remove(
                    "previous"
                );

            });

        }, 1000);


    }, 4000);

});

(function () {
    const slides = document.querySelectorAll('.event-photo-slideshow img');
    if (slides.length < 2) return;

    let current = 0;

    setInterval(() => {
        slides[current].classList.remove('is-active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('is-active');
    }, 3500);
})();

/* =========================================================
   GOOGLE DRIVE HELPERS
========================================================= */


/*
 * Google Drive image URL.
 *
 * For a publicly shared Drive file:
 *
 * https://drive.google.com/uc?export=view&id=FILE_ID
 */

function driveImage(fileId) {

    if (!fileId || fileId.startsWith("GOOGLE_")) {
        return "";
    }

    return `https://drive.google.com/uc?export=view&id=${fileId}`;
}


/*
 * Google Drive file viewer.
 *
 * Useful for PDFs.
 */

function driveFile(fileId) {

    if (!fileId || fileId.startsWith("GOOGLE_")) {
        return "#";
    }

    return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
}


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeImages();

        initializeSpeakers();

        initializeEvents();

        initializePhotoSlideshow();

        initializeGallery();

        initializeRegistration();

        initializeNavigation();

        initializeFAQ();

        initializeContactForm();

        initializeLightbox();

        initializePayment();

        const currentYearEl =
            document.getElementById("currentYear");

        if (currentYearEl) {

            currentYearEl.textContent =
                new Date().getFullYear();

        }

    }
);


/* =========================================================
   DRIVE IMAGES
========================================================= */

function initializeImages() {

    document
        .querySelectorAll("[data-drive-image]")
        .forEach(image => {

            const key =
                image.dataset.driveImage;

            const fileId =
                CONFIG.DRIVE.images[key];

            const url =
                driveImage(fileId);

            if (url) {
                image.src = url;
            }

        });

}

/* =========================================================
   GEOMETRIC CLOCK
========================================================= */

(function () {

    const geometry = document.querySelector(".geometry");

    if (!geometry) return;


    const dayLayer = geometry.querySelector(".geometry-day");
    const hourLayer = geometry.querySelector(".geometry-hour");
    const minuteLayer = geometry.querySelector(".geometry-minute");
    const secondLayer = geometry.querySelector(".geometry-second");


    /*
     * -------------------------------------------------------
     * TIME SOURCE
     * -------------------------------------------------------
     *
     * Set this to:
     *
     * "real"
     *
     * to use the user's current system time.
     *
     * Or:
     *
     * "manual"
     *
     * to test a specific time.
     */

    const TIME_MODE = "real";


    /*
     * Manual time for testing.
     *
     * 14 = 2 PM
     * 37 = 37 minutes
     * 52 = 52 seconds
     */

    const MANUAL_TIME = {
        hours: 14,
        minutes: 37,
        seconds: 52
    };


    /* =====================================================
       GET TIME
    ===================================================== */

    function getTime() {

        if (TIME_MODE === "manual") {

            return {
                hours: MANUAL_TIME.hours,
                minutes: MANUAL_TIME.minutes,
                seconds: MANUAL_TIME.seconds,
                milliseconds: 0
            };

        }


        const now = new Date();

        return {
            hours: now.getHours(),
            minutes: now.getMinutes(),
            seconds: now.getSeconds(),
            milliseconds: now.getMilliseconds()
        };
    }


    /* =====================================================
       UPDATE GEOMETRY
    ===================================================== */

    function updateClock() {

        const time = getTime();

        const hours = time.hours;
        const minutes = time.minutes;
        const seconds = time.seconds;
        const milliseconds = time.milliseconds;


        /*
         * -------------------------------------------------
         * SECOND
         * -------------------------------------------------
         *
         * 60 seconds = 360 degrees
         *
         * The millisecond component makes the movement
         * continuous rather than jumping every second.
         */

        const secondAngle =
            ((seconds + milliseconds / 1000) / 60) * 360;


        /*
         * -------------------------------------------------
         * MINUTE
         * -------------------------------------------------
         *
         * 60 minutes = 360 degrees
         *
         * Seconds are included so the minute layer moves
         * continuously.
         */

        const minuteAngle =
            ((minutes + seconds / 60) / 60) * 360;


        /*
         * -------------------------------------------------
         * HOUR
         * -------------------------------------------------
         *
         * 12 hours = 360 degrees
         *
         * Minutes and seconds are included.
         */

        const twelveHour =
            hours % 12;

        const hourAngle =
            (
                (twelveHour + minutes / 60 + seconds / 3600)
                / 12
            ) * 360;


        /*
         * -------------------------------------------------
         * DAY
         * -------------------------------------------------
         *
         * 24 hours = 360 degrees
         *
         * This is the slow outer boundary.
         */

        const dayAngle =
            (
                (hours + minutes / 60 + seconds / 3600)
                / 24
            ) * 360;


        /*
         * -------------------------------------------------
         * APPLY ROTATION
         * -------------------------------------------------
         */

        if (dayLayer) {

            dayLayer.style.transform =
                `rotate(${dayAngle}deg)`;

        }


        if (hourLayer) {

            hourLayer.style.transform =
                `rotate(${hourAngle}deg)`;

        }


        if (minuteLayer) {

            minuteLayer.style.transform =
                `rotate(${minuteAngle}deg)`;

        }


        if (secondLayer) {

            secondLayer.style.transform =
                `rotate(${secondAngle}deg)`;

        }


        /*
         * Continue synchronizing.
         */

        requestAnimationFrame(updateClock);
    }


    /* =====================================================
       START
    ===================================================== */

    updateClock();

})();
/* =========================================================
   SPEAKERS
========================================================= */

function initializeSpeakers() {

    const container =
        document.getElementById("speakerGrid");

    if (!container) return;

    container.innerHTML =
        CONFIG.SPEAKERS
            .map(speaker => {

                const image =
                    driveImage(
                        CONFIG.DRIVE.images[
                            speaker.image
                        ]
                    );

                return `

                    <article class="speaker-card">

                        <div class="speaker-image">

                            <img
                                src="${image}"
                                alt="${speaker.name}"
                                loading="lazy"
                            >

                        </div>

                        <div class="speaker-content">

                            <h3>
                                ${speaker.name}
                            </h3>

                            <div class="speaker-role">
                                ${speaker.role}
                            </div>

                            <p class="speaker-talk">
                                <strong>
                                    Topic:
                                </strong>
                                ${speaker.topic}
                            </p>

                        </div>

                    </article>

                `;

            })
            .join("");

}


/* =========================================================
   EVENTS
========================================================= */

function initializeEvents() {

    const container =
        document.getElementById("eventGrid");

    if (!container) return;

    container.innerHTML =
        CONFIG.EVENTS
            .map(event => {

                const pdfId =
                    CONFIG.DRIVE.pdfs[
                        event.guideline
                    ];

                const pdfUrl =
                    driveFile(pdfId);

                return `

                    <article class="event-card">

                        <div class="event-icon">

                            <i class="fa-solid ${event.icon}"></i>

                        </div>

                        <h3>
                            ${event.name}
                        </h3>

                        <p>
                            ${event.description}
                        </p>

                        <div class="event-actions">

                            <a
                                href="${pdfUrl}"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i class="fa-regular fa-file-pdf"></i>
                                Guidelines
                            </a>

                        </div>

                    </article>

                `;

            })
            .join("");

}


/* =========================================================
   PHOTOGRAPHY CARD SLIDESHOW
========================================================= */

function initializePhotoSlideshow() {

    const container =
        document.getElementById("photoSlideshow");

    if (!container) return;


    const slideKeys = [
        "photoSlide1",
        "photoSlide2",
        "photoSlide3"
    ];

    const images =
        slideKeys
            .map(key => driveImage(CONFIG.DRIVE.images[key]))
            .filter(Boolean);

    if (!images.length) return;


    container.innerHTML =
        images
            .map((src, index) => `

                <img
                    src="${src}"
                    alt="Mathematics photography entry ${index + 1}"
                    class="${index === 0 ? "is-active" : ""}"
                    loading="lazy"
                >

            `)
            .join("");


    if (images.length < 2) return;


    let current = 0;

    const slides =
        container.querySelectorAll("img");

    setInterval(
        () => {

            slides[current].classList.remove("is-active");

            current = (current + 1) % slides.length;

            slides[current].classList.add("is-active");

        },
        3500
    );

}


/* =========================================================
   GALLERY
========================================================= */

function initializeGallery() {

    const container =
        document.getElementById("galleryGrid");

    if (!container) return;


    const galleryKeys = [
        "gallery1",
        "gallery2",
        "gallery3",
        "gallery4",
        "gallery5",
        "gallery6",
        "gallery7"
    ];


    container.innerHTML =
        galleryKeys
            .map((key, index) => {

                const image =
                    driveImage(
                        CONFIG.DRIVE.images[key]
                    );

                if (!image) {
                    return "";
                }

                return `

                    <div
                        class="gallery-item"
                        data-gallery-index="${index}"
                    >

                        <img
                            src="${image}"
                            alt="Symmetry gallery image ${index + 1}"
                            loading="lazy"
                        >

                    </div>

                `;

            })
            .join("");

}


/* =========================================================
   NAVIGATION
========================================================= */

function initializeNavigation() {

    const navbar =
        document.getElementById("siteHeader");

    const hamburger =
        document.getElementById("navToggle");

    const navMenu =
        document.getElementById("navMenu");

    if (!navbar || !hamburger || !navMenu) return;


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 20) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }

        }
    );


    function closeMenu() {

        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");

        hamburger.setAttribute("aria-expanded", "false");

    }

    function toggleMenu() {

        const isOpen =
            navMenu.classList.toggle("active");

        hamburger.classList.toggle("active", isOpen);
        document.body.classList.toggle("menu-open", isOpen);

        hamburger.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    }

    hamburger.addEventListener(
        "click",
        toggleMenu
    );


    document
        .querySelectorAll(".nav-link")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });

}


/* =========================================================
   FAQ
========================================================= */

function initializeFAQ() {

    document
        .querySelectorAll(".faq-question")
        .forEach(question => {

            question.addEventListener(
                "click",
                () => {

                    const item =
                        question.closest(".faq-item");

                    item.classList.toggle("open");

                }
            );

        });

}


/* =========================================================
   REGISTRATION MODAL
========================================================= */

function initializeRegistration() {

    const modal =
        document.getElementById(
            "registrationModal"
        );

    const closeButton =
        document.getElementById(
            "closeRegistrationModal"
        );

    const overlay =
        document.getElementById(
            "modalOverlay"
        );


    const buttons = [

        document.getElementById(
            "navRegisterButton"
        ),

        document.getElementById(
            "heroRegisterButton"
        ),

        document.getElementById(
            "guidelineRegisterButton"
        ),

        document.getElementById(
            "footerRegisterButton"
        )

    ].filter(Boolean);


    /*
       This page doesn't have a registration modal in the DOM
       (registration lives on register.html instead), so there's
       nothing to wire up. Bail out quietly rather than throwing —
       an uncaught error here would otherwise abort every init
       call still queued after this one.
    */

    if (!modal || !closeButton || !overlay) return;


    buttons
        .forEach(button => {

            button.addEventListener(
                "click",
                openRegistrationModal
            );

        });


    closeButton.addEventListener(
        "click",
        closeRegistrationModal
    );


    overlay.addEventListener(
        "click",
        closeRegistrationModal
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal.classList.contains("open")
            ) {

                closeRegistrationModal();

            }

        }
    );


    initializeProgrammeSelection();

    initializeRegistrationForm();

}


function openRegistrationModal() {

    const modal =
        document.getElementById(
            "registrationModal"
        );

    if (!modal) return;

    modal.classList.add("open");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );

}


function closeRegistrationModal() {

    const modal =
        document.getElementById(
            "registrationModal"
        );

    if (!modal) return;

    modal.classList.remove("open");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );

}


/* =========================================================
   PROGRAMME SELECTION
========================================================= */

function initializeProgrammeSelection() {

    const container =
        document.getElementById(
            "programmeSelection"
        );

    if (!container) return;


    container.innerHTML =
        CONFIG.EVENTS
            .map(event => {

                return `

                    <div class="programme-option">

                        <input
                            type="checkbox"
                            id="programme-${event.id}"
                            name="programmes"
                            value="${event.id}"
                        >

                        <label
                            for="programme-${event.id}"
                        >

                            <strong>
                                ${event.name}
                            </strong>

                            <span>
                                ${event.description}
                            </span>

                        </label>

                    </div>

                `;

            })
            .join("");

}


/* =========================================================
   PAYMENT
========================================================= */

function initializePayment() {

    const paymentButtons = [

        document.getElementById(
            "paymentPortalButton"
        ),

        document.getElementById(
            "modalPaymentLink"
        )

    ];


    paymentButtons
        .filter(Boolean)
        .forEach(button => {

            button.href =
                CONFIG.PAYMENT_PORTAL;

        });

}


/* =========================================================
   REGISTRATION FORM
========================================================= */

function initializeRegistrationForm() {

    const form =
        document.getElementById(
            "registrationForm"
        );

    if (!form) return;


    form.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            await submitRegistration(form);

        }
    );

}


async function submitRegistration(form) {

    const message =
        document.getElementById(
            "registrationMessage"
        );

    const submitButton =
        document.getElementById(
            "registrationSubmitButton"
        );


    /*
     * Check programme selection.
     */

    const selectedProgrammes =
        Array.from(
            form.querySelectorAll(
                'input[name="programmes"]:checked'
            )
        )
        .map(input => input.value);


    if (selectedProgrammes.length === 0) {

        showMessage(
            message,
            "Please select at least one programme.",
            "error"
        );

        return;

    }


    /*
     * Check receipt.
     */

    const receipt =
        document.getElementById(
            "paymentReceipt"
        ).files[0];


    if (!receipt) {

        showMessage(
            message,
            "Please upload your payment receipt.",
            "error"
        );

        return;

    }


    /*
     * Maximum file size:
     * 10 MB
     */

    if (
        receipt.size >
        10 * 1024 * 1024
    ) {

        showMessage(
            message,
            "The payment receipt must be smaller than 10 MB.",
            "error"
        );

        return;

    }


    /*
     * Allowed file types.
     */

    const allowedTypes = [

        "image/jpeg",
        "image/png",
        "application/pdf"

    ];


    if (
        !allowedTypes.includes(
            receipt.type
        )
    ) {

        showMessage(
            message,
            "Please upload a JPG, PNG or PDF receipt.",
            "error"
        );

        return;

    }


    /*
     * Collect form data.
     */

    const formData =
        new FormData(form);


    const registrationData = {

        action:
            "register",

        name:
            formData.get("name"),

        email:
            formData.get("email"),

        phone:
            formData.get("phone"),

        institution:
            formData.get("institution"),

        studentId:
            formData.get("studentId"),

        programmes:
            selectedProgrammes,

        paymentReference:
            formData.get(
                "paymentReference"
            )

    };


    try {

        submitButton.disabled = true;

        submitButton.classList.add(
            "loading"
        );


        /*
         * Convert receipt to Base64.
         *
         * The backend will decode this and save
         * it into the Google Drive receipt folder.
         */

        const receiptBase64 =
            await fileToBase64(receipt);


        const payload = {

            ...registrationData,

            receipt: {

                name:
                    receipt.name,

                type:
                    receipt.type,

                size:
                    receipt.size,

                data:
                    receiptBase64

            }

        };


        /*
         * Send to backend.
         */

        const response =
            await fetch(
                CONFIG.API_ENDPOINT,
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "text/plain;charset=utf-8"
                    },

                    body:
                        JSON.stringify(payload)

                }
            );


        const result =
            await response.json();


        if (!result.success) {

            throw new Error(
                result.message ||
                "Registration failed."
            );

        }


        showMessage(
            message,
            "Registration submitted successfully. Please check your email for confirmation.",
            "success"
        );


        form.reset();


        setTimeout(
            closeRegistrationModal,
            3000
        );


    } catch (error) {

        console.error(
            "Registration error:",
            error
        );


        showMessage(
            message,
            "Unable to submit registration right now. Please try again or contact the organisers.",
            "error"
        );


    } finally {

        submitButton.disabled = false;

        submitButton.classList.remove(
            "loading"
        );

    }

}


/* =========================================================
   FILE -> BASE64
========================================================= */

function fileToBase64(file) {

    return new Promise(
        (resolve, reject) => {

            const reader =
                new FileReader();


            reader.onload =
                () => {

                    /*
                     * Remove:
                     * data:image/png;base64,
                     */

                    const result =
                        reader.result;

                    const base64 =
                        result.split(",")[1];

                    resolve(base64);

                };


            reader.onerror =
                reject;


            reader.readAsDataURL(file);

        }
    );

}


/* =========================================================
   CONTACT FORM
========================================================= */

function initializeContactForm() {

    const form =
        document.getElementById(
            "contactForm"
        );

    if (!form) return;


    form.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            await submitContactQuery(form);

        }
    );

}


async function submitContactQuery(form) {

    const message =
        document.getElementById(
            "contactMessage"
        );

    const button =
        document.getElementById(
            "contactSubmitButton"
        );


    const formData =
        new FormData(form);


    const payload = {

        action:
            "query",

        name:
            formData.get("name"),

        email:
            formData.get("email"),

        subject:
            formData.get("subject"),

        message:
            formData.get("message")

    };


    try {

        button.disabled = true;

        button.classList.add(
            "loading"
        );


        const response =
            await fetch(
                CONFIG.API_ENDPOINT,
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "text/plain;charset=utf-8"
                    },

                    body:
                        JSON.stringify(payload)

                }
            );


        const result =
            await response.json();


        if (!result.success) {

            throw new Error(
                result.message ||
                "Query could not be submitted."
            );

        }


        showMessage(
            message,
            "Your query has been sent successfully. The organising team will reply to your email.",
            "success"
        );


        form.reset();


    } catch (error) {

        console.error(
            "Contact error:",
            error
        );


        showMessage(
            message,
            "Unable to send your query right now. Please try again later.",
            "error"
        );


    } finally {

        button.disabled = false;

        button.classList.remove(
            "loading"
        );

    }

}


/* =========================================================
   LIGHTBOX
========================================================= */

function initializeLightbox() {

    const lightbox =
        document.getElementById(
            "lightbox"
        );

    const lightboxImage =
        document.getElementById(
            "lightboxImage"
        );

    const closeButton =
        document.getElementById(
            "lightboxClose"
        );

    const galleryGrid =
        document.getElementById(
            "galleryGrid"
        );

    /*
       No gallery/lightbox markup on this page — nothing to
       wire up. Bail out quietly rather than throwing, since
       an uncaught error here would abort every init call
       still queued after this one.
    */

    if (!lightbox || !lightboxImage || !closeButton || !galleryGrid) return;


    galleryGrid
        .addEventListener(
            "click",
            event => {

                const item =
                    event.target.closest(
                        ".gallery-item"
                    );


                if (!item) return;


                const image =
                    item.querySelector("img");


                lightboxImage.src =
                    image.src;

                lightboxImage.alt =
                    image.alt;


                lightbox.classList.add(
                    "open"
                );

            }
        );


    closeButton.addEventListener(
        "click",
        () => {

            lightbox.classList.remove(
                "open"
            );

        }
    );


    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                lightbox
            ) {

                lightbox.classList.remove(
                    "open"
                );

            }

        }
    );

}


/* =========================================================
   UI HELPERS
========================================================= */

function showMessage(
    element,
    text,
    type
) {

    if (!element) return;

    element.textContent =
        text;

    element.className =
        `form-message ${type}`;

}


/* =========================================================
   ANALYTICS HOOK
========================================================= */


/*
 * This does NOT need to be active immediately.
 *
 * Once the backend exists, we can enable this to record:
 *
 * - page views
 * - registration modal opens
 * - registration attempts
 * - successful registrations
 * - queries
 * - device/browser information
 *
 * The admin dashboard will read these records.
 */

async function trackEvent(
    eventName,
    metadata = {}
) {

    if (
        !CONFIG.API_ENDPOINT ||
        CONFIG.API_ENDPOINT.startsWith("YOUR_")
    ) {
        return;
    }


    try {

        await fetch(
            CONFIG.API_ENDPOINT,
            {

                method: "POST",

                headers: {
                    "Content-Type":
                        "text/plain;charset=utf-8"
                },

                body:
                    JSON.stringify({

                        action:
                            "analytics",

                        event:
                            eventName,

                        metadata

                    })

            }
        );

    } catch (error) {

        /*
         * Analytics failure should NEVER
         * interfere with the website.
         */

        console.debug(
            "Analytics unavailable."
        );

    }

}
/* =========================================================
   GALLERY CAROUSEL
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const track = document.getElementById("galleryTrack");
    const slides = document.querySelectorAll(".gallery-slide");

    const currentCounter =
        document.getElementById("galleryCurrent");

    const totalCounter =
        document.getElementById("galleryTotal");


    if (!track || !slides.length) return;


    /* =====================================================
       SETTINGS
    ===================================================== */

    let currentIndex = 0;

    const slideDuration = 4500;

    const transitionDuration = 900;


    /* =====================================================
       TOTAL COUNTER
    ===================================================== */

    totalCounter.textContent =
        String(slides.length).padStart(2, "0");


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    slides.forEach((slide, index) => {

        slide.classList.remove("active");

        slide.style.transform =
            `translateX(${(index - currentIndex) * 100}%)`;

    });


    slides[currentIndex].classList.add("active");


    /* =====================================================
       UPDATE COUNTER
    ===================================================== */

    function updateCounter() {

        currentCounter.textContent =
            String(currentIndex + 1).padStart(2, "0");

    }


    /* =====================================================
       MOVE GALLERY
    ===================================================== */

    function moveGallery() {

        currentIndex++;

        /*
           Loop back to the first image
           after the final image.
        */

        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }


        slides.forEach((slide, index) => {

            const position =
                index - currentIndex;

            slide.style.transform =
                `translateX(${position * 100}%)`;

        });


        /*
           Active slide
        */

        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        slides[currentIndex]
            .classList.add("active");


        updateCounter();

    }


    /* =====================================================
       START AUTOMATIC MOTION
    ===================================================== */

    let galleryTimer =
        setInterval(
            moveGallery,
            slideDuration
        );


    /* =====================================================
       PAUSE WHEN HOVERING
    ===================================================== */

    const galleryStage =
        document.querySelector(".gallery-stage");


    if (galleryStage) {

        galleryStage.addEventListener(
            "mouseenter",
            () => {

                clearInterval(galleryTimer);

            }
        );


        galleryStage.addEventListener(
            "mouseleave",
            () => {

                galleryTimer =
                    setInterval(
                        moveGallery,
                        slideDuration
                    );

            }
        );

    }


    /* =====================================================
       INITIAL COUNTER
    ===================================================== */

    updateCounter();

});


/* =========================================================
   HERO GEOMETRY — CLOCK-HAND ROTATION
   The three intersecting lines rotate clockwise at
   the exact speed of a seconds hand, the inner red
   square rotates anticlockwise at the exact speed of
   a minutes hand, and the larger black square rotates
   clockwise at the exact speed of an hours hand.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (reducedMotion) return;


    const lines = [

        {
            el: document.querySelector(".line-1"),
            base: 0
        },

        {
            el: document.querySelector(".line-2"),
            base: 45
        },

        {
            el: document.querySelector(".line-3"),
            base: -45
        }

    ];

    const squareHour =
        document.querySelector(".square-one");

    const squareMinute =
        document.querySelector(".square-two");

    const hasGeometry =
        lines.every(line => line.el) &&
        squareHour &&
        squareMinute;

    if (!hasGeometry) return;


    /*
       Digital readout, sitting quietly beneath the shape.
       Same DOM elements are reused every tick — only their
       text changes, so nothing re-flows or re-renders.
    */

    const clockDay =
        document.querySelector(".geometry-clock-day");

    const clockTime =
        document.querySelector(".geometry-clock-time");

    const dayNames = [
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
    ];

    function pad(value) {

        return String(value).padStart(2, "0");

    }

    function updateClock(now) {

        if (!clockDay || !clockTime) return;

        clockDay.textContent =
            dayNames[now.getDay()];

        clockTime.textContent =
            `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

        /*
           A brief opacity dip on the changing digits gives
           the readout the same tick-tock feel as the shape,
           instead of the text flatly swapping in place.
        */

        clockTime.classList.add("is-updating");

        window.setTimeout(() => {

            clockTime.classList.remove("is-updating");

        }, 120);

    }


    /*
       TICK-TOCK MODE
       Instead of interpolating a fresh angle on every
       animation frame (smooth glide), we only recompute
       angles once per whole second, and let a short CSS
       transition give each step its snap. This reproduces
       the classic mechanical tick-tock-tick-tock motion.
    */

    const TICK_TRANSITION =
        "transform 0.12s cubic-bezier(0.34, 1.56, 0.64, 1)";

    lines.forEach(line => {

        line.el.style.transition =
            TICK_TRANSITION;

    });

    squareMinute.style.transition =
        TICK_TRANSITION;

    squareHour.style.transition =
        TICK_TRANSITION;


    let lastSecond =
        null;

    function tick() {

        const now = new Date();

        const wholeSeconds =
            now.getSeconds();


        /*
           Only move the hands when the whole second
           actually changes — this is what produces the
           discrete "tick" instead of a smooth glide.
        */

        if (wholeSeconds !== lastSecond) {

            lastSecond =
                wholeSeconds;

            const minutes =
                now.getMinutes();

            const hours =
                now.getHours() % 12;


            /*
               Seconds hand — steps 6° per second, clockwise.
            */

            const secondsAngle =
                (wholeSeconds / 60) * 360;

            /*
               Minutes hand — steps once per minute,
               applied anticlockwise (negated).
            */

            const minutesAngle =
                -((minutes / 60) * 360);

            /*
               Hours hand — steps gradually across the hour,
               clockwise.
            */

            const hoursAngle =
                ((hours + minutes / 60) / 12) * 360;


            lines.forEach(line => {

                line.el.style.transform =
                    `rotate(${line.base + secondsAngle}deg)`;

            });

            squareMinute.style.transform =
                `rotate(${20 + minutesAngle}deg)`;

            squareHour.style.transform =
                `rotate(${45 + hoursAngle}deg)`;


            updateClock(now);

        }

        requestAnimationFrame(tick);

    }

    requestAnimationFrame(tick);

});button,
input,
textarea {
    font: inherit;
}

button {
    border: 0;
}

a {
    color: inherit;
    text-decoration: none;
}

p,
h1,
h2,
h3,
figure {
    margin-top: 0;
}

::selection {
    background: var(--black);
    color: var(--white);
}


/* =========================================================
   ACCESSIBILITY
========================================================= */

:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 4px;
}

@media (prefers-reduced-motion: reduce) {

    html {
        scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
        animation-duration: 0.001ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.001ms !important;
    }
}


/* =========================================================
   CONTAINER
========================================================= */

.container {
    width: min(
        calc(100% - 48px),
        var(--container)
    );

    margin-inline: auto;
}

.section {
    padding: 120px 0;
}

.section-dark {
    background: var(--black);
    color: var(--white);
}

.section-accent {
    background: var(--accent);
    color: var(--white);
}

.section-soft {
    background: var(--soft);
}


/* =========================================================
   HEADER / NAVIGATION
========================================================= */

.site-header {
    position: fixed;
    inset: 0 0 auto;
    z-index: 1000;

    transition:
        background var(--transition),
        box-shadow var(--transition),
        transform var(--transition);
}

.site-header.scrolled {
    background: rgba(244, 241, 235, 0.94);
    backdrop-filter: blur(18px);
    box-shadow: 0 8px 35px rgba(17, 17, 17, 0.08);
}

.navbar {
    position: relative;

    width: min(
        calc(100% - 48px),
        var(--container)
    );

    min-height: 86px;
    margin-inline: auto;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
}

.brand {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
}

.brand-mark {
    width: 38px;
    height: 38px;

    display: grid;
    place-items: center;

    border: 1px solid var(--black);
    border-radius: 50%;

    font-family: var(--serif);
    font-size: 24px;
}

.brand-text {
    display: flex;
    align-items: baseline;
    gap: 4px;

    letter-spacing: .08em;
    font-size: 13px;
}

.brand-text strong {
    font-weight: 700;
}

.brand-text small {
    font-size: 10px;
    color: var(--accent);
}

.nav-menu {
    display: flex;
    align-items: center;
    gap: 28px;
}

.nav-link {
    position: relative;

    font-size: 13px;
    font-weight: 600;
    letter-spacing: .02em;

    color: #423a2f;

    transition:
        color var(--transition);
}

.nav-link::after {
    content: "";

    position: absolute;
    left: 0;
    bottom: -7px;

    width: 100%;
    height: 1px;

    background: var(--black);

    transform: scaleX(0);
    transform-origin: right;

    transition: transform var(--transition);
}

.nav-link:hover {
    color: var(--accent);
}

.nav-link:hover::after {
    transform: scaleX(1);
    transform-origin: left;
}

.nav-register {
    display: inline-flex;
    align-items: center;
    gap: 10px;

    padding: 11px 17px;

    background: var(--black);
    color: var(--white);

    font-size: 13px;
    font-weight: 600;

    transition:
        background var(--transition),
        transform var(--transition);
}

.nav-register:hover {
    background: var(--accent);
    transform: translateY(-2px);
}

.nav-register span {
    font-size: 15px;
}

.nav-toggle {
    display: none;

    width: 44px;
    height: 44px;

    background: transparent;

    cursor: pointer;
}

.nav-toggle span {
    display: block;

    width: 24px;
    height: 1px;

    margin: 6px auto;

    background: var(--black);

    transition:
        transform var(--transition);
}


/* =========================================================
   HERO
========================================================= */

.hero {
    position: relative;
    min-height: 100vh;

    display: flex;
    align-items: center;

    overflow: hidden;

    border-bottom: 1px solid var(--line);
}


/* =========================================================
   BACKGROUND GRID
========================================================= */

.hero-grid {
    position: absolute;
    inset: 0;

    opacity: .45;

    background-image:
        linear-gradient(
            rgba(17,17,17,.045) 1px,
            transparent 1px
        ),
        linear-gradient(
            90deg,
            rgba(17,17,17,.045) 1px,
            transparent 1px
        );

    background-size: 70px 70px;

    mask-image:
        radial-gradient(
            circle at 70% 45%,
            black,
            transparent 65%
        );
}


/* =========================================================
   HERO CONTAINER
========================================================= */

.hero-container {
    position: relative;
    z-index: 3;

    display: grid;
    grid-template-columns: 1.05fr .95fr;

    gap: 80px;
    align-items: center;

    padding-top: 90px;
    padding-bottom: 70px;
}


.hero-copy {
    max-width: 690px;
}


/* =========================================================
   EYEBROW
========================================================= */

.eyebrow {
    display: flex;
    align-items: center;
    gap: 10px;

    margin-bottom: 34px;

    font-size: 11px;
    font-weight: 700;

    letter-spacing: .15em;
    text-transform: uppercase;
}

.eyebrow span {
    color: var(--accent);
}


/* =========================================================
   HERO TITLE
========================================================= */

.hero-title {
    display: flex;
    flex-direction: column;

    max-width: 850px;

    margin: 0 0 34px;

    font-family: var(--serif);

    font-weight: 400;
    line-height: .86;

    letter-spacing: -.045em;
}


/* =========================================================
   "THE BEAUTY OF"
========================================================= */

.hero-title-small {
    display: block;

    margin-bottom: .12em;

    font-size: clamp(
        1.4rem,
        2vw,
        2.5rem
    );

    font-weight: 400;

    letter-spacing: -.035em;
}

/* =========================================================
   SECOND LINE
   GRAPH + SYMMETRY
========================================================= */

.hero-title-visual {
    display: flex;
    align-items: center;

    min-height: 8.0em;

    white-space: nowrap;
}


/* =========================================================
   GEOMETRIC GRAPH
========================================================= */

.hero-graph {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    width: clamp(
        4.5rem,
        8vw,
        8rem
    );

    height: clamp(
        4.5rem,
        8vw,
        8rem
    );

    margin-right: -.15em;

    flex-shrink: 0;
    transform: translateY(-15%);
    z-index: 2;
}


/*
   The actual circular mathematical graphic
*/

.hero-graph img {
    display: block;

    width: auto;
    height: 200%;
    max-width: 100%;

    object-fit: contain;

    transform-origin: center center;

    animation:
        heroGraphRotate
        22s
        linear
        infinite;
}

/* =========================================================
   GRAPH ROTATION
========================================================= */

@keyframes heroGraphRotate {

    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }

}


/* =========================================================
   SYMMETRY ANAGRAM
========================================================= */

.hero-symmetry {
    position: relative;

    display: flex;
    align-items: center;

    width: clamp(
        15rem,
        28vw,
        31rem
    );

    /*
       Crop the empty space above and below
       the actual Symmetry artwork.
    */
    height: 0.80em;

    /* overflow: hidden; */

    flex: 0 0 auto;

    z-index: 1;
}


.hero-symmetry img {
    display: block;

    width: 100%;
    height: auto;

    max-width: none;

    object-fit: contain;

    /*
       Move the SVG inside the cropped window.
       Adjust this slightly if necessary.
    */
    /* transform: translateY(-1%); */
}

/*
   Symmetry SVG itself
*/

.hero-symmetry img {
    display: block;

    width: 100%;
    height: auto;

    object-fit: contain;
}


/* =========================================================
   DESCRIPTION
========================================================= */

.hero-description {
    max-width: 590px;

    margin-bottom: 38px;

    color: #5c5344;

    font-size: 17px;
    line-height: 1.7;
    transform: translateY(-10%);
}


/* =========================================================
   HERO META
========================================================= */

.hero-meta {
    display: flex;
    gap: 55px;

    margin-bottom: 40px;
}

.hero-meta div {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.hero-meta span {
    color: var(--muted);

    font-size: 10px;
    font-weight: 700;

    letter-spacing: .14em;
    text-transform: uppercase;
}

.hero-meta strong {
    font-size: 14px;
}


/* =========================================================
   HERO ACTIONS
========================================================= */

.hero-actions {
    display: flex;
    align-items: center;
    gap: 30px;
}


/* =========================================================
   BUTTON
========================================================= */

.button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 18px;

    min-height: 54px;

    padding: 0 24px;

    font-size: 13px;
    font-weight: 700;

    cursor: pointer;

    transition:
        transform var(--transition),
        background var(--transition),
        color var(--transition),
        border-color var(--transition);
}

.button:hover {
    transform: translateY(-3px);
}


.button-dark {
    background: var(--black);
    color: var(--white);
}

.button-dark:hover {
    background: var(--accent);
}


.button-outline {
    border: 1px solid rgba(255,255,255,.4);

    color: var(--white);

    background: transparent;
}

.button-outline:hover {
    background: var(--white);
    color: var(--black);
}


.full-width {
    width: 100%;
}


/* =========================================================
   TEXT LINK
========================================================= */

.text-link,
.arrow-link {
    display: inline-flex;
    align-items: center;
    gap: 10px;

    font-size: 13px;
    font-weight: 700;

    transition:
        color var(--transition);
}

.text-link:hover,
.arrow-link:hover {
    color: var(--accent);
}


.text-link span,
.arrow-link span {
    transition:
        transform var(--transition);
}


.text-link:hover span,
.arrow-link:hover span {
    transform:
        translate(3px, -3px);
}


/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 900px) {

    .hero-container {
        grid-template-columns: 1fr;

        gap: 50px;

        padding-top: 120px;
    }

    .hero-copy {
        max-width: 100%;
    }

}


@media (max-width: 600px) {

    .hero-title-small {
        font-size: clamp(
            1.1rem,
            4vw,
            1.4rem
        );
    }

    .hero-title-visual {
        margin-top: .08em;
    }

    .hero-symmetry {
        width: min(
            72vw,
            19rem
        );
    }

    .hero-description {
        font-size: 15px;
    }

    .hero-meta {
        flex-wrap: wrap;
        gap: 25px 40px;
    }

    .hero-actions {
        flex-wrap: wrap;
    }

}


/* =========================================================
   REDUCED MOTION
========================================================= */

@media (prefers-reduced-motion: reduce) {

    .hero-graph img {
        animation: none;
    }

}
/* =========================================================
   HERO GEOMETRY
========================================================= */

.hero-visual {
    min-height: 620px;

    display: grid;
    place-items: center;
}

.geometry-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.geometry {
    position: relative;

    width: min(42vw, 570px);
    aspect-ratio: 1;

    transform: rotate(-8deg);
}

/* =========================================================
   HERO GEOMETRY — DIGITAL READOUT
   A quiet, editorial-style caption beneath the shape,
   not a literal LCD/digital-clock widget. Tabular
   numerals keep digit width stable as it ticks.
========================================================= */

.geometry-clock {
    display: flex;
    align-items: baseline;
    gap: 10px;

    margin-top: 22px;

    padding-top: 14px;
    border-top: 1px solid var(--line);

    font-family: var(--sans);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;

    color: var(--muted);

    font-variant-numeric: tabular-nums;
}

.geometry-clock-day {
    color: var(--accent);
}

.geometry-clock-divider {
    width: 3px;
    height: 3px;

    border-radius: 50%;
    background: var(--muted);

    opacity: .5;
}

.geometry-clock-time {
    letter-spacing: 0.12em;
    color: var(--black);
}

.geometry-clock-time span {
    display: inline-block;
    transition: opacity .15s ease;
}

.geometry-clock-time span.is-updating {
    opacity: .35;
}

@media (max-width: 640px) {

    .geometry-clock {
        font-size: 10.5px;
        gap: 8px;
    }

}

.geometry-circle,
.geometry-square,
.geometry-node,
.geometry-line {
    position: absolute;
}

.geometry-circle {
    border: 1px solid rgba(17,17,17,.45);
    border-radius: 50%;
}

.circle-large {
    inset: 4%;
}

.circle-medium {
    inset: 19%;
    border-style: dashed;
}

.circle-small {
    inset: 37%;
    border-color: var(--accent);
}

.geometry-square {
    inset: 20%;

    border: 1px solid rgba(17,17,17,.6);

    transform: rotate(45deg);
}

.square-two {
    inset: 31%;

    border-color: var(--accent);

    transform: rotate(20deg);
}

.geometry-line {
    left: 0;
    top: 50%;

    width: 100%;
    height: 1px;

    background: rgba(17,17,17,.35);
}

.line-2 {
    transform: rotate(45deg);
}

.line-3 {
    transform: rotate(-45deg);
}

.geometry-node {
    width: 13px;
    height: 13px;

    border: 2px solid var(--black);
    border-radius: 50%;

    background: var(--paper);

    z-index: 4;
}

.node-1 {
    left: 50%;
    top: 0;
}

.node-2 {
    right: 0;
    top: 50%;
}

.node-3 {
    left: 50%;
    bottom: 0;
}

.node-4 {
    left: 0;
    top: 50%;
}

.geometry-center {
    position: absolute;
    inset: 43%;

    display: grid;
    place-items: center;

    background: var(--black);
    color: var(--white);

    border-radius: 50%;

    font-family: var(--serif);
    font-size: 45px;

    box-shadow: var(--shadow);
}

.hero-equation {
    position: absolute;

    color: rgba(17,17,17,.25);

    font-family: var(--serif);
    font-style: italic;

    pointer-events: none;
}

.equation-one {
    right: 8%;
    top: 25%;
    font-size: 30px;
}

.equation-two {
    left: 5%;
    bottom: 15%;
    font-size: 20px;
}

.hero-orbit {
    position: absolute;

    border: 1px solid rgba(182,59,46,.18);
    border-radius: 50%;

    pointer-events: none;
}

.orbit-one {
    width: 600px;
    height: 180px;

    right: -130px;
    top: 12%;

    transform: rotate(30deg);
}

.orbit-two {
    width: 480px;
    height: 160px;

    right: 2%;
    bottom: 5%;

    transform: rotate(-30deg);
}

.hero-bottom {
    position: absolute;
    z-index: 5;

    left: 0;
    right: 0;
    bottom: 25px;

    width: min(
        calc(100% - 48px),
        var(--container)
    );

    margin-inline: auto;

    display: flex;
    justify-content: space-between;

    color: var(--muted);

    font-size: 10px;
    font-weight: 700;
    letter-spacing: .15em;
}


/* =========================================================
   SECTION HEADINGS
========================================================= */

.section-kicker {
    display: flex;
    align-items: center;
    gap: 16px;

    margin-bottom: 30px;

    font-size: 10px;
    font-weight: 700;
    letter-spacing: .16em;
}

.section-kicker span:first-child {
    color: var(--accent);
}

.section-heading-row {
    display: flex;
    justify-content: space-between;
    gap: 50px;

    margin-bottom: 70px;
}

.section-heading-row.light {
    color: var(--white);
}

.section-title {
    max-width: 750px;

    margin-bottom: 0;

    font-family: var(--serif);
    font-size: clamp(3.4rem, 6vw, 6.5rem);
    font-weight: 400;
    line-height: .9;
    letter-spacing: -.035em;
}

.section-side-note {
    max-width: 330px;

    align-self: end;

    margin-bottom: 8px;

    color: var(--muted);
    font-size: 14px;
}

.light .section-side-note {
    color: rgba(255,255,255,.55);
}


/* =========================================================
   INTRO
========================================================= */

.intro {
    background: var(--paper);
}

.intro-grid {
    display: grid;
    grid-template-columns: 1.1fr .9fr;
    gap: 100px;

    padding-bottom: 80px;

    border-bottom: 1px solid var(--line);
}

.intro-grid h2 {
    max-width: 700px;

    margin: 0;

    font-family: var(--serif);
    font-size: clamp(3.4rem, 6vw, 6.5rem);
    font-weight: 400;
    line-height: .9;
    letter-spacing: -.035em;
}

.intro-copy {
    align-self: end;
}

.intro-copy p {
    color: #5c5344;
    font-size: 16px;
}

.intro-copy .arrow-link {
    margin-top: 20px;
}

.intro-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    padding-top: 45px;
}

.stat {
    padding-right: 25px;

    border-right: 1px solid var(--line);
}

.stat:not(:first-child) {
    padding-left: 25px;
}

.stat:last-child {
    border-right: 0;
}

.stat strong {
    display: block;

    margin-bottom: 5px;

    font-family: var(--serif);
    font-size: 48px;
    font-weight: 400;
}

.stat span {
    color: var(--muted);

    font-size: 11px;
    font-weight: 700;
    letter-spacing: .1em;
    text-transform: uppercase;
}


/* =========================================================
   SPEAKERS
========================================================= */

.speaker-list {
    border-top: 1px solid var(--line);
}

.speaker {
    display: grid;
    grid-template-columns: 70px 310px 1fr;
    gap: 50px;

    padding: 55px 0;

    border-bottom: 1px solid var(--line);
}

.speaker-number {
    padding-top: 5px;

    color: var(--accent);

    font-size: 12px;
    font-weight: 700;
}

.speaker-image {
    aspect-ratio: 4 / 5;

    overflow: hidden;

    background: var(--paper-dark);
}

.speaker-image img {
    width: 100%;
    height: 100%;

    object-fit: cover;

    filter: grayscale(100%);

    transition:
        filter var(--transition),
        transform 700ms cubic-bezier(.2,.7,.2,1);
}

.speaker:hover .speaker-image img {
    filter: grayscale(0);
    transform: scale(1.04);
}

.speaker-content {
    max-width: 620px;
    align-self: center;
}

.speaker-role {
    margin-bottom: 14px;

    color: var(--muted);

    font-size: 11px;
    font-weight: 700;
    letter-spacing: .1em;
    text-transform: uppercase;
}

.speaker h3 {
    margin-bottom: 12px;

    font-family: var(--serif);
    font-size: clamp(3rem, 5vw, 5rem);
    font-weight: 400;
    line-height: .9;
}

.speaker-talk {
    margin-bottom: 25px;

    color: var(--accent);

    font-size: 16px;
    font-weight: 700;
}

.speaker-content > p:last-child {
    max-width: 550px;
    color: var(--muted);
}


/* =========================================================
   EVENTS
========================================================= */

.event-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;

    margin-top: 10px;

    background: rgba(255,255,255,.16);
}

.event-card {
    position: relative;

    min-height: 340px;
    padding: 34px;

    background: var(--black);

    display: flex;
    flex-direction: column;

    transition:
        background var(--transition),
        transform var(--transition);
}

.event-card:hover {
    background: #211a13;
}

.event-large {
    grid-row: span 2;
}

.event-large .event-icon {
    margin-bottom: 24px;
}

.event-photo-slideshow {
    position: relative;
    flex: 1;
    min-height: 140px;
    margin-bottom: 24px;
    overflow: hidden;
    border-radius: 6px;
    background: rgba(255,255,255,.04);
}

.event-photo-slideshow img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 1.2s ease;
}

.event-photo-slideshow img.is-active {
    opacity: 1;
}

.event-wide {
    grid-column: span 2;
}

.event-index {
    position: absolute;

    top: 30px;
    right: 30px;

    color: rgba(255,255,255,.3);

    font-size: 11px;
    font-weight: 700;
}

.event-icon {
    width: 55px;
    height: 55px;

    display: grid;
    place-items: center;

    margin-bottom: auto;

    border: 1px solid rgba(255,255,255,.25);
    border-radius: 50%;

    color: var(--accent);

    font-family: var(--serif);
    font-size: 25px;
}

.event-card h3 {
    margin-bottom: 12px;

    font-family: var(--serif);
    font-size: 42px;
    font-weight: 400;
    line-height: .95;
}

.event-card p {
    max-width: 340px;

    margin-bottom: 22px;

    color: rgba(255,255,255,.55);

    font-size: 14px;
}

.event-card a {
    display: inline-flex;
    align-items: center;

    color: var(--white);

    font-size: 12px;
    font-weight: 700;

    transition: color var(--transition);
}

.event-card a:hover {
    color: var(--accent-soft);
}


/* =========================================================
   GUIDELINES
========================================================= */

.guidelines-header {
    display: grid;
    grid-template-columns: 1fr .7fr;
    gap: 100px;

    margin-bottom: 65px;
}

.guidelines-header p {
    align-self: end;

    max-width: 500px;

    color: var(--muted);
}

.guideline-list {
    border-top: 1px solid var(--line);
}

.guideline-row {
    display: grid;
    grid-template-columns: 80px 1fr auto;
    gap: 30px;
    align-items: center;

    padding: 26px 0;

    border-bottom: 1px solid var(--line);

    transition:
        padding var(--transition),
        color var(--transition);
}

.guideline-row:hover {
    padding-left: 12px;
    color: var(--accent);
}

.guideline-row span {
    color: var(--muted);

    font-size: 11px;
    font-weight: 700;
}

.guideline-row strong {
    font-family: var(--serif);
    font-size: 28px;
    font-weight: 400;
}

.guideline-row span:last-child {
    text-align: right;
}


/* =========================================================
   REGISTRATION
========================================================= */

.registration-container {
    display: grid;
    grid-template-columns: 1fr 430px;
    gap: 100px;
    align-items: center;
}

.registration-copy {
    max-width: 700px;
}

.registration-copy .section-kicker {
    color: var(--white);
}

.registration-copy .section-kicker span:first-child {
    color: rgba(255,255,255,.6);
}

.registration-copy p {
    color: rgba(255,255,255,.75);
}

.registration-points {
    margin-top: 45px;

    border-top: 1px solid rgba(255,255,255,.25);
}

.registration-points > div {
    display: grid;
    grid-template-columns: 45px 1fr;
    gap: 20px;

    padding: 18px 0;

    border-bottom: 1px solid rgba(255,255,255,.25);
}

.registration-points span {
    color: rgba(255,255,255,.5);

    font-size: 11px;
    font-weight: 700;
}

.registration-points p {
    margin: 0;

    color: var(--white);
}

.registration-panel {
    background: var(--white);
    color: var(--black);

    box-shadow: 0 30px 70px rgba(0,0,0,.18);
}

.panel-top {
    display: flex;
    justify-content: space-between;

    padding: 18px 22px;

    background: var(--black);
    color: var(--white);

    font-size: 10px;
    font-weight: 700;
    letter-spacing: .12em;
}

.panel-body {
    padding: 35px;
}

.fee-box {
    display: flex;
    flex-direction: column;

    padding-bottom: 25px;
    margin-bottom: 25px;

    border-bottom: 1px solid var(--line);
}

.fee-box span {
    color: var(--muted);

    font-size: 10px;
    font-weight: 700;
    letter-spacing: .12em;
    text-transform: uppercase;
}

.fee-box strong {
    margin-top: 8px;

    font-family: var(--serif);
    font-size: 28px;
    font-weight: 400;
}

.payment-note {
    color: var(--muted);

    font-size: 13px;
}

.registration-panel .button + .button {
    margin-top: 10px;
}

.small-note {
    margin: 20px 0 0;

    color: var(--muted);

    font-size: 11px;
}


/* =========================================================
   SCHEDULE
========================================================= */

.schedule-header {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 40px;

    margin-bottom: 65px;
}

.timeline {
    border-top: 1px solid var(--line);
}

.timeline-row {
    display: grid;
    grid-template-columns: 150px 1fr;
    gap: 50px;

    padding: 30px 0;

    border-bottom: 1px solid var(--line);
}

.timeline-row time {
    font-family: var(--serif);
    font-size: 30px;
}

.timeline-row h3 {
    margin-bottom: 4px;

    font-family: var(--serif);
    font-size: 30px;
    font-weight: 400;
}

.timeline-row p {
    margin: 0;

    color: var(--muted);
}


/* =========================================================
   GALLERY
========================================================= */

.gallery-controls {
    display: flex;
    gap: 8px;
}

.gallery-control {
    width: 50px;
    height: 50px;

    border: 1px solid rgba(255,255,255,.25);

    background: transparent;
    color: var(--white);

    cursor: pointer;

    transition:
        background var(--transition),
        color var(--transition);
}

.gallery-control:hover {
    background: var(--white);
    color: var(--black);
}

.gallery-stage {
    position: relative;

    aspect-ratio: 16 / 8;

    overflow: hidden;

    background: #1f1811;
}

.gallery-slide {
    position: absolute;
    inset: 0;

    opacity: 0;
    visibility: hidden;

    transition:
        opacity 600ms ease,
        visibility 600ms ease;
}

.gallery-slide.active {
    opacity: 1;
    visibility: visible;
}

.gallery-slide img {
    width: 100%;
    height: 100%;

    object-fit: cover;
}

.gallery-counter {
    display: flex;
    justify-content: flex-end;
    gap: 7px;

    margin-top: 15px;

    color: rgba(255,255,255,.5);

    font-size: 11px;
}

.gallery-counter span:first-child {
    color: var(--white);
}

/* =========================================================
   SPONSORS — TWO AT A TIME
========================================================= */

.sponsor-grid {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 210px;

    overflow: hidden;

    background: var(--accent);

    border-top: 1px solid var(--accent);
    border-bottom: 1px solid var(--accent);
}

/* =========================================================
   SPONSORS
   Continuous dark wine-red section
========================================================= */

.Sponser {
    position: relative;

    overflow: hidden;

    background: #641522;
    color: var(--white);

    padding-top: 95px;
    padding-bottom: 0;

    border-top: 1px solid rgba(255,255,255,.08);
}


/* =========================================================
   SPONSOR HEADING
========================================================= */

.Sponser .container {
    position: relative;
    z-index: 3;
}


.sponsor-layout {
    display: grid;

    grid-template-columns: .95fr 1.15fr;

    align-items: center;

    gap: 80px;

    padding-bottom: 95px;
}


/*
   Text column: kicker, heading, then
   description + "Know more" stacked below it.
*/

.sponsor-text {
    display: flex;
    flex-direction: column;
}


.sponsor-text .section-title {
    margin-bottom: 26px;
}


.sponsor-text .section-side-note {
    max-width: 460px;

    margin: 0;
}


.sponsor-text .sponsor-more {
    margin-left: 0;
}


/* =========================================================
   SECTION KICKER
========================================================= */

.Sponser .section-kicker {

    display: flex;
    align-items: center;

    gap: 14px;

    margin-bottom: 30px;

    color: var(--white);

    font-size: 11px;
    font-weight: 700;

    letter-spacing: .16em;

    text-transform: uppercase;
}


/*
   Small section number
*/

.Sponser .section-kicker::before {

    content: "04";

    color: #b63b2e;

    font-size: 11px;
    font-weight: 700;

    letter-spacing: .16em;
}


/*
   Hide an existing number if your HTML
   already contains one.
*/

.Sponser .section-kicker span:first-child {
    display: none;
}


/* =========================================================
   LARGE EDITORIAL HEADING
========================================================= */

.Sponser .section-title {

    max-width: 850px;

    margin: 0;

    font-family: var(--serif);

    font-size: clamp(
        4rem,
        7vw,
        7.5rem
    );

    font-weight: 400;

    line-height: .88;

    letter-spacing: -.045em;

    color: var(--white);
}


.Sponser .section-title em {

    color: var(--white);

    font-weight: 400;
}


/* =========================================================
   RIGHT SIDE DESCRIPTION
========================================================= */

.Sponser .section-side-note {

    max-width: 500px;

    margin: 0;

    color: rgba(255,255,255,.65);

    font-size: 16px;

    line-height: 1.6;
}


/* =========================================================
   KNOW MORE
========================================================= */

.Sponser .sponsor-more {

    display: inline-flex;

    align-items: center;

    gap: 12px;

    margin-top: 18px;

    color: var(--white);

    font-size: 12px;

    font-weight: 700;

    text-decoration: none;

    transition:
        color .3s ease;
}


.Sponser .sponsor-more span {

    font-size: 17px;

    line-height: 1;

    transition:
        transform .3s ease;
}


.Sponser .sponsor-more:hover {

    color: #ffffff;
}


.Sponser .sponsor-more:hover span {

    transform:
        translate(4px, -4px);
}


/* =========================================================
   SPONSOR SHOWCASE
   Sits beside the heading/description column,
   one enlarged logo visible at a time.
========================================================= */

.sponsor-showcase {

    position: relative;

    z-index: 2;

    width: 100%;
}


.Sponser .sponsor-grid {

    position: relative;

    width: 100%;

    height: 340px;

    overflow: hidden;

    background: #ffffff;

    border: 0;

    border-radius: 4px;
}


/* =========================================================
   SPONSOR SLIDE
========================================================= */

.Sponser .sponsor {

    position: absolute;

    inset: 0;

    width: 100%;

    display: flex;

    align-items: center;

    justify-content: center;

    padding: 40px;

    border: 0;

    opacity: 0;

    transform:
        translateX(60px);

    transition:
        transform .9s cubic-bezier(.65,0,.35,1),
        opacity .9s ease;

    pointer-events: none;
}


/* =========================================================
   ACTIVE SPONSOR
========================================================= */

.Sponser .sponsor.active {

    opacity: 1;

    transform:
        translateX(0);

    pointer-events: auto;
}


/* =========================================================
   PREVIOUS SPONSOR
========================================================= */

.Sponser .sponsor.previous {

    opacity: 0;

    transform:
        translateX(-60px);
}


/* =========================================================
   SPONSOR IMAGES
   Enlarged so every mark reads clearly,
   while staying inside the showcase frame.
========================================================= */

.Sponser .sponsor img {

    display: block;

    width: auto;
    height: auto;

    max-width: 85%;
    max-height: 260px;

    object-fit: contain;

    filter: none;

    opacity: 1;

    transition:
        transform .45s ease;
}


/* =========================================================
   LOGO HOVER
========================================================= */

.Sponser .sponsor:hover img {

    transform:
        scale(1.05);
}


/* =========================================================
   SLIDE COUNTER
========================================================= */

.sponsor-counter {

    display: flex;

    align-items: center;

    justify-content: center;

    gap: 8px;

    margin-top: 18px;

    color: rgba(255,255,255,.5);

    font-size: 11px;

    font-weight: 700;

    letter-spacing: .12em;
}


.sponsor-counter span:first-child {

    color: var(--white);
}


/* =========================================================
   SUBTLE SECTION DETAIL
========================================================= */

.Sponser::after {

    content: "";

    position: absolute;

    width: 500px;
    height: 500px;

    right: -250px;
    bottom: -300px;

    border: 1px solid rgba(255,255,255,.035);

    border-radius: 50%;

    pointer-events: none;
}


/* =========================================================
   TABLET
========================================================= */

@media (max-width: 900px) {

    .Sponser {

        padding-top: 70px;
    }


    .sponsor-layout {

        grid-template-columns: 1fr;

        gap: 40px;

        padding-bottom: 70px;
    }


    .sponsor-text .section-side-note {

        max-width: none;

    }


    .Sponser .sponsor-grid {

        height: 260px;

    }


    .Sponser .sponsor {

        padding: 25px 30px;

    }


    .Sponser .sponsor img {

        max-height: 190px;

    }

}


/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 600px) {

    .Sponser {

        padding-top: 60px;

    }


    /* Heading */

    .Sponser .section-title {

        font-size: clamp(
            3.5rem,
            15vw,
            5rem
        );

        line-height: .9;

    }


    .Sponser .section-side-note {

        font-size: 14px;

        line-height: 1.6;

    }


    /* Sponsor area */

    .Sponser .sponsor-grid {

        height: 200px;

    }


    .Sponser .sponsor {

        width: 100%;

        padding: 20px;

    }


    .Sponser .sponsor img {

        max-width: 90%;
        max-height: 150px;

    }

}
/* Guidelines / section link */

.section-action-link {
    display: inline-flex;
    align-items: center;
    gap: 10px;

    color: var(--white);

    font-size: 12px;
    font-weight: 700;

    text-decoration: none;

    transition:
        color var(--transition),
        transform var(--transition);
}

.section-action-link span {
    transition:
        transform var(--transition);
}

.section-action-link:hover {
    color: var(--accent);
}

.section-action-link:hover span {
    transform: translate(3px, -3px);
}


/* Event card links */

.event-card > a {
    display: inline-flex;
    align-items: center;
    gap: 9px;

    font-size: 12px;
    font-weight: 700;

    text-decoration: none;

    transition:
        color var(--transition);
}

.event-card > a span {
    transition:
        transform var(--transition);
}

.event-card > a:hover {
    color: var(--accent);
}

.event-card > a:hover span {
    transform: translate(3px, -3px);
}


/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 700px) {

    .section-heading-actions {
        align-items: flex-start;
        gap: 18px;
    }

}
/* =========================================================
   CONTACT
========================================================= */

.contact-grid {
    display: grid;
    grid-template-columns: 1fr 520px;
    gap: 100px;
    align-items: start;
}

.contact-intro {
    max-width: 600px;

    margin-top: 35px;

    color: var(--muted);
}

.contact-details {
    margin-top: 55px;
}

.contact-details > div {
    padding: 18px 0;

    border-top: 1px solid var(--line);
}

.contact-details span {
    display: block;

    margin-bottom: 5px;

    color: var(--muted);

    font-size: 10px;
    font-weight: 700;
    letter-spacing: .12em;
    text-transform: uppercase;
}

.contact-details a {
    font-weight: 600;
}

.contact-details a:hover {
    color: var(--accent);
}

.query-card {
    padding: 38px;

    background: var(--white);

    box-shadow: var(--shadow);
}

.form-field {
    position: relative;

    margin-bottom: 22px;
}

.form-field label {
    display: block;

    margin-bottom: 8px;

    font-size: 11px;
    font-weight: 700;
    letter-spacing: .1em;
    text-transform: uppercase;
}

.form-field input,
.form-field textarea {
    width: 100%;

    padding: 15px 0;

    border: 0;
    border-bottom: 1px solid var(--line);

    background: transparent;

    color: var(--black);

    outline: none;

    resize: vertical;

    transition:
        border-color var(--transition);
}

.form-field input:focus,
.form-field textarea:focus {
    border-color: var(--black);
}

.form-field small {
    display: block;

    margin-top: 5px;

    text-align: right;

    color: var(--muted);

    font-size: 10px;
}

.form-message {
    display: none;

    padding: 13px 15px;
    margin-bottom: 20px;

    font-size: 13px;
}

.form-message.success {
    display: block;

    background: #e4f1e6;
    color: #245b31;
}

.form-message.error {
    display: block;

    background: #f3dde1;
    color: #7a1f30;
}

.query-card .button {
    margin-top: 5px;
}

.privacy-note {
    margin: 18px 0 0;

    color: var(--muted);

    font-size: 10px;
    line-height: 1.5;
}


/* =========================================================
   FAQ
========================================================= */

.faq-list {
    max-width: 900px;

    margin-top: 65px;

    border-top: 1px solid var(--line);
}

.faq-item {
    border-bottom: 1px solid var(--line);
}

.faq-question {
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 25px 0;

    background: transparent;

    color: var(--black);

    text-align: left;

    cursor: pointer;
}

.faq-question span:first-child {
    font-family: var(--serif);
    font-size: 28px;
}

.faq-question span:last-child {
    font-size: 25px;
    font-weight: 300;

    transition: transform var(--transition);
}

.faq-item.open .faq-question span:last-child {
    transform: rotate(45deg);
}

.faq-answer {
    max-height: 0;
    overflow: hidden;

    transition: max-height 400ms ease;
}

.faq-item.open .faq-answer {
    max-height: 300px;
}

.faq-answer p {
    max-width: 700px;

    padding-bottom: 25px;

    margin: 0;

    color: var(--muted);
}


/* =========================================================
   FOOTER
========================================================= */

.footer {
    background: var(--black);
    color: var(--white);

    padding: 80px 0 30px;
}

.footer-top {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 100px;

    padding-bottom: 70px;
}

.footer-logo .brand-mark {
    border-color: var(--white);
}

.footer-brand > p {
    margin-top: 25px;

    color: rgba(255,255,255,.5);

    font-size: 13px;
}

.footer-links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
}

.footer-links div {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.footer-links span {
    margin-bottom: 8px;

    color: rgba(255,255,255,.4);

    font-size: 10px;
    font-weight: 700;
    letter-spacing: .12em;
    text-transform: uppercase;
}

.footer-links a {
    color: rgba(255,255,255,.8);

    font-size: 13px;

    transition: color var(--transition);
}

.footer-links a:hover {
    color: var(--accent-soft);
}

.footer-bottom {
    display: flex;
    justify-content: space-between;

    padding-top: 25px;

    border-top: 1px solid rgba(255,255,255,.15);

    color: rgba(255,255,255,.35);

    font-size: 10px;
}


/* =========================================================
   SCROLL REVEAL
========================================================= */

.reveal {
    opacity: 0;
    transform: translateY(35px);

    transition:
        opacity 700ms ease,
        transform 700ms cubic-bezier(.2,.7,.2,1);
}

.reveal.visible {
    opacity: 1;
    transform: translateY(0);
}


/* =========================================================
   RESPONSIVE — TABLET
========================================================= */

@media (max-width: 1050px) {

    /*
       Hamburger takes over from the inline nav at tablet
       width and down. The menu opens as a horizontal,
       scrollable row anchored under the header — not a
       full-screen vertical panel.
    */

    .nav-toggle {
        display: block;
        position: relative;
        z-index: 1002;
    }

    .nav-toggle.active span:first-child {
        transform: translateY(3.5px) rotate(45deg);
    }

    .nav-toggle.active span:last-child {
        transform: translateY(-3.5px) rotate(-45deg);
    }

    .nav-menu {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        z-index: 1001;

        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 26px;
        flex-wrap: nowrap;

        padding: 18px 24px;

        background: var(--paper);
        border-top: 1px solid var(--line);
        box-shadow: var(--shadow);

        max-height: 0;
        opacity: 0;
        pointer-events: none;
        overflow: hidden;

        transition:
            max-height 380ms cubic-bezier(.2,.7,.2,1),
            opacity 220ms ease;
    }

    .nav-menu.active {
        max-height: 90px;
        opacity: 1;
        pointer-events: auto;

        overflow-x: auto;
        overflow-y: hidden;

        -webkit-overflow-scrolling: touch;
    }

    .nav-link {
        flex-shrink: 0;
        white-space: nowrap;
    }

    .nav-link::after {
        bottom: -5px;
    }

    .nav-register {
        flex-shrink: 0;
        white-space: nowrap;
        margin-left: 4px;
    }

    .hero-container {
        grid-template-columns: 1fr;
        grid-template-areas:
            "eyebrow"
            "title-small"
            "title-visual"
            "description"
            "meta"
            "actions";

        gap: 0;
    }

    /*
       Break hero-copy and hero-title into their
       constituent parts so every piece becomes a
       direct grid item of hero-container. That lets
       hero-title-visual (the anagram) and hero-visual
       (the geometry) share one grid area — their
       centred position within that shared cell is
       the same point, so the anagram's centre and
       the geometry's centre always match exactly,
       at any tablet or phone width.
    */

    .hero-copy,
    .hero-title {
        display: contents;
    }

    .eyebrow {
        grid-area: eyebrow;
    }

    .hero-title-small {
        grid-area: title-small;
    }

    .hero-title-visual,
    .hero-visual {
        grid-area: title-visual;

        align-self: center;
        justify-self: center;
    }

    .hero-title-visual {
        margin-bottom: 34px;

        z-index: 1;
    }

    .hero-description {
        grid-area: description;
    }

    .hero-meta {
        grid-area: meta;
    }

    .hero-actions {
        grid-area: actions;
    }

    .hero-visual {
        z-index: 0;

        min-height: auto;

        pointer-events: none;
    }

    .geometry {
        width: min(70vw, 500px);

        opacity: .8;
    }

    .geometry-center {
        display: none;
    }

    /*
       Rotating graph is dropped at this size —
       the anagram becomes the sole visual, so
       it can sit centred on the geometric shape.
    */

    .hero-graph {
        display: none;
    }

    .hero-title-visual {
        justify-content: center;

        width: 100%;
    }

    .hero-title-small {
        text-align: center;
    }

    .hero-symmetry {
        margin: 0 auto;
    }

    /*
       White outline traces the anagram's linework
       (not a box around the image) so it reads
       clearly against the geometric shape behind it.
    */

    .hero-symmetry img {
        filter:
            drop-shadow(1.5px 0 0 var(--white))
            drop-shadow(-1.5px 0 0 var(--white))
            drop-shadow(0 1.5px 0 var(--white))
            drop-shadow(0 -1.5px 0 var(--white));
    }

    .intro-grid,
    .guidelines-header {
        grid-template-columns: 1fr;
        gap: 45px;
    }

    .speaker {
        grid-template-columns: 50px 260px 1fr;
        gap: 30px;
    }

    .registration-container {
        grid-template-columns: 1fr;
        gap: 60px;
    }

    .registration-panel {
        max-width: 550px;
    }

    .contact-grid {
        grid-template-columns: 1fr;
        gap: 60px;
    }

    .sponsor-grid {
        grid-template-columns: repeat(3, 1fr);
    }

    .sponsor {
        border-bottom: 1px solid var(--line);
    }

    .sponsor:nth-child(3n) {
        border-right: 0;
    }

    .sponsor:nth-last-child(-n+3) {
        border-bottom: 0;
    }
}


/* =========================================================
   RESPONSIVE — MOBILE
========================================================= */

@media (max-width: 760px) {

    .container,
    .navbar,
    .hero-bottom {
        width: min(
            calc(100% - 32px),
            var(--container)
        );
    }

    .section {
        padding: 80px 0;
    }

    .navbar {
        min-height: 74px;
    }

    .nav-menu {
        gap: 18px;
        padding: 14px 20px;
    }

    .nav-menu.active {
        max-height: 74px;
    }

    .nav-link {
        font-size: 13px;
    }

    .nav-register {
        padding: 9px 14px;
        font-size: 12px;
    }

    .hero {
        min-height: auto;
        padding-top: 80px;
    }

    .hero-container {
        gap: 20px;
        padding-top: 70px;
        padding-bottom: 100px;
    }

    .hero h1 {
        font-size: clamp(4rem, 18vw, 6rem);
    }

    .hero-description {
        font-size: 15px;
    }

    .hero-meta {
        flex-direction: column;
        gap: 18px;
    }

    .hero-actions {
        align-items: flex-start;
        flex-direction: column;
        gap: 20px;
    }

    .geometry {
        width: 88vw;

        opacity: .8;
    }

    .hero-equation {
        display: none;
    }

    .hero-bottom {
        bottom: 15px;
    }

    .section-heading-row {
        flex-direction: column;
        gap: 30px;
        margin-bottom: 50px;
    }

    .section-title,
    .intro-grid h2 {
        font-size: clamp(3.2rem, 14vw, 5rem);
    }

    .intro-grid {
        padding-bottom: 55px;
    }

    .intro-stats {
        grid-template-columns: repeat(2, 1fr);
        gap: 25px;
    }

    .stat {
        padding: 0 0 20px !important;
        border-right: 0;
        border-bottom: 1px solid var(--line);
    }

    .stat:nth-last-child(-n+2) {
        border-bottom: 0;
    }

    .speaker {
        grid-template-columns: 1fr;
        gap: 25px;
    }

    .speaker-number {
        order: 0;
    }

    .speaker-image {
        max-width: 300px;
    }

    .speaker h3 {
        font-size: 3.5rem;
    }

    .event-grid {
        grid-template-columns: 1fr;
    }

    .event-large,
    .event-wide {
        grid-column: auto;
        grid-row: auto;
    }

    .event-card {
        min-height: 300px;
    }

    .guideline-row {
        grid-template-columns: 40px 1fr;
        gap: 15px;
    }

    .guideline-row span:last-child {
        grid-column: 2;
        text-align: left;
    }

    .schedule-header {
        align-items: flex-start;
        flex-direction: column;
    }

    .timeline-row {
        grid-template-columns: 70px 1fr;
        gap: 20px;
    }

    .timeline-row h3 {
        font-size: 25px;
    }

    .gallery-stage {
        aspect-ratio: 4 / 3;
    }

    .sponsor-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .sponsor:nth-child(3n) {
        border-right: 1px solid var(--line);
    }

    .sponsor:nth-child(2n) {
        border-right: 0;
    }

    .sponsor:nth-last-child(-n+3) {
        border-bottom: 1px solid var(--line);
    }

    .sponsor:nth-last-child(-n+2) {
        border-bottom: 0;
    }

    .query-card {
        padding: 25px;
    }

    .faq-question span:first-child {
        font-size: 23px;
    }

    .footer-top {
        grid-template-columns: 1fr;
        gap: 55px;
    }

    .footer-links {
        grid-template-columns: repeat(2, 1fr);
    }

    .footer-bottom {
        flex-direction: column;
        gap: 10px;
    }
}


/* =========================================================
   SMALL MOBILE
========================================================= */

@media (max-width: 420px) {

    .hero h1 {
        font-size: 3.8rem;
    }

    .hero-meta {
        gap: 15px;
    }

    .section-title,
    .intro-grid h2 {
        font-size: 3.3rem;
    }

    .speaker h3 {
        font-size: 3rem;
    }

    .footer-links {
        grid-template-columns: 1fr;
    }

    .panel-body {
        padding: 25px;
    }
}            photoSlide2:
                "GOOGLE_DRIVE_FILE_ID_PHOTO_SLIDE_2",

            photoSlide3:
                "GOOGLE_DRIVE_FILE_ID_PHOTO_SLIDE_3"

        },


        pdfs: {

            photography:
                "GOOGLE_DRIVE_FILE_ID_PHOTOGRAPHY_PDF",

            quiz:
                "GOOGLE_DRIVE_FILE_ID_QUIZ_PDF",

            creativeWriting:
                "GOOGLE_DRIVE_FILE_ID_CREATIVE_WRITING_PDF",

            paperPresentation:
                "GOOGLE_DRIVE_FILE_ID_PAPER_PRESENTATION_PDF",

            sudoku:
                "GOOGLE_DRIVE_FILE_ID_SUDOKU_PDF",

            memeMaking:
                "GOOGLE_DRIVE_FILE_ID_MEME_MAKING_PDF",

            timetable:
                "GOOGLE_DRIVE_FILE_ID_TIMETABLE_PDF"

        }

    },


    /*
     * Official university/SBI payment portal.
     *
     * Replace this with the real portal URL.
     */

    PAYMENT_PORTAL:
        "YOUR_OFFICIAL_SBI_UNIVERSITY_PAYMENT_URL",


    /*
     * Backend endpoint.
     *
     * This will eventually be your Google Apps Script
     * Web App URL or another backend API.
     */

    API_ENDPOINT:
        "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL",


    /*
     * Event information.
     */

    EVENTS: [

        {
            id: "photography",

            name: "Photography",

            description:
                "Capture mathematical beauty through photography.",

            icon:
                "fa-camera",

            guideline:
                "photography"

        },

        {
            id: "quiz",

            name: "Mathematics Quiz",

            description:
                "Test your mathematical knowledge and problem-solving skills.",

            icon:
                "fa-circle-question",

            guideline:
                "quiz"

        },

        {
            id: "creative-writing",

            name: "Creative Writing",

            description:
                "Explore mathematical ideas through creative writing.",

            icon:
                "fa-pen-fancy",

            guideline:
                "creativeWriting"

        },

        {
            id: "paper-presentation",

            name: "Paper Presentation",

            description:
                "Present mathematical research and ideas.",

            icon:
                "fa-file-powerpoint",

            guideline:
                "paperPresentation"

        },

        {
            id: "sudoku",

            name: "Sudoku",

            description:
                "Challenge your logical thinking with mathematical puzzles.",

            icon:
                "fa-table-cells",

            guideline:
                "sudoku"

        },

        {
            id: "meme-making",

            name: "Meme Making",

            description:
                "Create mathematics-related humour and visual content.",

            icon:
                "fa-face-laugh-squint",

            guideline:
                "memeMaking"

        }

    ],


    /*
     * Speaker information.
     */

    SPEAKERS: [

        {
            name:
                "Prof. Neena Gupta",

            role:
                "Professor, Statistics & Mathematical Unit, Indian Statistical Institute, Kolkata",

            topic:
                "Fermat's Descent Principle",

            image:
                "speaker1"

        },

        {
            name:
                "Prof. Koyel Das",

            role:
                "Professor, Mathematics and Statistics, IISER Kolkata",

            topic:
                "Understanding Cognitive Neuroscience through the Lens of Machine Learning",

            image:
                "speaker2"

        }

    ]

};
/* =========================================================
   SPONSOR SLIDESHOW — ONE AT A TIME
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const sponsors =
        Array.from(
            document.querySelectorAll(".sponsor")
        );

    if (!sponsors.length) return;


    const currentLabel =
        document.getElementById("sponsorCurrent");

    const totalLabel =
        document.getElementById("sponsorTotal");

    if (totalLabel) {

        totalLabel.textContent =
            String(sponsors.length).padStart(2, "0");

    }


    let currentIndex = 0;


    function updateCounter(index) {

        if (!currentLabel) return;

        currentLabel.textContent =
            String(index + 1).padStart(2, "0");

    }


    function showSlide(index) {

        sponsors.forEach(sponsor => {

            sponsor.classList.remove(
                "active",
                "previous"
            );

        });

        if (sponsors[index]) {

            sponsors[index]
                .classList.add("active");

        }

        updateCounter(index);

    }


    /*
       Show the first sponsor immediately.
    */

    showSlide(currentIndex);


    /*
       Advance to the next sponsor every 4 seconds.
    */

    setInterval(() => {

        const oldIndex =
            currentIndex;

        currentIndex =
            (currentIndex + 1) % sponsors.length;


        /*
           Move current sponsor out.
        */

        if (sponsors[oldIndex]) {

            sponsors[oldIndex]
                .classList.remove("active");

            sponsors[oldIndex]
                .classList.add("previous");

        }


        /*
           Bring the next sponsor in.
        */

        if (sponsors[currentIndex]) {

            sponsors[currentIndex]
                .classList.add("active");

        }

        updateCounter(currentIndex);


        /*
           Clean up after animation.
        */

        setTimeout(() => {

            sponsors.forEach(sponsor => {

                sponsor.classList.remove(
                    "previous"
                );

            });

        }, 1000);


    }, 4000);

});

(function () {
    const slides = document.querySelectorAll('.event-photo-slideshow img');
    if (slides.length < 2) return;

    let current = 0;

    setInterval(() => {
        slides[current].classList.remove('is-active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('is-active');
    }, 3500);
})();

/* =========================================================
   GOOGLE DRIVE HELPERS
========================================================= */


/*
 * Google Drive image URL.
 *
 * For a publicly shared Drive file:
 *
 * https://drive.google.com/uc?export=view&id=FILE_ID
 */

function driveImage(fileId) {

    if (!fileId || fileId.startsWith("GOOGLE_")) {
        return "";
    }

    return `https://drive.google.com/uc?export=view&id=${fileId}`;
}


/*
 * Google Drive file viewer.
 *
 * Useful for PDFs.
 */

function driveFile(fileId) {

    if (!fileId || fileId.startsWith("GOOGLE_")) {
        return "#";
    }

    return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
}


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeImages();

        initializeSpeakers();

        initializeEvents();

        initializePhotoSlideshow();

        initializeGallery();

        initializeRegistration();

        initializeNavigation();

        initializeFAQ();

        initializeContactForm();

        initializeLightbox();

        initializePayment();

        const currentYearEl =
            document.getElementById("currentYear");

        if (currentYearEl) {

            currentYearEl.textContent =
                new Date().getFullYear();

        }

    }
);


/* =========================================================
   DRIVE IMAGES
========================================================= */

function initializeImages() {

    document
        .querySelectorAll("[data-drive-image]")
        .forEach(image => {

            const key =
                image.dataset.driveImage;

            const fileId =
                CONFIG.DRIVE.images[key];

            const url =
                driveImage(fileId);

            if (url) {
                image.src = url;
            }

        });

}

/* =========================================================
   GEOMETRIC CLOCK
========================================================= */

(function () {

    const geometry = document.querySelector(".geometry");

    if (!geometry) return;


    const dayLayer = geometry.querySelector(".geometry-day");
    const hourLayer = geometry.querySelector(".geometry-hour");
    const minuteLayer = geometry.querySelector(".geometry-minute");
    const secondLayer = geometry.querySelector(".geometry-second");


    /*
     * -------------------------------------------------------
     * TIME SOURCE
     * -------------------------------------------------------
     *
     * Set this to:
     *
     * "real"
     *
     * to use the user's current system time.
     *
     * Or:
     *
     * "manual"
     *
     * to test a specific time.
     */

    const TIME_MODE = "real";


    /*
     * Manual time for testing.
     *
     * 14 = 2 PM
     * 37 = 37 minutes
     * 52 = 52 seconds
     */

    const MANUAL_TIME = {
        hours: 14,
        minutes: 37,
        seconds: 52
    };


    /* =====================================================
       GET TIME
    ===================================================== */

    function getTime() {

        if (TIME_MODE === "manual") {

            return {
                hours: MANUAL_TIME.hours,
                minutes: MANUAL_TIME.minutes,
                seconds: MANUAL_TIME.seconds,
                milliseconds: 0
            };

        }


        const now = new Date();

        return {
            hours: now.getHours(),
            minutes: now.getMinutes(),
            seconds: now.getSeconds(),
            milliseconds: now.getMilliseconds()
        };
    }


    /* =====================================================
       UPDATE GEOMETRY
    ===================================================== */

    function updateClock() {

        const time = getTime();

        const hours = time.hours;
        const minutes = time.minutes;
        const seconds = time.seconds;
        const milliseconds = time.milliseconds;


        /*
         * -------------------------------------------------
         * SECOND
         * -------------------------------------------------
         *
         * 60 seconds = 360 degrees
         *
         * The millisecond component makes the movement
         * continuous rather than jumping every second.
         */

        const secondAngle =
            ((seconds + milliseconds / 1000) / 60) * 360;


        /*
         * -------------------------------------------------
         * MINUTE
         * -------------------------------------------------
         *
         * 60 minutes = 360 degrees
         *
         * Seconds are included so the minute layer moves
         * continuously.
         */

        const minuteAngle =
            ((minutes + seconds / 60) / 60) * 360;


        /*
         * -------------------------------------------------
         * HOUR
         * -------------------------------------------------
         *
         * 12 hours = 360 degrees
         *
         * Minutes and seconds are included.
         */

        const twelveHour =
            hours % 12;

        const hourAngle =
            (
                (twelveHour + minutes / 60 + seconds / 3600)
                / 12
            ) * 360;


        /*
         * -------------------------------------------------
         * DAY
         * -------------------------------------------------
         *
         * 24 hours = 360 degrees
         *
         * This is the slow outer boundary.
         */

        const dayAngle =
            (
                (hours + minutes / 60 + seconds / 3600)
                / 24
            ) * 360;


        /*
         * -------------------------------------------------
         * APPLY ROTATION
         * -------------------------------------------------
         */

        if (dayLayer) {

            dayLayer.style.transform =
                `rotate(${dayAngle}deg)`;

        }


        if (hourLayer) {

            hourLayer.style.transform =
                `rotate(${hourAngle}deg)`;

        }


        if (minuteLayer) {

            minuteLayer.style.transform =
                `rotate(${minuteAngle}deg)`;

        }


        if (secondLayer) {

            secondLayer.style.transform =
                `rotate(${secondAngle}deg)`;

        }


        /*
         * Continue synchronizing.
         */

        requestAnimationFrame(updateClock);
    }


    /* =====================================================
       START
    ===================================================== */

    updateClock();

})();
/* =========================================================
   SPEAKERS
========================================================= */

function initializeSpeakers() {

    const container =
        document.getElementById("speakerGrid");

    if (!container) return;

    container.innerHTML =
        CONFIG.SPEAKERS
            .map(speaker => {

                const image =
                    driveImage(
                        CONFIG.DRIVE.images[
                            speaker.image
                        ]
                    );

                return `

                    <article class="speaker-card">

                        <div class="speaker-image">

                            <img
                                src="${image}"
                                alt="${speaker.name}"
                                loading="lazy"
                            >

                        </div>

                        <div class="speaker-content">

                            <h3>
                                ${speaker.name}
                            </h3>

                            <div class="speaker-role">
                                ${speaker.role}
                            </div>

                            <p class="speaker-talk">
                                <strong>
                                    Topic:
                                </strong>
                                ${speaker.topic}
                            </p>

                        </div>

                    </article>

                `;

            })
            .join("");

}


/* =========================================================
   EVENTS
========================================================= */

function initializeEvents() {

    const container =
        document.getElementById("eventGrid");

    if (!container) return;

    container.innerHTML =
        CONFIG.EVENTS
            .map(event => {

                const pdfId =
                    CONFIG.DRIVE.pdfs[
                        event.guideline
                    ];

                const pdfUrl =
                    driveFile(pdfId);

                return `

                    <article class="event-card">

                        <div class="event-icon">

                            <i class="fa-solid ${event.icon}"></i>

                        </div>

                        <h3>
                            ${event.name}
                        </h3>

                        <p>
                            ${event.description}
                        </p>

                        <div class="event-actions">

                            <a
                                href="${pdfUrl}"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i class="fa-regular fa-file-pdf"></i>
                                Guidelines
                            </a>

                        </div>

                    </article>

                `;

            })
            .join("");

}


/* =========================================================
   PHOTOGRAPHY CARD SLIDESHOW
========================================================= */

function initializePhotoSlideshow() {

    const container =
        document.getElementById("photoSlideshow");

    if (!container) return;


    const slideKeys = [
        "photoSlide1",
        "photoSlide2",
        "photoSlide3"
    ];

    const images =
        slideKeys
            .map(key => driveImage(CONFIG.DRIVE.images[key]))
            .filter(Boolean);

    if (!images.length) return;


    container.innerHTML =
        images
            .map((src, index) => `

                <img
                    src="${src}"
                    alt="Mathematics photography entry ${index + 1}"
                    class="${index === 0 ? "is-active" : ""}"
                    loading="lazy"
                >

            `)
            .join("");


    if (images.length < 2) return;


    let current = 0;

    const slides =
        container.querySelectorAll("img");

    setInterval(
        () => {

            slides[current].classList.remove("is-active");

            current = (current + 1) % slides.length;

            slides[current].classList.add("is-active");

        },
        3500
    );

}


/* =========================================================
   GALLERY
========================================================= */

function initializeGallery() {

    const container =
        document.getElementById("galleryGrid");

    if (!container) return;


    const galleryKeys = [
        "gallery1",
        "gallery2",
        "gallery3",
        "gallery4",
        "gallery5",
        "gallery6",
        "gallery7"
    ];


    container.innerHTML =
        galleryKeys
            .map((key, index) => {

                const image =
                    driveImage(
                        CONFIG.DRIVE.images[key]
                    );

                if (!image) {
                    return "";
                }

                return `

                    <div
                        class="gallery-item"
                        data-gallery-index="${index}"
                    >

                        <img
                            src="${image}"
                            alt="Symmetry gallery image ${index + 1}"
                            loading="lazy"
                        >

                    </div>

                `;

            })
            .join("");

}


/* =========================================================
   NAVIGATION
========================================================= */

function initializeNavigation() {

    const navbar =
        document.getElementById("siteHeader");

    const hamburger =
        document.getElementById("navToggle");

    const navMenu =
        document.getElementById("navMenu");

    if (!navbar || !hamburger || !navMenu) return;


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 20) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }

        }
    );


    function closeMenu() {

        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");

        hamburger.setAttribute("aria-expanded", "false");

    }

    function toggleMenu() {

        const isOpen =
            navMenu.classList.toggle("active");

        hamburger.classList.toggle("active", isOpen);
        document.body.classList.toggle("menu-open", isOpen);

        hamburger.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    }

    hamburger.addEventListener(
        "click",
        toggleMenu
    );


    document
        .querySelectorAll(".nav-link")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });

}


/* =========================================================
   FAQ
========================================================= */

function initializeFAQ() {

    document
        .querySelectorAll(".faq-question")
        .forEach(question => {

            question.addEventListener(
                "click",
                () => {

                    const item =
                        question.closest(".faq-item");

                    item.classList.toggle("open");

                }
            );

        });

}


/* =========================================================
   REGISTRATION MODAL
========================================================= */

function initializeRegistration() {

    const modal =
        document.getElementById(
            "registrationModal"
        );

    const closeButton =
        document.getElementById(
            "closeRegistrationModal"
        );

    const overlay =
        document.getElementById(
            "modalOverlay"
        );


    const buttons = [

        document.getElementById(
            "navRegisterButton"
        ),

        document.getElementById(
            "heroRegisterButton"
        ),

        document.getElementById(
            "guidelineRegisterButton"
        ),

        document.getElementById(
            "footerRegisterButton"
        )

    ].filter(Boolean);


    /*
       This page doesn't have a registration modal in the DOM
       (registration lives on register.html instead), so there's
       nothing to wire up. Bail out quietly rather than throwing —
       an uncaught error here would otherwise abort every init
       call still queued after this one.
    */

    if (!modal || !closeButton || !overlay) return;


    buttons
        .forEach(button => {

            button.addEventListener(
                "click",
                openRegistrationModal
            );

        });


    closeButton.addEventListener(
        "click",
        closeRegistrationModal
    );


    overlay.addEventListener(
        "click",
        closeRegistrationModal
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal.classList.contains("open")
            ) {

                closeRegistrationModal();

            }

        }
    );


    initializeProgrammeSelection();

    initializeRegistrationForm();

}


function openRegistrationModal() {

    const modal =
        document.getElementById(
            "registrationModal"
        );

    if (!modal) return;

    modal.classList.add("open");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );

}


function closeRegistrationModal() {

    const modal =
        document.getElementById(
            "registrationModal"
        );

    if (!modal) return;

    modal.classList.remove("open");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );

}


/* =========================================================
   PROGRAMME SELECTION
========================================================= */

function initializeProgrammeSelection() {

    const container =
        document.getElementById(
            "programmeSelection"
        );

    if (!container) return;


    container.innerHTML =
        CONFIG.EVENTS
            .map(event => {

                return `

                    <div class="programme-option">

                        <input
                            type="checkbox"
                            id="programme-${event.id}"
                            name="programmes"
                            value="${event.id}"
                        >

                        <label
                            for="programme-${event.id}"
                        >

                            <strong>
                                ${event.name}
                            </strong>

                            <span>
                                ${event.description}
                            </span>

                        </label>

                    </div>

                `;

            })
            .join("");

}


/* =========================================================
   PAYMENT
========================================================= */

function initializePayment() {

    const paymentButtons = [

        document.getElementById(
            "paymentPortalButton"
        ),

        document.getElementById(
            "modalPaymentLink"
        )

    ];


    paymentButtons
        .filter(Boolean)
        .forEach(button => {

            button.href =
                CONFIG.PAYMENT_PORTAL;

        });

}


/* =========================================================
   REGISTRATION FORM
========================================================= */

function initializeRegistrationForm() {

    const form =
        document.getElementById(
            "registrationForm"
        );

    if (!form) return;


    form.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            await submitRegistration(form);

        }
    );

}


async function submitRegistration(form) {

    const message =
        document.getElementById(
            "registrationMessage"
        );

    const submitButton =
        document.getElementById(
            "registrationSubmitButton"
        );


    /*
     * Check programme selection.
     */

    const selectedProgrammes =
        Array.from(
            form.querySelectorAll(
                'input[name="programmes"]:checked'
            )
        )
        .map(input => input.value);


    if (selectedProgrammes.length === 0) {

        showMessage(
            message,
            "Please select at least one programme.",
            "error"
        );

        return;

    }


    /*
     * Check receipt.
     */

    const receipt =
        document.getElementById(
            "paymentReceipt"
        ).files[0];


    if (!receipt) {

        showMessage(
            message,
            "Please upload your payment receipt.",
            "error"
        );

        return;

    }


    /*
     * Maximum file size:
     * 10 MB
     */

    if (
        receipt.size >
        10 * 1024 * 1024
    ) {

        showMessage(
            message,
            "The payment receipt must be smaller than 10 MB.",
            "error"
        );

        return;

    }


    /*
     * Allowed file types.
     */

    const allowedTypes = [

        "image/jpeg",
        "image/png",
        "application/pdf"

    ];


    if (
        !allowedTypes.includes(
            receipt.type
        )
    ) {

        showMessage(
            message,
            "Please upload a JPG, PNG or PDF receipt.",
            "error"
        );

        return;

    }


    /*
     * Collect form data.
     */

    const formData =
        new FormData(form);


    const registrationData = {

        action:
            "register",

        name:
            formData.get("name"),

        email:
            formData.get("email"),

        phone:
            formData.get("phone"),

        institution:
            formData.get("institution"),

        studentId:
            formData.get("studentId"),

        programmes:
            selectedProgrammes,

        paymentReference:
            formData.get(
                "paymentReference"
            )

    };


    try {

        submitButton.disabled = true;

        submitButton.classList.add(
            "loading"
        );


        /*
         * Convert receipt to Base64.
         *
         * The backend will decode this and save
         * it into the Google Drive receipt folder.
         */

        const receiptBase64 =
            await fileToBase64(receipt);


        const payload = {

            ...registrationData,

            receipt: {

                name:
                    receipt.name,

                type:
                    receipt.type,

                size:
                    receipt.size,

                data:
                    receiptBase64

            }

        };


        /*
         * Send to backend.
         */

        const response =
            await fetch(
                CONFIG.API_ENDPOINT,
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "text/plain;charset=utf-8"
                    },

                    body:
                        JSON.stringify(payload)

                }
            );


        const result =
            await response.json();


        if (!result.success) {

            throw new Error(
                result.message ||
                "Registration failed."
            );

        }


        showMessage(
            message,
            "Registration submitted successfully. Please check your email for confirmation.",
            "success"
        );


        form.reset();


        setTimeout(
            closeRegistrationModal,
            3000
        );


    } catch (error) {

        console.error(
            "Registration error:",
            error
        );


        showMessage(
            message,
            "Unable to submit registration right now. Please try again or contact the organisers.",
            "error"
        );


    } finally {

        submitButton.disabled = false;

        submitButton.classList.remove(
            "loading"
        );

    }

}


/* =========================================================
   FILE -> BASE64
========================================================= */

function fileToBase64(file) {

    return new Promise(
        (resolve, reject) => {

            const reader =
                new FileReader();


            reader.onload =
                () => {

                    /*
                     * Remove:
                     * data:image/png;base64,
                     */

                    const result =
                        reader.result;

                    const base64 =
                        result.split(",")[1];

                    resolve(base64);

                };


            reader.onerror =
                reject;


            reader.readAsDataURL(file);

        }
    );

}


/* =========================================================
   CONTACT FORM
========================================================= */

function initializeContactForm() {

    const form =
        document.getElementById(
            "contactForm"
        );

    if (!form) return;


    form.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            await submitContactQuery(form);

        }
    );

}


async function submitContactQuery(form) {

    const message =
        document.getElementById(
            "contactMessage"
        );

    const button =
        document.getElementById(
            "contactSubmitButton"
        );


    const formData =
        new FormData(form);


    const payload = {

        action:
            "query",

        name:
            formData.get("name"),

        email:
            formData.get("email"),

        subject:
            formData.get("subject"),

        message:
            formData.get("message")

    };


    try {

        button.disabled = true;

        button.classList.add(
            "loading"
        );


        const response =
            await fetch(
                CONFIG.API_ENDPOINT,
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "text/plain;charset=utf-8"
                    },

                    body:
                        JSON.stringify(payload)

                }
            );


        const result =
            await response.json();


        if (!result.success) {

            throw new Error(
                result.message ||
                "Query could not be submitted."
            );

        }


        showMessage(
            message,
            "Your query has been sent successfully. The organising team will reply to your email.",
            "success"
        );


        form.reset();


    } catch (error) {

        console.error(
            "Contact error:",
            error
        );


        showMessage(
            message,
            "Unable to send your query right now. Please try again later.",
            "error"
        );


    } finally {

        button.disabled = false;

        button.classList.remove(
            "loading"
        );

    }

}


/* =========================================================
   LIGHTBOX
========================================================= */

function initializeLightbox() {

    const lightbox =
        document.getElementById(
            "lightbox"
        );

    const lightboxImage =
        document.getElementById(
            "lightboxImage"
        );

    const closeButton =
        document.getElementById(
            "lightboxClose"
        );

    const galleryGrid =
        document.getElementById(
            "galleryGrid"
        );

    /*
       No gallery/lightbox markup on this page — nothing to
       wire up. Bail out quietly rather than throwing, since
       an uncaught error here would abort every init call
       still queued after this one.
    */

    if (!lightbox || !lightboxImage || !closeButton || !galleryGrid) return;


    galleryGrid
        .addEventListener(
            "click",
            event => {

                const item =
                    event.target.closest(
                        ".gallery-item"
                    );


                if (!item) return;


                const image =
                    item.querySelector("img");


                lightboxImage.src =
                    image.src;

                lightboxImage.alt =
                    image.alt;


                lightbox.classList.add(
                    "open"
                );

            }
        );


    closeButton.addEventListener(
        "click",
        () => {

            lightbox.classList.remove(
                "open"
            );

        }
    );


    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                lightbox
            ) {

                lightbox.classList.remove(
                    "open"
                );

            }

        }
    );

}


/* =========================================================
   UI HELPERS
========================================================= */

function showMessage(
    element,
    text,
    type
) {

    if (!element) return;

    element.textContent =
        text;

    element.className =
        `form-message ${type}`;

}


/* =========================================================
   ANALYTICS HOOK
========================================================= */


/*
 * This does NOT need to be active immediately.
 *
 * Once the backend exists, we can enable this to record:
 *
 * - page views
 * - registration modal opens
 * - registration attempts
 * - successful registrations
 * - queries
 * - device/browser information
 *
 * The admin dashboard will read these records.
 */

async function trackEvent(
    eventName,
    metadata = {}
) {

    if (
        !CONFIG.API_ENDPOINT ||
        CONFIG.API_ENDPOINT.startsWith("YOUR_")
    ) {
        return;
    }


    try {

        await fetch(
            CONFIG.API_ENDPOINT,
            {

                method: "POST",

                headers: {
                    "Content-Type":
                        "text/plain;charset=utf-8"
                },

                body:
                    JSON.stringify({

                        action:
                            "analytics",

                        event:
                            eventName,

                        metadata

                    })

            }
        );

    } catch (error) {

        /*
         * Analytics failure should NEVER
         * interfere with the website.
         */

        console.debug(
            "Analytics unavailable."
        );

    }

}
/* =========================================================
   GALLERY CAROUSEL
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const track = document.getElementById("galleryTrack");
    const slides = document.querySelectorAll(".gallery-slide");

    const currentCounter =
        document.getElementById("galleryCurrent");

    const totalCounter =
        document.getElementById("galleryTotal");


    if (!track || !slides.length) return;


    /* =====================================================
       SETTINGS
    ===================================================== */

    let currentIndex = 0;

    const slideDuration = 4500;

    const transitionDuration = 900;


    /* =====================================================
       TOTAL COUNTER
    ===================================================== */

    totalCounter.textContent =
        String(slides.length).padStart(2, "0");


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    slides.forEach((slide, index) => {

        slide.classList.remove("active");

        slide.style.transform =
            `translateX(${(index - currentIndex) * 100}%)`;

    });


    slides[currentIndex].classList.add("active");


    /* =====================================================
       UPDATE COUNTER
    ===================================================== */

    function updateCounter() {

        currentCounter.textContent =
            String(currentIndex + 1).padStart(2, "0");

    }


    /* =====================================================
       MOVE GALLERY
    ===================================================== */

    function moveGallery() {

        currentIndex++;

        /*
           Loop back to the first image
           after the final image.
        */

        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }


        slides.forEach((slide, index) => {

            const position =
                index - currentIndex;

            slide.style.transform =
                `translateX(${position * 100}%)`;

        });


        /*
           Active slide
        */

        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        slides[currentIndex]
            .classList.add("active");


        updateCounter();

    }


    /* =====================================================
       START AUTOMATIC MOTION
    ===================================================== */

    let galleryTimer =
        setInterval(
            moveGallery,
            slideDuration
        );


    /* =====================================================
       PAUSE WHEN HOVERING
    ===================================================== */

    const galleryStage =
        document.querySelector(".gallery-stage");


    if (galleryStage) {

        galleryStage.addEventListener(
            "mouseenter",
            () => {

                clearInterval(galleryTimer);

            }
        );


        galleryStage.addEventListener(
            "mouseleave",
            () => {

                galleryTimer =
                    setInterval(
                        moveGallery,
                        slideDuration
                    );

            }
        );

    }


    /* =====================================================
       INITIAL COUNTER
    ===================================================== */

    updateCounter();

});


/* =========================================================
   HERO GEOMETRY — CLOCK-HAND ROTATION
   The three intersecting lines rotate clockwise at
   the exact speed of a seconds hand, the inner red
   square rotates anticlockwise at the exact speed of
   a minutes hand, and the larger black square rotates
   clockwise at the exact speed of an hours hand.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (reducedMotion) return;


    const lines = [

        {
            el: document.querySelector(".line-1"),
            base: 0
        },

        {
            el: document.querySelector(".line-2"),
            base: 45
        },

        {
            el: document.querySelector(".line-3"),
            base: -45
        }

    ];

    const squareHour =
        document.querySelector(".square-one");

    const squareMinute =
        document.querySelector(".square-two");

    const hasGeometry =
        lines.every(line => line.el) &&
        squareHour &&
        squareMinute;

    if (!hasGeometry) return;


    /*
       Digital readout, sitting quietly beneath the shape.
       Same DOM elements are reused every tick — only their
       text changes, so nothing re-flows or re-renders.
    */

    const clockDay =
        document.querySelector(".geometry-clock-day");

    const clockTime =
        document.querySelector(".geometry-clock-time");

    const dayNames = [
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
    ];

    function pad(value) {

        return String(value).padStart(2, "0");

    }

    function updateClock(now) {

        if (!clockDay || !clockTime) return;

        clockDay.textContent =
            dayNames[now.getDay()];

        clockTime.textContent =
            `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

        /*
           A brief opacity dip on the changing digits gives
           the readout the same tick-tock feel as the shape,
           instead of the text flatly swapping in place.
        */

        clockTime.classList.add("is-updating");

        window.setTimeout(() => {

            clockTime.classList.remove("is-updating");

        }, 120);

    }


    /*
       TICK-TOCK MODE
       Instead of interpolating a fresh angle on every
       animation frame (smooth glide), we only recompute
       angles once per whole second, and let a short CSS
       transition give each step its snap. This reproduces
       the classic mechanical tick-tock-tick-tock motion.
    */

    const TICK_TRANSITION =
        "transform 0.12s cubic-bezier(0.34, 1.56, 0.64, 1)";

    lines.forEach(line => {

        line.el.style.transition =
            TICK_TRANSITION;

    });

    squareMinute.style.transition =
        TICK_TRANSITION;

    squareHour.style.transition =
        TICK_TRANSITION;


    let lastSecond =
        null;

    function tick() {

        const now = new Date();

        const wholeSeconds =
            now.getSeconds();


        /*
           Only move the hands when the whole second
           actually changes — this is what produces the
           discrete "tick" instead of a smooth glide.
        */

        if (wholeSeconds !== lastSecond) {

            lastSecond =
                wholeSeconds;

            const minutes =
                now.getMinutes();

            const hours =
                now.getHours() % 12;


            /*
               Seconds hand — steps 6° per second, clockwise.
            */

            const secondsAngle =
                (wholeSeconds / 60) * 360;

            /*
               Minutes hand — steps once per minute,
               applied anticlockwise (negated).
            */

            const minutesAngle =
                -((minutes / 60) * 360);

            /*
               Hours hand — steps gradually across the hour,
               clockwise.
            */

            const hoursAngle =
                ((hours + minutes / 60) / 12) * 360;


            lines.forEach(line => {

                line.el.style.transform =
                    `rotate(${line.base + secondsAngle}deg)`;

            });

            squareMinute.style.transform =
                `rotate(${20 + minutesAngle}deg)`;

            squareHour.style.transform =
                `rotate(${45 + hoursAngle}deg)`;


            updateClock(now);

        }

        requestAnimationFrame(tick);

    }

    requestAnimationFrame(tick);

});
            photoSlide2:
                "GOOGLE_DRIVE_FILE_ID_PHOTO_SLIDE_2",

            photoSlide3:
                "GOOGLE_DRIVE_FILE_ID_PHOTO_SLIDE_3"

        },


        pdfs: {

            photography:
                "GOOGLE_DRIVE_FILE_ID_PHOTOGRAPHY_PDF",

            quiz:
                "GOOGLE_DRIVE_FILE_ID_QUIZ_PDF",

            creativeWriting:
                "GOOGLE_DRIVE_FILE_ID_CREATIVE_WRITING_PDF",

            paperPresentation:
                "GOOGLE_DRIVE_FILE_ID_PAPER_PRESENTATION_PDF",

            sudoku:
                "GOOGLE_DRIVE_FILE_ID_SUDOKU_PDF",

            memeMaking:
                "GOOGLE_DRIVE_FILE_ID_MEME_MAKING_PDF",

            timetable:
                "GOOGLE_DRIVE_FILE_ID_TIMETABLE_PDF"

        }

    },


    /*
     * Official university/SBI payment portal.
     *
     * Replace this with the real portal URL.
     */

    PAYMENT_PORTAL:
        "YOUR_OFFICIAL_SBI_UNIVERSITY_PAYMENT_URL",


    /*
     * Backend endpoint.
     *
     * This will eventually be your Google Apps Script
     * Web App URL or another backend API.
     */

    API_ENDPOINT:
        "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL",


    /*
     * Event information.
     */

    EVENTS: [

        {
            id: "photography",

            name: "Photography",

            description:
                "Capture mathematical beauty through photography.",

            icon:
                "fa-camera",

            guideline:
                "photography"

        },

        {
            id: "quiz",

            name: "Mathematics Quiz",

            description:
                "Test your mathematical knowledge and problem-solving skills.",

            icon:
                "fa-circle-question",

            guideline:
                "quiz"

        },

        {
            id: "creative-writing",

            name: "Creative Writing",

            description:
                "Explore mathematical ideas through creative writing.",

            icon:
                "fa-pen-fancy",

            guideline:
                "creativeWriting"

        },

        {
            id: "paper-presentation",

            name: "Paper Presentation",

            description:
                "Present mathematical research and ideas.",

            icon:
                "fa-file-powerpoint",

            guideline:
                "paperPresentation"

        },

        {
            id: "sudoku",

            name: "Sudoku",

            description:
                "Challenge your logical thinking with mathematical puzzles.",

            icon:
                "fa-table-cells",

            guideline:
                "sudoku"

        },

        {
            id: "meme-making",

            name: "Meme Making",

            description:
                "Create mathematics-related humour and visual content.",

            icon:
                "fa-face-laugh-squint",

            guideline:
                "memeMaking"

        }

    ],


    /*
     * Speaker information.
     */

    SPEAKERS: [

        {
            name:
                "Prof. Neena Gupta",

            role:
                "Professor, Statistics & Mathematical Unit, Indian Statistical Institute, Kolkata",

            topic:
                "Fermat's Descent Principle",

            image:
                "speaker1"

        },

        {
            name:
                "Prof. Koyel Das",

            role:
                "Professor, Mathematics and Statistics, IISER Kolkata",

            topic:
                "Understanding Cognitive Neuroscience through the Lens of Machine Learning",

            image:
                "speaker2"

        }

    ]

};
/* =========================================================
   SPONSOR SLIDESHOW — ONE AT A TIME
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const sponsors =
        Array.from(
            document.querySelectorAll(".sponsor")
        );

    if (!sponsors.length) return;


    const currentLabel =
        document.getElementById("sponsorCurrent");

    const totalLabel =
        document.getElementById("sponsorTotal");

    if (totalLabel) {

        totalLabel.textContent =
            String(sponsors.length).padStart(2, "0");

    }


    let currentIndex = 0;


    function updateCounter(index) {

        if (!currentLabel) return;

        currentLabel.textContent =
            String(index + 1).padStart(2, "0");

    }


    function showSlide(index) {

        sponsors.forEach(sponsor => {

            sponsor.classList.remove(
                "active",
                "previous"
            );

        });

        if (sponsors[index]) {

            sponsors[index]
                .classList.add("active");

        }

        updateCounter(index);

    }


    /*
       Show the first sponsor immediately.
    */

    showSlide(currentIndex);


    /*
       Advance to the next sponsor every 4 seconds.
    */

    setInterval(() => {

        const oldIndex =
            currentIndex;

        currentIndex =
            (currentIndex + 1) % sponsors.length;


        /*
           Move current sponsor out.
        */

        if (sponsors[oldIndex]) {

            sponsors[oldIndex]
                .classList.remove("active");

            sponsors[oldIndex]
                .classList.add("previous");

        }


        /*
           Bring the next sponsor in.
        */

        if (sponsors[currentIndex]) {

            sponsors[currentIndex]
                .classList.add("active");

        }

        updateCounter(currentIndex);


        /*
           Clean up after animation.
        */

        setTimeout(() => {

            sponsors.forEach(sponsor => {

                sponsor.classList.remove(
                    "previous"
                );

            });

        }, 1000);


    }, 4000);

});

(function () {
    const slides = document.querySelectorAll('.event-photo-slideshow img');
    if (slides.length < 2) return;

    let current = 0;

    setInterval(() => {
        slides[current].classList.remove('is-active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('is-active');
    }, 3500);
})();

/* =========================================================
   GOOGLE DRIVE HELPERS
========================================================= */


/*
 * Google Drive image URL.
 *
 * For a publicly shared Drive file:
 *
 * https://drive.google.com/uc?export=view&id=FILE_ID
 */

function driveImage(fileId) {

    if (!fileId || fileId.startsWith("GOOGLE_")) {
        return "";
    }

    return `https://drive.google.com/uc?export=view&id=${fileId}`;
}


/*
 * Google Drive file viewer.
 *
 * Useful for PDFs.
 */

function driveFile(fileId) {

    if (!fileId || fileId.startsWith("GOOGLE_")) {
        return "#";
    }

    return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
}


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeImages();

        initializeSpeakers();

        initializeEvents();

        initializePhotoSlideshow();

        initializeGallery();

        initializeRegistration();

        initializeNavigation();

        initializeFAQ();

        initializeContactForm();

        initializeLightbox();

        initializePayment();

        document.getElementById("currentYear").textContent =
            new Date().getFullYear();

    }
);


/* =========================================================
   DRIVE IMAGES
========================================================= */

function initializeImages() {

    document
        .querySelectorAll("[data-drive-image]")
        .forEach(image => {

            const key =
                image.dataset.driveImage;

            const fileId =
                CONFIG.DRIVE.images[key];

            const url =
                driveImage(fileId);

            if (url) {
                image.src = url;
            }

        });

}

/* =========================================================
   GEOMETRIC CLOCK
========================================================= */

(function () {

    const geometry = document.querySelector(".geometry");

    if (!geometry) return;


    const dayLayer = geometry.querySelector(".geometry-day");
    const hourLayer = geometry.querySelector(".geometry-hour");
    const minuteLayer = geometry.querySelector(".geometry-minute");
    const secondLayer = geometry.querySelector(".geometry-second");


    /*
     * -------------------------------------------------------
     * TIME SOURCE
     * -------------------------------------------------------
     *
     * Set this to:
     *
     * "real"
     *
     * to use the user's current system time.
     *
     * Or:
     *
     * "manual"
     *
     * to test a specific time.
     */

    const TIME_MODE = "real";


    /*
     * Manual time for testing.
     *
     * 14 = 2 PM
     * 37 = 37 minutes
     * 52 = 52 seconds
     */

    const MANUAL_TIME = {
        hours: 14,
        minutes: 37,
        seconds: 52
    };


    /* =====================================================
       GET TIME
    ===================================================== */

    function getTime() {

        if (TIME_MODE === "manual") {

            return {
                hours: MANUAL_TIME.hours,
                minutes: MANUAL_TIME.minutes,
                seconds: MANUAL_TIME.seconds,
                milliseconds: 0
            };

        }


        const now = new Date();

        return {
            hours: now.getHours(),
            minutes: now.getMinutes(),
            seconds: now.getSeconds(),
            milliseconds: now.getMilliseconds()
        };
    }


    /* =====================================================
       UPDATE GEOMETRY
    ===================================================== */

    function updateClock() {

        const time = getTime();

        const hours = time.hours;
        const minutes = time.minutes;
        const seconds = time.seconds;
        const milliseconds = time.milliseconds;


        /*
         * -------------------------------------------------
         * SECOND
         * -------------------------------------------------
         *
         * 60 seconds = 360 degrees
         *
         * The millisecond component makes the movement
         * continuous rather than jumping every second.
         */

        const secondAngle =
            ((seconds + milliseconds / 1000) / 60) * 360;


        /*
         * -------------------------------------------------
         * MINUTE
         * -------------------------------------------------
         *
         * 60 minutes = 360 degrees
         *
         * Seconds are included so the minute layer moves
         * continuously.
         */

        const minuteAngle =
            ((minutes + seconds / 60) / 60) * 360;


        /*
         * -------------------------------------------------
         * HOUR
         * -------------------------------------------------
         *
         * 12 hours = 360 degrees
         *
         * Minutes and seconds are included.
         */

        const twelveHour =
            hours % 12;

        const hourAngle =
            (
                (twelveHour + minutes / 60 + seconds / 3600)
                / 12
            ) * 360;


        /*
         * -------------------------------------------------
         * DAY
         * -------------------------------------------------
         *
         * 24 hours = 360 degrees
         *
         * This is the slow outer boundary.
         */

        const dayAngle =
            (
                (hours + minutes / 60 + seconds / 3600)
                / 24
            ) * 360;


        /*
         * -------------------------------------------------
         * APPLY ROTATION
         * -------------------------------------------------
         */

        if (dayLayer) {

            dayLayer.style.transform =
                `rotate(${dayAngle}deg)`;

        }


        if (hourLayer) {

            hourLayer.style.transform =
                `rotate(${hourAngle}deg)`;

        }


        if (minuteLayer) {

            minuteLayer.style.transform =
                `rotate(${minuteAngle}deg)`;

        }


        if (secondLayer) {

            secondLayer.style.transform =
                `rotate(${secondAngle}deg)`;

        }


        /*
         * Continue synchronizing.
         */

        requestAnimationFrame(updateClock);
    }


    /* =====================================================
       START
    ===================================================== */

    updateClock();

})();
/* =========================================================
   SPEAKERS
========================================================= */

function initializeSpeakers() {

    const container =
        document.getElementById("speakerGrid");

    if (!container) return;

    container.innerHTML =
        CONFIG.SPEAKERS
            .map(speaker => {

                const image =
                    driveImage(
                        CONFIG.DRIVE.images[
                            speaker.image
                        ]
                    );

                return `

                    <article class="speaker-card">

                        <div class="speaker-image">

                            <img
                                src="${image}"
                                alt="${speaker.name}"
                                loading="lazy"
                            >

                        </div>

                        <div class="speaker-content">

                            <h3>
                                ${speaker.name}
                            </h3>

                            <div class="speaker-role">
                                ${speaker.role}
                            </div>

                            <p class="speaker-talk">
                                <strong>
                                    Topic:
                                </strong>
                                ${speaker.topic}
                            </p>

                        </div>

                    </article>

                `;

            })
            .join("");

}


/* =========================================================
   EVENTS
========================================================= */

function initializeEvents() {

    const container =
        document.getElementById("eventGrid");

    if (!container) return;

    container.innerHTML =
        CONFIG.EVENTS
            .map(event => {

                const pdfId =
                    CONFIG.DRIVE.pdfs[
                        event.guideline
                    ];

                const pdfUrl =
                    driveFile(pdfId);

                return `

                    <article class="event-card">

                        <div class="event-icon">

                            <i class="fa-solid ${event.icon}"></i>

                        </div>

                        <h3>
                            ${event.name}
                        </h3>

                        <p>
                            ${event.description}
                        </p>

                        <div class="event-actions">

                            <a
                                href="${pdfUrl}"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i class="fa-regular fa-file-pdf"></i>
                                Guidelines
                            </a>

                        </div>

                    </article>

                `;

            })
            .join("");

}


/* =========================================================
   PHOTOGRAPHY CARD SLIDESHOW
========================================================= */

function initializePhotoSlideshow() {

    const container =
        document.getElementById("photoSlideshow");

    if (!container) return;


    const slideKeys = [
        "photoSlide1",
        "photoSlide2",
        "photoSlide3"
    ];

    const images =
        slideKeys
            .map(key => driveImage(CONFIG.DRIVE.images[key]))
            .filter(Boolean);

    if (!images.length) return;


    container.innerHTML =
        images
            .map((src, index) => `

                <img
                    src="${src}"
                    alt="Mathematics photography entry ${index + 1}"
                    class="${index === 0 ? "is-active" : ""}"
                    loading="lazy"
                >

            `)
            .join("");


    if (images.length < 2) return;


    let current = 0;

    const slides =
        container.querySelectorAll("img");

    setInterval(
        () => {

            slides[current].classList.remove("is-active");

            current = (current + 1) % slides.length;

            slides[current].classList.add("is-active");

        },
        3500
    );

}


/* =========================================================
   GALLERY
========================================================= */

function initializeGallery() {

    const container =
        document.getElementById("galleryGrid");

    if (!container) return;


    const galleryKeys = [
        "gallery1",
        "gallery2",
        "gallery3",
        "gallery4",
        "gallery5",
        "gallery6",
        "gallery7"
    ];


    container.innerHTML =
        galleryKeys
            .map((key, index) => {

                const image =
                    driveImage(
                        CONFIG.DRIVE.images[key]
                    );

                if (!image) {
                    return "";
                }

                return `

                    <div
                        class="gallery-item"
                        data-gallery-index="${index}"
                    >

                        <img
                            src="${image}"
                            alt="Symmetry gallery image ${index + 1}"
                            loading="lazy"
                        >

                    </div>

                `;

            })
            .join("");

}


/* =========================================================
   NAVIGATION
========================================================= */

function initializeNavigation() {

    const navbar =
        document.getElementById("navbar");

    const hamburger =
        document.getElementById("hamburger");

    const navMenu =
        document.getElementById("navMenu");


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 20) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }

        }
    );


    hamburger.addEventListener(
        "click",
        () => {

            navMenu.classList.toggle("open");

        }
    );


    document
        .querySelectorAll(".nav-link")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navMenu.classList.remove("open");

                }
            );

        });

}


/* =========================================================
   FAQ
========================================================= */

function initializeFAQ() {

    document
        .querySelectorAll(".faq-question")
        .forEach(question => {

            question.addEventListener(
                "click",
                () => {

                    const item =
                        question.closest(".faq-item");

                    item.classList.toggle("open");

                }
            );

        });

}


/* =========================================================
   REGISTRATION MODAL
========================================================= */

function initializeRegistration() {

    const modal =
        document.getElementById(
            "registrationModal"
        );

    const closeButton =
        document.getElementById(
            "closeRegistrationModal"
        );

    const overlay =
        document.getElementById(
            "modalOverlay"
        );


    const buttons = [

        document.getElementById(
            "navRegisterButton"
        ),

        document.getElementById(
            "heroRegisterButton"
        ),

        document.getElementById(
            "guidelineRegisterButton"
        ),

        document.getElementById(
            "footerRegisterButton"
        )

    ];


    buttons
        .filter(Boolean)
        .forEach(button => {

            button.addEventListener(
                "click",
                openRegistrationModal
            );

        });


    closeButton.addEventListener(
        "click",
        closeRegistrationModal
    );


    overlay.addEventListener(
        "click",
        closeRegistrationModal
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal.classList.contains("open")
            ) {

                closeRegistrationModal();

            }

        }
    );


    initializeProgrammeSelection();

    initializeRegistrationForm();

}


function openRegistrationModal() {

    const modal =
        document.getElementById(
            "registrationModal"
        );

    modal.classList.add("open");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );

}


function closeRegistrationModal() {

    const modal =
        document.getElementById(
            "registrationModal"
        );

    modal.classList.remove("open");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );

}


/* =========================================================
   PROGRAMME SELECTION
========================================================= */

function initializeProgrammeSelection() {

    const container =
        document.getElementById(
            "programmeSelection"
        );

    if (!container) return;


    container.innerHTML =
        CONFIG.EVENTS
            .map(event => {

                return `

                    <div class="programme-option">

                        <input
                            type="checkbox"
                            id="programme-${event.id}"
                            name="programmes"
                            value="${event.id}"
                        >

                        <label
                            for="programme-${event.id}"
                        >

                            <strong>
                                ${event.name}
                            </strong>

                            <span>
                                ${event.description}
                            </span>

                        </label>

                    </div>

                `;

            })
            .join("");

}


/* =========================================================
   PAYMENT
========================================================= */

function initializePayment() {

    const paymentButtons = [

        document.getElementById(
            "paymentPortalButton"
        ),

        document.getElementById(
            "modalPaymentLink"
        )

    ];


    paymentButtons
        .filter(Boolean)
        .forEach(button => {

            button.href =
                CONFIG.PAYMENT_PORTAL;

        });

}


/* =========================================================
   REGISTRATION FORM
========================================================= */

function initializeRegistrationForm() {

    const form =
        document.getElementById(
            "registrationForm"
        );

    if (!form) return;


    form.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            await submitRegistration(form);

        }
    );

}


async function submitRegistration(form) {

    const message =
        document.getElementById(
            "registrationMessage"
        );

    const submitButton =
        document.getElementById(
            "registrationSubmitButton"
        );


    /*
     * Check programme selection.
     */

    const selectedProgrammes =
        Array.from(
            form.querySelectorAll(
                'input[name="programmes"]:checked'
            )
        )
        .map(input => input.value);


    if (selectedProgrammes.length === 0) {

        showMessage(
            message,
            "Please select at least one programme.",
            "error"
        );

        return;

    }


    /*
     * Check receipt.
     */

    const receipt =
        document.getElementById(
            "paymentReceipt"
        ).files[0];


    if (!receipt) {

        showMessage(
            message,
            "Please upload your payment receipt.",
            "error"
        );

        return;

    }


    /*
     * Maximum file size:
     * 10 MB
     */

    if (
        receipt.size >
        10 * 1024 * 1024
    ) {

        showMessage(
            message,
            "The payment receipt must be smaller than 10 MB.",
            "error"
        );

        return;

    }


    /*
     * Allowed file types.
     */

    const allowedTypes = [

        "image/jpeg",
        "image/png",
        "application/pdf"

    ];


    if (
        !allowedTypes.includes(
            receipt.type
        )
    ) {

        showMessage(
            message,
            "Please upload a JPG, PNG or PDF receipt.",
            "error"
        );

        return;

    }


    /*
     * Collect form data.
     */

    const formData =
        new FormData(form);


    const registrationData = {

        action:
            "register",

        name:
            formData.get("name"),

        email:
            formData.get("email"),

        phone:
            formData.get("phone"),

        institution:
            formData.get("institution"),

        studentId:
            formData.get("studentId"),

        programmes:
            selectedProgrammes,

        paymentReference:
            formData.get(
                "paymentReference"
            )

    };


    try {

        submitButton.disabled = true;

        submitButton.classList.add(
            "loading"
        );


        /*
         * Convert receipt to Base64.
         *
         * The backend will decode this and save
         * it into the Google Drive receipt folder.
         */

        const receiptBase64 =
            await fileToBase64(receipt);


        const payload = {

            ...registrationData,

            receipt: {

                name:
                    receipt.name,

                type:
                    receipt.type,

                size:
                    receipt.size,

                data:
                    receiptBase64

            }

        };


        /*
         * Send to backend.
         */

        const response =
            await fetch(
                CONFIG.API_ENDPOINT,
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "text/plain;charset=utf-8"
                    },

                    body:
                        JSON.stringify(payload)

                }
            );


        const result =
            await response.json();


        if (!result.success) {

            throw new Error(
                result.message ||
                "Registration failed."
            );

        }


        showMessage(
            message,
            "Registration submitted successfully. Please check your email for confirmation.",
            "success"
        );


        form.reset();


        setTimeout(
            closeRegistrationModal,
            3000
        );


    } catch (error) {

        console.error(
            "Registration error:",
            error
        );


        showMessage(
            message,
            "Unable to submit registration right now. Please try again or contact the organisers.",
            "error"
        );


    } finally {

        submitButton.disabled = false;

        submitButton.classList.remove(
            "loading"
        );

    }

}


/* =========================================================
   FILE -> BASE64
========================================================= */

function fileToBase64(file) {

    return new Promise(
        (resolve, reject) => {

            const reader =
                new FileReader();


            reader.onload =
                () => {

                    /*
                     * Remove:
                     * data:image/png;base64,
                     */

                    const result =
                        reader.result;

                    const base64 =
                        result.split(",")[1];

                    resolve(base64);

                };


            reader.onerror =
                reject;


            reader.readAsDataURL(file);

        }
    );

}


/* =========================================================
   CONTACT FORM
========================================================= */

function initializeContactForm() {

    const form =
        document.getElementById(
            "contactForm"
        );

    if (!form) return;


    form.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            await submitContactQuery(form);

        }
    );

}


async function submitContactQuery(form) {

    const message =
        document.getElementById(
            "contactMessage"
        );

    const button =
        document.getElementById(
            "contactSubmitButton"
        );


    const formData =
        new FormData(form);


    const payload = {

        action:
            "query",

        name:
            formData.get("name"),

        email:
            formData.get("email"),

        subject:
            formData.get("subject"),

        message:
            formData.get("message")

    };


    try {

        button.disabled = true;

        button.classList.add(
            "loading"
        );


        const response =
            await fetch(
                CONFIG.API_ENDPOINT,
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "text/plain;charset=utf-8"
                    },

                    body:
                        JSON.stringify(payload)

                }
            );


        const result =
            await response.json();


        if (!result.success) {

            throw new Error(
                result.message ||
                "Query could not be submitted."
            );

        }


        showMessage(
            message,
            "Your query has been sent successfully. The organising team will reply to your email.",
            "success"
        );


        form.reset();


    } catch (error) {

        console.error(
            "Contact error:",
            error
        );


        showMessage(
            message,
            "Unable to send your query right now. Please try again later.",
            "error"
        );


    } finally {

        button.disabled = false;

        button.classList.remove(
            "loading"
        );

    }

}


/* =========================================================
   LIGHTBOX
========================================================= */

function initializeLightbox() {

    const lightbox =
        document.getElementById(
            "lightbox"
        );

    const lightboxImage =
        document.getElementById(
            "lightboxImage"
        );

    const closeButton =
        document.getElementById(
            "lightboxClose"
        );


    document
        .getElementById("galleryGrid")
        .addEventListener(
            "click",
            event => {

                const item =
                    event.target.closest(
                        ".gallery-item"
                    );


                if (!item) return;


                const image =
                    item.querySelector("img");


                lightboxImage.src =
                    image.src;

                lightboxImage.alt =
                    image.alt;


                lightbox.classList.add(
                    "open"
                );

            }
        );


    closeButton.addEventListener(
        "click",
        () => {

            lightbox.classList.remove(
                "open"
            );

        }
    );


    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                lightbox
            ) {

                lightbox.classList.remove(
                    "open"
                );

            }

        }
    );

}


/* =========================================================
   UI HELPERS
========================================================= */

function showMessage(
    element,
    text,
    type
) {

    if (!element) return;

    element.textContent =
        text;

    element.className =
        `form-message ${type}`;

}


/* =========================================================
   ANALYTICS HOOK
========================================================= */


/*
 * This does NOT need to be active immediately.
 *
 * Once the backend exists, we can enable this to record:
 *
 * - page views
 * - registration modal opens
 * - registration attempts
 * - successful registrations
 * - queries
 * - device/browser information
 *
 * The admin dashboard will read these records.
 */

async function trackEvent(
    eventName,
    metadata = {}
) {

    if (
        !CONFIG.API_ENDPOINT ||
        CONFIG.API_ENDPOINT.startsWith("YOUR_")
    ) {
        return;
    }


    try {

        await fetch(
            CONFIG.API_ENDPOINT,
            {

                method: "POST",

                headers: {
                    "Content-Type":
                        "text/plain;charset=utf-8"
                },

                body:
                    JSON.stringify({

                        action:
                            "analytics",

                        event:
                            eventName,

                        metadata

                    })

            }
        );

    } catch (error) {

        /*
         * Analytics failure should NEVER
         * interfere with the website.
         */

        console.debug(
            "Analytics unavailable."
        );

    }

}
/* =========================================================
   GALLERY CAROUSEL
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const track = document.getElementById("galleryTrack");
    const slides = document.querySelectorAll(".gallery-slide");

    const currentCounter =
        document.getElementById("galleryCurrent");

    const totalCounter =
        document.getElementById("galleryTotal");


    if (!track || !slides.length) return;


    /* =====================================================
       SETTINGS
    ===================================================== */

    let currentIndex = 0;

    const slideDuration = 4500;

    const transitionDuration = 900;


    /* =====================================================
       TOTAL COUNTER
    ===================================================== */

    totalCounter.textContent =
        String(slides.length).padStart(2, "0");


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    slides.forEach((slide, index) => {

        slide.classList.remove("active");

        slide.style.transform =
            `translateX(${(index - currentIndex) * 100}%)`;

    });


    slides[currentIndex].classList.add("active");


    /* =====================================================
       UPDATE COUNTER
    ===================================================== */

    function updateCounter() {

        currentCounter.textContent =
            String(currentIndex + 1).padStart(2, "0");

    }


    /* =====================================================
       MOVE GALLERY
    ===================================================== */

    function moveGallery() {

        currentIndex++;

        /*
           Loop back to the first image
           after the final image.
        */

        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }


        slides.forEach((slide, index) => {

            const position =
                index - currentIndex;

            slide.style.transform =
                `translateX(${position * 100}%)`;

        });


        /*
           Active slide
        */

        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        slides[currentIndex]
            .classList.add("active");


        updateCounter();

    }


    /* =====================================================
       START AUTOMATIC MOTION
    ===================================================== */

    let galleryTimer =
        setInterval(
            moveGallery,
            slideDuration
        );


    /* =====================================================
       PAUSE WHEN HOVERING
    ===================================================== */

    const galleryStage =
        document.querySelector(".gallery-stage");


    if (galleryStage) {

        galleryStage.addEventListener(
            "mouseenter",
            () => {

                clearInterval(galleryTimer);

            }
        );


        galleryStage.addEventListener(
            "mouseleave",
            () => {

                galleryTimer =
                    setInterval(
                        moveGallery,
                        slideDuration
                    );

            }
        );

    }


    /* =====================================================
       INITIAL COUNTER
    ===================================================== */

    updateCounter();

});


/* =========================================================
   HERO GEOMETRY — CLOCK-HAND ROTATION
   The three intersecting lines rotate clockwise at
   the exact speed of a seconds hand, the inner red
   square rotates anticlockwise at the exact speed of
   a minutes hand, and the larger black square rotates
   clockwise at the exact speed of an hours hand.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (reducedMotion) return;


    const lines = [

        {
            el: document.querySelector(".line-1"),
            base: 0
        },

        {
            el: document.querySelector(".line-2"),
            base: 45
        },

        {
            el: document.querySelector(".line-3"),
            base: -45
        }

    ];

    const squareHour =
        document.querySelector(".square-one");

    const squareMinute =
        document.querySelector(".square-two");

    const hasGeometry =
        lines.every(line => line.el) &&
        squareHour &&
        squareMinute;

    if (!hasGeometry) return;


    /*
       Digital readout, sitting quietly beneath the shape.
       Same DOM elements are reused every tick — only their
       text changes, so nothing re-flows or re-renders.
    */

    const clockDay =
        document.querySelector(".geometry-clock-day");

    const clockTime =
        document.querySelector(".geometry-clock-time");

    const dayNames = [
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
    ];

    function pad(value) {

        return String(value).padStart(2, "0");

    }

    function updateClock(now) {

        if (!clockDay || !clockTime) return;

        clockDay.textContent =
            dayNames[now.getDay()];

        clockTime.textContent =
            `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

        /*
           A brief opacity dip on the changing digits gives
           the readout the same tick-tock feel as the shape,
           instead of the text flatly swapping in place.
        */

        clockTime.classList.add("is-updating");

        window.setTimeout(() => {

            clockTime.classList.remove("is-updating");

        }, 120);

    }


    /*
       TICK-TOCK MODE
       Instead of interpolating a fresh angle on every
       animation frame (smooth glide), we only recompute
       angles once per whole second, and let a short CSS
       transition give each step its snap. This reproduces
       the classic mechanical tick-tock-tick-tock motion.
    */

    const TICK_TRANSITION =
        "transform 0.12s cubic-bezier(0.34, 1.56, 0.64, 1)";

    lines.forEach(line => {

        line.el.style.transition =
            TICK_TRANSITION;

    });

    squareMinute.style.transition =
        TICK_TRANSITION;

    squareHour.style.transition =
        TICK_TRANSITION;


    let lastSecond =
        null;

    function tick() {

        const now = new Date();

        const wholeSeconds =
            now.getSeconds();


        /*
           Only move the hands when the whole second
           actually changes — this is what produces the
           discrete "tick" instead of a smooth glide.
        */

        if (wholeSeconds !== lastSecond) {

            lastSecond =
                wholeSeconds;

            const minutes =
                now.getMinutes();

            const hours =
                now.getHours() % 12;


            /*
               Seconds hand — steps 6° per second, clockwise.
            */

            const secondsAngle =
                (wholeSeconds / 60) * 360;

            /*
               Minutes hand — steps once per minute,
               applied anticlockwise (negated).
            */

            const minutesAngle =
                -((minutes / 60) * 360);

            /*
               Hours hand — steps gradually across the hour,
               clockwise.
            */

            const hoursAngle =
                ((hours + minutes / 60) / 12) * 360;


            lines.forEach(line => {

                line.el.style.transform =
                    `rotate(${line.base + secondsAngle}deg)`;

            });

            squareMinute.style.transform =
                `rotate(${20 + minutesAngle}deg)`;

            squareHour.style.transform =
                `rotate(${45 + hoursAngle}deg)`;


            updateClock(now);

        }

        requestAnimationFrame(tick);

    }

    requestAnimationFrame(tick);

});
