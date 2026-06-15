function initializeTheme() {

    const theme =
        localStorage.getItem("theme");

    if(theme === "dark") {
        document.body.classList.add("dark");
    }

    const button =
        document.getElementById(
            "theme-toggle"
        );

    if(!button) return;

    button.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        localStorage.setItem(
            "theme",
            document.body.classList.contains("dark")
                ? "dark"
                : "light"
        );
    });
}

initializeTheme();
