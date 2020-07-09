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
import { PurpleButton, TaskItem, InputBar } from './components';

function FirebaseWrappedApp() {
  return (
    <FirebaseAppProvider firebaseConfig={config}>
      <Suspense fallback={<div>Loading... lol...</div>}>
        <App />
      </Suspense>
    </FirebaseAppProvider>
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
