import { Item } from '../globals';
import { db, storage } from './firebase';

const getItems = (): Promise<Item[]> =>
  new Promise((resolve, reject) => {
    db.collection('items').get()
      .then(snapshot => {
        const items: Item[] = [];

        snapshot.forEach(doc => {
          const item = { id: doc.id, ...doc.data() } as Item;
          items.push(item)
        });

        resolve(items)
      })
      .catch(err => reject(err));
  });

const getImageURL = (itemId: string, filename: string): Promise<string> =>
  storage.ref(`images/${itemId}/${filename}`)
    .getDownloadURL()

const getAudioURL = (itemId: string, filename: string): Promise<string> =>
  storage.ref(`audio/${itemId}/${filename}`)
    .getDownloadURL()

export { getItems, getImageURL, getAudioURL }