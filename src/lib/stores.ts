import { writable } from "svelte/store";

export type ISelectedDay = { month: number; date: number } | null;
export const selectedDay = writable<ISelectedDay>();
export const actions = writable();
