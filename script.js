
window.addEventListener('DOMContentLoaded', () => {
   
});

const addBtn = document.getElementById('add')
const notesContainer = document.getElementById('notes-container') // Create a specific container
const notes = JSON.parse(localStorage.getItem('notes')) || []

if (notes.length > 0) {
    notes.forEach(note => addNewNote(note))
}

addBtn.addEventListener('click', () => addNewNote())

function addNewNote(text = '') {
    const note = document.createElement('div')
    note.classList.add('note')

    note.innerHTML = `
    <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `

    const editBtn = note.querySelector('.edit')
    const deleteBtn = note.querySelector('.delete')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')

    textArea.value = text
    main.innerHTML = marked.parse(text) //

    deleteBtn.addEventListener('click', () => {
        note.remove()
        updateLS()
    })

    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden')
        textArea.classList.toggle('hidden')
    })

    textArea.addEventListener('input', (e) => {
        const { value } = e.target
        main.innerHTML = marked.parse(value)
        updateLS()
    })

    notesContainer.appendChild(note) // Append to container
    updateLS() // 
}

function updateLS() {
    const notesText = Array.from(document.querySelectorAll('textarea')).map(note => note.value)
    localStorage.setItem('notes', JSON.stringify(notesText))
}
