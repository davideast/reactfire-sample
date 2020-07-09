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
import { PurpleButton, TaskItem, InputBar } from "./components";
import config from "./firebaseConfig";

function FirebaseWrappedApp() {
  return (
    <FirebaseAppProvider firebaseConfig={config}>
      <Suspense fallback={<div>Loading... lol..</div>}>
        <App />
      </Suspense>
    </FirebaseAppProvider>
  );
}

function App() {
  const app = useFirebaseApp();
  const user = useUser();
  const db = useFirestore();
  const tasksCol = db.collection("tasks");
  const tasks = useFirestoreCollectionData(tasksCol, {
    idField: "id"
  });

  async function logInUser(app) {
    app.auth().signInAnonymously();
  }

  const lis = tasks.map(task => (
    <TaskItem
      onComplete={task => {
        tasksCol.doc(task.id).delete()
      }} item={task} />
  ));

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl">{user.uid}</h2>
      <PurpleButton
        onClick={() => {
          logInUser(app);
        }}
      >
        LOG IN
      </PurpleButton>

      <InputBar
        onNewValue={name => {
          tasksCol.add({
            name,
            uid: user.uid
          });
        }}
      />

      <ul>{lis}</ul>
    </div>
  );
}

createRoot(document.querySelector("#root")).render(<FirebaseWrappedApp />);

// render(<App />, document.querySelector('#root'));
