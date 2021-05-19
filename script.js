//region Libraries
let container = document.getElementById("container");
let bottomRow = document.getElementById("bottomRow");
let topRow = document.getElementById("topRow");
let bottomRowBattle = document.getElementById("bottomRowBattle");
let topRowBattle = document.getElementById("topRowBattle");
let confirmChoice = document.getElementById("confirmChoice");
let playerPokemonImg = document.getElementById("playerPokemonImg");
let oppPokemonImg = document.getElementById("oppPokemonImg");
let playerPokemon1 = null;
let oppPokemon1 = null;
let playerPokemon2 = null;
let oppPokemon2 = null;
let playerPokemon3 = null;
let oppPokemon3 = null;
let currentPlayerPokemon = null;
let currentOppPokemon = null;
let pkmnSound;
let music_files = [
  "Music/music.mp3",
  "Music/music2.mp3",
  "Music/music3.mp3",
  "Music/music4.mp3"
];
let moveNames = [];
let oppMoveNames = [];
let lowerMoveNames = [];
let oppLowerMoveNames = [];
let oppMove = null;
let oppMoveName;
let button1 = document.getElementById('button1');
let button2 = document.getElementById('button2');
let button3 = document.getElementById('button3');
let button4 = document.getElementById('button4');
let buttonGroup1 = [button1, button2, button3, button4]
let buttonsBattleTable = document.getElementById('buttonsBattleTable');
let buttonPress = new Audio('Sounds/SFX/Ding.mp3')
let buttons = document.getElementsByClassName('buttons');
let moveSound;
let damage = null;
let damageSound = new Audio('Sounds/SFX/Hit.mp3');
let playerHpBar = document.getElementById("playerHP");
let oppHpBar = document.getElementById("oppHP");
let oppHpBarMax;
let hpMaxWidth = 110;
let oneHPwid;
let oppCorrectHP = true;
let oppHpBarInt;
let playerHpBarMax;
let playerCorrectHP = true;
let playerHpBarInt;
let oppHpText = document.getElementById("oppHpText")
let playerHpText = document.getElementById("playerHpText")
let exp = Math.ceil(Math.random() * 15) + 10
let faintSound = new Audio("Sounds/SFX/Faint.mp3")
let victory = new Audio("Music/Victory.mp3")
victory.volume = 0.2;
let battleSection = document.getElementById("BattleSection")
let pokeNum = 1;
let currentPlayerPokemonCry;
let playerParty = [];
let oppParty = [];
let switchSound = new Audio("Sounds/SFX/Switch.mp3")
let oppCry;
let typeChart = {
  "Normal": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0, 1, 1, 0.5, 1],
  "Fire": [1, 0.5, 0.5, 1, 2, 2, 1, 1, 1, 1, 1, 2, 0.5, 1, 0.5, 1, 2, 1],
  "Water": [1, 2, 0.5, 1, 0.5, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0.5, 1, 1, 1],
  "Electric": [1, 1, 2, 0.5, 0.5, 1, 1, 1, 0, 2, 1, 1, 1, 1, 0.5, 1, 1, 1],
  "Grass": [1, 0.5, 2, 1, 0.5, 1, 1, 0.5, 2, 0.5, 1, 0.5, 2, 1, 0.5, 1, 0.5, 1],
  "Ice": [1, 0.5, 0.5, 1, 2, 0.5, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 0.5, 1],
  "Fighting": [2, 1, 1, 1, 1, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 2, 0, 1, 2, 2, 0.5],
  "Poison": [1, 1, 1, 1, 2, 1, 1, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 1, 1, 0, 2],
  "Ground": [1, 2, 1, 2, 0.5, 1, 1, 2, 1, 0, 1, 0.5, 2, 1, 1, 1, 2, 1],
  "Flying": [1, 1, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 0.5, 1],
  "Psychic": [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0.5, 1, 1, 1, 1, 0, 0.5, 1],
  "Bug": [1, 0.5, 1, 1, 2, 1, 0.5, 0.5, 1, 0.5, 2, 1, 1, 0.5, 1, 2, 0.5, 0.5],
  "Rock": [1, 2, 1, 1, 1, 2, 0.5, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 0.5, 1],
  "Ghost": [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 0.5, 1],
  "Dragon": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0.5, 0],
  "Dark": [1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 0.5, 0.5],
  "Steel": [1, 0.5, 0.5, 0.5, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0.5, 1],
  "Fairy": [1, 0.5, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 1, 1, 2, 2, 0.5, 1, 1]
};
let superEffectiveSound = new Audio("Sounds/SFX/SupEff.mp3")
let notEffectiveSound = new Audio("Sounds/SFX/bruh.mp3")

//Play click on every button press
document.querySelectorAll('.buttons').forEach(item => {
  item.addEventListener('click', event => {
    buttonPress.play();
  })
})

let randomSong = new Audio(music_files[Math.floor(Math.random() * music_files.length)])

function rollText(destination, message, speed, callback) {
  document.getElementById(destination).innerHTML = ("");
  var i = 0;
  var interval = setInterval(function () {
    document.getElementById(destination).innerHTML += message.charAt(i);
    i++;
    if (i > message.length) {
      clearInterval(interval);
      if (callback !== undefined) {
        callback();
      }
    }
  }, speed);
}

const ElementalTypes = Object.freeze({ "Normal": 0, "Fire": 1, "Water": 2, "Electric": 3, "Grass": 4, "Ice": 5, "Fighting": 6, "Poison": 7, "Ground": 8, "Flying": 9, "Psychic": 10, "Bug": 11, "Rock": 12, "Ghost": 13, "Dragon": 14, "Dark": 15, "Steel": 16, "Fairy": 17 });
//Create classes

class Pokemon {
  constructor(name, type, moves, hp, fainted) {
    var lowerName = name.toLowerCase();
    this.name = name;
    this.type = type;
    this.moves = moves;
    this.hp = hp;
    this.maxhp = hp;
    this.plrSprite = `Images/Player/${lowerName}_back.png`;
    this.oppSprite = `Images/Opponent/${lowerName}.png`;
    this.cry = `Sounds/Pokemon/${lowerName}.mp3`;
    this.fainted = false;
  }
}

class Move {
  constructor(damage, pp, type, name) {
    this.damage = damage;
    this.pp = pp;
    this.maxpp = pp;
    this.type = type;
    this.name = name;
    this.sound = `Sounds/Moves/${name}.mp3`;
  }
}

// Moves list 
let fireFang = new Move(45, 15, ElementalTypes.Fire, 'Fire Fang')
let quickAttack = new Move(25, 20, ElementalTypes.Normal, 'Quick Attack')
let bite = new Move(45, 20, ElementalTypes.Dark, 'Bite')
let ember = new Move(30, 30, ElementalTypes.Fire, 'Ember')
let fireBlast = new Move(110, 5, ElementalTypes.Fire, 'Fire Blast')
let thunderFang = new Move(45, 15, ElementalTypes.Electric, 'Thunder Fang')
let swift = new Move(40, 20, ElementalTypes.Normal, 'Swift');
let thunder = new Move(110, 10, ElementalTypes.Electric, 'Thunder')
let razorLeaf = new Move(30, 25, ElementalTypes.Grass, 'Razor Leaf');
let synthesis = new Move(0, 5, ElementalTypes.Grass, 'Synthesis')
let solarBeam = new Move(110, 10, ElementalTypes.Grass, 'Solar Beam')
let hydroPump = new Move(110, 5, ElementalTypes.Water, 'Hydro Pump')
let waterPulse = new Move(30, 20, ElementalTypes.Water, 'Water Pulse')
let takeDown = new Move(35, 15, ElementalTypes.Normal, 'Take Down')
let moonblast = new Move(95, 15, ElementalTypes.Fairy, 'Moonblast')
let moonlight = new Move(0, 5, ElementalTypes.Fairy, 'Moonlight')
let psychic = new Move(45, 10, ElementalTypes.Psychic, "Psychic")
let iceShard = new Move(30, 15, ElementalTypes.Ice, "Ice Shard")
let blizzard = new Move(110, 5, ElementalTypes.Ice, "Blizzard")
let doubleKick = new Move(50, 15, ElementalTypes.Fighting, "Double Kick")
let pinMissle = new Move(35, 15, ElementalTypes.Bug, "Pin Missle")
let waterGun = new Move(25, 30, ElementalTypes.Water, "Water Gun")
let auroraBeam = new Move(40, 15, ElementalTypes.Ice, "Aurora Beam")
let assurance = new Move(30, 15, ElementalTypes.Dark, "Assurance")
let darkPulse = new Move(80, 15, ElementalTypes.Dark, "Dark Pulse")
let psybeam = new Move(30, 15, ElementalTypes.Psychic, "Psybeam")
let magicalLeaf = new Move(40, 10, ElementalTypes.Grass, "Magical Leaf")
let fairyWind = new Move(40, 30, ElementalTypes.Fairy, "Fairy Wind")
let disarmingVoice = new Move(35, 15, ElementalTypes.Fairy, "Disarming Voice")
let megaDrain = new Move(40, 15, ElementalTypes.Grass, "Mega Drain")
let iceFang = new Move(35, 15, ElementalTypes.Ice, "Ice Fang")
let tackle = new Move(25, 30, ElementalTypes.Normal, "Tackle")
let feintAttack = new Move(25, 20, ElementalTypes.Dark, "Feint Attack")
let dreamEater = new Move(100, 15, ElementalTypes.Psychic, "Dream Eater")
let doubleEdge = new Move(120, 15, ElementalTypes.Normal, "Double Edge")

// Assign moves to each pokemon
let eeveeMoves = {
  "Tackle": tackle,
  "Swift": swift,
  "Double Edge": doubleEdge,
  "Quick Attack": quickAttack
};
let flareonMoves = {
  "Fire Fang": fireFang,
  "Quick Attack": quickAttack,
  "Fire Blast": fireBlast,
  "Ember": ember
};

let jolteonMoves = {
  "Thunder Fang": thunderFang,
  "Double Kick": doubleKick,
  "Pin Missile": pinMissle,
  "Thunder": thunder
};

let vaporeonMoves = {
  "Hydro Pump": hydroPump,
  "Aurora Beam": auroraBeam,
  "Bite": bite,
  "Water Pulse": waterPulse
};

let leafeonMoves = {
  "Magical Leaf": magicalLeaf,
  "Swift": swift,
  "Mega Drain": megaDrain,
  "Solar Beam": solarBeam
};

let sylveonMoves = {
  "Fairy Wind": fairyWind,
  "Swift": swift,
  "Disarming Voice": disarmingVoice,
  "Moonblast": moonblast
};

let umbreonMoves = {
  "Quick Attack": quickAttack,
  "Assurance": assurance,
  "Dark Pulse": darkPulse,
  "Feint Attack": feintAttack
};

let espeonMoves = {
  "Dream Eater": dreamEater,
  "Quick Attack": quickAttack,
  "Psybeam": psybeam,
  "Psychic": psychic
};

let glaceonMoves = {
  "Ice Shard": iceShard,
  "Ice Fang": iceFang,
  "Bite": bite,
  "Blizzard": blizzard
};

var eevee = new Pokemon('Eevee', ElementalTypes.Normal, eeveeMoves, 160);
var flareon = new Pokemon('Flareon', ElementalTypes.Fire, flareonMoves, 180);
var jolteon = new Pokemon('Jolteon', ElementalTypes.Electric, jolteonMoves, 180);
var vaporeon = new Pokemon('Vaporeon', ElementalTypes.Water, vaporeonMoves, 300);
var leafeon = new Pokemon('Leafeon', ElementalTypes.Grass, leafeonMoves, 180);
var sylveon = new Pokemon('Sylveon', ElementalTypes.Fairy, sylveonMoves, 240);
var umbreon = new Pokemon('Umbreon', ElementalTypes.Dark, umbreonMoves, 240);
var espeon = new Pokemon('Espeon', ElementalTypes.Psychic, espeonMoves, 180);
var glaceon = new Pokemon('Glaceon', ElementalTypes.Ice, glaceonMoves, 180);

let pokemonList = [eevee, flareon, jolteon, vaporeon, leafeon, sylveon, umbreon, espeon, glaceon];
//endregion

//region Initial Selection

//Setup Opp Pokemon
rollText("topRow", "Select your 1st pokemon!", 25)

oppPokemon1 = Object.create(oppPokeRandom());
oppPokemon1.hp *= 0.8;
oppPokemon1.maxhp *= 0.8;
oppPokemon2 = Object.create(oppPokeRandom());
oppPokemon3 = Object.create(oppPokeRandom());
oppPokemon3.hp *= 1.2;
oppPokemon3.maxhp *= 1.2;

oppParty = [oppPokemon1, oppPokemon2, oppPokemon3];
currentOppPokemon = oppParty[0];

function oppPokeRandom() {
  return pokemonList[Math.floor(Math.random() * pokemonList.length)]
}

//Change Selected Pokemon
function displayPokemon(pokemon) {
  rollText("topRow", `You've chosen ${pokemon.name}!`, 25);
  topRow.innerHTML = `<img src = '${pokemon.oppSprite}'><br>`;
  pkmnSound = new Audio(pokemon.cry);
  pkmnSound.play();
  confirmChoice.style['display'] = 'block';
  document.getElementById('confirmBtn').onclick = function () {
    confirmPokemon(pokemon, pokeNum);
    pokeNum++
  };
}

//Creates Party
function confirmPokemon(pokemon, partyNum) {
  switch (partyNum) {
    case 1:
      playerPokemon1 = Object.create(pokemon);
      playerPokemon1.moves = JSON.parse(JSON.stringify(pokemon.moves));
      rollText("topRow", "Select your 2nd pokemon!", 25)
      confirmChoice.style['display'] = 'none';
      break;
    case 2:
      playerPokemon2 = Object.create(pokemon);
      playerPokemon2.moves = JSON.parse(JSON.stringify(pokemon.moves));
      rollText("topRow", "Select your 3rd pokemon!", 25)
      confirmChoice.style['display'] = 'none';
      break;
    case 3:
      playerPokemon3 = Object.create(pokemon);
      playerPokemon3.moves = JSON.parse(JSON.stringify(pokemon.moves));
      playerParty = [playerPokemon1, playerPokemon2, playerPokemon3];
      currentPlayerPokemon = playerParty[0];
      startBattle(currentPlayerPokemon);
      break;
  }
}


//Confirm Choice and Select Opponent Pokemon, and assign moves
function startBattle(pokemon) {
  oppPokemon.style['display'] = 'block';
  playerPokemon.style['display'] = 'none';
  document.getElementById('SelectPokemonSection').style['display'] = 'none';
  document.getElementById('BattleSection').style['display'] = 'block';
  oppHpBar.style['display'] = 'block';
  updateHealth(currentOppPokemon);
  updateHealth(currentPlayerPokemon);

  randomSong.volume = 0.2;
  randomSong.play();
  randomSong.loop = true;

  oppPokemonImg.src = currentOppPokemon.oppSprite;
  oppCry = new Audio(currentOppPokemon.cry);
  oppCry.play();
  playerHpText.innerHTML = (`${currentPlayerPokemon.hp}`)
  oppHpText.innerHTML = (`${currentOppPokemon.hp}`)
  rollText("battle_text", `A wild ${currentOppPokemon.name} has appeared!`, 25);
  setTimeout(function () {
    currentPlayerPokemonCry = new Audio(currentPlayerPokemon.cry);
    currentPlayerPokemonCry.play();
    playerPokemonImg.src = currentPlayerPokemon.plrSprite;
    playerPokemon.style['display'] = 'block';
    rollText("battle_text", `Go, ${currentPlayerPokemon.name}!`, 25);
  }, 2000);
  setTimeout(function () { menu() }, 4000);
}

//endregion

//region Buttons

//Opens Menu
function menu() {
  if (currentPlayerPokemon.fainted == true) {
    return;
  }
  rollText("battle_text", `What will ${currentPlayerPokemon.name} do?`, 25);
  document.getElementById('buttonsBattle').style['display'] = 'block';
  button1.className = `buttons`;
  button2.className = `buttons`;
  button3.className = `buttons`;
  button4.className = `buttons`;
  button1.innerHTML = `FIGHT`;
  button2.innerHTML = `ITEM`;
  button3.innerHTML = `POKEMON`;
  button4.innerHTML = `RUN`;

  button1.onclick = () => fight(currentPlayerPokemon);
  button2.onclick = () => item();
  button3.onclick = () => pokemon(playerParty);
  button4.onclick = () => run();
}

//Opens Move Menu
function fight(pokemon) {
  let moveNames = Object.keys(pokemon.moves);
  for (var x = 0; x < moveNames.length; x++) {
    let button = document.getElementById(`button${x + 1}`);
    let move = pokemon.moves[moveNames[x]];
    let upperMoveName = move.name.toUpperCase();
    button.innerHTML = upperMoveName + '<br>' + move.pp + ' / ' + move.maxpp;
    button.className += ` ${getKeyByValue(ElementalTypes, move.type).toLowerCase()}`;
    button.onclick = () => {
      attack(move, currentPlayerPokemon, currentOppPokemon);
      oppAttack();
    }
  }
}

//Item Dialogue
function item() {
  rollText("battle_text", "Your bag is empty!", 25, () => setTimeout(function () { rollText("battle_text", `What will ${currentPlayerPokemon.name} do?`, 25); }, 2000))
}

//Opens Pokemon Menu
function pokemon(playerParty) {
  for (var x = 0; x < playerParty.length; x++) {
    let button = document.getElementById(`button${x + 1}`)
    let newPoke = playerParty[x];
    let name = newPoke.name;
    let upperPokemonName = name.toUpperCase();
    button.innerHTML = upperPokemonName;
    button.className = `buttons`;
    if (newPoke.fainted == true) {
      button.classList.add(`fainted`);
      button.classList.add(`buttons`);
      button.onclick = () => rollText("battle_text", "You can't fight with a fainted pokemon!", 25);
    } else {
      button.className += ` ${getKeyByValue(ElementalTypes, newPoke.type).toLowerCase()} `
      button.onclick = () => switchPokemon(newPoke);
    }
    button4.innerHTML = null;
    button4.onclick = '';
  }
}

//Run Dialogue
function run() {
  rollText("battle_text", "You can't run!", 25, () => setTimeout(function () { rollText("battle_text", `What will ${currentPlayerPokemon.name} do?`, 25); }, 2000))
}

//Get Name From Key
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

//Switch Pokemon
function switchPokemon(pokemon) {
  document.getElementById('buttonsBattle').style['display'] = 'none';
  rollText("battle_text", `${currentPlayerPokemon.name}, come back!`, 25)
  setTimeout(function () {
    playerPokemon.style['display'] = 'none';
    switchSound.play();
    setTimeout(function () {
      currentPlayerPokemon = pokemon;
      currentPlayerPokemonCry = new Audio(currentPlayerPokemon.cry);
      currentPlayerPokemonCry.play();
      playerPokemonImg.src = currentPlayerPokemon.plrSprite;
      playerPokemon.style['display'] = 'block';
      rollText("battle_text", `Go, ${currentPlayerPokemon.name}!`, 25);
      updateHealth(currentPlayerPokemon);
      oppAttack();
    }, 2000)
  }, 1000)
}

//endregion

//region Attack

//Attack
function attack(move, attacker, defender) {
  if (currentOppPokemon.fainted == true) {
    return;
  }
  if (move.pp <= 0) {
    rollText("battle_text", "Not enough PP!", 25);
    return;
  }
  move.pp -= 1;
  document.getElementById('buttonsBattle').style['display'] = 'none';
  damage = Math.round(((move.damage * ((Math.random() * 15) + 85) / 100)) * stab(attacker, move));

  let multiplier = typeChart[getKeyByValue(ElementalTypes, move.type)][defender.type];
  damage *= multiplier;

  switch (multiplier) {
    case 0:
      rollText("battle_text", `${attacker.name} used ${move.name}! It had no effect.`, 25);
      break;
    case 0.5:
      rollText("battle_text", `${attacker.name} used ${move.name}! It's not very effective.`, 25);
      notEffectiveSound.play();
      break;
    case 2:
      rollText("battle_text", `${attacker.name} used ${move.name}! It's super effective!`, 25);
      superEffectiveSound.play();
      break;
    default:
      rollText("battle_text", `${attacker.name} used ${move.name}!`, 25);
      damageSound.play();
      break;
  }

  defender.hp -= Math.ceil(damage);
  updateHealth(defender);
}

//Choose Opposing Pokemon Move
function oppAttack() {
  oppMoveNames = Object.keys(currentOppPokemon.moves);
  do {
    let moveName = oppMoveNames[Math.ceil(Math.random() * 4)];
    oppMove = currentOppPokemon.moves[moveName];
  } while (oppMove.pp == 0)

  setTimeout(function () {
    attack(oppMove, currentOppPokemon, currentPlayerPokemon);
    if (currentOppPokemon.fainted == false) {
      setTimeout(function () { menu() }, 3000);
    }
  }, 3000);
}

//Test Same Type
function stab(pokemon, move) {
  if (pokemon.type == move.type) {
    return 1.5;
  } else {
    return 1;
  }
}

//Update Health Bars
function updateHealth(pokemon) {
  let hpTargetBarInt;
  let hpTargetBar;
  let hpTargetBarText;
  let winner;
  let target;

  if (pokemon == currentPlayerPokemon) {
    hpTargetBar = playerHpBar;
    hpTargetBarInt = playerHpBarInt;
    hpTargetBarText = playerHpText;
    target = currentPlayerPokemon;
  } else if (pokemon == currentOppPokemon) {
    hpTargetBar = oppHpBar;
    hpTargetBarInt = oppHpBarInt;
    hpTargetBarText = oppHpText;
    target = currentOppPokemon;
  }

  hpTargetBarText.innerHTML = (`${target.hp}`)
  oneHPwid = hpMaxWidth / target.maxhp;
  hpTargetBarInt = target.hp * oneHPwid;
  hpTargetBar.style.width = hpTargetBarInt + "px";
  hpTargetBarText.innerHTML = (`${target.hp}`)
  if (target.hp <= 0) {
    target.hp = 0;
    hpTargetBarText.innerHTML = (`${target.hp}`)
    hpTargetBar.style['display'] = 'none';
    setTimeout(function () { fainted(target) }, 3000);
    hpTargetBarText.innerHTML = (`${target.hp}`)
    target.fainted = true;
    return;
  } else {
    if (target.hp <= (target.maxhp / 2) && (target.hp > (target.maxhp / 5))) {
      hpTargetBar.classList.remove("highHP")
      hpTargetBar.classList.add("mediumHP")
      hpTargetBar.classList.remove("lowHP")
    } else if (target.hp <= (target.maxhp / 5)) {
      hpTargetBar.classList.remove("highHP")
      hpTargetBar.classList.remove("mediumHP")
      hpTargetBar.classList.add("lowHP")
    } else {
      hpTargetBar.classList.remove("mediumHP")
      hpTargetBar.classList.remove("lowHP")
      hpTargetBar.classList.add("highHP")
    }
  }
}

//Faint Pokemon
function fainted(pokemon) {
  if (pokemon == currentPlayerPokemon) {
    rollText("battle_text", `${currentPlayerPokemon.name} fainted!`, 20)
    currentPlayerPokemon.fainted = true;
    faintSound.play();
    document.getElementById("playerPokemon").style['display'] = 'none';
    if (playerParty[0].fainted == true && playerParty[1].fainted == true && playerParty[2].fainted == true) {
      setTimeout(function () { end(oppPokemon) }, 3000);
    } else {
      setTimeout(function () { chooseAfterFaint() }, 3000);
    }

  } else if (pokemon == currentOppPokemon) {
    rollText("battle_text", `The opposing ${currentOppPokemon.name} fainted!`, 20)
    currentOppPokemon.fainted = true;
    faintSound.play();
    oppPokemon.style['display'] = 'none';
    setTimeout(function () {
      if (oppParty[1].fainted == true && oppParty[2].fainted == true) {
        end(playerPokemon);
        return;
      } else if (oppParty[1].fainted == true) {
        currentOppPokemon = oppParty[2]
        switchOppPokemon();
      } else {
        currentOppPokemon = oppParty[1]
        switchOppPokemon();
      }
    }, 3000);
  }
}

//Brings out next opponent
function switchOppPokemon() {
  rollText("battle_text", `A wild ${currentOppPokemon.name} has appeared!`, 25)
  oppPokemon.style['display'] = 'block';
  oppPokemonImg.src = currentOppPokemon.oppSprite;
  oppCry = new Audio(currentOppPokemon.cry);
  oppCry.play();
  updateHealth(currentOppPokemon);
  oppHpBar.style['display'] = 'block';
  setTimeout(function () { menu() }, 3000)
}

//Opens Pokemon Menu
function chooseAfterFaint() {
  document.getElementById('buttonsBattle').style['display'] = 'block';
  for (var x = 0; x < playerParty.length; x++) {
    let button = document.getElementById(`button${x + 1}`)
    let newPoke = playerParty[x];
    let name = newPoke.name;
    let upperPokemonName = name.toUpperCase();
    button.innerHTML = upperPokemonName;
    if (newPoke.fainted == true) {
      button.classList.add(`fainted`);
      button.classList.add(`buttons`);
      button.onclick = () => rollText("battle_text", "You can't fight with a fainted pokemon!", 25);
    } else {
      button.className = `buttons`;
      button.className += ` ${getKeyByValue(ElementalTypes, newPoke.type).toLowerCase()} `
      button.onclick = () => switchFromFaint(newPoke);;
    }
    button4.innerHTML = null;
    button4.onclick = '';
    button4.classList = 'buttons normal';
  }
}

//Brings out new pokemon after faint
function switchFromFaint(newPoke) {
  document.getElementById('buttonsBattle').style['display'] = 'none';
  currentPlayerPokemon = newPoke;
  currentPlayerPokemonCry = new Audio(currentPlayerPokemon.cry);
  currentPlayerPokemonCry.play();
  playerPokemonImg.src = currentPlayerPokemon.plrSprite;
  playerPokemon.style['display'] = 'block';
  playerHpBar.style['display'] = 'block';
  rollText("battle_text", `Go, ${currentPlayerPokemon.name}!`, 25);
  updateHealth(currentPlayerPokemon);
  setTimeout(function () { menu() }, 2000);
}

//endregion

//region Ending

//Ending Dialogue
function end(winner) {
  if (winner == playerPokemon) {
    setTimeout(function () {
      rollText("battle_text", "You win!")
      randomSong.pause();
      victory.play();
    }, 3000)
    setTimeout(function () { rollText("battle_text", `${currentPlayerPokemon.name} gained ${exp} EXP points!`) }, 6000)
    setTimeout(function () {
      fade()
    }, 10000)
  } else if (winner == oppPokemon) {
    setTimeout(function () { rollText("battle_text", "You have run out of usable Pokemon", 25) }, 3000)
    setTimeout(function () { rollText("battle_text", "You lost!") }, 6000)
    setTimeout(function () {
      fade()
      setTimeout(function () { battleSection.style['display'] = 'none' }, 1000)
    }, 10000)
  }
  setTimeout(function () {
    document.getElementById('playAgain').style['display'] = 'block';
    document.getElementById('BattleSection').style['display'] = 'none';
    rollText("playAgainText", "Would you like to play again?", 25);
  }, 13000)
}

//Fades Music
function fade() {
  let musicTimer = setInterval(function () {

    if (victory.volume <= 0.0008) {
      victory.volume = 0;
      clearInterval(musicTimer);
    } else {
      victory.volume -= 0.0008;
    }

    if (randomSong.volume <= 0.0008) {
      randomSong.volume = 0;
      clearInterval(musicTimer);
    } else {
      randomSong.volume -= 0.0008;
    }
  })
}

//Ask to Play Again
function playAgain() {
  document.getElementById('playAgain').style['display'] = 'none';
  document.getElementById('SelectPokemonSection').style['display'] = 'block';
  rollText("topRow", "Select your 1st pokemon!", 25)
  playerPokemon1 = null;
  oppPokemon1 = null;
  playerPokemon2 = null;
  oppPokemon2 = null;
  playerPokemon3 = null;
  oppPokemon3 = null;
  currentPlayerPokemon = null;
  currentOppPokemon = null;
  oppPokemon1 = Object.create(oppPokeRandom());
  oppPokemon2 = Object.create(oppPokeRandom());
  oppPokemon3 = Object.create(oppPokeRandom());
  oppParty = [oppPokemon1, oppPokemon2, oppPokemon3];
  currentOppPokemon = oppParty[0];
  pokeNum = 0;
}

function endGame() {
  document.getElementById('playAgain').style['display'] = 'none';
}

//endregion