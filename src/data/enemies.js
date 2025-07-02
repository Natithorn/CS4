export const enemies = [
  {
    id: 'slime',
    name: 'สไลม์',
    sprite: '🟢',
    level: 1,
    maxHp: 30,
    currentHp: 30,
    attack: 8,
    defense: 2,
    exp: 15,
    gold: 10,
    skills: ['bounce'],
    dropItems: [
      { itemId: 'health_potion', chance: 0.3 },
      { itemId: 'slime_gel', chance: 0.5 }
    ],
    statusEffects: []
  },
  {
    id: 'goblin',
    name: 'ก็อบลิน',
    sprite: 'Goblin.png',
    level: 2,
    maxHp: 45,
    currentHp: 45,
    attack: 12,
    defense: 4,
    exp: 25,
    gold: 18,
    skills: ['stab', 'throw_rock'],
    dropItems: [
      { itemId: 'health_potion', chance: 0.2 },
      { itemId: 'rusty_dagger', chance: 0.1 },
      { itemId: 'goblin_ear', chance: 0.4 }
    ],
    statusEffects: []
  },
  {
    id: 'skeleton',
    name: 'โครงกระดูก',
    sprite: '💀',
    level: 3,
    maxHp: 60,
    currentHp: 60,
    attack: 15,
    defense: 6,
    exp: 35,
    gold: 25,
    skills: ['bone_throw', 'rattle'],
    dropItems: [
      { itemId: 'mana_potion', chance: 0.3 },
      { itemId: 'bone_fragment', chance: 0.6 },
      { itemId: 'ancient_coin', chance: 0.1 }
    ],
    statusEffects: []
  },
  {
    id: 'orc',
    name: 'อ็อก',
    sprite: 'orc.png',
    level: 4,
    maxHp: 80,
    currentHp: 80,
    attack: 20,
    defense: 8,
    exp: 50,
    gold: 35,
    skills: ['smash', 'battle_cry'],
    dropItems: [
      { itemId: 'health_potion', chance: 0.4 },
      { itemId: 'iron_sword', chance: 0.15 },
      { itemId: 'orc_tusk', chance: 0.3 }
    ],
    statusEffects: []
  },
  {
    id: 'wolf',
    name: 'หมาป่า',
    sprite: '🐺',
    level: 3,
    maxHp: 55,
    currentHp: 55,
    attack: 18,
    defense: 5,
    exp: 30,
    gold: 20,
    skills: ['bite', 'howl'],
    dropItems: [
      { itemId: 'wolf_fang', chance: 0.4 },
      { itemId: 'wolf_pelt', chance: 0.3 }
    ],
    statusEffects: []
  },
  {
    id: 'spider',
    name: 'แมงมุมยักษ์',
    sprite: '🕷️',
    level: 5,
    maxHp: 70,
    currentHp: 70,
    attack: 16,
    defense: 3,
    exp: 45,
    gold: 30,
    skills: ['poison_bite', 'web_trap'],
    dropItems: [
      { itemId: 'spider_silk', chance: 0.5 },
      { itemId: 'poison_vial', chance: 0.2 },
      { itemId: 'mana_potion', chance: 0.3 }
    ],
    statusEffects: []
  },
  {
    id: 'troll',
    name: 'โทรลล์',
    sprite: '👹',
    level: 6,
    maxHp: 120,
    currentHp: 120,
    attack: 25,
    defense: 12,
    exp: 75,
    gold: 50,
    skills: ['club_smash', 'regenerate'],
    dropItems: [
      { itemId: 'troll_hide', chance: 0.4 },
      { itemId: 'big_club', chance: 0.2 },
      { itemId: 'health_potion', chance: 0.6 }
    ],
    statusEffects: []
  },
  {
    id: 'dragon',
    name: 'มังกรน้อย',
    sprite: '🐲',
    level: 10,
    maxHp: 200,
    currentHp: 200,
    attack: 35,
    defense: 15,
    exp: 150,
    gold: 100,
    skills: ['fire_breath', 'tail_whip', 'fly'],
    dropItems: [
      { itemId: 'dragon_scale', chance: 0.8 },
      { itemId: 'dragon_tooth', chance: 0.3 },
      { itemId: 'magic_gem', chance: 0.1 }
    ],
    statusEffects: []
  },
  {
    id: 'mage',
    name: 'เวทมนตร์',
    sprite: 'Mage.png',
    level: 5,
    maxHp: 80,
    currentHp: 80,
    attack: 25,
    defense: 8,
    speed: 20,
    exp: 200,
    gold: 100,
    skills: ['fireball', 'magic_shield', 'teleport'],
    dropItems: [
      { itemId: 'mana_potion', chance: 0.7 },
      { itemId: 'magic_gem', chance: 0.3 },
      { itemId: 'spell_book', chance: 0.1 }
    ],
    statusEffects: [],
    magicResistance: 0.3 // ต้านทานเวทย์ 30%
  }
];

// Enemy skills data
export const enemySkills = {
  bounce: {
    id: 'bounce',
    name: 'เด้ง',
    damage: 6,
    mpCost: 0,
    effects: [],
    description: 'เด้งใส่ศัตรู'
  },
  stab: {
    id: 'stab',
    name: 'แทง',
    damage: 10,
    mpCost: 0,
    effects: [],
    description: 'แทงด้วยมีดสั้น'
  },
  throw_rock: {
    id: 'throw_rock',
    name: 'ขว้างหิน',
    damage: 8,
    mpCost: 0,
    effects: [],
    description: 'ขว้างหินใส่ศัตรู'
  },
  bone_throw: {
    id: 'bone_throw',
    name: 'ขว้างกระดูก',
    damage: 12,
    mpCost: 0,
    effects: [],
    description: 'ขว้างกระดูกแหลมใส่ศัตรู'
  },
  rattle: {
    id: 'rattle',
    name: 'เสียงกระดูกกระทบ',
    damage: 0,
    mpCost: 0,
    effects: ['fear'],
    description: 'ทำให้ศัตรูกลัว'
  },
  smash: {
    id: 'smash',
    name: 'ทุบ',
    damage: 18,
    mpCost: 0,
    effects: [],
    description: 'ทุบด้วยกำลัง'
  },
  battle_cry: {
    id: 'battle_cry',
    name: 'เสียงโห่ร้องรบ',
    damage: 0,
    mpCost: 0,
    effects: ['attack_up'],
    description: 'เพิ่มพลังโจมตีของตัวเอง'
  },
  bite: {
    id: 'bite',
    name: 'กัด',
    damage: 14,
    mpCost: 0,
    effects: [],
    description: 'กัดด้วยเขี้ยวแหลม'
  },
  howl: {
    id: 'howl',
    name: 'หอน',
    damage: 0,
    mpCost: 0,
    effects: ['defense_down'],
    description: 'ทำให้ศัตรูป้องกันลดลง'
  },
  poison_bite: {
    id: 'poison_bite',
    name: 'กัดพิษ',
    damage: 12,
    mpCost: 0,
    effects: ['poison'],
    description: 'กัดและทำให้เป็นพิษ'
  },
  web_trap: {
    id: 'web_trap',
    name: 'กับดักใยแมงมุม',
    damage: 0,
    mpCost: 0,
    effects: ['paralysis'],
    description: 'ทำให้ศัตรูเคลื่อนไหวไม่ได้'
  },
  club_smash: {
    id: 'club_smash',
    name: 'ทุบด้วยกระบอง',
    damage: 22,
    mpCost: 0,
    effects: [],
    description: 'ทุบด้วยกระบองใหญ่'
  },
  regenerate: {
    id: 'regenerate',
    name: 'ฟื้นฟู',
    damage: 0,
    heal: 15,
    mpCost: 0,
    effects: [],
    description: 'ฟื้นฟูพลังชีวิต'
  },
  fire_breath: {
    id: 'fire_breath',
    name: 'ลมหายใจไฟ',
    damage: 30,
    mpCost: 0,
    effects: ['burn'],
    description: 'พ่นไฟจากปาก'
  },
  tail_whip: {
    id: 'tail_whip',
    name: 'เหวี่ยงหาง',
    damage: 20,
    mpCost: 0,
    effects: [],
    description: 'เหวี่ยงหางใส่ศัตรู'
  },
  fly: {
    id: 'fly',
    name: 'บิน',
    damage: 0,
    mpCost: 0,
    effects: ['dodge_up'],
    description: 'บินขึ้นเพื่อหลบหลีก'
  },
  fireball: {
    id: 'fireball',
    name: 'ลูกไฟ',
    damage: 30,
    mpCost: 0,
    effects: ['burn'],
    description: 'ยิงลูกไฟใส่ศัตรู'
  },
  magic_shield: {
    id: 'magic_shield',
    name: 'โล่เวทย์',
    damage: 0,
    mpCost: 0,
    effects: ['defense_up'],
    description: 'สร้างโล่เวทย์เพื่อป้องกัน'
  },
  teleport: {
    id: 'teleport',
    name: 'เทเลพอร์ต',
    damage: 0,
    mpCost: 0,
    effects: ['dodge_up'],
    description: 'เทเลพอร์ตเพื่อหลบหลีก'
  }
};

// Function to get random enemy based on area/level
export const getRandomEnemy = (playerLevel = 1) => {
  const availableEnemies = enemies.filter(enemy => 
    enemy.level <= playerLevel + 2 && enemy.level >= Math.max(1, playerLevel - 1)
  );
  
  if (availableEnemies.length === 0) {
    return { ...enemies[0] }; // Return slime as default
  }
  
  const randomIndex = Math.floor(Math.random() * availableEnemies.length);
  const selectedEnemy = { ...availableEnemies[randomIndex] };
  
  // Reset HP to max for new encounter
  selectedEnemy.currentHp = selectedEnemy.maxHp;
  selectedEnemy.statusEffects = [];
  
  return selectedEnemy;
};

// Function to get enemy by ID
export const getEnemyById = (id) => {
  const enemy = enemies.find(e => e.id === id);
  if (!enemy) return null;
  
  const enemyCopy = { ...enemy };
  enemyCopy.currentHp = enemyCopy.maxHp;
  enemyCopy.statusEffects = [];
  
  return enemyCopy;
};

export default enemies; 