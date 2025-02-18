import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

export const collections = {
	work: defineCollection({
		// Load Markdown files in the src/content/work directory.
		loader: glob({ base: './src/content/work', pattern: '**/*.md', }),
		schema: z.object({
			title: z.string(),
			clientProfile: z.string(),
			startDate: z.coerce.date(),
			endDate: z.coerce.date().optional(),
			tags: z.array(z.string()),
			img: z.string(),
			lightImage: z.string().optional(),
			darkImage: z.string().optional(),
			img_alt: z.string().optional(),
		}),
	}),
};
