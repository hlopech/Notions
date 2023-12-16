import { Link, useNavigate, useNavigation } from "react-router-dom";
import styles from "./AddNote.module.css";
import { z } from "zod";
import React, { useCallback, useContext, useState } from "react";
import { UserContext } from "../../components/UserContextProvider";
import { Note } from "../../utils/validation";
import { addNote } from "../../utils/Requests";
function AddNote() {
  const [noteName, setNoteName] = useState("");
  const [noteText, setNoteText] = useState("");
  const { user } = useContext(UserContext);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const handleSetNoteName = useCallback((e) => {
    setNoteName(e.target.value);
  }, []);
  const handleSetNoteText = useCallback((e) => {
    setNoteText(e.target.value);
  }, []);
  const handleAddNote = async () => {
    try {
      const note = Note.parse({
        userId: user.id,
        id: crypto.randomUUID(),
        date: Date.now(),
        noteName,
        noteText,
      });

      await addNote(note)

      setErrors(null);
      navigate(`/notes/${user.id}`);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.format());
      }
    }
  };
  return (
    <div className="flex flex-col justify-center items-center mt-20 gap-10">
    <div className="w-11/12 md:w-11/12 lg:w-3/5 flex items-center">
      <Link
        to={`/notes/${user.id}`}
        className="flex text-4xl justify-center items-center text-white px-6 py-3 rounded font-semibold bg-purple-700 hover:bg-gray-700"
      >
        <span>Back</span>
      </Link>
      <div className="ml-80 break-words text-5xl font-semibold text-white font-sans">
        Create new note
      </div>
    </div>
    <div className="flex flex-col justify-center gap-10 w-11/12 md:w-11/12 lg:w-3/5">
      <input
        placeholder="Note name"
        type="text"
        value={noteName}
        className={`${styles.noteNameContainer} rounded border border-gray-300 p-2`}
        onChange={handleSetNoteName}
      />
      {errors?.noteName && (
        <div className={styles.errorMessage}>{errors?.noteName?._errors}</div>
      )}
      <textarea
        placeholder="Note text"
        value={noteText}
        onChange={handleSetNoteText}
        className={`${styles.noteTextContainer} rounded border border-gray-300 p-2`}
      />
      <button
        className="mt-6 bg-purple-700 text-white text-3xl px-4 p-5 transition duration-300 hover:bg-gray-700 rounded"
        onClick={handleAddNote}
      >
        Save
      </button>
    </div>
  </div>
  );
}

export default React.memo(AddNote);
