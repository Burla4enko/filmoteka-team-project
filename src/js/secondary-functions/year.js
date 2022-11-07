export function makeYears(selector) {
    const yearFields = document.querySelectorAll(selector);
    yearFields.forEach(item => {
        item.textContent = getYearFromDate(item.textContent);
    })
}



function getYearFromDate(date) {
    return new Date(date).getFullYear();
}