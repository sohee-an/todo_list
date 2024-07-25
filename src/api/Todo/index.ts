// firestoreHelpers.ts
import { db } from '../../config/firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { TCategory, TTodo } from '../../types/TodoTypes';

class FirebaseActions {
  static async getDocument(userId: string) {
    const docRef = doc(db, 'todos', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  }

  static async updateDocument(userId: string, data: any) {
    const docRef = doc(db, 'todos', userId);
    await updateDoc(docRef, data);
  }

  static async setDocument(userId: string, data: any) {
    const docRef = doc(db, 'todos', userId);
    await setDoc(docRef, data);
  }

  static async addCategory(userId: string, newCategory: TCategory) {
    const data = await this.getDocument(userId);
    const docRef = doc(db, 'todos', userId);
    if (data) {
      await updateDoc(docRef, {
        todos: arrayUnion(newCategory),
      });
    } else {
      await setDoc(docRef, {
        todos: [newCategory],
      });
    }
  }

  static async updateTodo(userId: string, categoryId: string, newTodo: TTodo) {
    const data = await this.getDocument(userId);
    const docRef = doc(db, 'todos', userId);

    if (data) {
      const categoryIndex = data.todos.findIndex(
        (cat: TCategory) => cat.cid === categoryId
      );

      if (categoryIndex > -1) {
        const updatedTodos = [...data.todos];
        const category = updatedTodos[categoryIndex];
        if (!category.item) {
          category.item = [];
        }
        category.item.push(newTodo);

        await updateDoc(docRef, {
          todos: updatedTodos,
        });
      } else {
        await updateDoc(docRef, {
          todos: arrayUnion({
            ...data,
            item: [newTodo],
          }),
        });
      }
    } else {
      await setDoc(docRef, {
        todos: [
          {
            ...data,
            item: [newTodo],
          },
        ],
      });
    }
  }

  static async deleteTodo(userId: string, categoryId: string, todoId: string) {
    const data = await this.getDocument(userId);
    const docRef = doc(db, 'todos', userId);

    if (data) {
      const categoryIndex = data.todos.findIndex(
        (cat: TCategory) => cat.cid === categoryId
      );

      if (categoryIndex > -1) {
        const updatedTodos = [...data.todos];
        const category = updatedTodos[categoryIndex];
        const todoIndex = category.item.findIndex(
          (todo: TTodo) => todo.id === todoId
        );

        if (todoIndex > -1) {
          category.item.splice(todoIndex, 1);

          await updateDoc(docRef, {
            todos: updatedTodos,
          });
        }
      }
    }
  }
}

export default FirebaseActions;
