import clsx from 'clsx';
import type { Token } from '../../types/analysis';

interface OriginalTextProps {
  original: string;
  tokens: Token[];
  selectedIndex: number | null;
  onCharClick: (charIndex: number) => void;
  translation: string;
  isTranslationVisible: boolean;
  onToggleTranslation: () => void;
}

function OriginalText({
  original,
  tokens,
  selectedIndex,
  onCharClick,
  translation,
  isTranslationVisible,
  onToggleTranslation,
}: OriginalTextProps) {
  // 선택된 토큰의 범위 계산
  const getSelectedRange = (): { start: number; end: number } | null => {
    if (selectedIndex === null) return null;

    let currentPosition = 0;
    for (let i = 0; i < tokens.length; i++) {
      const tokenLength = tokens[i].surface.length;
      if (i === selectedIndex) {
        return {
          start: currentPosition,
          end: currentPosition + tokenLength,
        };
      }
      currentPosition += tokenLength;
    }
    return null;
  };

  const selectedRange = getSelectedRange();

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
      <div className="text-xl leading-relaxed select-none">
        {original.split('').map((char, index) => {
          const isSelected = selectedRange && index >= selectedRange.start && index < selectedRange.end;

          return (
            <span
              key={index}
              onClick={() => onCharClick(index)}
              className={clsx(
                'cursor-pointer transition-all',
                isSelected ? 'bg-sky-500 text-white' : 'hover:bg-gray-100'
              )}
            >
              {char}
            </span>
          );
        })}
      </div>

      {/* 번역 토글 버튼 */}
      <button
        onClick={onToggleTranslation}
        className="mt-6 px-3 py-1.5 bg-gray-200 text-gray-700 text-sm rounded-md font-medium hover:bg-gray-300 transition-colors cursor-pointer"
      >
        {isTranslationVisible ? '번역 숨기기' : '번역 보기'}
      </button>

      {/* 번역 텍스트 */}
      {isTranslationVisible && (
        <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-base text-gray-800 leading-relaxed">{translation}</p>
        </div>
      )}
    </div>
  );
}

export default OriginalText;
