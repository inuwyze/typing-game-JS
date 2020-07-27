const word=document.getElementById('word');
const text=document.getElementById('text');
const scoreEl=document.getElementById('score');
const timeEl=document.getElementById('time');
const endgame=document.getElementById('end-game-container');
const settingsBtn=document.getElementById('settings-btn');
const settings=document.getElementById('settings');
const settingsform=document.getElementById('settings-form');
const difficultySel=document.getElementById('difficulty');

// list pd words

const words=[
    'apple',
    'banana',
    'coconut',
    'guava'
];

let randomWord;

let score=0;

let time=10;

// focus on texxt when start
text.focus();


//countdown
const timeInterval=setInterval(updateTime,1000) 

const dif={
    'hard':2,
    'medium':3,
    'easy':4,
}

function getRandom(){
    return words[Math.floor(Math.random()*words.length)];
}
function addWordToDom(){
    randomWord=getRandom();
    word.innerHTML=randomWord;
}

function updateScore(){
    score++;
    scoreEl.innerText=score;

}

function updateTime(){
    time--;
    timeEl.innerHTML=time+'s';
    // console.log(time);

    if(time===0){
        clearInterval(timeInterval);
        gameOver();
    }
}

function gameOver(){
    endgame.innerHTML=`
    <h1>time ran out</h1>
    <p>your final score is ${score}</p>
    <button onclick="location.reload()">reload</button>
    `;
    endgame.style.display='flex';
}


addWordToDom();
console.log(getRandom())

text.addEventListener('input',e=>{
    const insertedText=e.target.value;
    console.log(insertedText);
    if(insertedText===randomWord){
        addWordToDom();
        updateScore();
        text.value='';
        
        
        time+=dif[difficulty];
        console.log(dif[difficulty],difficulty)
        updateTime();
    }

});
console.log(localStorage.getItem('difficulty'))
settingsBtn.addEventListener('click',()=>settings.classList.toggle('hide'));

let difficulty=localStorage.getItem('difficulty')!==null?localStorage.getItem('difficulty'):'medium';
difficultySel.value=difficulty;

console.log(dif)
console.log(dif['hard']);
difficultySel.addEventListener('change',e=>{
    difficulty=e.target.value;
    console.log(difficulty);
    
    localStorage.setItem('difficulty',difficulty);
})