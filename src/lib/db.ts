import postgres from "postgres";
import { DATABASE_URL } from "$env/static/private";
import { actions } from "$lib/actions";
import { daysInMonth } from "./date-utils";

const sql = postgres(DATABASE_URL, { ssl: "require" });

export const getPostgresVersion = async () => await sql`select version()`;

export const setDayInfo = async (userId: string, dayInfo: string) =>
	await sql`UPDATE days SET dayInfo = ${dayInfo} WHERE id = ${userId}`;

export const getDayInfo = async (userId: string) =>
	await sql`SELECT dayInfo FROM days WHERE id = ${userId}`;

export const initialiseUser = async (userId: string) => {
    // Construct a new dayInfo object consisting of an array of activity ids and values.
    const dayInfo = actions.map((v: any) => ( {id: v.id, value: 0} ));

    const newInfo: any = {};
    // Loop over months
    for (let month = 0; month < 12; month++) {
        // Loop over days
        for (let day = 0; day < daysInMonth(month); day++) {
            newInfo[`${month}-${day}`] = dayInfo;
        }
    }

    await sql`INSERT INTO days (id, dayInfo) VALUES (${userId}, ${JSON.stringify(newInfo)})`;
}
