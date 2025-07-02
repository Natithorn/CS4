import React from 'react';
import { useGameStore } from '../store/gameStore';

const EquippedItems = () => {
  const { equippedItems, unequipItem } = useGameStore();

  const slots = [
    { 
      id: 'weapon', 
      name: 'อาวุธ', 
      icon: '⚔️',
      bgColor: 'from-red-700 to-red-800',
      borderColor: 'border-red-500'
    },
    { 
      id: 'armor', 
      name: 'เกราะ', 
      icon: '🦺',
      bgColor: 'from-blue-700 to-blue-800',
      borderColor: 'border-blue-500'
    },
    { 
      id: 'shield', 
      name: 'โล่', 
      icon: '🛡️',
      bgColor: 'from-gray-700 to-gray-800',
      borderColor: 'border-gray-500'
    },
    { 
      id: 'accessory', 
      name: 'เครื่องประดับ', 
      icon: '💍',
      bgColor: 'from-purple-700 to-purple-800',
      borderColor: 'border-purple-500'
    }
  ];

  const handleUnequip = (slot) => {
    unequipItem(slot);
  };

  return (
    <div className="equipped-items bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 rounded-xl shadow-2xl border-4 border-green-600">
      <div className="equipped-header mb-6 text-center">
        <div className="inline-block bg-gradient-to-r from-green-800 via-green-600 to-green-800 px-8 py-4 rounded-xl border-4 border-green-400 shadow-2xl">
          <h2 className="text-3xl font-bold text-white drop-shadow-lg">⚔️ อุปกรณ์ที่ใส่ ⚔️</h2>
          <p className="text-green-200 mt-2">จัดการอุปกรณ์ของคุณ</p>
        </div>
      </div>

      <div className="equipment-grid grid grid-cols-2 md:grid-cols-4 gap-4">
        {slots.map(slot => {
          const equippedItem = equippedItems[slot.id];
          
          return (
            <div
              key={slot.id}
              className={`equipment-slot bg-gradient-to-br ${slot.bgColor} p-4 rounded-xl border-2 ${slot.borderColor} shadow-lg min-h-[200px] flex flex-col`}
            >
              {/* Slot Header */}
              <div className="slot-header text-center mb-3">
                <div className="text-3xl mb-2">{slot.icon}</div>
                <h3 className="text-white font-bold text-sm">{slot.name}</h3>
              </div>

              {/* Equipped Item or Empty Slot */}
              <div className="slot-content flex-1 flex flex-col justify-center">
                {equippedItem ? (
                  <div className="equipped-item text-center">
                    {/* Item Icon */}
                    <div className="item-icon text-4xl mb-2">
                      {equippedItem.icon}
                    </div>
                    
                    {/* Item Name */}
                    <h4 className="item-name text-white font-bold text-sm mb-2">
                      {equippedItem.name}
                    </h4>
                    
                    {/* Item Stats */}
                    {equippedItem.stats && (
                      <div className="item-stats mb-3">
                        {Object.entries(equippedItem.stats).map(([stat, value]) => (
                          <div key={stat} className="stat text-xs text-green-300 mb-1">
                            {stat === 'attack' ? '⚔️ โจมตี' : 
                             stat === 'defense' ? '🛡️ ป้องกัน' : 
                             stat === 'maxHp' ? '❤️ HP' : 
                             stat === 'maxMp' ? '💙 MP' : stat}: +{value}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Unequip Button */}
                    <button
                      onClick={() => handleUnequip(slot.id)}
                      className="unequip-btn bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded-lg font-bold transition-all hover:scale-105"
                    >
                      ถอด
                    </button>
                  </div>
                ) : (
                  <div className="empty-slot text-center">
                    <div className="empty-icon text-6xl text-gray-500 opacity-50 mb-2">
                      ⭕
                    </div>
                    <p className="text-gray-400 text-xs">ว่าง</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Equipment Summary */}
      <div className="equipment-summary mt-6 bg-black bg-opacity-40 p-4 rounded-lg border border-green-500">
        <h3 className="text-green-400 font-bold mb-3 text-center">📊 สรุปโบนัสจากอุปกรณ์</h3>
        
        {(() => {
          const totalBonus = { attack: 0, defense: 0, maxHp: 0, maxMp: 0 };
          
          Object.values(equippedItems).forEach(item => {
            if (item && item.stats) {
              Object.entries(item.stats).forEach(([stat, value]) => {
                if (totalBonus.hasOwnProperty(stat)) {
                  totalBonus[stat] += value;
                }
              });
            }
          });

          return (
            <div className="bonus-grid grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bonus-item text-center bg-red-900 bg-opacity-50 p-2 rounded border border-red-500">
                <div className="text-red-300 text-xs">⚔️ พลังโจมตี</div>
                <div className="text-white font-bold">+{totalBonus.attack}</div>
              </div>
              <div className="bonus-item text-center bg-blue-900 bg-opacity-50 p-2 rounded border border-blue-500">
                <div className="text-blue-300 text-xs">🛡️ การป้องกัน</div>
                <div className="text-white font-bold">+{totalBonus.defense}</div>
              </div>
              <div className="bonus-item text-center bg-green-900 bg-opacity-50 p-2 rounded border border-green-500">
                <div className="text-green-300 text-xs">❤️ HP สูงสุด</div>
                <div className="text-white font-bold">+{totalBonus.maxHp}</div>
              </div>
              <div className="bonus-item text-center bg-purple-900 bg-opacity-50 p-2 rounded border border-purple-500">
                <div className="text-purple-300 text-xs">💙 MP สูงสุด</div>
                <div className="text-white font-bold">+{totalBonus.maxMp}</div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default EquippedItems; 