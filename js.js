$(function() {
	
	//Объявляем переменные
	
var cell = document.getElementsByClassName("block");//ищем все данные эл-та block
 var  reset = document.getElementById("reset-game"); // перезапуск игры
 var message = document.getElementById("message");// выводим сообщение с id message
  player = "X", // добавляем игрока
  steps = 0, // счетчик шагов
  win = [     // выигрышные комбинации
    [1, 2, 3],
    [1, 4, 7],
    [1, 5, 9],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7],
    [4, 5, 6],
    [7, 8, 9]
  ],
  dataX = [],  // в пустые массивы записываются значение ячейки на которую тыкнул игрок
  dataO = [];
	
	//алгоритм
	
for (var i = 0; i < cell.length; i++) {   // цикл проходит по всем элементам в массиве
  cell[i].addEventListener("click", currentStep); // событие, по клику на ячейку будет вызываться функция currentStep
}
function currentStep() {  // функция currentStep которая вызовется по клику на любую ячейку
  var num = +this.getAttribute("data-cell");  //переменная в которую будет записываться значение атрибута куда кликнули те у каждой ячейки будет свой номер от 1 до 9
	
	// условие с помощью которого проверяем после клика если ли значение в ячейки
  if (!this.textContent) {  // если в ячейки нет никакого содержания 
    this.innerText = player;// то мы назначаем игрока 
    player === "X"
      ? dataX.push(num) && this.classList.add("x")
      : dataO.push(num) && this.classList.add("o"); /* добавляем цвет текста после нажатия на ячейку,
	  добвляем новые классы "x" и "o" (цвета задала в стилях)
	  
	  */
    if (
      (dataO.length > 2 || dataX.length > 2) &&
      (checkWin(dataO, num) || checkWin(dataX, num))
    ) {
      for (var i = 0; i < cell.length; i++) {
        cell[i].removeEventListener("click", currentStep);
      }
    return (message.innerText = "Победил " + player) (
	alert('ПОБЕДА'))	;
		
	
			
    }

    anotherPlayer();  //смена игрока
    steps++; // увеличиваем счетчик хода
    steps === 9
      ? (message.innerText = "Ничья")
      : (message.innerText = "Ход " + player);
  }
}
	
	//функция для смены игрока
function anotherPlayer() {// при клике текущий игрок меняется на другого
  player === "X" ? (player = "O") : (player = "X");
}
reset.addEventListener("click", function() { /*функция очистки поля после игры. 
Добавляем событие по клику reset.addEventListener ("click", function ().
Это событие будет взывать функцию  
*/
  for (var i = 0; i < cell.length; i++) {    //циклом проходит по всем ячейкам 
    cell[i].innerText = "";                 // и каждую делает пустой
  }
	
  dataO = []; // очищаем массивы у каждого игрока
  dataX = [];
  player = "O";
  steps = 0;
  message.innerText = "Ход " + player;  // выводит сообщение что будет ходить первый игрок
  for (var i = 0; i < cell.length; i++) {
    cell[i].addEventListener("click", currentStep);
    cell[i].classList.remove("x", "o"); // для очистки классов с цветом текста
  }
});
	
	//функция проверяет выиграл ли игрок и выводится сообщение
function checkWin(arr, number) { // в функцию передаем массив(dataX или dataO) и число(номер клетки на которую кликнули)
  for (var w = 0, wLen = win.length; w < wLen; w++) { /*цикл в массиве выигрышных комбинаций
  до тех пор пока w меньше длины выигрышной комбинации win.length увеличиваем w на 1
 

  */
    var winArr = win[w];
     var  count = 0;
    if (winArr.indexOf(number) !== -1) {
      for (var k = 0, kLen = winArr.length; k < kLen; k++) {
        if (arr.indexOf(winArr[k]) !== -1) { //проверка на победу
          count++;
          if (count === 3) {
            return true;
          }
        }
      }
      count = 0;  //сначала х
    }
	 
  }
}
});