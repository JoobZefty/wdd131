
window.addEventListener("resize",function handleResize(){
    let inwidth = window.innerWidth
    const list = document.getElementById('menu_items');
    if (inwidth > 1000) {
        list.classList.remove('hide');
    }
    if (inwidth < 1000) {
        list.classList.add('hide');
    }
});

// let toggle = true;
document.querySelector('#but').addEventListener("click", function() {
   
    const list = document.querySelector('#menu_items');
    console.log(list);
    list.classList.toggle('hide');
    // if (toggle === true) {
    //     list.classList.add('hide');
    //     toggle = false;
    // }
    // if (toggle === false) {
    //     list.classList.remove('hide');
    //     toggle = true;
    // }
});
let image = document.querySelector('.gallery');
image.addEventListener("click", function (event) {
    console.log(event.target);
    
    let modal = document.querySelector('.modal');
    // if (event.target === image) {
    //     modal.add();
    //     }
    let img = event.target.closest("img");
    console.log(img);
    let attribute = img.getAttribute('src');
    let beg = attribute.split("-");
    let full = beg[0] + '-full.jpeg'
    console.log(full);
    let html =` 
        <div id="myModal" class="modal">

            <!-- Modal content -->
            <div class="modal-content">
                <span class="close">&times;</span>
                <img src="${full}" class="image" alt="picture">
            </div>
        
        </div>`;
    let body = document.querySelector('body');
    body.insertAdjacentHTML('afterbegin', html);

    document.querySelector('.close').addEventListener("click", function (event) {
        let modal = document.querySelector('.modal');
        let content = document.querySelector('.modal_content');
        modal.remove();
        content.remove();
        });
});


window.addEventListener("click", function (event) {
    let modal = document.querySelector('.modal');
    let content = document.querySelector('.modal_content');
    // close the modal when user clicks outside of the image
    if (event.target === modal) {
    modal.remove();
    content.remove();
    }
    });

    //allow the escape key to close the modal as well
window.addEventListener("keydown", function (event) {
    let modal = document.querySelector('.modal');
    let content = document.querySelector('.modal_content');
    if (event.key === "Escape") {
        modal.remove();
        content.remove();
    }
});


