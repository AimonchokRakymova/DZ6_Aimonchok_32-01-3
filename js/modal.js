// MODAL
const modal = document.querySelector('.modal')
const modalTrigger = document.querySelector('#btn-get')
const modalCloseButton = document.querySelector('.modal_close')

const openModel = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
}
const closeModel = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''
}
modalTrigger.onclick = () => openModel()
modalCloseButton.onclick = () => closeModel()
modal.onclick = (event) => {
    if (event.target === modal){
        closeModel()
    }
}

// HW 2

const checkEnd = () => {
    const scrollTop = window.scrollY
    const windowHeight = window.innerHeight
    const documentHeight = document.body.scrollHeight;
    if (scrollTop + windowHeight >= documentHeight -1) {
        openModel();
        window.removeEventListener("scroll", checkEnd);
    }
};
window.addEventListener("scroll", checkEnd);


// HW 3

const autoOpenModal = () => {
    setTimeout( () => {
        modal.style.display = 'block'
        document.body.style.overflow = 'hidden'
    }, 10000)}
autoOpenModal()
