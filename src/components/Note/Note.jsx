import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { deleteNote } from "../../utils/Requests";
export default function Note({ note }) {
  const navigate = useNavigate();
  const handleDeleteNote = () => {
    deleteNote(note.id)
    navigate(`/notes/${note.userId}`);
  };
  return (
    <div className="flex flex-row items-center gap-5 my-1 w-full bg-gray-700 rounded p-2 hover:bg-purple-700">
      <Link
        to={`/note/${note.id}`}
        className="flex-1 flex flex-row   items-center gap-2   text-white text-lg"
      >
        <span className="break-all ">{note.noteName}</span>
        <span className="text-gray-300 ">
          {new Date(note.date).toLocaleString()}
        </span>
      </Link>

      <div className="flex gap-2">
        <Link
          to={`/edit-note/${note.id}`}
          className="text-white hover:text-black"
        >
          <EditNoteIcon fontSize="large" />
        </Link>
        <button
          onClick={handleDeleteNote}
          className="text-white hover:text-black"
        >
          <DeleteIcon fontSize="large" />
        </button>
      </div>
    </div>
  );
}
