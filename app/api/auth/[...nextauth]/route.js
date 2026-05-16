import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: "TEMP",
      clientSecret: "TEMP",
    }),
  ],
});

export { handler as GET, handler as POST };
