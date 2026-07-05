import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {

  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
  }

  const user = JSON.parse(localStorage.getItem("user"));

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [notes, setNotes] = useState([]);

  const [editId, setEditId] = useState(null);

  const [summary, setSummary] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  const fetchNotes = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/notes",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setNotes(res.data);

    } catch (error) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const createNote = async () => {
    try {

      // UPDATE NOTE
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/notes/${editId}`,
          {
            title,
            content,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        alert("Note Updated");

        setEditId(null);

      } else {

        // CREATE NOTE
        await axios.post(
          "http://localhost:5000/api/notes",
          {
            title,
            content,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        alert("Note Created");
      }

      setTitle("");

      setContent("");

      fetchNotes();

    } catch (error) {
      console.log(error.response?.data);

      alert(error.response?.data?.message);
    }
  };

  const deleteNote = async (id) => {
    try {

      await axios.delete(
        `http://localhost:5000/api/notes/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      alert("Note Deleted");

      fetchNotes();

    } catch (error) {
      console.log(error.response?.data);

      alert(error.response?.data?.message);
    }
  };

  const editNote = (note) => {
    setTitle(note.title);

    setContent(note.content);

    setEditId(note._id);
  };

  const summarizeWithAI = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/ai/summarize",
        {
          content,
        }
      );

      setSummary(res.data.summary);

      setLoading(false);

    } catch (error) {
      console.log(error);

      setLoading(false);

      alert(
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">

      {/* Navbar */}
      <div className="flex justify-between items-center px-10 py-6 border-b border-slate-800">

        <div>
          <h1 className="text-3xl font-bold">
            Mindlify AI
          </h1>

          <p className="text-slate-400 text-sm">
            Smart AI Notes Workspace
          </p>
        </div>

        <div className="flex items-center gap-4">

          <p className="text-slate-300">
            Welcome, {user?.name} 👋
          </p>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 transition-all px-5 py-2 rounded-xl"
          >
            Logout
          </button>

        </div>
      </div>

      {/* Main Content */}
      <div className="p-10">

        {/* Create/Edit Note Card */}
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 shadow-xl backdrop-blur-md">

          <h2 className="text-2xl font-semibold mb-5">
            {editId ? "Edit Note" : "Create New Note"}
          </h2>

          <input
            type="text"
            placeholder="Enter note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 outline-none mb-4"
          />

          <textarea
            placeholder="Write your thoughts here..."
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 outline-none"
          ></textarea>

          <div className="flex gap-4 mt-5">

            <button
              onClick={createNote}
              className="bg-blue-600 hover:bg-blue-700 transition-all px-6 py-3 rounded-xl font-semibold"
            >
              {editId ? "Update Note" : "Save Note"}
            </button>

            <button
              onClick={summarizeWithAI}
              className="bg-purple-600 hover:bg-purple-700 transition-all px-6 py-3 rounded-xl font-semibold"
            >
              Summarize with AI
            </button>

          </div>

          {/* AI Summary */}
          {loading && (
            <div className="mt-6 text-purple-400">
              AI is thinking...
            </div>
          )}

          {summary && (
            <div className="mt-6 bg-slate-900 border border-purple-500 rounded-xl p-5">

              <h3 className="text-xl font-bold text-purple-400 mb-3">
                AI Summary
              </h3>

              <p className="text-slate-300 whitespace-pre-line">
                {summary}
              </p>

            </div>
          )}

        </div>

        {/* Notes Section */}
        <div className="mt-10">

          <h2 className="text-2xl font-semibold mb-6">
            Your Notes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {notes.map((note) => (
              <div
                key={note._id}
                className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 shadow-lg"
              >

                <h3 className="text-xl font-bold mb-3">
                  {note.title}
                </h3>

                <p className="text-slate-300">
                  {note.content}
                </p>

                <div className="flex gap-3 mt-5">

                  <button
                    onClick={() => editNote(note)}
                    className="bg-yellow-500 hover:bg-yellow-600 transition-all px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteNote(note._id)}
                    className="bg-red-500 hover:bg-red-600 transition-all px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))}

          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;