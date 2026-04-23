import scientistDirectoryRaw from "./scientistDirectory.json";

export type ScientistDirectoryEntry = {
  id: number;
  name: string;
  available: boolean;
};

const AVAILABLE_COUNT = 40;

export const scientistDirectory: ScientistDirectoryEntry[] = (
  scientistDirectoryRaw as Array<{ id: number; name: string }>
).map((scientist) => ({
  ...scientist,
  available: scientist.id <= AVAILABLE_COUNT,
}));

