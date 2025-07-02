import React, { useEffect } from 'react';
import ImageComponent, { getImagePath } from './ImageComponent';

const GameResult = ({ result, onContinue, rewards = null }) => {
  const isVictory = result === 'victory';
  
  useEffect(() => {
    // Auto continue after 3 seconds for victory, 5 seconds for defeat
    const timer = setTimeout(() => {
      onContinue();
    }, isVictory ? 3000 : 5000);
    
    return () => clearTimeout(timer);
  }, [onContinue, isVictory]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="text-center max-w-2xl w-full">
        {/* Result Image */}
        <div className="mb-6 flex justify-center">
          <div className="max-w-[200px] md:max-w-[250px] lg:max-w-[280px] w-full">
            <ImageComponent
              src={getImagePath(isVictory ? 'Wingame' : 'defeat', isVictory ? 'You_win.png' : 'defeat.png')}
              fallback={isVictory ? '🎉' : '💀'}
              alt={isVictory ? 'Victory' : 'Defeat'}
              className="w-full h-auto object-contain"
              style={{ 
                aspectRatio: 'auto'
              }}
            />
          </div>
        </div>

        {/* Result Text */}
        <div className={`text-4xl md:text-6xl font-bold mb-4 ${
          isVictory ? 'text-yellow-400' : 'text-red-400'
        }`}>
          {isVictory ? 'ชนะแล้ว!' : 'แพ้แล้ว!'}
        </div>

        {/* Rewards (for victory) */}
        {isVictory && rewards && (
          <div className="bg-black bg-opacity-80 rounded-lg p-4 mb-4 text-white max-h-60 overflow-y-auto">
            <h3 className="text-xl font-bold text-yellow-400 mb-3">รางวัล</h3>
            <div className="space-y-2 text-base">
              {rewards.exp && (
                <div className="flex justify-center items-center space-x-2">
                  <span>🌟</span>
                  <span>EXP: +{rewards.exp}</span>
                </div>
              )}
              {rewards.gold && (
                <div className="flex justify-center items-center space-x-2">
                  <span>💰</span>
                  <span>เหรียญ: +{rewards.gold}</span>
                </div>
              )}
              {rewards.items && rewards.items.length > 0 && (
                <div className="mt-3">
                  <div className="text-green-400 mb-2">ไอเท็มที่ได้รับ:</div>
                  {rewards.items.map((item, index) => (
                    <div key={index} className="flex justify-center items-center space-x-2">
                      <span>📦</span>
                      <span>{item.name} x{item.quantity}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Continue Button */}
        <button
          onClick={onContinue}
          className={`px-6 py-3 rounded-lg text-lg font-bold transition-all hover:scale-105 ${
            isVictory 
              ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          {isVictory ? 'ต่อไป' : 'ลองใหม่'}
        </button>

        {/* Auto continue indicator */}
        <div className="mt-3 text-gray-400 text-sm">
          จะดำเนินการต่ออัตโนมัติใน {isVictory ? '3' : '5'} วินาที
        </div>
      </div>
    </div>
  );
};

export default GameResult; 