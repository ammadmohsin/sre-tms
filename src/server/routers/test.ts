import { router, publicProcedure } from '~/server/trpc';

export const testRouter = router({
  hello: publicProcedure.query(() => {
    return { message: 'Hello from tRPC!' };
  }),
  greet: publicProcedure
    .input((name: unknown) => {
      if (typeof name === 'string') return name;
      throw new Error('Name must be a string');
    })
    .query(({ input }) => {
      return { message: `Hello, ${input}!` };
    }),
});