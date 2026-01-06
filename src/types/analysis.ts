export interface Token {
  surface: string;
  kanji: string;
  reading: string;
  meaning: string;
  pos: string;
}

export interface AnalysisResponse {
  original: string;
  translation: string;
  tokens: Token[];
}
