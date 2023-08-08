const toggleTheme = document.querySelector("#toggle-theme");

toggleTheme.addEventListener("change", (event) => {
    const { checked } = event.target;
    if(checked) {
        document.body.classList.add("dark");
    }
    else {
        document.body.classList.remove("dark");
    }
});