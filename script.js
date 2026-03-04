window.onload = function() {
    const searchInput = document.getElementById('movieSearch');
    const statusDisplay= document.getElementById('searchStatus');


    searchInput.oninput = function() {

        if(searchInput.value.length > 0) {
            statusDisplay.innerText = "Searching for: " + searchInput.value;
            statusDisplay.style.color ="#f5c518";
        } else {
            statusDisplay.innerText = "Awaiting input...";
            statusDisplay.style.color = "#ffffff";
        }
    };
};