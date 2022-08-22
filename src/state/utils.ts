type OnSetCallback = (newValue: any, _: any, isReset: boolean) => void;

interface ILocalStorageEffect {
  setSelf: (json: any) => void;
  onSet: (callback: OnSetCallback) => void;
}

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: ILocalStorageEffect) => {
    const savedValue = localStorage.getItem(key);

    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export default localStorageEffect;
