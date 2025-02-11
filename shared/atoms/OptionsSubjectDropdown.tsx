export default function OptionsSubjectDropdown({ isOpen }) {
    if (!isOpen) {
      return null;
    }
  
    return (
      <div
        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
      >
        <button
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          <span className="material-icons mr-2">visibility</span>
          View Details
        </button>
        <button
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          <span className="material-icons mr-2">delete</span>
          Delete
        </button>
        <button
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          <span className="material-icons mr-2">archive</span>
          Archive
        </button>
      </div>
    );
  }
  