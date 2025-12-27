import { currentUser } from "@clerk/nextjs/server";

export const ADMIN_EMAILS = [
  // "yogeshpal5049@gmail.com",
  process.env.ADMIN_EMAIL1,
  process.env.ADMIN_EMAIL2,
];

export async function isAdmin() {
  const user = await currentUser();
  
  if (!user) return false;
  
  const userEmail = user.emailAddresses.find(
    (email) => email.id === user.primaryEmailAddressId
  )?.emailAddress;

  return userEmail ? ADMIN_EMAILS.includes(userEmail) : false;
}

