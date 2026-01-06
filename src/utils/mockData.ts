import type { AnalysisResponse } from '../types/analysis';

export function getMockAnalysis(text: string): AnalysisResponse {
  return {
    original: '今日はうどんを食べました。',
    translation: '오늘은 우동을 먹었습니다.',
    tokens: [
      {
        surface: '今日',
        kanji: '今日',
        reading: 'きょう',
        meaning: '오늘',
        pos: '명사',
      },
      {
        surface: 'は',
        kanji: 'は',
        reading: 'は',
        meaning: '주제 표지 조사',
        pos: '조사(테마)',
      },
      {
        surface: 'うどん',
        kanji: '饂飩',
        reading: 'うどん',
        meaning: '우동',
        pos: '명사',
      },
      {
        surface: 'を',
        kanji: 'を',
        reading: 'を',
        meaning: '목적격 조사',
        pos: '조사(목적어)',
      },
      {
        surface: '食べ',
        kanji: '食べ',
        reading: 'たべ',
        meaning: '먹다',
        pos: '동사(연용형)',
      },
      {
        surface: 'ました',
        kanji: 'ました',
        reading: 'ました',
        meaning: '존경·정중 과거',
        pos: '조동사',
      },
      {
        surface: '。',
        kanji: '。',
        reading: '。',
        meaning: '마침표',
        pos: '구두점',
      },
    ],
  };
}
