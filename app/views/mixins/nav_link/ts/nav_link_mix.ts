if (document.querySelector(".navlink")) {
    let navLinkArr: HTMLAnchorElement[] = Array.from(document.querySelectorAll(".navlink"));
    let url: string = window.location.href;
    for (let i = 0; i < navLinkArr.length; i++) {
        if (navLinkArr[i].href === url) {
            navLinkArr[i].classList.add("navlink-active");
        }
        else {
            navLinkArr[i].classList.remove("navlink-active");
        }
    }
}


