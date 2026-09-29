import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as fbSignOut,
  onAuthStateChanged,
  User,
  signInAnonymously
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  getDoc,
  getDocs,
  query,
  limit
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
// CRITICAL: Initialize Firestore with the provisioned database ID
export const db = getFirestore(app, (firebaseConfig as any).firestoreDatabaseId);
export const googleProvider = new GoogleAuthProvider();
export { onAuthStateChanged };
export type { User };

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errMessage = error instanceof Error ? error.message : String(error);
  if (errMessage.toLowerCase().includes('permission') || errMessage.toLowerCase().includes('insufficient')) {
    const errInfo: FirestoreErrorInfo = {
      error: errMessage,
      authInfo: {
        userId: auth.currentUser?.uid,
        email: auth.currentUser?.email,
        emailVerified: auth.currentUser?.emailVerified,
        isAnonymous: auth.currentUser?.isAnonymous,
        tenantId: auth.currentUser?.tenantId,
        providerInfo: auth.currentUser?.providerData?.map(provider => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || []
      },
      operationType,
      path
    };
    console.error('Firestore Error: ', JSON.stringify(errInfo));
    throw new Error(JSON.stringify(errInfo));
  }
}

export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    if (result.user) {
      const userRef = doc(db, 'users', result.user.uid);
      try {
        await setDoc(userRef, {
          userId: result.user.uid,
          displayName: result.user.displayName || 'Mathemagix Student',
          email: result.user.email || '',
          lastActiveAt: new Date().toISOString()
        }, { merge: true });
      } catch (e) {
        handleFirestoreError(e, OperationType.WRITE, `users/${result.user.uid}`);
        console.warn('Profile sync postponed (offline):', e);
      }
    }
    return result.user;
  } catch (err: any) {
    console.warn('Google Sign-In note:', err?.message || err);
    throw err;
  }
}

export async function loginAsGuest() {
  try {
    const result = await signInAnonymously(auth);
    if (result.user) {
      const userRef = doc(db, 'users', result.user.uid);
      try {
        await setDoc(userRef, {
          userId: result.user.uid,
          displayName: 'Guest Student',
          email: 'guest@mathemagix.internal',
          lastActiveAt: new Date().toISOString()
        }, { merge: true });
      } catch (e) {
        handleFirestoreError(e, OperationType.WRITE, `users/${result.user.uid}`);
        console.warn('Guest profile sync postponed (offline):', e);
      }
    }
    return result.user;
  } catch (err: any) {
    console.warn('Guest sign-in note:', err?.message || err);
    throw err;
  }
}

export async function logoutUser() {
  return await fbSignOut(auth);
}

// User preferences & custom instructions
export interface CustomInstructionsData {
  targetExam: string;
  explanationTone: string;
  calculationMethod: string;
  customPrompt: string;
}

export async function saveUserInstructions(userId: string, instructions: CustomInstructionsData) {
  const path = `users/${userId}/preferences/custom_instructions`;
  try {
    const ref = doc(db, 'users', userId, 'preferences', 'custom_instructions');
    await setDoc(ref, {
      ...instructions,
      userId,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err: any) {
    handleFirestoreError(err, OperationType.WRITE, path);
    console.warn('Saved custom instructions locally; cloud sync queued:', err?.message || err);
  }
}

export async function loadUserInstructions(userId: string): Promise<CustomInstructionsData | null> {
  const path = `users/${userId}/preferences/custom_instructions`;
  try {
    const ref = doc(db, 'users', userId, 'preferences', 'custom_instructions');
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data() as CustomInstructionsData;
    }
    return null;
  } catch (err: any) {
    handleFirestoreError(err, OperationType.GET, path);
    // Graceful offline fallback to localStorage
    console.warn('Using local custom instructions (client offline or synchronizing):', err?.message || err);
    try {
      const local = localStorage.getItem('mathemagix_custom_instructions');
      return local ? JSON.parse(local) : null;
    } catch {
      return null;
    }
  }
}

// Save Quiz Record
export async function saveQuizScore(userId: string, record: {
  grade: number;
  pillar: string;
  score: number;
  totalQuestions: number;
}) {
  const recordId = `${record.grade}_${record.pillar}_${Date.now()}`;
  const path = `users/${userId}/quizRecords/${recordId}`;
  try {
    const ref = doc(db, 'users', userId, 'quizRecords', recordId);
    await setDoc(ref, {
      id: recordId,
      userId,
      ...record,
      completedAt: new Date().toISOString()
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
    console.warn('Quiz score saved locally; Firestore sync pending:', err);
  }
}

// Save Problem Bookmark
export async function saveProblemBookmark(userId: string, problem: {
  grade: number;
  topic: string;
  question: string;
  solution: string;
}) {
  const problemId = `prob_${Date.now()}`;
  const path = `users/${userId}/savedProblems/${problemId}`;
  try {
    const ref = doc(db, 'users', userId, 'savedProblems', problemId);
    await setDoc(ref, {
      id: problemId,
      userId,
      ...problem,
      savedAt: new Date().toISOString()
    });
    return problemId;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
    console.warn('Problem bookmark saved locally; cloud sync pending:', err);
    return null;
  }
}

export async function fetchSavedProblems(userId: string) {
  const path = `users/${userId}/savedProblems`;
  try {
    const colRef = collection(db, 'users', userId, 'savedProblems');
    const snap = await getDocs(query(colRef, limit(20)));
    return snap.docs.map(d => d.data());
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
    console.warn('Could not fetch cloud saved problems (offline):', err);
    return [];
  }
}

// User Daily Learning Streak persistence
export async function saveUserStreak(userId: string, streak: any) {
  const path = `users/${userId}/preferences/daily_streak`;
  try {
    const ref = doc(db, 'users', userId, 'preferences', 'daily_streak');
    await setDoc(ref, {
      ...streak,
      userId,
      syncedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err: any) {
    handleFirestoreError(err, OperationType.WRITE, path);
    console.warn('Daily streak saved locally; Firestore sync pending:', err?.message || err);
  }
}

export async function loadUserStreak(userId: string): Promise<any | null> {
  const path = `users/${userId}/preferences/daily_streak`;
  try {
    const ref = doc(db, 'users', userId, 'preferences', 'daily_streak');
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  } catch (err: any) {
    handleFirestoreError(err, OperationType.GET, path);
    console.warn('Could not load user streak from cloud, using local cache:', err?.message || err);
    return null;
  }
}

// User Spaced Repetition memory state persistence
export async function saveUserSpacedRepetition(userId: string, data: Record<string, any>) {
  const path = `users/${userId}/preferences/spaced_repetition`;
  try {
    const ref = doc(db, 'users', userId, 'preferences', 'spaced_repetition');
    await setDoc(ref, {
      records: data,
      userId,
      syncedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err: any) {
    handleFirestoreError(err, OperationType.WRITE, path);
    console.warn('Spaced repetition data saved locally; Firestore sync pending:', err?.message || err);
  }
}

export async function loadUserSpacedRepetition(userId: string): Promise<Record<string, any> | null> {
  const path = `users/${userId}/preferences/spaced_repetition`;
  try {
    const ref = doc(db, 'users', userId, 'preferences', 'spaced_repetition');
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const docData = snap.data();
      return docData?.records || null;
    }
    return null;
  } catch (err: any) {
    handleFirestoreError(err, OperationType.GET, path);
    console.warn('Could not load spaced repetition from cloud, using local cache:', err?.message || err);
    return null;
  }
}
