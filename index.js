import React, { Suspense } from "react";
import { createRoot } from "react-dom";
import "./style.css";
import firebaseConfig from './firebaseConfig';
import {
  FirebaseAppProvider,
  useFirestoreDocData,
  useFirestore,
  useAuth,
  SuspenseWithPerf
} from "reactfire";

function App() {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Suspense fallback={<div>Loading..</div>}>
        <div className="container m-8">
          <h3 className="text-4xl text-left">PRs</h3>
          <div className="grid grid-cols-3 gap-4">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            
          </div>
        </div>
      </Suspense>
    </FirebaseAppProvider>
  );
}

function Card() {
  return (
    <div className="card shadow-lg h-64 relative border-bottom-left-radius-lg border-bottom-right-radius-lg">
      <div className="card-header bg-gray-300 p-2 border-top-right-radius-lg border-top-left-radius-lg">
        Merge this plz.
      </div>
      <div className="card-body p-2">
        Here is the reasoning why you should merge this
      </div>
      <div className="card-footer p-2 absolute bottom-0 left-0 w-full flex justify-end">
        <button className="bg-blue-300 px-4 py-2 rounded-lg tracking-wider font-bold text-gray-800">OPEN</button>
      </div>
    </div>
  )
}

createRoot(document.getElementById("root")).render(<App />);
