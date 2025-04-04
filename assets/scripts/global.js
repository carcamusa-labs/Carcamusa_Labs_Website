document.addEventListener("DOMContentLoaded", () => {
    const getCurrentYear = () => new Date().getFullYear();
    const dateElement = document.querySelector("span.date");

    if (dateElement) dateElement.textContent = getCurrentYear();
});