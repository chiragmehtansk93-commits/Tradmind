import NextAuth from "next-auth";

const handler = NextAuth({
  providers: [],
  secret: "tradmind-secret-key",
});

export { handler as GET, handler as POST };
