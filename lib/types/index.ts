import { prompt } from 'inquirer';

type Prompt = typeof prompt;

export type Questions = Prompt extends (questions: infer A, ...args: any[]) => any ? A : never;
