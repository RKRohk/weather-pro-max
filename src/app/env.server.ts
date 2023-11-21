import { TypeOf, z } from "zod";

const zodEnv = z.object({
    REDIS_URI: z.string(),
    REDIS_PASSWORD: z.string(),
    REDIS_PORT: z.number(),
    WEATHER_API_KEY: z.string(),
})

declare global {
    namespace NodeJS {
      interface ProcessEnv extends TypeOf<typeof zodEnv> {}
    }
  }
  try {
    zodEnv.parse(process.env)
  } catch (err) {
    if (err instanceof z.ZodError) {
      const { fieldErrors } = err.flatten()
      const errorMessage = Object.entries(fieldErrors)
        .map(([field, errors]) =>
          errors ? `${field}: ${errors.join(", ")}` : field,
        )
        .join("\n  ")
      throw new Error(
        `Missing environment variables:\n  ${errorMessage}`,
      )
      process.exit(1)
    }
  }