const btn = document.getElementById("btn");
const app1 = document.getElementById("app");

getNotes().forEach((note) => {
  const note1 = createnote1(note.id, note.content);
  app1.insertBefore(note1, btn);
});

function createnote1(id, content) {
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.placeholder = "Bo`sh qogo'z";
  element.value = content;

  element.addEventListener("dblclick", () => {
    const warning = confirm("Siz haqiqatdan ham o'chirmoqchimisiz?");
    if (warning) {
      deleteNote(id, element);
    }
  });

  element.addEventListener("input", () => {
    updateNote(id, element.value);
  });

  return element;
}

function deleteNote(id, element) {
    const notes = getNotes().filter((note)=>note.id != id)
    saveNote(notes)
    app1.removeChild(element)
}

function updateNote(id, content) {
  const notes = getNotes();
  const target = notes.filter((note) => note.id == id)[0];
  target.content = content;
  saveNote(notes);
}

function addNote() {
  const notes = getNotes();
  const noteObj = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };
  const note1 = createnote1(noteObj.id, noteObj.content);
  app1.insertBefore(note1, btn);

  notes.push(noteObj);

  saveNote(notes);
}

function saveNote(notes) {
  localStorage.setItem("note-app", JSON.stringify(notes));
}

function getNotes() {
  return JSON.parse(localStorage.getItem("note-app") || "[]");
}

btn.addEventListener("click", addNote);