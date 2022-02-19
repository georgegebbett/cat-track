const ESTRAGON = "Estragon";
const VLAD = "Vlad";

const socket = io();


socket.on('cat movement', (content) => {
    console.log(content);

    let catName = content.name;

    switch (catName) {
        case ESTRAGON:
            document.getElementById("estragon-location").innerText = `Estragon is ${content.in ? "in!" : "out!"}`;
            break;
        case VLAD:
            document.getElementById("vlad-location").innerText = `Vlad is ${content.in ? "in!" : "out!"}`;
            break;
    }
})

socket.on('cat state', (content) => {
    console.log(content);

    for (const cat of content.catState) {
        let catName = cat.name;
        switch (catName) {
            case ESTRAGON:
                document.getElementById("estragon-location").innerText = `Estragon is ${cat.in ? "in!" : "out!"}`;
                break;
            case VLAD:
                document.getElementById("vlad-location").innerText = `Vlad is ${cat.in ? "in!" : "out!"}`;
                break;
        }
    }




})
