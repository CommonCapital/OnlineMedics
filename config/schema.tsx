
import { pgTable, integer, varchar, text, json } from "drizzle-orm/pg-core";


export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({length: 255}).notNull(),
  
    email: varchar({length: 255}).notNull().unique(),
    credits: integer()
});

export const SessionChatTable= pgTable('sessionChatTable',{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    sessionId: varchar().notNull(),
    createdBy: varchar().references(()=>usersTable.email),
    createdOn: varchar(),
    selectedDoctor: json(),
    notes: text(),
    conversation:json(),
    report : json(),

   
})