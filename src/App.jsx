import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, Share2, Heart } from 'lucide-react';

const CHAPTERS = [
  {
    id: 1,
    title: "일상의 신호",
    description: "왠지 모르게 몸이 기억하는 것들",
    keywords: ["목적 없는 쇼츠 무한 스크롤", "침대 밖으로 나가기 싫음", "배달 음식으로 때우는 끼니", "연락 씹기 마스터", "\"그냥 그래\"라는 대답", "씻는 것조차 큰 결심이 필요함", "이유 없는 편두통"]
  },
  {
    id: 2,
    title: "미래와 진로",
    description: "내일이 오는 게 반갑지 않을 때",
    keywords: ["나만 멈춰있는 기분", "전공이 내 옷 같지 않음", "뭐라도 해야 할 것 같은 강박", "휴학/퇴사 시뮬레이션", "내 강점이 뭔지 진짜 모름", "성공한 동기 소식에 움찔함", "그냥 누가 정해줬으면 좋겠음"]
  },
  {
    id: 3,
    title: "관계의 무게",
    description: "사람들 사이에서 더 외로울 때",
    keywords: ["단톡방 알림 꺼두기", "약속 취소되면 느껴지는 안도감", "웃고 있지만 집에 가고 싶음", "남의 눈치 보는 나 자신이 싫음", "\"착하다\"는 말이 부담됨", "미움받을 용기 부족", "내 얘긴 아무에게도 안 함"]
  },
  {
    id: 4,
    title: "비교와 자존감",
    description: "화면 속 세상과 나 사이",
    keywords: ["인스타그램 삭제와 재설치 반복", "잘나가는 친구에 대한 묘한 질투", "거울 속 내가 낯선 날", "작은 실수도 밤새 복기함", "칭찬을 들으면 의심부터 함", "나만 빼고 다 행복해 보임", "갓생 살기 실패의 반복"]
  }
];

const FloatingKeyword = ({ text, index, onClick }) => {
  // 사용자가 만족한 '가로 중앙'을 유지하되, 겹치지 않게 지그재그 슬롯 배치
  const [coords] = useState(() => {
    const row = index; 
    const isLeft = index % 2 === 0;
    
    return {
      // 15%~45%(왼쪽열), 50%~80%(오른쪽열)로 분산
      left: isLeft ? `${15 + Math.random() * 15}%` : `${50 + Math.random() * 15}%`,
      top: `${(row * 12) + 6 + Math.random() * 4}%`,
      randomX: Math.random() * 20 - 10,
      randomY: Math.random() * 20 - 10,
      duration: 5 + Math.random() * 2
    };
  });

  return (
    <motion.button
      onClick={() => onClick(text)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: [0, coords.randomX, 0],
        y: [0, coords.randomY, 0]
      }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ 
        x: { duration: coords.duration, repeat: Infinity, ease: "easeInOut" },
        y: { duration: coords.duration * 1.1, repeat: Infinity, ease: "easeInOut" },
      }}
      className="absolute px-4 py-2 bg-[#e8dec5] border border-[#4a0404]/20 rounded-full shadow-md text-[12px] font-medium text-[#4a0404] whitespace-nowrap active:scale-90 transition-transform z-10"
      style={{
        left: coords.left,
        top: coords.top,
      }}
    >
      {text}
    </motion.button>
  );
};

// 항아리의 형태와 크기는 Tailwind 높이 클래스나 absolute 배치에 의존하지 않는다.
const WorryCauldron = ({ count }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="160"
    height="144"
    viewBox="0 0 180 162"
    role="img"
    aria-label={`고민 ${count}개를 담은 항아리`}
    style={{
      display: 'block',
      width: 160,
      height: 144,
      minWidth: 160,
      minHeight: 144,
      flexShrink: 0,
      alignSelf: 'center',
      marginBottom: 16,
      overflow: 'visible'
    }}
  >
    {/* 손잡이부터 그린 뒤 몸통을 덮는다. CSS 위치나 z-index에 의존하지 않는다. */}
    <path
      d="M44 84 C18 77 17 117 42 120 M136 84 C162 77 163 117 138 120"
      fill="none"
      stroke="#191919"
      strokeWidth="8"
      strokeLinecap="round"
    />
    {/* 몸통은 선택 개수와 무관하게 항상 그린다. */}
    <path
      data-part="body"
      d="M42 76 C32 92 34 123 48 138 C65 155 115 155 132 138 C146 123 148 92 138 76 Z"
      fill="#191919"
    />
    <path
      d="M49 103 C46 119 53 134 65 140"
      fill="none"
      stroke="#484848"
      strokeWidth="4"
      strokeLinecap="round"
      opacity="0.6"
    />
    {/* 검은 솥과 주황색 입구·흘러내리는 액체 */}
    <ellipse cx="90" cy="78" rx="52" ry="15" fill="#ff8c1a" />
    <ellipse cx="90" cy="75" rx="44" ry="10" fill="#242424" />
    <path
      d="M39 78 C57 89 121 90 141 78 L139 87 C135 90 131 90 128 91 L128 100 C128 108 117 108 117 100 L117 94 L101 96 L101 110 C101 118 90 118 90 110 L90 96 L75 95 L75 102 C75 110 64 110 64 102 L64 93 L56 91 L56 103 C56 112 44 112 44 103 L44 89 Z"
      fill="#ff8c1a"
    />
    <path
      d="M47 76 C67 64 114 64 134 75"
      fill="none"
      stroke="#ffc56b"
      strokeWidth="3"
      strokeLinecap="round"
    />
    {/* 애니메이션은 거품에만 적용한다. 몸통 크기는 움직이지 않는다. */}
    {[0, 1, 2].map(index => (
      <motion.circle
        key={index}
        cx={62 + index * 27}
        cy="46"
        r={index === 1 ? 5 : 4}
        fill="#ff961b"
        initial={{ opacity: 0 }}
        animate={{ cy: [46, 16], opacity: [0, 1, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, delay: index * 0.65, ease: 'easeOut' }}
      />
    ))}
    <circle cx="151" cy="50" r="14" fill="#a61c1c" stroke="#f8f1e1" strokeWidth="2" />
    <text x="151" y="50" dy="0.35em" textAnchor="middle" fill="#f8f1e1" fontSize="12" fontWeight="700">
      {count}
    </text>
  </svg>
);


export default function App() {
  const [step, setStep] = useState('intro');
  const [currentChapter, setCurrentChapter] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [visibleKeywords, setVisibleKeywords] = useState([]);

  useEffect(() => {
    if (step === 'collection') {
      setVisibleKeywords(CHAPTERS[currentChapter].keywords);
    }
  }, [step, currentChapter]);

  const handleKeywordClick = (keyword) => {
    setSelectedItems(prev => [...prev, keyword]);
    setVisibleKeywords(prev => prev.filter(k => k !== keyword));
  };

  const nextChapter = () => {
    if (currentChapter < CHAPTERS.length - 1) {
      setCurrentChapter(currentChapter + 1);
    } else {
      setStep('result');
    }
  };

  const reset = () => {
    setStep('intro');
    setCurrentChapter(0);
    setSelectedItems([]);
  };

  return (
    <div className="min-h-screen bg-[#f8f1e1] text-[#4a0404] font-serif selection:bg-[#4a0404] selection:text-white flex flex-col overflow-hidden">
      
      {/* Header */}
      <header className="p-8 flex flex-col items-center shrink-0 border-b border-[#4a0404]/5">
        <div className="text-[10px] tracking-[0.4em] text-[#a61c1c] uppercase font-bold mb-2">
          ✧ ODD CASA ADMISSION ✧
        </div>
        <h1 className="text-xl font-normal tracking-tight">
          사전 체크 <span className="text-[#a61c1c] font-bold">[BETA]</span>
        </h1>
      </header>

      <main className="flex-1 flex flex-col relative max-w-md mx-auto w-full px-6 overflow-hidden">
        <AnimatePresence mode="wait">
          
          {step === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col justify-center items-center text-center space-y-12"
            >
              <div className="space-y-6">
                <h1 className="text-4xl font-bold leading-tight text-[#4a0404]">
                  요즘 진짜 어때요?<br />
                  <span className="text-[#a61c1c] italic underline decoration-[#a61c1c]/20 underline-offset-8">숨겨진 진심</span>을 찾아봐요.
                </h1>
                <p className="text-[#4a0404]/40 leading-relaxed text-sm">
                  내 마음을 스쳐 지나가는 말들을<br />
                  항아리에 툭, 담아보세요.
                </p>
              </div>
              <button
                onClick={() => setStep('collection')}
                className="px-10 py-4 bg-[#a61c1c] text-[#f8f1e1] rounded-sm font-bold shadow-xl tracking-[0.3em] text-xs uppercase active:scale-95 transition-transform"
              >
                항아리 챙기기
              </button>
            </motion.div>
          )}

          {step === 'collection' && (
            <motion.div 
              key="collection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col h-full"
            >
              <div className="mt-8 text-center shrink-0">
                <span className="text-[#a61c1c] font-bold text-[10px] uppercase tracking-[0.3em]">Chapter {currentChapter + 1}</span>
                <h2 className="text-2xl font-bold mt-1 text-[#4a0404]">{CHAPTERS[currentChapter].title}</h2>
                <p className="text-[#4a0404]/30 text-xs mt-1 italic">{CHAPTERS[currentChapter].description}</p>
              </div>

              {/* Keyword Floating Area */}
              <div className="flex-1 relative w-full my-4">
                <AnimatePresence>
                  {visibleKeywords.map((keyword, idx) => (
                    <FloatingKeyword 
                      key={keyword} 
                      text={keyword} 
                      index={idx}
                      onClick={handleKeywordClick} 
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* Cauldron & Button Section */}
              <div className="pb-10 flex flex-col items-center gap-6 shrink-0">
                
                <WorryCauldron count={selectedItems.length} />

                <button
                  onClick={nextChapter}
                  className="w-full py-4 bg-[#a61c1c] text-[#f8f1e1] rounded-sm font-bold tracking-[0.3em] shadow-lg active:scale-95 transition-all uppercase text-xs"
                >
                  {currentChapter < CHAPTERS.length - 1 ? "Next Chapter" : "Close Jar"}
                </button>
              </div>
            </motion.div>
          )}

          {step === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col justify-center items-center py-10"
            >
              <div className="bg-white p-8 rounded-sm shadow-2xl border border-[#4a0404]/5 w-full max-w-sm flex flex-col items-center text-center space-y-8">
                <div className="w-16 h-16 bg-[#f8f1e1] rounded-full flex items-center justify-center border border-[#a61c1c]/10">
                  <Heart className="text-[#a61c1c] fill-[#a61c1c]" size={28} />
                </div>
                
                <div className="space-y-2">
                  <p className="text-[#4a0404]/30 font-bold uppercase tracking-widest text-[9px]">Admission Summary</p>
                  <h2 className="text-3xl font-bold text-[#4a0404]">
                    "{selectedItems.length} Pieces"
                  </h2>
                </div>

                <div className="p-5 bg-[#f8f1e1]/50 rounded border border-[#4a0404]/5 text-[#4a0404]">
                  <p className="leading-relaxed text-xs italic">
                    {selectedItems.length > 10 
                      ? "지금은 마음의 방어막이 조금 얇아진 상태군요. 괜찮은 척하느라 에너지를 많이 썼을 거예요. 오늘은 아무것도 증명하지 않아도 돼요."
                      : "생각보다 덤덤하게 잘 지나오고 있네요. 하지만 항아리에 담은 것만으로도 고민의 실체는 조금 더 선명해졌을 거예요."}
                  </p>
                </div>

                <div className="w-full pt-4 space-y-3">
                  <button className="w-full py-4 bg-[#4a0404] text-[#f8f1e1] rounded-sm font-bold flex items-center justify-center gap-3 tracking-[0.2em] uppercase text-[10px]">
                    <Share2 size={14} /> Save Record
                  </button>
                  <button 
                    onClick={reset}
                    className="w-full py-2 text-[#4a0404]/40 font-bold flex items-center justify-center gap-2 hover:text-[#4a0404] text-[10px] uppercase tracking-widest"
                  >
                    <RefreshCcw size={12} /> Start Over
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      <footer className="p-6 text-center shrink-0 border-t border-[#4a0404]/5">
        <p className="text-[8px] text-[#4a0404]/20 tracking-[0.3em] uppercase">
          ✧ odd casa: this record is for your heart only ✧
        </p>
      </footer>
    </div>
  );
}
