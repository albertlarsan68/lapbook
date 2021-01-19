/**
 * @author Anicet OTTMANN--FLORENTIN
 * @license MIT
 */

/** */
let popupsQuantity;
let popupsButtons = [];
//=== Modify var values below
popupsQuantity = 12;
//=== Don't modify anything below

let buttons = document.getElementsByClassName('btn-popup');
for (let btn of buttons) {
    if (btn.hasAttribute("opens-popup")) {
        btn.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            openPopup(btn.getAttribute("opens-popup"));
        });
    }
};

let popups = document.getElementsByClassName('popup');
for (let popup of popups) {
    popup.classList.add(`transition-${getRandomIntInclusive(1, 2)}`)
};

/**
 * Launches end of loading screen
 * @function
 * @returns void
 */
function finishedLoading() {
    console.log("[Loader] Loading started");

    setTimeout(finishedLoading2, 1000);
}
/**
 * Delayed part of finishedLoading()
 * @function
 * @returns void
 */
function finishedLoading2() {
    const spinner = document.getElementById("loader");
    spinner.classList.add("d-none");
    console.log("[Loader] Loading finished");
    openPopup(3);

}

/**
 * Opens the popup with id="popup-"+popupId
 * @param {Number} popupId Number in the id of the popup
 * @function
 * @returns void
 */
function openPopup(popupId) {
    console.log(`[Popups] Popup no ${popupId} opening`);
    const popup = document.querySelector(`article#popup-${popupId}`);
    if (popup != null) {
        popup.classList.remove("d-none");
        setTimeout(openPopup2, 0, popupId, popup);
    } else {
        console.error("[Popups] Tried to open popup " + popupId + ", but this popup does not exists.");
    }

}
/**
 * Delayed part of openPopup()
 * @param {Number} popupId Number in the id of the popup (Used only to put in the log)
 * @param {Element} popup DOM object of the popup
 * @returns void
 * @function
 */
function openPopup2(popupId, popup) {
    popup.classList.add("popup--open");
    console.log(`[Popups] Popup no ${popupId} opened.`);
}

/**
 * Closes the popup with id="popup"+popupId
 * @param {Number} popupId
 * @returns void
 * @function
 */
function closePopup(popupId) {
    console.log(`[Popups] Popup no ${popupId} closing`);
    const popup = document.querySelector(`article#popup-${popupId}`);
    if (popup != null) {
        popup.classList.remove("popup--open");
        if (popup.classList.contains('transition-1')) {
            setTimeout(closePopup2, 3000, popupId, popup);
        } else {
            if (popup.classList.contains('transition-2')) {
                setTimeout(closePopup2, 1000, popupId, popup);
            } else {
            }
        }
    } else {
        console.error(`[Popups] Tried to close popup ${popupId}, but this popup does not exists.`);
    }

}
/**
 * Delayed part of closePopup()
 * @param {Number} popupId Number in the id of the popup (Used only to put in the log)
 * @param {Element} popup DOM object of the popup
 * @returns void
 * @function
 */
function closePopup2(popupId, popup) {
    popup.classList.add("d-none");
    console.log(`[Popups] Popup no ${popupId} closed`);
}

/**
 * Calls closePopup() for each popup on the page. Var popupsQuantity must be set to the right amount in the top of the document
 * @returns void
 * @function
 */
function closeAllPopups() {
    console.log("[Popups] Closing all popups");
    for (let i = 1; i < popupsQuantity || i == popupsQuantity; i++) {
        closePopup(i);
    }
    closePopup(99);
}


/**
 * Generates a random number between the min and the max, inclusive
 * @author MDN
 * @param {Number} min Minimum random number generated
 * @param {Number} max Minimum random number generated
 * @returns {Number} Random number generated
 * @function
 */
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}