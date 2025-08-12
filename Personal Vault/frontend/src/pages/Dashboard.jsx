import { useState } from "react";
import SecretForm from "../components/SecretForm";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import SecretCard from "../components/SecretCard";
import { useEffect } from "react";

const Dashboard = () => {
  // states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [secretNotes, setSecretNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // notes functions: list notes

  const getnotes = async () => {
    try {
      setLoading(true);
      const res = await api.get("/note");
      const data = res.data.idea;
      setSecretNotes(data);
    } catch (err) {
      setError("Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };
  // notes functions: create note
  const createnote = async (thenote) => {
    try {
      const res = await api.post("/note", thenote, {
        withCredentials: true, // important for sending cookies (JWT token)
      });
      console.log("Success:", res.data);
      setSecretNotes((prev) => [res.data.entry, ...prev]);
    } catch (err) {
      if (error.response && error.response.data?.errors) {
        console.error("Validation Errors:", error.response.data.errors);

        // Optional: Show errors one by one
        error.response.data.errors.forEach((err) => {
          console.error(`${err.param}: ${err.msg}`);
        });
      } else {
        console.error("Unexpected Error:", error.message);
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") return;
    if (description === "") return;
    const secretNote = { title, description };
    createnote(secretNote);
    setTitle("");
    setDescription("");
  };
  // delete
  const deletenote = async (id) => {
    try {
      const res = await api.delete(`/note/${id}`);
      console.log(res.data);
      getnotes();
    } catch (err) {
      console.error("Failed to fetch secrets", err);
    }
  };
  // const handleDelete = (indexToDelete) => {
  //   setSecretNotes((prev) =>
  //     prev.filter((_, index) => index !== indexToDelete)
  //   );
  // };

  useEffect(() => {
    getnotes();
  }, []);
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Your Personal Vault 🔐
        </h1>
        <SecretForm
          text={title}
          setText={setTitle}
          description={description}
          setDescription={setDescription}
          submit={handleSubmit}
        />
        <div>
          <h2 className="text-lg font-semibold">Your Secret</h2>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {secretNotes.length > 0 &&
            secretNotes.map((note) => (
              <SecretCard
                key={note._id}
                note={note}
                onDelete={() => deletenote(note._id)}
              />
            ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

// {
//   secretNotes.length > 0 &&
//     secretNotes.map((note) => (
//       <SecretCard
//         key={note._id}
//         note={note}
//         onDelete={() => deletenote(note._id)}
//       />
//     ));
// }

// {
//   secretNotes.length > 0 &&
//     secretNotes.map((note, index) => (
//       <SecretCard
//         key={index}
//         note={note}
//         onDelete={() => handleDelete(index)}
//       />
//     ));
// }
