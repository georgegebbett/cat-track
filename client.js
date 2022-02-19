const ESTRAGON = "Estragon";
const VLAD = "Vlad";

const socket = io();

const updatePage = (cat, isComingIn) => {
    switch (cat) {
        case ESTRAGON:
            document.getElementById("estragon-location").innerText = `Estragon is ${isComingIn ? "in!" : "out!"}`;
            break;
        case VLAD:
            document.getElementById("vlad-location").innerText = `Vlad is ${isComingIn ? "in!" : "out!"}`;
            break;
    }
}

socket.on('cat movement', (content) => {
    console.log(content);

    let catName = content.name;

    updatePage(catName, content.in);

})

socket.on('cat state', (content) => {
    console.log(content);

    for (const cat of content.catState) {
        updatePage(cat.name, cat.in)
    }

})
