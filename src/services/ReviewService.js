import { collection, addDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

export const addReview = async (reviewData) => {
    const docRef = await addDoc(collection(db, 'reviews'), {
      ...reviewData,
      createdAt: Timestamp.now(),
      facultyId: reviewData.facultyId,
    });
    return docRef.id;
  };
  

export const getReviewsByFaculty = async (facultyId) => {
    const q = query(
        collection(db, 'reviews'),
        where('facultyId', '==', facultyId)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
};