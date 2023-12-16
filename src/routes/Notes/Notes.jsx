import styles from "./Notes.module.css";
import Note from "../../components/Note/Note";
import { Link, useLoaderData } from "react-router-dom";
import { getNotes } from "../../utils/Requests";
export const loader = async ({ params: { userId } }) => {
  const currentUserId = localStorage.getItem("userId");
  if (userId === currentUserId) {
    const notes = await getNotes(userId);
    console.log("true");
    return { notes };
  } else {
    console.log("false");
    throw new Error();
  }
};
export default function Notes() {
  const { notes } = useLoaderData();

  return (
    <div className="flex flex-col items-center  gap-10 justify-center mt-20">
      <span className="text-7xl font-semibold text-white mb-6">Notes</span>
      <Link
        to="/create-note"
        className="inline-block mt-6 bg-purple-700 text-white text-5xl px-4 p-5  transition duration-300 hover:bg-gray-700"
      >
        Add new note
      </Link>
      {notes && (
        <div className={styles.notes}>
          {notes
            .sort((a, b) => b.date - a.date)
            .map((n) => (
              <Note key={n.id} note={n} />
            ))}
        </div>
      )}
    </div>
  );
}
