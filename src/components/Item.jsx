import React from 'react';
import { useGameStore } from '../store/gameStore';
import ImageComponent, { getImagePath } from './ImageComponent';

const Item = ({ item, onUse, isInBattle = false }) => {
  const { useItem, equipItem } = useGameStore();

  const handleUseItem = () => {
    if (onUse) {
      onUse(item);
    } else {
      useItem(item.id);
    }
  };

  const handleEquipItem = () => {
    equipItem(item);
  };

  const isEquipment = () => {
    return item.type === 'weapon' || item.type === 'armor' || item.type === 'shield';
  };

  const isPermanentPotion = () => {
    return item.type === 'permanent';
  };

  const canUseItem = () => {
    if (!isInBattle && item.battleOnly) return false;
    if (isInBattle && item.outOfBattleOnly) return false;
    return item.quantity > 0;
  };

  return (
    <div className="item bg-white border border-gray-300 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="item-header flex items-center justify-between mb-2">
        <ImageComponent
          src={getImagePath('items', `${item.id.replace(/_/g, '-')}.png`)}
          fallback={item.icon}
          alt={item.name}
          width={40}
          height={40}
          className="item-icon"
        />
        <div className="item-quantity bg-gray-100 px-2 py-1 rounded text-sm">
          x{item.quantity}
        </div>
      </div>
      
      <div className="item-info">
        <h3 className="item-name font-bold text-lg mb-1">{item.name}</h3>
        <p className="item-description text-sm text-gray-600 mb-2">{item.description}</p>
        
        {/* Item Effects */}
        {item.effects && (
          <div className="item-effects mb-2">
            {item.effects.map((effect, index) => (
              <div key={index} className="effect text-xs text-green-600">
                • {effect.description}
              </div>
            ))}
          </div>
        )}

        {/* Item Stats */}
        {item.stats && (
          <div className="item-stats mb-2">
            {Object.entries(item.stats).map(([stat, value]) => (
              <div key={stat} className="stat text-xs text-blue-600">
                • {stat === 'attack' ? 'พลังโจมตี' : 
                   stat === 'defense' ? 'การป้องกัน' : 
                   stat === 'maxHp' ? 'HP สูงสุด' : 
                   stat === 'maxMp' ? 'MP สูงสุด' : stat}: +{value}
              </div>
            ))}
          </div>
        )}
        
        {/* Item Value */}
        {item.value && (
          <div className="item-value text-xs text-yellow-600 mb-2">
            มูลค่า: {item.value} เหรียญ
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="action-buttons space-y-2">
          {isEquipment() ? (
            <button
              onClick={handleEquipItem}
              disabled={item.quantity <= 0}
              className={`equip-button w-full py-2 px-3 rounded text-sm font-medium transition-colors ${
                item.quantity > 0
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {item.quantity <= 0 ? 'หมด' : 'ใส่'}
            </button>
          ) : isPermanentPotion() ? (
            <button
              onClick={handleUseItem}
              disabled={item.quantity <= 0}
              className={`use-button w-full py-2 px-3 rounded text-sm font-medium transition-colors ${
                item.quantity > 0
                  ? 'bg-purple-500 hover:bg-purple-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {item.quantity <= 0 ? 'หมด' : 'ดื่ม'}
            </button>
          ) : (
            <button
              onClick={handleUseItem}
              disabled={!canUseItem()}
              className={`use-button w-full py-2 px-3 rounded text-sm font-medium transition-colors ${
                canUseItem()
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {item.quantity <= 0 ? 'หมด' : 'ใช้'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Component for displaying inventory
export const ItemList = ({ items, isInBattle = false, onItemUse }) => {
  if (!items || items.length === 0) {
    return (
      <div className="item-list-empty text-center text-gray-500 py-8">
        ไม่มีไอเท็ม
      </div>
    );
  }

  return (
    <div className="item-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <Item 
          key={item.id} 
          item={item} 
          isInBattle={isInBattle}
          onUse={onItemUse}
        />
      ))}
    </div>
  );
};

export default Item; 