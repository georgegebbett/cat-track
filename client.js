const ESTRAGON = "Estragon";
const VLAD = "Vlad";

const socket = io();

const updatePage = (cat, isComingIn, updatedTime) => {
    let updatedTimeFormatted = new Date(updatedTime).toLocaleString();
    switch (cat) {
        case ESTRAGON:
            document.getElementById("estragon-location").innerText = `Estragon is ${isComingIn ? "in!" : "out!"}`;
            document.getElementById("estragon-updated").innerText = `Last updated: ${updatedTimeFormatted}`;
            break;
        case VLAD:
            document.getElementById("vlad-location").innerText = `Vlad is ${isComingIn ? "in!" : "out!"}`;
            document.getElementById("vlad-updated").innerText = `Last updated: ${updatedTimeFormatted}`;
            break;
    }
}

socket.on('cat state', (content) => {
    console.log(content);

    for (const cat of content.catState) {
        updatePage(cat.name, cat.isInside, cat.updatedTime)
    }

})
