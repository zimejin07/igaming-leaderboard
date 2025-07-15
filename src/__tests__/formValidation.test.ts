// import { z } from 'zod'

// const schema = z.object({
//   name: z.string().min(1),
//   score: z.coerce.number().int().nonnegative(),
// })

// test('valid form data passes validation', () => {
//   expect(() => schema.parse({ name: 'Alice', score: 100 })).not.toThrow()
// })

// test('invalid name fails validation', () => {
//   expect(() => schema.parse({ name: '', score: 10 })).toThrow()
// })

// test('negative score fails', () => {
//   expect(() => schema.parse({ name: 'Bob', score: -1 })).toThrow()
// })
