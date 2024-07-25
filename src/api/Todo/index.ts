// firestoreHelpers.ts
import { db } from '../../config/firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { TCategory, TTodo } from '../../types/TodoTypes';

class FirebaseActions {
  private static async getDocRefAndData(userId: string) {
    const docRef = doc(db, 'todos', userId);
    const docSnap = await getDoc(docRef);
    return { docRef, data: docSnap.exists() ? docSnap.data() : null };
  }

  private static getCategoryIndex(data: any, categoryId: string) {
    return data.todos.findIndex((cat: TCategory) => cat.cid === categoryId);
  }

  static async getDocument(userId: string) {
    const { data } = await this.getDocRefAndData(userId);
    return data;
  }

  static async updateDocument(userId: string, data: any) {
    const { docRef } = await this.getDocRefAndData(userId);
    await updateDoc(docRef, data);
  }

  static async setDocument(userId: string, data: any) {
    const { docRef } = await this.getDocRefAndData(userId);
    await setDoc(docRef, data);
  }

  static async addCategory(userId: string, newCategory: TCategory) {
    const { docRef, data } = await this.getDocRefAndData(userId);
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
    const { docRef, data } = await this.getDocRefAndData(userId);

    if (data) {
      const categoryIndex = this.getCategoryIndex(data, categoryId);

      if (categoryIndex > -1) {
        data.todos[categoryIndex].item = data.todos[categoryIndex].item || [];
        data.todos[categoryIndex].item.push(newTodo);

        await updateDoc(docRef, { todos: data.todos });
      } else {
        await updateDoc(docRef, {
          todos: arrayUnion({ ...data, item: [newTodo] }),
        });
      }
    } else {
      await setDoc(docRef, { todos: [{ ...data, item: [newTodo] }] });
    }
  }

  static async deleteTodo(userId: string, categoryId: string, todoId: string) {
    const { docRef, data } = await this.getDocRefAndData(userId);

    if (data) {
      const categoryIndex = this.getCategoryIndex(data, categoryId);

      if (categoryIndex > -1) {
        const category = data.todos[categoryIndex];
        const todoIndex = category.item.findIndex(
          (todo: TTodo) => todo.id === todoId
        );

        if (todoIndex > -1) {
          category.item.splice(todoIndex, 1);

          await updateDoc(docRef, { todos: data.todos });
        }
      }
    }
  }
}

export default FirebaseActions;
