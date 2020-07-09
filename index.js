import React, { Suspense } from "react";
import { render, createRoot } from "react-dom";
import "./style.css";
import config from "./firebaseConfig";
import {
  FirebaseAppProvider,
  useFirebaseApp,
  useUser,
  useFirestore,
  useFirestoreCollectionData
} from "reactfire";

function PurpleButton({ children, onClick }) {
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

function FirebaseWrappedApp() {
  return (
    <FirebaseAppProvider firebaseConfig={config}>
      <Suspense fallback={<div>Loading... lol...</div>}>
        <App />
      </Suspense>
    </FirebaseAppProvider>
  );
}

function TaskItem({ item, onComplete }) {
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

function InputBar({ onNewValue }) {
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

function App() {
  const app = useFirebaseApp();
  const db = useFirestore();
  const user = useUser();
  const tasksCol = db.collection("tasks");
  const query = tasksCol.where('uid', '==', user.uid);
  const tasks = useFirestoreCollectionData(query, { idField: "id" });

  function logInUser(app) {
    app.auth().signInAnonymously();
  }

  function completeItem(item) {
    tasksCol.doc(item.id).delete();
  }

  const lis = tasks.map(task => <TaskItem onComplete={completeItem} item={task} />);

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl">{user.uid}</h2>

      <InputBar onNewValue={name => {
        tasksCol.add({
          name,
          uid: user.uid
        })
      }} />

      <ul className="w-full">{lis}</ul>
    </div>
  );
}

createRoot(document.querySelector("#root")).render(<FirebaseWrappedApp />);
