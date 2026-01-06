import { trackTestClick } from '../../utils/ga';

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-sky-500 text-2xl font-bold">tsuzuru 프로젝트</h1>

      <button
        className="bg-sky-500 text-white px-6 py-3 rounded-lg text-lg font-semibold cursor-pointer"
        onClick={() => {
          trackTestClick();
          alert('GA 이벤트 전송!');
        }}
      >
        GA 테스트 버튼
      </button>
    </div>
  );
}

export default HomePage;
