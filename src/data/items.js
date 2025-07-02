export const items = [
  // Health Items
  {
    id: 'health_potion',
    name: 'ยารักษา',
    icon: '🧪',
    description: 'ฟื้นฟู HP 50 จุด',
    type: 'consumable',
    effects: [
      { type: 'heal', value: 50, description: 'ฟื้นฟู HP 50 จุด' }
    ],
    value: 25,
    quantity: 0,
    battleOnly: false,
    outOfBattleOnly: false
  },
  {
    id: 'mega_health_potion',
    name: 'ยารักษาขนาดใหญ่',
    icon: '❤️',
    description: 'ฟื้นฟู HP 100 จุด ทันที',
    type: 'consumable',
    effects: [
      { type: 'heal', value: 100, description: 'ฟื้นฟู HP 100 จุด' }
    ],
    value: 100,
    quantity: 0,
    battleOnly: false,
    outOfBattleOnly: false
  },
  
  // Mana Items
  {
    id: 'mana_potion',
    name: 'ยาฟื้นฟูพลังเวทย์',
    icon: '💙',
    description: 'ฟื้นฟู MP 30 จุด',
    type: 'consumable',
    effects: [
      { type: 'restore_mp', value: 30, description: 'ฟื้นฟู MP 30 จุด' }
    ],
    value: 30,
    quantity: 0,
    battleOnly: false,
    outOfBattleOnly: false
  },
  {
    id: 'mega_mana_potion',
    name: 'ยาฟื้น MP ขนาดใหญ่',
    icon: '💙',
    description: 'ฟื้นฟู MP 50 จุด ทันที',
    type: 'consumable',
    effects: [
      { type: 'restore_mp', value: 50, description: 'ฟื้นฟู MP 50 จุด' }
    ],
    value: 80,
    quantity: 0,
    battleOnly: false,
    outOfBattleOnly: false
  },
  
  // Buff Items
  {
    id: 'strength_potion',
    name: 'ยาเพิ่มพลัง',
    icon: '💪',
    description: 'เพิ่มพลังโจมตีถาวร +5',
    type: 'permanent',
    stats: { attack: 5 },
    value: 300,
    quantity: 0,
    battleOnly: false,
    outOfBattleOnly: false
  },
  {
    id: 'vitality_potion',
    name: 'ยาเพิ่มพลังชีวิต',
    icon: '💖',
    description: 'เพิ่ม HP สูงสุดถาวร +25',
    type: 'permanent',
    stats: { maxHp: 25 },
    value: 250,
    quantity: 0,
    battleOnly: false,
    outOfBattleOnly: false
  },
  {
    id: 'defense_potion',
    name: 'ยาเพิ่มป้องกัน',
    icon: '🛡️',
    description: 'เพิ่มป้องกัน 20% เป็นเวลา 5 เทิร์น',
    type: 'consumable',
    effects: [
      { type: 'buff', stat: 'defense', value: 0.2, duration: 5, description: 'เพิ่มป้องกัน 20%' }
    ],
    value: 50,
    quantity: 0,
    battleOnly: true,
    outOfBattleOnly: false
  },
  
  // Damage Items
  {
    id: 'bomb',
    name: 'ระเบิด',
    icon: '💣',
    description: 'สร้างความเสียหาย 80 จุดต่อศัตรู',
    type: 'consumable',
    effects: [
      { type: 'damage', value: 80, description: 'สร้างความเสียหาย 80 จุด' }
    ],
    value: 100,
    quantity: 0,
    battleOnly: true,
    outOfBattleOnly: false
  },
  {
    id: 'poison_vial',
    name: 'ขวดพิษ',
    icon: '🧪',
    description: 'ทำให้ศัตรูเป็นพิษเป็นเวลา 3 เทิร์น',
    type: 'consumable',
    effects: [
      { type: 'debuff', effect: 'poison', duration: 3, description: 'ทำให้เป็นพิษ' }
    ],
    value: 40,
    quantity: 0,
    battleOnly: true,
    outOfBattleOnly: false
  },
  
  // Equipment - Weapons
  {
    id: 'magic_sword',
    name: 'ดาบเวทย์',
    icon: '⚔️',
    description: 'ดาบที่มีพลังเวทย์ เพิ่มพลังโจมตี +30',
    type: 'weapon',
    stats: { attack: 30 },
    value: 500,
    quantity: 0,
    battleOnly: false,
    outOfBattleOnly: false
  },
  {
    id: 'flame_sword',
    name: 'ดาบไฟ',
    icon: '🔥',
    description: 'ดาบที่ลุกเป็นไฟ เพิ่มพลังโจมตี +25',
    type: 'weapon',
    stats: { attack: 25 },
    value: 400,
    quantity: 0,
    battleOnly: false,
    outOfBattleOnly: false
  },
  {
    id: 'steel_sword',
    name: 'ดาบเหล็กกล้า',
    icon: '🗡️',
    description: 'ดาบเหล็กกล้าคุณภาพสูง เพิ่มพลังโจมตี +20',
    type: 'weapon',
    stats: { attack: 20 },
    value: 200,
    quantity: 0,
    battleOnly: false,
    outOfBattleOnly: false
  },

  // Equipment - Armor
  {
    id: 'magic_shield',
    name: 'โล่เวทย์',
    icon: '🛡️',
    description: 'โล่ที่มีพลังเวทย์ป้องกัน เพิ่มการป้องกัน +20',
    type: 'shield',
    stats: { defense: 20 },
    value: 400,
    quantity: 0,
    battleOnly: false,
    outOfBattleOnly: false
  },
  {
    id: 'steel_armor',
    name: 'เกราะเหล็กกล้า',
    icon: '🦺',
    description: 'เกราะเหล็กกล้าหนา เพิ่มการป้องกัน +15 และ HP +50',
    type: 'armor',
    stats: { defense: 15, maxHp: 50 },
    value: 600,
    quantity: 0,
    battleOnly: false,
    outOfBattleOnly: false
  },
  {
    id: 'leather_armor',
    name: 'เกราะหนัง',
    icon: '🥾',
    description: 'เกราะหนังเบา เพิ่มการป้องกัน +10',
    type: 'armor',
    stats: { defense: 10 },
    value: 150,
    quantity: 0,
    battleOnly: false,
    outOfBattleOnly: false
  },

  // Crafting Materials
  {
    id: 'slime_gel',
    name: 'เจลสไลม์',
    icon: '🟢',
    description: 'วัสดุประกอบสำหรับการรังสรรค์',
    type: 'material',
    effects: [],
    value: 5,
    quantity: 0,
    battleOnly: false,
    outOfBattleOnly: false
  },
  {
    id: 'goblin_ear',
    name: 'หูก็อบลิน',
    icon: '👂',
    description: 'วัสดุประกอบจากก็อบลิน',
    type: 'material',
    effects: [],
    value: 8,
    quantity: 0,
    battleOnly: false,
    outOfBattleOnly: false
  },
  {
    id: 'bone_fragment',
    name: 'เศษกระดูก',
    icon: '🦴',
    description: 'เศษกระดูกจากโครงกระดูก',
    type: 'material',
    effects: [],
    value: 10,
    quantity: 0,
    battleOnly: false,
    outOfBattleOnly: false
  },
  {
    id: 'wolf_fang',
    name: 'เขี้ยวหมาป่า',
    icon: '🦷',
    description: 'เขี้ยวจากหมาป่า ใช้ทำอาวุธ',
    type: 'material',
    effects: [],
    value: 15,
    quantity: 0,
    battleOnly: false,
    outOfBattleOnly: false
  },
  {
    id: 'wolf_pelt',
    name: 'หนังหมาป่า',
    icon: '🥾',
    description: 'หนังจากหมาป่า ใช้ทำเกราะ',
    type: 'material',
    effects: [],
    value: 20,
    quantity: 0,
    battleOnly: false,
    outOfBattleOnly: false
  },
  {
    id: 'spider_silk',
    name: 'ใยแมงมุม',
    icon: '🕸️',
    description: 'ใยแมงมุมแข็งแรง ใช้ทำเสื้อผ้า',
    type: 'material',
    effects: [],
    value: 25,
    quantity: 0,
    battleOnly: false,
    outOfBattleOnly: false
  },
  {
    id: 'dragon_scale',
    name: 'เกล็ดมังกร',
    icon: '🔶',
    description: 'เกล็ดมังกรหายาก ใช้ทำเกราะระดับสูง',
    type: 'material',
    effects: [],
    value: 100,
    quantity: 0,
    battleOnly: false,
    outOfBattleOnly: false
  },
  {
    id: 'dragon_tooth',
    name: 'เขี้ยวมังกร',
    icon: '🦷',
    description: 'เขี้ยวมังกรใช้ทำอาวุธระดับสูง',
    type: 'material',
    effects: [],
    value: 150,
    quantity: 0,
    battleOnly: false,
    outOfBattleOnly: false
  },
  
  // Equipment
  {
    id: 'rusty_dagger',
    name: 'มีดสั้นเก่า',
    icon: '🗡️',
    description: 'มีดสั้นเก่าๆ เพิ่มพลังโจมตี +5',
    type: 'weapon',
    effects: [
      { type: 'stat_boost', stat: 'attack', value: 5, description: 'เพิ่มพลังโจมตี 5 จุด' }
    ],
    value: 50,
    quantity: 0,
    battleOnly: false,
    outOfBattleOnly: false
  },
  {
    id: 'iron_sword',
    name: 'ดาบเหล็ก',
    icon: '⚔️',
    description: 'ดาบเหล็กคุณภาพดี เพิ่มพลังโจมตี +15',
    type: 'weapon',
    effects: [
      { type: 'stat_boost', stat: 'attack', value: 15, description: 'เพิ่มพลังโจมตี 15 จุด' }
    ],
    value: 200,
    quantity: 0,
    battleOnly: false,
    outOfBattleOnly: false
  },
  {
    id: 'big_club',
    name: 'กระบองใหญ่',
    icon: '🏏',
    description: 'กระบองหนักๆ เพิ่มพลังโจมตี +20',
    type: 'weapon',
    effects: [
      { type: 'stat_boost', stat: 'attack', value: 20, description: 'เพิ่มพลังโจมตี 20 จุด' }
    ],
    value: 300,
    quantity: 0,
    battleOnly: false,
    outOfBattleOnly: false
  },
  
  // Special Items
  {
    id: 'ancient_coin',
    name: 'เหรียญโบราณ',
    icon: '🪙',
    description: 'เหรียญโบราณมีค่า ขายได้ราคาดี',
    type: 'treasure',
    effects: [],
    value: 100,
    quantity: 0,
    battleOnly: false,
    outOfBattleOnly: false
  },
  {
    id: 'magic_gem',
    name: 'อัญมณีเวทย์',
    icon: '💎',
    description: 'อัญมณีที่มีพลังเวทย์ ใช้ร่ายเวทย์ขั้นสูง',
    type: 'treasure',
    effects: [],
    value: 500,
    quantity: 0,
    battleOnly: false,
    outOfBattleOnly: false
  },
  {
    id: 'orc_tusk',
    name: 'งาอ็อก',
    icon: '🦷',
    description: 'งาจากอ็อก ใช้ประดับหรือขาย',
    type: 'material',
    effects: [],
    value: 30,
    quantity: 0,
    battleOnly: false,
    outOfBattleOnly: false
  },
  {
    id: 'troll_hide',
    name: 'หนังโทรลล์',
    icon: '🥾',
    description: 'หนังโทรลล์หนาใช้ทำเกราะ',
    type: 'material',
    effects: [],
    value: 60,
    quantity: 0,
    battleOnly: false,
    outOfBattleOnly: false
  },
  // Mage items
  {
    id: 'spell_book',
    name: 'หนังสือเวทย์',
    icon: '📖',
    description: 'หนังสือเวทย์โบราณ เพิ่มพลังเวทย์',
    type: 'treasure',
    effects: [],
    value: 300,
    quantity: 0,
    battleOnly: false,
    outOfBattleOnly: false
  },
  {
    id: 'mage_staff',
    name: 'ไม้กายสิทธิ์',
    icon: '🪄',
    description: 'ไม้กายสิทธิ์ของเวทมนตร์ เพิ่มพลังเวทย์ +25',
    type: 'weapon',
    effects: [
      { type: 'stat_boost', stat: 'attack', value: 25, description: 'เพิ่มพลังโจมตี 25 จุด' }
    ],
    value: 400,
    quantity: 0,
    battleOnly: false,
    outOfBattleOnly: false
  }
];

// Helper functions
export const getItemById = (id) => {
  return items.find(item => item.id === id);
};

export const getItemsByType = (type) => {
  return items.filter(item => item.type === type);
};

export const createItemInstance = (itemId, quantity = 1) => {
  const baseItem = getItemById(itemId);
  if (!baseItem) return null;
  
  return {
    ...baseItem,
    quantity
  };
};

// Item categories for easier management
export const itemCategories = {
  consumables: getItemsByType('consumable'),
  materials: getItemsByType('material'),
  weapons: getItemsByType('weapon'),
  armor: getItemsByType('armor'),
  treasures: getItemsByType('treasure')
};

// Default starting inventory
export const defaultInventory = [
  createItemInstance('health_potion', 3),
  createItemInstance('mana_potion', 2)
].filter(Boolean);

export default items; 