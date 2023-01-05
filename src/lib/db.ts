import postgres from "postgres";
import { DATABASE_URL } from "$env/static/private";
import { actions } from "$lib/actions";

const sql = postgres(DATABASE_URL, { ssl: "require" });

export const getPostgresVersion = async () => await sql`select version()`;

export const setDayInfo = async (userId: string, monthIdx: number, dayIdx: number, dayInfo: any) => {   
    const columns = Object.keys(dayInfo).map((key: string) => `${key}=${dayInfo[key]}`).join(", ");
    return await sql`UPDATE days SET ${columns} WHERE id = ${userId} AND month=${monthIdx} AND day=${dayIdx}`;
}

export const getDayInfo = async (userId: string, monthIdx: number, dayIdx: number) => {
    const columns = actions.map((v: any) => v.id).join(", ");
    return await sql`SELECT ${columns} FROM days WHERE id = ${userId} AND month=${monthIdx} AND day=${dayIdx}`;
}

export const initialiseUser = async (userId: string, monthIdx: number, dayIdx: number) => {
    const columns = actions.map((v: any) => v.id).join(", ");
    const defaultColumnValues = Array(actions.length).fill(0).join(", ");

    return await sql`INSERT INTO days (id, month, day, ${columns}) VALUES (${userId}, ${monthIdx}, ${dayIdx}, ${defaultColumnValues})`;
}

export const createTable = async () => {
    const columns = [...actions].map((v: any) => v.id + " SMALLINT");
    columns.unshift("userId VARCHAR(255)", "month VARCHAR(2)", "day VARCHAR(2)");
    columns.join(", ");

    return `CREATE TABLE days(${columns});`
}