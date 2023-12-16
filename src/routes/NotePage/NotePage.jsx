import { Link, useLoaderData, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import styles from "./NotePage.module.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../components/UserContextProvider";
import { deleteNote, getNote, getNotes } from "../../utils/Requests";
export const loader = async ({ params: { id } }) => {
  const note = await getNote(id);
  return { note, id };
};

export default function NotePage() {
  const [notes, setNotes] = useState([]);
  const [isValidNoteId, setIsValidNoteId] = useState([true]);

  const { note, id } = useLoaderData();
  const { user } = useContext(UserContext);
  useEffect(() => {
    const getUserNotes = async () => {
      setNotes(await getNotes(user.id));
    };
    getUserNotes();
  }, []);

  useEffect(() => {
    const noteExists = notes.some((noteItem) => noteItem.id === id);
    if (noteExists) {
      console.log(noteExists);
      throw new Error();
    }
  }, []);

  const navigate = useNavigate();
  const handleDeleteNote = () => {
    deleteNote(id);
    navigate(`/notes/${user.id}`);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-20 gap-10">
      <div className="w-11/12 md:w-11/12 lg:w-3/5 flex justify-between flex-row items-center">
        <Link
          to={`/notes/${user.id}`}
          className=" flex text-4xl justify-center items-center text-white  px-6 py-3 rounded font-semibold bg-purple-700 hover:bg-gray-700"
        >
          <span>Back</span>
        </Link>
        <div className=" lg:max-w-2xl break-words text-lg font-semibold text-white font-sans">
          {note.noteName}
        </div>
        <div className="flex flex-row justify-center items-center space-x-4">
          <Link
            to={`/edit-note/${id}`}
            className="text-white text-lg font-sans hover:text-white"
          >
            <EditNoteIcon className="text-lg" />
          </Link>
          <button onClick={handleDeleteNote} className="border-none text-white">
            <DeleteIcon className="text-lg" />
          </button>
        </div>
      </div>
      <span className={styles.noteTextContainer}>{note.noteText}</span>
    </div>
  );
}
