import moment from "moment";

export function updateObject<T, U>(oldState: T, updatedProperties: U): T {
    return { ...oldState, ...updatedProperties };
}

export function typedAction<T extends string>(type: T): { type: T };

export function typedAction<T extends string, P extends any>(
    type: T,
    payload: P
): { type: T; payload: P };

export function typedAction(type: string, payload?: any) {
    return { type, payload };
}

export const transformDateToUnix = (): number => {
    const currentDate = moment();
    return moment(currentDate).unix();
}

export const transformUnixToDateSent = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return moment(date).fromNow();
}

export const fileValidation = (file: File): boolean => {
    const acceptedType = ['jpg', 'jpeg', 'png'];
    const extension = file.name.split('.')[1].toLowerCase();
    const maxSize = 2000000;
    if (!acceptedType.includes(extension) || file.size >= maxSize) return false;
    return true;
}