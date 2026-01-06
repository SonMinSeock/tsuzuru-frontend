import { useState } from 'react';
import OriginalText from '../../components/analysis/OriginalText';
import DetailPanel from '../../components/analysis/DetailPanel';
import { getMockAnalysis } from '../../utils/mockData';
import type { Token } from '../../types/analysis';

// 글자 인덱스에서 토큰 찾기
function findTokenIndexAtChar(tokens: Token[], charIndex: number): number | null {
  let currentPosition = 0;

  for (let i = 0; i < tokens.length; i++) {
    const tokenLength = tokens[i].surface.length;

    if (charIndex >= currentPosition && charIndex < currentPosition + tokenLength) {
      return i;
    }

    currentPosition += tokenLength;
  }

  return null;
}

function Test() {
  // 처음부터 분석된 데이터를 설정
  const [analyzedData] = useState(() => getMockAnalysis(''));
  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number | null>(null);
  const [isTranslationVisible, setIsTranslationVisible] = useState(true);

  const handleCharClick = (charIndex: number) => {
    const tokenIndex = findTokenIndexAtChar(analyzedData.tokens, charIndex);
    if (tokenIndex !== null) {
      setSelectedTokenIndex(tokenIndex);
    }
  };

  const handleToggleTranslation = () => {
    setIsTranslationVisible((prev) => !prev);
  };

  const handleCloseDetail = () => {
    setSelectedTokenIndex(null);
  };

  const selectedToken = selectedTokenIndex !== null ? analyzedData.tokens[selectedTokenIndex] : null;

  return (
    <div className="min-h-screen bg-gray-50 pb-64">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">일본어 문장 분석 테스트</h1>

        {/* 원문 카드 + 번역 영역 */}
        <OriginalText
          original={analyzedData.original}
          tokens={analyzedData.tokens}
          selectedIndex={selectedTokenIndex}
          onCharClick={handleCharClick}
          translation={analyzedData.translation}
          isTranslationVisible={isTranslationVisible}
          onToggleTranslation={handleToggleTranslation}
        />
      </div>

      {/* 하단 패널 */}
      <DetailPanel token={selectedToken} onClose={handleCloseDetail} />
    </div>
  );
}

export default Test;
