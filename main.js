
  
    // Библиотека английских слов с переводами 
    
    var words = [];
    
        words[0] = {
            origin: "to run",
            translate: "бежать"
        }
        words[1] = {
            origin: "to go",
            translate: "идти"
        }
        words[2] = {
            origin: "to jump",
            translate: "прыгать"
        }
       words[3] = {
           origin: "to fly",
           translate: "летать"
       }
       words[4] = {
           origin: "to swim",
           translate: "плавать"
       }
       words[5] = {
           origin: "to drive",
           translate: "ехать"
       }
       words[6] = {
           origin: "to stand",
           translate: "стоять"
       }
       words[7] = {
           origin: "to lie",
           translate: "лежать"
       }
       words[8] = {
           origin: "to sit",
           translate: "сидеть"
       }
       words[9] = {
           origin: "to crawl",
           translate: "ползать"
       }
     
    var len = words.length; // Длина массива библиотеки
    
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
        usedWords.push(words[randIndex].origin);
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
//    function statusElChange (elIndex) {
//        console.log(stBar2);
//        stBar2[elIndex].next().addClass('curElement');
//        elIndex++;
//    }

    function statusElChange () {
        $('el0').removeClass('curElement');
        $('el1').addClass('curElement');
        
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
    

    // Проверяет, не повторяются ли слова
    function checkRepeat () {
       
        if (count !== len) {
            for (var i = 0; i <= usedWords.length; i++) {

                    if (usedWords[i] === words[randIndex].origin) {
                        randomWord ();
                        return checkRepeat(randIndex);
                    }        
            }
            $('#questWord').html(words[randIndex].origin);
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
		if ($('#translateInput').val() === words[randIndex].translate) {   
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

   function testYourSelf () {
           $('#new').prop('hidden', true);
           $('#testPage').prop('hidden', false);
           stBarFilling ();
           $('#statusbar').children().removeClass('curElement');
           $('#el0').addClass('curElement');
           // Создание статусбара
           statusBar ();
           correctAnswer = 0;
           elIndex = 0;
           // Вывод нового английского слова из массива 
           randomWord ();
           $('#questWord').html(words[randIndex].origin);
           $('#resultTrue').prop('hidden', true);
           $('#resultFalse').prop('hidden', true);
           $('#translateInput').prop('disabled', false);
           $('#translateInput').focus();
           $('#trButton').prop('hidden', false);
   }
  
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
            $('#blockOrigin'+i).text(words[i].origin);
            $('#blockTranslate'+i).text(words[i].translate);
            
        }
    }


//    // Очищение inputa
//    function clearInput () {
//        
//    }
    // Добавление слов

    
    function addWords () {
            
            var newOrigin = $('#newOrigin').val();
            var newTranslate = $('#newTranslate').val();
            words.push({
               origin: newOrigin,
               translate: newTranslate
            })
            len = words.length;
            $('#newOrigin').val('');
            $('#newTranslate').val('');
            
            console.log(words);
            console.log(len);
    }

    
  ///////////////////////////////////////////////////////////////////////////////
    $('document').ready(function() {
                    
        // Нажатие на кнопку Start
        $('#start').on('click', function() {
            $("#understart").hide();
            $('#new').prop('hidden', false);
        });
        
        // Кнопка "Пройти тест" на главном экране
        $('#testYourSelf').on('click', function() {
            testYourSelf ();
            $('#el0').addClass('curElement');
            
        })
        
        
        // Кнопка "Словарь" на главном экране
        $('#learnWords').click(function() {
            $('#new').prop('hidden', true);
            $('#learn').prop('hidden', false);
            $('#testPage').prop('hidden', true);
            drawWordBlocks();
            wordBlockFilling();
        })
        
        // Кнопка "Добавить слова" на главном экране
        
        $('#addWords').click(function() {
            $('#new').prop('hidden', true);
            $('#add').prop('hidden', false);
            
//            console.log(newOrigin);
//            console.log(newTranslate);
        })
        
        // Добавление в словарь
        
        $('#addToDict').click(function() {
            addWords ();
        })
 
        

        // Кнопка ПРОВЕРИТЬ
        $('#trButton').on('click', function() {
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
        $('#home').on('click', function() {
            $('#congrats').prop('hidden', true);
            $('#new').prop('hidden', false);
            $('#learnWords').prop('hidden', false);
            $('input').val('');
            correctAnswer = 0;
            count = 1;
            usedWords = [];
            randIndex = 1;

        });
        
        
        // Кнопка "Пройти тест" на странице словаря   
        $('#getTest').click(function() {
            $('#learnWords').prop('hidden', true);
            testYourSelf ();
            $('#el0').addClass('curElement');
            $('#learn').prop('hidden', true);
            $('#trButton').prop('hidden', false);
            $('.block').remove();

        })
        
        // Кнопка "Добавить слова" на странице словаря
        
        $('#toDict').click(function() {
            $('#learn').prop('hidden', true);
            $('#new').prop('hidden', true);
            $('#add').prop('hidden', false);
            addWords ();

        })

        // Кнопка "Учить слова" на странице теста
        $('#backToLearn').click(function() {
            $('#new').prop('hidden', true);
            $('#learn').prop('hidden', false);
            $('#testPage').prop('hidden', true);
            $('.block').remove();
            drawWordBlocks();
            wordBlockFilling();
        })
        
        // Кнопка "Словарь" на странице добавления слов
        $('#dict').click(function() {
            $('#new').prop('hidden', true);
            $('#learn').prop('hidden', false);
            $('#add').prop('hidden', true);
            $('.block').remove();
            drawWordBlocks();
            wordBlockFilling();
        })
        // Кнопка "Пройти тест" на странице добавления слов
        $('#toTest').click(function() {
            $('#add').prop('hidden', true);
            testYourSelf ();
            $('#testPage').prop('hidden', false);
            $('#trButton').prop('hidden', false);

        })

   });
