export default function Button({
  handleFilter,
  activeFilter,
  filter,
  children,
}) {
  return (
    <button
      className={`px-4 py-2 hover:bg-primary-700 ${
        filter === activeFilter && 'bg-primary-700 text-primary-50'
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
