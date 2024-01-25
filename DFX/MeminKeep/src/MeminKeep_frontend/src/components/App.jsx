import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { MeminKeep_backend as keep } from "../../../declarations/MeminKeep_backend";

  function App() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
      fetchData();
    }, []);

  async function fetchData() {
    const notes = await keep.getNotes();
    setNotes(notes);
  }

  function addNote(newNote) {
    setNotes(prevNotes => {
      keep.createNote(newNote.title, newNote.content);
      return [newNote, ...prevNotes];
    });
  }

  function deleteNote(id) {
    keep.deleteNote(id);
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
