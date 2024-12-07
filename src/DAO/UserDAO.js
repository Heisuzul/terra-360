import { collection, doc, getDoc, setDoc, addDoc, updateDoc, deleteDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from "../../firebase.config";

class UserDAO {
    constructor() {
        this.collectionRef = collection(db, "users");
    }

    async getUserById(id) {
        await getDoc(doc(this.collectionRef, id))
            .then((userDoc) => {
                if (userDoc.exist()) {
                    return { sucess: true, data: userDoc.data() };

                } else {
                    return { sucess: false, data: null };
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            })
    }

    async getUserByEmail(email) {
        const peticion = query(this.collectionRef, where("email", "==", email));
        const querySnapshot = await getDocs(peticion);
        if (!querySnapshot.empty) {
            return { success: true, data: querySnapshot.docs[0].data() };
        } else {
            return { success: false, data: null };
        }
    }

    async createUser(userData) {
        const userCheck = await this.getUserByEmail(userData.email);

        if (userCheck.success) {
            console.log("User already exists.");
            return;
        }

        const userDocRef = doc(this.collectionRef, userData.uid);
        await setDoc(userDocRef, {
            email: userData.email,
            name: userData.name,
            photo: userData.photo,
            points: 0, // Initialize points field
        }, { merge: true })
        .then(() => {
            console.log("Document written with ID:", userData.uid);
        })
        .catch((error) => {
            console.log("Error adding document:", error);
        });
    }

    async updateUser(id, userData) {
        const userRef = doc(this.collectionRef, id)
        await updateDoc(userRef, userData)
            .then(console.log("Document successfully updated:"))
            .catch((error) => {
                console.log("Error updating document:", error);
            })
    }

    async deleteUser(id) {
        await deleteDoc(doc(this.collectionRef, id))
            .then(console.log("Document successfully deleted:"))
            .catch((error) => {
                console.log("Error removing document:", error);
            })
    }
}

export default new UserDAO();