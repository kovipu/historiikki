import { Item, MediaItem } from '../@types/globals';
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
  storage.ref(`image/${itemId}/${filename}`)
    .getDownloadURL();

const getAudioURL = (itemId: string, filename: string): Promise<string> =>
  storage.ref(`audio/${itemId}/${filename}`)
    .getDownloadURL();

const newMediaItem = (itemId: string, mediaItem: MediaItem): Promise<any> =>
  db.collection('items')
    .doc(itemId)
    .get()
    .then(doc => {
      const oldMedia = doc.data() ? doc.data()!!.media : [];
      const data = {
        ...doc.data(),
        media: [
          ...oldMedia,
          mediaItem
        ]
      };
      return db.collection('items')
        .doc(itemId)
        .set(data)
    });

const uploadFile = (itemId: string, type: 'image' | 'audio', file: File): Promise<any> =>
  new Promise((resolve, reject) => {
    storage.ref(`${type}/${itemId}/${file.name}`)
      .put(file)
      .then(res => resolve(res))
      .catch(err => reject(err))
  });

export { getItems, getImageURL, getAudioURL, newMediaItem, uploadFile }