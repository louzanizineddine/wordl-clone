const  gird = document.getElementById("grid");
const alertDiv = document.getElementById('alert');
const word = 'APPLE';
let userGuess = ''
// we create the gird for the game
const buildGrid = function(){
    for(i = 0 ; i <= 5; i ++){
        // we create a new row
        const row = document.createElement('div')
        row.className = 'row';
        row.classList.add(`${i+1}-row`)
        gird.appendChild(row)
        // we create the cells 
        for (j = 0 ; j <= 4 ; j++){
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
    for ( i = 0 ; i < children.length; i++ ) {
        if (children[i].classList.contains('active-row')){
            return [i + 1 , children[i]]
        }
    }
}

const getCurrentCell = function() {
    const currentRow = getCurrentRow()[0];
    const cells = document.getElementsByClassName('row')[currentRow - 1].children;
    for ( i = 0 ; i < cells.length; i++ ) {
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
            console.log(userGuess)
            getCurrentCell()[1].style.color = 'white'
            getCurrentCell()[1].style.border = '2px solid white'
            currentCell = getCurrentCell()[0]
            // if the current cell is the last 
            // one we remove the active cell and add it to the next cell
            if (currentCell != 5){
                getCurrentRow()[1].children[currentCell].classList.add('active-cell')
                getCurrentRow()[1].children[currentCell - 1].classList.remove('active-cell')
            }
            // if we are in the last cell there is no need to delete the last cell
            else {
                // getCurrentRow()[1].children[currentCell - 1].classList.remove('active-cell')
            }
        }

        if (e.key == 'Enter'){
            if (userGuess.length == 5){
                console.log('your guess is going to be evaluated')
                if (evaluateUserGuess(userGuess)){
                    console.log('nice you guessed to word correctly ')
                    return
                }
                else {
                    //  we romve all active-cell class from the current row
                    // we add the active-cell class the first row in the next row
                    // we remove the active-row class from the curretn row and add it to the next one
                    UpdateClasses(getCurrentRow()[0] - 1)
                }
                
            }
            else {
                alertDiv.innerHTML = 'enter the complete five word char'
                setTimeout(() => {
                    alertDiv.innerHTML = ''
                } , 2000)
            }
        }

        if (e.key == 'Backspace'){
            currentCell = getCurrentCell()[0]
            console.log(currentCell)
            // if we are in the first cell no need to delete the active-cell class
            if (currentCell == 1){
                getCurrentCell()[1].innerHTML = '';
                getCurrentCell()[1].style.color = '#aaa'
                getCurrentCell()[1].style.border = '1px solid #aaa'
            }
            else {
                getCurrentCell()[1].innerHTML = '';
                getCurrentCell()[1].style.color = '#aaa'
                getCurrentCell()[1].style.border = '1px solid #aaa'
                getCurrentRow()[1].children[currentCell - 1].classList.remove('active-cell')
                getCurrentRow()[1].children[currentCell - 2].classList.add('active-cell')
            }
        }
    })
}

const evaluateUserGuess = function (userGuess){
    return (userGuess === word) 
}

const UpdateClasses = function(rowNumber){
    cells = gird.children[rowNumber].children
    for (i = 0 ; i <= 4 ; i++){
        if (cells[i].classList.contains('active-cell')){
            cells[i].classList.remove('active-cell')
        }
    }
    gird.children[rowNumber].classList.remove('active-row');
    gird.children[rowNumber + 1].classList.add('active-row');
    // we add active-cell class for the first cell in the next row 
    gird.children[rowNumber + 1].children[0].classList.add('active-cell')
}

buildGrid();
ListenToUserGuess()