import React from 'react';
import { useGameStore } from '../store/gameStore';
import { stages, getAvailableStages } from '../data/stages';
import ImageComponent, { getImagePath } from './ImageComponent';

const StageSelect = ({ onStageSelect, onBack }) => {
  const { hero } = useGameStore();
  
  const availableStages = getAvailableStages(hero.level);
  
  return (
    <div className="stage-select bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 min-h-screen p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">เลือกด่านการต่อสู้</h1>
        <p className="text-gray-300">เลือกด่านที่ต้องการเข้าไปต่อสู้</p>
        <div className="text-yellow-400 mt-4">
          ระดับปัจจุบัน: {hero.level} | HP: {hero.currentHp}/{hero.maxHp} | MP: {hero.currentMp}/{hero.maxMp}
        </div>
        
        {/* Stage Preview Images */}
        <div className="flex justify-center items-center space-x-4 mt-6">
          {stages.map((stage) => (
            <div key={stage.id} className="relative">
              <div
                className="w-20 h-20 rounded-lg border-2 border-gray-400 bg-cover bg-center shadow-lg"
                style={{
                  backgroundImage: `url(${stage.background})`,
                }}
              >
                {/* Stage Number Badge */}
                <div className="absolute -top-2 -left-2 bg-blue-600 text-white text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center">
                  {stage.id}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-6 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
      >
        ← กลับ
      </button>

      {/* Stages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {stages.map((stage) => {
          const isUnlocked = availableStages.some(s => s.id === stage.id);
          const isCompleted = hero.level > stage.unlockLevel; // สมมติว่าผ่านแล้วถ้าเลเวลสูงกว่า
          
          return (
            <div
              key={stage.id}
              className={`
                stage-card relative overflow-hidden rounded-xl border-2 transition-all duration-300
                ${isUnlocked 
                  ? 'border-blue-400 hover:border-yellow-400 hover:scale-105 cursor-pointer' 
                  : 'border-gray-600 opacity-50 cursor-not-allowed'
                }
                ${isCompleted ? 'bg-green-900' : 'bg-gray-800'}
              `}
              onClick={() => isUnlocked && onStageSelect(stage)}
            >
              {/* Background Preview */}
              <div className="relative h-48 overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${stage.background})`,
                  }}
                >
                  {/* Fallback gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-blue-600 opacity-50"></div>
                </div>
                
                {/* Stage Number */}
                <div className="absolute top-2 left-2 bg-black bg-opacity-80 text-white text-xl font-bold w-10 h-10 rounded-full flex items-center justify-center">
                  {stage.id}
                </div>
                
                {/* Lock/Complete Status */}
                <div className="absolute top-2 right-2">
                  {!isUnlocked && (
                    <div className="bg-red-600 text-white p-2 rounded-full">
                      🔒
                    </div>
                  )}
                  {isCompleted && (
                    <div className="bg-green-600 text-white p-2 rounded-full">
                      ✅
                    </div>
                  )}
                </div>
                
                {/* Enemies Preview */}
                <div className="absolute bottom-2 right-2 flex space-x-1">
                  {stage.enemies.map((enemyData, index) => (
                    <div key={index} className="flex items-center">
                      <ImageComponent
                        src={getImagePath('enemies', `${enemyData.id === 'goblin' ? 'Goblin.png' : enemyData.id === 'orc' ? 'orc.png' : 'Mage.png'}`)}
                        fallback="👹"
                        alt={enemyData.id}
                        width={32}
                        height={32}
                        className="rounded border shadow-lg"
                      />
                      {enemyData.count > 1 && (
                        <span className="text-white font-bold text-sm bg-red-600 rounded-full w-5 h-5 flex items-center justify-center ml-1">
                          {enemyData.count}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Stage Info */}
              <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-2">{stage.name}</h3>
                <p className="text-gray-300 text-sm mb-3">{stage.description}</p>
                
                {/* Requirements */}
                <div className="mb-3">
                  <span className="text-yellow-400 text-sm">
                    ต้องการระดับ: {stage.unlockLevel}
                  </span>
                </div>
                
                {/* Rewards Preview */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-400">EXP:</span>
                    <span className="text-white">{stage.rewards.exp}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-yellow-400">Gold:</span>
                    <span className="text-white">{stage.rewards.gold}</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    + สิ่งของต่างๆ
                  </div>
                </div>
                
                {/* Action Button */}
                <div className="mt-4">
                  {isUnlocked ? (
                    <button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-bold transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        onStageSelect(stage);
                      }}
                    >
                      เข้าสู่การต่อสู้!
                    </button>
                  ) : (
                    <button className="w-full bg-gray-600 text-gray-400 py-2 rounded-lg font-bold cursor-not-allowed">
                      ล็อค (ต้องการระดับ {stage.unlockLevel})
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Tips */}
      <div className="mt-8 text-center text-gray-400 text-sm">
        <p>💡 เคล็ดลับ: แต่ละด่านจะมีความยากที่เพิ่มขึ้น อย่าลืมอัพเกรดตัวละครก่อนท้าทายด่านใหม่!</p>
      </div>
    </div>
  );
};

export default StageSelect; 