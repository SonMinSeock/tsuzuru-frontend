import clsx from 'clsx';
import type { Token } from '../../types/analysis';

interface DetailPanelProps {
  token: Token | null;
  onClose: () => void;
}

function DetailPanel({ token, onClose }: DetailPanelProps) {
  return (
    <div
      className={clsx(
        'fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 p-6 shadow-lg',
        'transition-transform duration-300 ease-out',
        token ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <div className="max-w-2xl mx-auto">
        {token && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">표제어</p>
                <p className="text-lg font-medium">{token.surface}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">품사</p>
                <p className="text-lg font-medium">{token.pos}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">읽기 (후리가나)</p>
                <p className="text-lg font-medium">{token.reading}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">한국어 의미</p>
                <p className="text-lg font-medium text-sky-600">{token.meaning}</p>
              </div>
            </div>

            {/* 닫기 버튼 - 중앙 정렬 */}
            <div className="flex justify-center mt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300 transition-colors cursor-pointer"
              >
                닫기
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DetailPanel;
