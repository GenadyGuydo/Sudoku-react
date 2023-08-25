import { useState } from 'react'
import './sudoku-area.css'

const areaArr = [0,1,2,3,4,5,6,7,8]


function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min) ;
}


const ranNum =  randomNumber(1,9)


const initial = [
  [-1,ranNum ,-1,7,-1,-1,-1,-1,-1],
  [8,-1,-1,-1,4,-1,3,-1,7],
  [-1,-1,-1,2,8,-1,1,9,-1],
  [5,3,8,6,-1,7,9,4,-1],
  [-1,2,-1,3,-1,1,-1,-1,-1],
  [1,-1,9,8,-1,4,6,2,3],
  [9,-1,7,4,-1,-1,-1,-1,-1],
  [-1,4,5,-1,-1,-1,2,-1,9],
  [-1,-1,-1,-1,3,-1,-1,7,-1],

]


const SudokuArea = ()=>{
const [sudokuArr,setSudokuArr] = useState(getDeepCopy(initial))
 
function getDeepCopy(arr){
  return JSON.parse(JSON.stringify(arr))
}

function onInputChange (e,row,col){
  var val = parseInt(e.target.value) || -1, grid = getDeepCopy(sudokuArr);
 if( val === -1 || val >= 1 && val <= 9){
  grid[row][col]= val
 }
  
  setSudokuArr(grid)
}
function compareSudoku(currentSudoku,solvedSudoku){
  let res = {
    isComplete: true,
    isSolvable: true,
  }
  
  for ( let i= 0; i<9 ; i++){
    for ( let j= 0; j<9 ; j++){
     if(currentSudoku[i][j] != solvedSudoku[i][j] )
     {
      if(currentSudoku[i][j] != -1 ){
       res.isSolvable = false
     }
     res.isComplete= false

     }
    }
  }
  return res
}

function checkSudoku(){
  let sudoku = getDeepCopy(initial);
  solver(sudoku)
  let compare = compareSudoku(sudokuArr,sudoku)
  if (compare.isComplete){
    alert('you won!!')
  } else if(compare.isSolvable){
    alert('keep going!')
  } else{
    alert('try again')
  }
}
function checkRow(grid, row, num){
   return grid[row].indexOf(num)===-1
}
function checkCol(grid, col, num){
  return grid.map(row => row[col]).indexOf(num)===-1
}
function checkBox(grid, row, num, col){
  let boxArr = [],
  rowStart = row - (row%3),
  colStart = col - (col%3);
  for ( let i= 0; i<3 ; i++){
    for ( let j= 0; j<3 ; j++){
      boxArr.push(grid[rowStart + i][colStart + j])
    }
  }
 return boxArr.indexOf(num) === -1

}
function checkValid(grid, col, row, num) {
  if(checkRow(grid, row, num) && checkCol(grid, col, num) && checkBox  (grid, row, num, col)){
    return true
  }
 return false
}

function getNext(row,col) {
  return col !==8 ? [row,col + 1] : row != 8 ? [row + 1,0] : [0,0]
}

function solver (grid, col=0, row=0){

  if(grid[row][col]!==-1){
    let isLast = row >= 8 && col >=8 ;
    if(!isLast){
    let [newRow, newCol] = getNext(row,col)
    return solver(grid, newCol,newRow)
    }
    
  }
  for( let num = 1; num <= 9; num++){
    if(checkValid(grid, col, row, num )){
       grid[row][col] = num
      let [newRow, newCol] = getNext(row,col)
     if(!newCol && ! newRow){
      return true
     }
     if (solver(grid, newCol,newRow)){
      return true
     }
    }
  }
 grid[row][col] = -1
 return false
}

function solveSudoku(){
  let sudoku = getDeepCopy(initial);
  solver(sudoku);
  setSudokuArr(sudoku)

}
function resetSudoku(){
  let sudoku = getDeepCopy(initial);
  setSudokuArr(sudoku)
}
 return (
  <div>
    
    <table>
      <tbody>
        {
          areaArr.map((row,rIndex)=>{
            return <tr className={(row + 1) %3 === 0 ?  'dBorder' : ''} key={rIndex}>{
              areaArr.map((col,cIndex)=>{
                return <td key={rIndex + cIndex} className={(col + 1) %3 === 0 ?  'rBorder' : ''}>
                <input onChange={(e)=> onInputChange(e,row,col)} 
                value={sudokuArr[row][col] === -1 ? '': sudokuArr[row][col]} className='cellInput'
                disabled={
                  initial[row][col] !== -1
                }
                />
                </td>
            })}
              
          </tr>
          })
        }
        
      </tbody>
    </table>
    <div className='buttonContainer'>
      <button className='checkButton' onClick={checkSudoku}> Check </button>
      <button className='solveButton' onClick={solveSudoku}> Solve </button>
      <button className='resetButton' onClick={resetSudoku}> Reset </button>
    </div>
  </div>
)

}

export default SudokuArea

