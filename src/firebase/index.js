import firebase from "firebase/app";
import "firebase/database";

import { FirebaseConfig } from "./keys";

firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();

export const columnsRef = databaseRef.child("columns");
export const tasksRef = databaseRef.child("tasks");
