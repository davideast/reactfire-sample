import React, { Suspense } from "react";

/*

		match /tasks/{taskId} {
    	allow read: if true;
      allow write: if request.auth.uid == request.resource.data.uid;
    }

*/

export function PurpleButton({ children, onClick }) {
  onClick = onClick || function() {};
  return (
    <button
      onClick={onClick}
      className="bg-purple-500 px-4 py-2 rounded-lg text-gray-200 font-bold"
    >
      {children}
    </button>
  );
}

export function TaskItem({ item, onComplete }) {
  onComplete = onComplete || function() {};
  return (
    <li className="h-16 bg-gray-200 rounded-lg my-4 px-4 flex items-center justify-between shadow-lg">
      <span>{item.name}</span>
      <div>
        <PurpleButton onClick={() => onComplete(item)}>Complete</PurpleButton>
      </div>
    </li>
  );
}

export function InputBar({ onNewValue }) {
  const inputEl = React.useRef(null);
  return (
    <div className="bg-gray-200 rounded-lg h-16 shadow-lg flex items-center justify-between px-4">
      <input className="p-2 w-full" ref={inputEl} type="text" />
      <PurpleButton onClick={() => {
        onNewValue(inputEl.current.value);
      }}>CREATE</PurpleButton>
    </div>
  )
}

