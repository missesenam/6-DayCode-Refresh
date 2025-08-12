export default function SecretCard({ note, onDelete }) {
  if (!note) return null;
  return (
    <div className="bg-gray-700 text-white p-4 rounded mb-3 shadow">
      <p>{note.title}</p>
      <p>{note.description}</p>

      <div className="text-sm text-right mt-2">
        <button className="text-green-400 hover:underline mr-3">Edit</button>
        <button
          onClick={() => onDelete(note)}
          className="text-red-400 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
// onDelete = { handleDelete };
