// firebaseConfig.d.ts

import { FirebaseApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { Auth, getAuth } from "firebase/auth";

export declare const app: FirebaseApp;
export declare const db: Firestore;
export declare const auth: Auth;
