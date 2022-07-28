export interface IFavoriteRecipe {
  id: string
  type: string
  nationality: string
  category: string
  alcoholicOrNot: string
  name: string
  image: string
}

class LocalStorageService {
  get(key: string) {
    const storage: IFavoriteRecipe[] = JSON.parse(localStorage.getItem(key) || 'null');
    return storage;
  }

  set<T>(key: string, data: T) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

export default new LocalStorageService();
