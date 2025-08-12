export default function SecretForm({
  text,
  setText,
  description,
  setDescription,
  submit,
}) {
  return (
    <form onSubmit={submit} className="mb-6">
      <label
        htmlFor="secret"
        className="block text-sm mb-2 font-semibold text-gray-300"
      >
        Secret (Your private note)
      </label>
      <textarea
        id="secret"
        className="w-full p-3 rounded bg-gray-800 text-white resize-y"
        rows={5}
        placeholder="Type your secret here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <label
        htmlFor="description"
        className="block text-sm mt-4 mb-2 font-semibold text-gray-300"
      >
        Description (Optional)
      </label>
      <input
        id="description"
        type="text"
        className="w-full p-2 rounded bg-gray-800 text-white"
        placeholder="Brief description or title"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        type="submit"
        className="mt-6 w-full bg-green-600 hover:bg-green-700 py-2 rounded font-semibold text-white"
      >
        Save Secret
      </button>
    </form>
  );
}
