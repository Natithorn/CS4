import React from 'react';
import { useGameStore } from '../store/gameStore';
import ImageComponent, { getImagePath } from './ImageComponent';

const Enemy = () => {
  const { currentEnemy } = useGameStore();

  if (!currentEnemy) {
    return (
      <div className="enemy-container relative bg-gradient-to-br from-red-900 via-red-800 to-red-900 p-6 rounded-xl shadow-2xl border-4 border-red-600 overflow-hidden">
        <div className="relative z-10 text-center text-red-300 text-xl font-bold">ไม่มีศัตรู</div>
      </div>
    );
  }

  return (
    <div className="enemy-container relative bg-gradient-to-br from-red-900 via-red-800 to-red-900 p-6 rounded-xl shadow-2xl border-4 border-red-600 overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-400 to-red-600 opacity-30"></div>
        <div className="absolute top-4 right-4 text-6xl text-red-300 opacity-40">💀</div>
        <div className="absolute bottom-4 left-4 text-4xl text-red-300 opacity-40">⚔️</div>
      </div>

      {/* Header */}
      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-red-100 mb-4 text-center drop-shadow-lg">
          💀 ศัตรู 💀
        </h2>
        
        {/* Enemy Image - No Border */}
        <div className="enemy-image flex justify-center mb-4">
          <div className="relative">
            <ImageComponent
              src={getImagePath('enemies', currentEnemy.sprite)}
              fallback="👹"
              alt={currentEnemy.name}
              width={120}
              height={120}
              className="rounded-full shadow-2xl drop-shadow-xl"
            />
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-red-500 opacity-20 blur-lg -z-10"></div>
          </div>
        </div>

        {/* Enemy Name */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-red-100 drop-shadow-lg">{currentEnemy.name}</h3>
          <div className="text-red-300 font-semibold">เลเวล {currentEnemy.level}</div>
        </div>
        
        {/* Stats Grid */}
        <div className="enemy-stats space-y-3">
          {/* HP Bar */}
          <div className="stat-group">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-red-300 flex items-center">
                💔 HP:
              </span>
              <span className="text-red-200 font-bold">{currentEnemy.currentHp}/{currentEnemy.maxHp}</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3 border border-red-500">
              <div 
                className="bg-gradient-to-r from-red-600 to-red-500 h-3 rounded-full transition-all duration-300 shadow-inner"
                style={{ width: `${(currentEnemy.currentHp / currentEnemy.maxHp) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Combat Stats */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="stat-item bg-black bg-opacity-30 p-3 rounded-lg border border-red-500">
              <div className="text-red-300 text-sm font-semibold">⚔️ พลังโจมตี</div>
              <div className="text-red-100 text-xl font-bold">{currentEnemy.attack}</div>
            </div>
            <div className="stat-item bg-black bg-opacity-30 p-3 rounded-lg border border-red-500">
              <div className="text-red-300 text-sm font-semibold">🛡️ ป้องกัน</div>
              <div className="text-red-100 text-xl font-bold">{currentEnemy.defense}</div>
            </div>
          </div>

          {/* Rewards Info */}
          <div className="rewards-info bg-black bg-opacity-30 p-3 rounded-lg border border-red-500 mt-3">
            <div className="flex justify-between text-sm">
              <span className="text-red-300">⭐ EXP:</span>
              <span className="text-yellow-400 font-bold">{currentEnemy.exp || 0}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-red-300">💰 Gold:</span>
              <span className="text-yellow-400 font-bold">{currentEnemy.gold || 0}</span>
            </div>
          </div>

          {/* Enemy Status Effects */}
          {currentEnemy.statusEffects && currentEnemy.statusEffects.length > 0 && (
            <div className="status-effects bg-black bg-opacity-30 p-3 rounded-lg border border-purple-500 mt-3">
              <div className="text-purple-300 text-sm font-semibold mb-2">สถานะ:</div>
              <div className="flex flex-wrap gap-1">
                {currentEnemy.statusEffects.map((effect, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-purple-600 text-purple-100 text-xs rounded border border-purple-400"
                  >
                    {effect}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Enemy; 