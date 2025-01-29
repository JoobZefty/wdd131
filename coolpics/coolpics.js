const a = document.getElementById('#but');
a.addEventListener("click", toggleMenu);
let toggle = true;

function toggleMenu(){
    const list = document.getElementById('#menu_items');
    if (toggle === true) {
        list.remove();
        toggle = false;
    }
    if (toggle === false) {
        list.innerHTML += '<ul class="menu_items"><a>Home</a><a>People</a><a>Places</a><a>About</a><a>Contact</a></ul>';
        toggle = true;
    }
}