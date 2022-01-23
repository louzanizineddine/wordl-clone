import {wordList} from './WordList.js'
const word = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
const  gird = document.getElementById("grid");
const alertDiv = document.getElementById('alert');
let NumberOFAttempts = 0;
let userGuess = ''
// we create the gird for the game
const buildGrid = function(){
    for(let i = 0 ; i <= 5; i ++){
        // we create a new row
        const row = document.createElement('div')
        row.className = 'row';
        row.classList.add(`${i+1}-row`)
        gird.appendChild(row)
        // we create the cells 
        for (let j = 0 ; j <= 4 ; j++){
            const cell = document.createElement('div')
            cell.className  = 'cell'
            cell.classList.add(`${i+1}-${j+1}-cell`)
            cell.innerHTML  = ''
            row.appendChild(cell) 
        }
    }
    // we initailize the first row to be the one active
    document.getElementsByClassName('row')[0].classList.add('active-row')
    document.getElementsByClassName('1-1-cell')[0].classList.add('active-cell')
}

const getCurrentRow = function() {
    const children = gird.children;
    for ( let i = 0 ; i < children.length; i++ ) {
        if (children[i].classList.contains('active-row')){
            return [i + 1 , children[i]]
        }
    }
}

const getCurrentCell = function() {
    const currentRow = getCurrentRow()[0];
    const cells = document.getElementsByClassName('row')[currentRow - 1].children;
    for ( let i = 0 ; i < cells.length; i++ ) {
        if (cells[i].classList.contains('active-cell')){
            return [i + 1 , cells[i]]
        }
    }
}   



const ListenToUserGuess = function(){
    document.addEventListener('keydown' , (e) => {
        if ((e.key != 'Enter') && (e.key != 'Backspace') && (e.key != 'Alt') && (e.key != ' ')) {
            // we change the input of the cell of what the user has typed
            getCurrentCell()[1].innerHTML = e.key.toUpperCase();
            userGuess += e.key.toUpperCase()
            getCurrentCell()[1].style.color = 'white'
            getCurrentCell()[1].style.border = '2px solid white'
            let currentCell = getCurrentCell()[0]
            // if the current cell is the last 
            // one we remove the active cell and add it to the next cell
            if (currentCell != 5){
                getCurrentRow()[1].children[currentCell].classList.add('active-cell')
                getCurrentRow()[1].children[currentCell - 1].classList.remove('active-cell')
            }
            else {
            }
        }

        if (e.key == 'Enter'){
            // we check the attemps only if the word has 5 char
            if (userGuess.length == 5){
                NumberOFAttempts += 1;
                if (evaluateUserGuess(userGuess)){
                    showAttemptStatus(getCurrentRow()[0] - 1)
                    alertDiv.innerHTML = `Wow you gussed the word correctly only using  ${NumberOFAttempts} attempt`
                }
                else {
                    // we show the right letters that are in right places
                    // we show the right letters but in the wrong places
                    // we show the wrong letters that does not exist in the word
                    showAttemptStatus(getCurrentRow()[0] - 1)
                    //  we romve all active-cell class from the current row
                    // we add the active-cell class the first row in the next row
                    // we remove the active-row class from the curretn row and add it to the next one
                    userGuess = ''
                    if (NumberOFAttempts <= 5){
                        UpdateClasses(getCurrentRow()[0] - 1)
                    }
                    else {
                        alertDiv.innerHTML = 'YOU HAVE TRIED ALL THE NEEDED ATTEMPTS'
                        setTimeout(() => {
                            alertDiv.innerHTML = `THE CORRECT WORD is ${word}`
                        } , 2000)

                    }
                }
                
            }
            else {
                
            }
        }

        if (e.key == 'Backspace'){
            let currentCell = getCurrentCell()[0]
            console.log()
            console.log(currentCell)
            // if we are in the first cell no need to delete the active-cell class
            if (currentCell == 1){
                getCurrentCell()[1].innerHTML = '';
                userGuess = userGuess.slice(0, -1)
                console.log(userGuess)
                getCurrentCell()[1].style.color = '#aaa'
                getCurrentCell()[1].style.border = '1px solid #aaa'
            }
            else {
                getCurrentCell()[1].innerHTML = '';
                userGuess = userGuess.slice(0, -1)
                console.log(userGuess)
                getCurrentCell()[1].style.color = '#aaa'
                getCurrentCell()[1].style.border = '1px solid #aaa'
                getCurrentRow()[1].children[currentCell - 2].classList.add('active-cell')
                getCurrentRow()[1].children[currentCell - 1].classList.remove('active-cell')
            }
        }
    })
}

const evaluateUserGuess = function (userGuess){
    return (userGuess === word) 
}

const UpdateClasses = function(rowNumber){
    let cells = gird.children[rowNumber].children
    for (let i = 0 ; i <= 4 ; i++){
        if (cells[i].classList.contains('active-cell')){
            cells[i].classList.remove('active-cell')
        }
    }
    gird.children[rowNumber].classList.remove('active-row');
    gird.children[rowNumber + 1].classList.add('active-row');
    // we add active-cell class for the first cell in the next row 
    gird.children[rowNumber + 1].children[0].classList.add('active-cell')
}

const showAttemptStatus = function(rowNumber) {
    let cells  = gird.children[rowNumber].children
    let i = 0
    for (let cell of cells) {
        if (cell.innerHTML == word[i]){
            cell.style.backgroundColor = 'green';
        }
        else {
            // we have to case : if the letter does not even exist so the grey color 
            // if the letter exist but in defferent locaton we show the orange color
            if (word.includes(cell.innerHTML)) {
                cell.style.backgroundColor = 'grey';
            }else {
                cell.style.backgroundColor = 'red';
            }
        }
        i += 1;
    }

}

buildGrid();
ListenToUserGuess()
