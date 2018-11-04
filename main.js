
  
    // Библиотека английских слов с переводами 
    
    var wordOdject = [];
    
        wordOdject[0] = {
            origin: "to run",
            translate: "бежать"
        }
        wordOdject[1] = {
            origin: "to go",
            translate: "идти"
        }
        wordOdject[2] = {
            origin: "to jump",
            translate: "прыгать"
        }
       wordOdject[3] = {
           origin: "to fly",
           translate: "летать"
       }
       wordOdject[4] = {
           origin: "to swim",
           translate: "плавать"
       }
       wordOdject[5] = {
           origin: "to drive",
           translate: "ехать"
       }
       wordOdject[6] = {
           origin: "to stand",
           translate: "стоять"
       }
       wordOdject[7] = {
           origin: "to lie",
           translate: "лежать"
       }
       wordOdject[8] = {
           origin: "to sit",
           translate: "сидеть"
       }
       wordOdject[9] = {
           origin: "to crawl",
           translate: "ползать"
       }
     
    var len = wordOdject.length; // Длина массива библиотеки
    
    var randIndex = 1;
    
    var count = 1; // Счетчик переведённых слов
    
    var usedWords = []; 
    
    var timerID;
    
    var elIndex = 0; // Индекс элемента в статусбаре
    
    var correctAnswer = 0; // Считает правильные ответы
    
    var stBar = []; // Строковый массив элементов по id ("$('el0')").
    
    var stBar2;     // Нормальный массив элементов статусбара $('el0').
    
   //////////////////////////////////////////////////////////////////////////////
    
    
    // Запись использованных слов в массив
    function addInUsed () {
        usedWords.push(wordOdject[randIndex].origin);
        return;
    }
     
    //Наполнение массивов элементами статусбара (количество элементов зависит от количества слов в библиотеке).
    
    function stBarFilling (len) {
        for (var f = 0; f <= len; f++) {
            stBar.push("$('#el"+ f + "')");
        }
            stBar2 = stBar.map(function(item) {
            var id = item.slice(3, -2);
            return $(id);
            });
        return;
    }
    
    // StatusBar
    // Отрисовка элементов статусбара и присвоение им id и class
    function statusBar () {
        for (var j = 0; j < len; j++) {
            $('#statusbar').append("<div class='element'></div>");
            var g = 0;
                $('.element').each(function() {
                $(this).attr("id","el"+g);
                g++;
            });
            
        }       
    }
    
    // Изменение внешнего вида элементов статусбара
    function statusElChange () {
        stBar2[elIndex].next().addClass('curElement');
        elIndex++;
    }
    
    // Отсрочка функции
    function delayedFunc(func) {
        timerID = window.setTimeout(func, 2000);
    }
    
    // Конец урока, вывод поздравления.
    function end() {
        $('#page1').prop('hidden', true);
        $('#congrats').prop('hidden', false);
        $('#result').text(correctAnswer);
        $('#howManyWords').text(len);
        return;
    }
    
    // выбирает случайное слово и выводит на экран
    function randomWord () {
        randIndex = Math.floor(Math.random() * len);
        return randIndex;  
    }
    
    function checkRepeat () {
       
        if (count !== len) {
            for (var i = 0; i <= usedWords.length; i++) {

                    if (usedWords[i] === wordOdject[randIndex].origin) {
                        randomWord ();// выбирает случайное слово и выводит на экран
                        return checkRepeat(randIndex);
                    }        
            }
            $('#questWord').html(wordOdject[randIndex].origin);
            nextWord();
            count++;
        } else {
            end();
        }
    }
    
    // Вывод следующего слова
    function nextWord() {
        $('#resultTrue').prop('hidden', true);  // скрывает "Верно!" 
        $('#translateInput').val(''); //очищает  поле ввода
        $('#resultFalse').prop('hidden', true); // скрывает "Не верно!"
        $('#trButton').prop('hidden', false); // скрывает кнопку Проверить
        $('#translateInput').prop('disabled', false); // разблокирует поле ввода
        $('#translateInput').focus(); // ставит курсор в поле ввода
        $('#empty').prop('hidden', true); // скрывает "Введи перевод"

    }
    
    // Проверка ответа
    function check () {
        console.log(count);
        console.log(len);
		  // Если перевод верный
		if ($('#translateInput').val() === wordOdject[randIndex].translate) {   
		 			$('#resultTrue').prop('hidden', false);
                    $('#resultFalse').prop('hidden', true); 
                    addInUsed ();
                    correctAnswer++;
                    delayedFunc(checkRepeat); // задержка вывода следующего слова
                    console.log("Верных ответов - " + correctAnswer); 
                    delayedFunc(statusElChange);  
                    

        } else {    // Если перевод не верный
                    addInUsed ();
                    $('#resultFalse').prop('hidden', false);
                    $('#trButton').prop('hidden', false);
                    delayedFunc(checkRepeat);
                    console.log("Верных ответов - " + correctAnswer);
                    delayedFunc(statusElChange);
                    $('#empty').prop('hidden', true);
                    $('#translateInput').val('');
                    

            }
    }


    // Запуск теста

//    function testYourSelf () {
//            $('#new').prop('hidden', true);
//            $('#testPage').prop('hidden', false);
//            stBarFilling (len);
//            $('#statusbar').children().removeClass('curElement');
//            $('#el0').addClass('curElement');
//            correctAnswer = 0;
//            elIndex = 0;
//            // Вывод нового английского слова из массива 
//            randomWord ();
//            $('#questWord').html(wordOdject[randIndex].origin);
//            $('#resultTrue').prop('hidden', true);
//            $('#resultFalse').prop('hidden', true);
//            $('#translateInput').prop('disabled', false);
//            $('#translateInput').focus();
//    }
  //////////////////////////////////////////////////////////////////////////////     
    

    // Отрисовка блоков со словами и присвоение им id и class 
    function drawWordBlocks () {
        for (var i = 0; i < len; i++) {
            $('#learn').append("<div class='block'><div class='wordBlockOrigin'></div><div class='wordBlockTranslate'></div></div>");
            var g = 0;
                $('.wordBlockOrigin').each(function() {
                    $(this).attr("id","blockOrigin"+g);
                    g++;
                })
            var j = 0;
                $('.wordBlockTranslate').each(function() {
                    $(this).attr("id","blockTranslate"+j);
                    j++;
                })   
        }
        return;
    }


    // Наполнение блоков словами

    function wordBlockFilling () {
        for (var i = 0; i < len; i++) {
            $('#blockOrigin'+i).text(wordOdject[i].origin);
            $('#blockTranslate'+i).text(wordOdject[i].translate);
            
        }
    }
    
  ///////////////////////////////////////////////////////////////////////////////
    $('document').ready(function() {
                    
        // Нажатие на кнопку Start
        $('#start').on('click', function() {
            $("#start").hide();
            $("#understart").hide();
            $('#new').prop('hidden', false);
        });
        
        // Выбор урока №1
        $('#testYourSelf').click(function() {
//            testYourSelf ();
            $('#new').prop('hidden', true);
            $('#testPage').prop('hidden', false);
            stBarFilling (len);
            $('#statusbar').children().removeClass('curElement');
            $('#el0').addClass('curElement');
            correctAnswer = 0;
            elIndex = 0;
            // Вывод нового английского слова из массива 
            randomWord ();
            $('#questWord').html(wordOdject[randIndex].origin);
            $('#resultTrue').prop('hidden', true);
            $('#resultFalse').prop('hidden', true);
            $('#translateInput').prop('disabled', false);
            $('#translateInput').focus();
            $('#trButton').prop('hidden', false);
        })
 
        // Создание статусбара
        statusBar ();

        // Кнопка ПРОВЕРИТЬ
        $('#trButton').click(function() {
            $('#empty').prop('hidden', true);

                if ($('#translateInput').val() === '') {
                    $('#empty').prop('hidden', false);

                    } else {
                        $('#translateInput').prop('disabled', true);
                        check();
                        $('#trButton').prop('hidden', true); 
                    }
        });
        
        // Нажатие Enter после ввода ответа в input            
        $('#translateInput').keyup(function(event) {
            $('#empty').prop('hidden', true);     
            if (event.keyCode == 13) {
                if ($('#translateInput').val() === '') {
                    $('#empty').prop('hidden', false);
                } else {
                    $('#translateInput').prop('disabled', true);
                    check();
                    $('#trButton').prop('hidden', true); 
                }
            }
        });
           
        // На главную    
        $('#home').bind('click', function() {
            $('#congrats').prop('hidden', true);
            $('#new').prop('hidden', false);
            $('input').val('');
            correctAnswer = 0;
            count = 1;
            usedWords = [];
            randIndex = 1;

        });
        
        $('#learnWords').click(function() {
            $('#new').prop('hidden', true);
            $('#learn').prop('hidden', false);
            drawWordBlocks();
            wordBlockFilling();
        })
        
//        $('#back').click(function() {
//            $('#learnWords').prop('hidden', true);
//            testYourSelf ();
//        })

   });
