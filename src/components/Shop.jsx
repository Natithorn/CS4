import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import ImageComponent, { getImagePath } from './ImageComponent';

const Shop = () => {
  const { hero, gold, buyItem, equipItem, inventory } = useGameStore();
  const [selectedCategory, setSelectedCategory] = useState('weapons');

  const shopItems = {
    weapons: [
      {
        id: 'magic_sword',
        name: 'ดาบเวทย์',
        icon: '⚔️',
        description: 'ดาบที่มีพลังเวทย์ เพิ่มพลังโจมตี +30',
        price: 500,
        stats: { attack: 30 },
        type: 'weapon',
        rarity: 'rare'
      },
      {
        id: 'flame_sword',
        name: 'ดาบไฟ',
        icon: '🔥',
        description: 'ดาบที่ลุกเป็นไฟ เพิ่มพลังโจมตี +25',
        price: 400,
        stats: { attack: 25 },
        type: 'weapon',
        rarity: 'uncommon'
      },
      {
        id: 'steel_sword',
        name: 'ดาบเหล็กกล้า',
        icon: '🗡️',
        description: 'ดาบเหล็กกล้าคุณภาพสูง เพิ่มพลังโจมตี +20',
        price: 200,
        stats: { attack: 20 },
        type: 'weapon',
        rarity: 'common'
      }
    ],
    armor: [
      {
        id: 'magic_shield',
        name: 'โล่เวทย์',
        icon: '🛡️',
        description: 'โล่ที่มีพลังเวทย์ป้องกัน เพิ่มการป้องกัน +20',
        price: 400,
        stats: { defense: 20 },
        type: 'shield',
        rarity: 'rare'
      },
      {
        id: 'steel_armor',
        name: 'เกราะเหล็กกล้า',
        icon: '🦺',
        description: 'เกราะเหล็กกล้าหนา เพิ่มการป้องกัน +15 และ HP +50',
        price: 600,
        stats: { defense: 15, maxHp: 50 },
        type: 'armor',
        rarity: 'rare'
      },
      {
        id: 'leather_armor',
        name: 'เกราะหนัง',
        icon: '🥾',
        description: 'เกราะหนังเบา เพิ่มการป้องกัน +10',
        price: 150,
        stats: { defense: 10 },
        type: 'armor',
        rarity: 'common'
      }
    ],
    potions: [
      {
        id: 'mega_health_potion',
        name: 'ยารักษาขนาดใหญ่',
        icon: '❤️',
        description: 'ฟื้นฟู HP 100 จุด ทันที',
        price: 100,
        effects: [{ type: 'heal', value: 100 }],
        type: 'consumable',
        rarity: 'common'
      },
      {
        id: 'mega_mana_potion',
        name: 'ยาฟื้น MP ขนาดใหญ่',
        icon: '💙',
        description: 'ฟื้นฟู MP 50 จุด ทันที',
        price: 80,
        effects: [{ type: 'restore_mp', value: 50 }],
        type: 'consumable',
        rarity: 'common'
      },
      {
        id: 'strength_potion',
        name: 'ยาเพิ่มพลัง',
        icon: '💪',
        description: 'เพิ่มพลังโจมตีถาวร +5',
        price: 300,
        stats: { attack: 5 },
        type: 'permanent',
        rarity: 'uncommon'
      },
      {
        id: 'vitality_potion',
        name: 'ยาเพิ่มพลังชีวิต',
        icon: '💖',
        description: 'เพิ่ม HP สูงสุดถาวร +25',
        price: 250,
        stats: { maxHp: 25 },
        type: 'permanent',
        rarity: 'uncommon'
      }
    ]
  };

  const categories = [
    { id: 'weapons', name: 'อาวุธ', icon: '⚔️' },
    { id: 'armor', name: 'เกราะ', icon: '🛡️' },
    { id: 'potions', name: 'ยา', icon: '🧪' }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'text-gray-400 border-gray-400';
      case 'uncommon': return 'text-green-400 border-green-400';
      case 'rare': return 'text-blue-400 border-blue-400';
      case 'epic': return 'text-purple-400 border-purple-400';
      case 'legendary': return 'text-yellow-400 border-yellow-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const handlePurchase = (item) => {
    if (hero.gold >= item.price) {
      buyItem(item);
    }
  };

  const canAfford = (item) => hero.gold >= item.price;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 via-slate-700 to-slate-800 p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">
          🏪 ร้านค้าผจญภัย
        </h1>
        <div className="flex justify-center items-center space-x-6 text-xl">
          <div className="bg-yellow-600 bg-opacity-20 px-4 py-2 rounded-lg border border-yellow-400">
            <span className="text-yellow-400">💰 เหรียญ: {hero.gold}</span>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-slate-700 rounded-lg p-2 flex space-x-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                selectedCategory === category.id
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-slate-600 text-gray-300 hover:bg-slate-500'
              }`}
            >
              <span className="text-2xl mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shopItems[selectedCategory].map(item => (
            <div
              key={item.id}
              className={`bg-slate-700 rounded-lg p-6 border-2 ${getRarityColor(item.rarity)} transition-all hover:scale-105 hover:shadow-xl`}
            >
              {/* Item Icon */}
              <div className="text-center mb-4">
                <div className="text-6xl mb-2">{item.icon}</div>
                <h3 className={`text-xl font-bold ${getRarityColor(item.rarity).split(' ')[0]}`}>
                  {item.name}
                </h3>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm mb-4 text-center">
                {item.description}
              </p>

              {/* Stats */}
              {item.stats && (
                <div className="mb-4">
                  <div className="text-green-400 text-sm font-bold mb-2">สถานะที่เพิ่ม:</div>
                  <div className="space-y-1">
                    {Object.entries(item.stats).map(([stat, value]) => (
                      <div key={stat} className="text-xs text-gray-300 flex justify-between">
                        <span>{stat === 'attack' ? 'พลังโจมตี' : 
                              stat === 'defense' ? 'การป้องกัน' : 
                              stat === 'maxHp' ? 'HP สูงสุด' : 
                              stat === 'maxMp' ? 'MP สูงสุด' : stat}:</span>
                        <span className="text-green-400">+{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Price and Buy Button */}
              <div className="flex items-center justify-between">
                <div className="text-yellow-400 font-bold">
                  💰 {item.price} เหรียญ
                </div>
                <button
                  onClick={() => handlePurchase(item)}
                  disabled={!canAfford(item)}
                  className={`px-4 py-2 rounded-lg font-bold transition-all ${
                    canAfford(item)
                      ? 'bg-green-600 hover:bg-green-700 text-white hover:scale-105'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {canAfford(item) ? 'ซื้อ' : 'เงินไม่พอ'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Owned Items */}
      <div className="max-w-6xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-white mb-6">🎒 ไอเท็มที่มี</h2>
        <div className="bg-slate-700 rounded-lg p-6">
          {inventory.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {inventory.map((item, index) => (
                <div key={index} className="bg-slate-600 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className="text-xs text-white font-bold">{item.name}</div>
                  <div className="text-xs text-gray-400">x{item.quantity}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400">ยังไม่มีไอเท็ม</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop; 