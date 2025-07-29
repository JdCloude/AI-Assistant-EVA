// Summarize academic text flow.
'use server';
/**
 * @fileOverview Summarizes academic articles related to Universidad Nacional de Colombia.
 *
 * - summarizeAcademicText - A function that summarizes academic articles.
 * - SummarizeAcademicTextInput - The input type for the summarizeAcademicText function.
 * - SummarizeAcademicTextOutput - The return type for the summarizeAcademicText function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SummarizeAcademicTextInputSchema = z.object({
  text: z.string().describe('The academic text to summarize.'),
});
export type SummarizeAcademicTextInput = z.infer<typeof SummarizeAcademicTextInputSchema>;

const SummarizeAcademicTextOutputSchema = z.object({
  summary: z.string().describe('The summary of the academic text.'),
});
export type SummarizeAcademicTextOutput = z.infer<typeof SummarizeAcademicTextOutputSchema>;

export async function summarizeAcademicText(
  input: SummarizeAcademicTextInput
): Promise<SummarizeAcademicTextOutput> {
  return summarizeAcademicTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeAcademicTextPrompt',
  input: {
    schema: z.object({
      text: z.string().describe('The academic text to summarize.'),
    }),
  },
  output: {
    schema: z.object({
      summary: z.string().describe('The summary of the academic text.'),
    }),
  },
  prompt: `You are an expert summarizer of academic articles, especially those related to Universidad Nacional de Colombia. Please provide a concise summary of the following text:\n\n{{{text}}}`,
});

const summarizeAcademicTextFlow = ai.defineFlow<
  typeof SummarizeAcademicTextInputSchema,
  typeof SummarizeAcademicTextOutputSchema
>(
  {
    name: 'summarizeAcademicTextFlow',
    inputSchema: SummarizeAcademicTextInputSchema,
    outputSchema: SummarizeAcademicTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
