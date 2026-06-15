const menuButton =
document.getElementById(
"mobile-menu-button"
);

const nav =
document.getElementById(
"mobile-nav"
);

menuButton.addEventListener(
"click",
() =>
{
    nav.classList.toggle(
    "mobile-open"
    );
});
