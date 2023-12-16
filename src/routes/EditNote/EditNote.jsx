import { Link, Navigate, useLoaderData, useNavigate } from "react-router-dom";
import styles from "./EditNote.module.css";
import { useCallback, useContext, useState } from "react";
import { UserContext } from "../../components/UserContextProvider";
import { z } from "zod";
import { Note } from "..//../utils/validation";
import { getNote, updateNote } from "../../utils/Requests";
export const loader = async ({ params: { id } }) => {
  const note = await getNote(id);
  return { note };
};

export default function EditNote() {
  const { note } = useLoaderData();
  const [newNoteName, setNewNoteName] = useState(note.noteName);
  const [newNoteText, setNewNoteText] = useState(note.noteText);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const handleSetNewNoteName = useCallback((e) => {
    setNewNoteName(e.target.value);
  }, []);
  const handleSetNewNoteText = useCallback((e) => {
    setNewNoteText(e.target.value);
  }, []);

  const handleSaveEditedNote = async () => {
    try {
      const newNote = Note.parse({
        userId: note.userId,
        id: note.id,
        date: note.date,
        noteName: newNoteName,
        noteText: newNoteText,
      });

      await updateNote(note.id, newNote);

      setErrors(null);

      navigate(`/notes/${user.id}`);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.format());
        console.log(err.format());
      }
    }
  };

  const { user } = useContext(UserContext);
  return (
    <div className="flex flex-col justify-center items-center mt-20 gap-10">
      <div className="w-11/12 md:w-11/12 lg:w-3/5 flex  items-center">
        <Link
          to={`/notes/${user.id}`}
          className="flex text-4xl justify-center items-center text-white px-6 py-3 rounded font-semibold bg-purple-700 hover:bg-gray-700"
        >
          <span>Back</span>
        </Link>
        <div className="  ml-80  break-words text-5xl font-semibold text-white font-sans">
          Edit Note
        </div>
      </div>
      <div className="flex flex-col justify-center gap-10 w-11/12 md:w-11/12 lg:w-3/5">
        <input
          type="text"
          value={newNoteName}
          className={styles.noteNameContainer}
          onChange={handleSetNewNoteName}
        />
        {errors?.noteName && (
          <div className={styles.errorMessage}>{errors?.noteName?._errors}</div>
        )}
        <textarea
          className={styles.noteTextContainer}
          onChange={handleSetNewNoteText}
          value={newNoteText}
        />
        <button
          className="    mt-6 bg-purple-700 text-white text-3xl px-4 p-5  transition duration-300 hover:bg-gray-700"
          onClick={handleSaveEditedNote}
        >
          Save
        </button>
      </div>
    </div>
  );
}
