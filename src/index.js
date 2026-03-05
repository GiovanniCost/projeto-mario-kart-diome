const player1 = {
    name : "Mario",
    speed : 4,
    maneuverability : 3,    
    power : 3,
    points : 0
};

const player2 = {
    name : "Peach",
    speed : 3,
    maneuverability : 4,    
    power : 2,
    points : 0
};

const player3 = {
    name : "Yoshi",
    speed : 2,
    maneuverability : 4,    
    power : 3,
   points : 0
};

const player4 = {
    name : "Bowser",
    speed : 5,
    maneuverability : 2,    
    power : 5,
   points: 0
};

const player5 = {
    name : "Luigi",
    speed : 3,
    maneuverability : 4,    
    power : 4,
    points : 0
}
const player6 = {
    name : "Donkey Kong",
    speed : 2,
    maneuverability : 2,    
    power : 5,
    points : 0
};

const rollTheDice = async () =>{
   return Math.floor(Math.random() * 6 + 1);
}

const getRadomBlock =  () => {
    let random = Math.random();
    let result ;

    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;    
    
        default:
            result = "CONFRONTO";     
    }
     return result;
}

const logRollResult = async (characterName, block, diceResult,attribute) =>{
    console.log(`O ${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

   const typesOfConfrontation = async (character1, character2, powerResult1, powerResult2) =>{
    const confrontation = ["bomb", "shell"]
    const select = Math.floor(Math.random() * confrontation.length); 
    const confrontationType = confrontation[select]; 
    
     switch (confrontationType) { // Compara com a string
        case "bomb" : 
            
            console.log(`O confronto entre os corredores será de BOMBA!!`);
            if(powerResult1 > powerResult2) {
                console.log(`O jogador ${character2.name} perdeu 2 pontos`);
                character2.points = Math.max(0, character2.points - 2); 
                console.log(`O jogador ${character1.name} ganhou 1 ponto`);
                character1.points ++;
            }else if(powerResult2 > powerResult1) {
                console.log(`O jogador ${character1.name} perdeu 2 pontos`);
                character1.points = Math.max(0, character1.points - 2); 
                console.log(`O jogador ${character2.name} ganhou 1 ponto`);
                character2.points ++;
            }else if (powerResult1 === powerResult2) {
                console.log("Confronto empatado"); 
            }
            break;

             case "shell" : 
            console.log(`O confronto entre os corredores será de CASCO!!`);
            if(powerResult1 > powerResult2) {
                console.log(`O jogador ${character2.name} perdeu 2 pontos`);
                character2.points = Math.max(0, character2.points - 2) 
                console.log(`O jogador ${character1.name} ganhou 1 ponto`);
                character1.points ++;
            }else if(powerResult2 > powerResult1) {
                console.log(`O jogador ${character1.name} perdeu 2 pontos`);
                character1.points = Math.max(0, character1.points - 2)
                console.log(`O jogador ${character2.name} ganhou 1 ponto`);
                character2.points ++;
            }else if (powerResult1 === powerResult2) { 
                console.log("Confronto empatado"); 
            }
            break; 
     
        default:
            break;
     }

}

const raceEngine = async (character1, character2) => {
    for(let round = 1; round <= 5; round++){
        console.log(`🏁 Rodada ${round}`);

        // sortear bloco
        let block = await getRadomBlock();
        console.log(`BLOCO: ${block}`);

        // rolar dados
        let diceResult1 = await rollTheDice();
        let diceResult2 = await rollTheDice();

        // teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if(block === "RETA"){
            totalTestSkill1 = diceResult1 + character1.speed;
            totalTestSkill2 = diceResult2 + character2.speed;

            await logRollResult(character1.name, "velocidade", diceResult1, character1.speed);
            await logRollResult(character2.name, "velocidade", diceResult2, character2.speed);

            if (totalTestSkill1 > totalTestSkill2){
                console.log(`O jogador ${character1.name} marcou 1 ponto.`);
                character1.points++
            }else if(totalTestSkill2 > totalTestSkill1){
                    console.log(`O jogador ${character2.name} marcou 1 ponto.`);
                    character2.points++
            }else{console.log("Corrida empatada")}

        }

        if(block === "CURVA"){
            totalTestSkill1 = diceResult1 + character1.maneuverability;
            totalTestSkill2 = diceResult2 + character2.maneuverability;

            await logRollResult(character1.name, "manobabilidade", diceResult1, character1.maneuverability);
            await logRollResult(character2.name, "manobabilidade", diceResult2, character2.maneuverability);

              if (totalTestSkill1 > totalTestSkill2){
                console.log(`O jogador ${character1.name} marcou 1 ponto.`);
                character1.points++
            } 
                if((totalTestSkill2 > totalTestSkill1)){
                    console.log(`O jogador ${character2.name} marcou 1 ponto.`);
                    character2.points++
                } 
        }

        if(block === "CONFRONTO"){
            let powerResult1 = diceResult1 + character1.power;
            let powerResult2 = diceResult2 + character2.power;
            
            await logRollResult(character1.name, "poder", diceResult1, character1.power);
            await logRollResult(character2.name, "poder", diceResult2, character2.power);
            await typesOfConfrontation(character1,character2,powerResult1,powerResult2);
            
    };
     
        console.log("------------------------------------------------------");
    
};
 revealsTheWinner = async (character1, character2) =>{
        console.log("Fim da corrida !!!🏁")
        console.log(`O jogador ${character1.name} conquistou: ${character1.points} ponto(os)`);
        console.log(`O jogador ${character2.name} conquistou: ${character2.points} ponto(os)`);

        if(character1.points > character2.points){
            console.log(`\nO vencedor é ${character1.name}! Parabéns Campeão 🏆`);
        } else if(character1.points < character2.points){
            console.log(`\nO vencedor é ${character2.name}! Parabéns Campeão 🏆`);
        }else{
            console.log("Corrida empatada, mais sorte da proxima.")
        }
    };
}

( main = async() =>{
    console.log(`🚥🏁 Corrida entre ${player1.name} e ${player2.name} começado!!!...\n`)
await raceEngine(player1,player2)

await revealsTheWinner(player1,player2)
})();




           

                
          
           
        








