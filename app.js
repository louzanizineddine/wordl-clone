const  gird = document.getElementById("grid");
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
            cell.innerHTML  = 'A'
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
        if ((e.key != 'Enter') && (e.key != 'Backspace') && (e.key != 'Alt')) {
            // we change the input of the cell of what the user has typed
            getCurrentCell()[1].innerHTML = e.key;
            currentCell = getCurrentCell()[0]
            console.log(currentCell)
            // if the current cell is the last 
            // one we remove the calls active cell and add it to the next cell
            if (currentCell != 5){
                getCurrentRow()[1].children[currentCell].classList.add('active-cell')
                getCurrentRow()[1].children[currentCell - 1].classList.remove('active-cell')
            }
            // if we are in the last cell there is no need to delete the last cell
            else {
                getCurrentRow()[1].children[currentCell - 1].classList.remove('active-cell')
            }
        }

        if (e.key == 'Backspace'){
            getCurrentCell()[1].innerHTML = '';
            getCurrentRow()[1].children[currentCell].classList.remove('active-cell')
            getCurrentRow()[1].children[currentCell - 1].classList.add('active-cell')
        }
    })
}

buildGrid();
getCurrentRow()
getCurrentCell()
ListenToUserGuess()