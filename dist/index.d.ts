import { PiniaPluginContext } from 'pinia';

interface Storage {
    readonly length?: number;
    clear?: () => void;
    getItem: (key: string) => string | null;
    key?: (index: number) => string | null;
    removeItem?: (key: string) => void;
    setItem: (key: string, value: string) => void;
    [name: string]: any;
}
interface PersistOptions {
    prefix?: string;
    storage?: Storage;
    overwrite?: boolean;
}
declare function persist(options?: PersistOptions): ({ store }: PiniaPluginContext) => void;

export { PersistOptions, Storage, persist };
