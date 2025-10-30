import { db } from "@/src/drizzle/db";
import { UserNotificationSettingsTable } from "@/src/drizzle/schema";

export async function insertUserNotificationSettings(settings: typeof UserNotificationSettingsTable.$inferInsert) {
    await db
        .insert(UserNotificationSettingsTable)
        .values(settings)
        .onConflictDoNothing()
}