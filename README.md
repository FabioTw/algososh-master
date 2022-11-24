# Проектная работа. МБОУ АЛГОСОШ им. Фибоначчи

В проектной работе находится визуализатор алгоритмов. Эта проектная работа заточена на анимацию и поэтапное отображение работы алгоритма, что позволит детальнее понять каждый шаг его работы.

[Дизайн проекта.](https://www.figma.com/file/RIkypcTQN5d37g7RRTFid0/Algososh_external_link?node-id=0%3A1) 

GitHub Pages: https://fabiotw.github.io/algososh-master/

Для запуска проекта используется команда **npm run start** и он открывается по ссылке http://localhost:3000/ </br>
Для сборки **npm run build**</br>
Проект покрыт тестами для их запуска испоьзуются команды **npm run test** и **npm run cypress:open** перед запуском cypress тестов необходимо запустить проект. </br>
Для деплоя проекта на GitHub Pages используется команда **npm run deploy**

## Строка

**Визуализация**

Сначала на экране появляется слово, буквы которого записаны в синие кружки.

![Строка в исходном виде](README_static/Untitled%201.png)

Строка в исходном виде

Два кандидата на сортировку подсвечиваются цветом `#D252E1`. Уже отсортированные элементы выделяются `#7FE051`. 

На скриншоте показана строка, в которой поменяли местами крайние символы:

![Промежуточный этап разворота строки](README_static/Untitled%202.png)

Промежуточный этап разворота строки

## Последовательность Фибоначчи

На этом экране генерируются `n` чисел последовательности Фибоначчи. 
**Компоненты**

![Начальное состояние страницы](README_static/Untitled%203.png)

Начальное состояние страницы

**Визуализация**

Элементы отображаются постепенно. Сначала появляется один, потом второй, третий и так до `n`.

![Сгенерированная последовательность](README_static/Untitled%204.png)

Сгенерированная последовательность

---

## Сортировка массива

На этом экране визуализируются алгоритмы сортировки выбором и пузырьком

**Компоненты**

![Начальное состояние страницы](README_static/Untitled%205.png)

Начальное состояние страницы

**Визуализация**

Когда вы нажмёте «По убыванию» или «По возрастанию», запускается процесс сортировки в зависимости от выбранного способа: выбором или пузырьком.

Для анимации сортировки добавим два цвета:

- `#D252E1` — элементы, которые сортируем;
- `#7FE051` — отсортированные элементы массива.

1. Два сравниваемых числа — 34 и 2 — нужно выделять цветом `#D252E1`.
2. Так как 2 меньше 34, с 34 удаляем выделение цветом, 2 остаётся выделен `#D252E1`;
3. Ищем, есть ли в массиве элемент меньше двойки. Претендентов на минимальный элемент по очереди выделяем цветом `#D252E1`. 
4. Так как 2 — минимальный элемент, меняем его местами с элементом 34 и выделяем цветом `#7FE051`.
5. Смещаемся на один индекс и продолжаем сортировку.

---

## Стек

На этом экране визуализируются удаление и добавление элементов в структуру данных стек

**Компоненты**

![Начальное состояние страницы](README_static/Untitled%206.png)

Начальное состояние страницы

**Визуализация добавления** 

Если ввести в инпут значение и нажать «Добавить», в стеке появиться первый элемент.

**Визуализация удаления**

Если нажать «Удалить», из стека извлекаеться только верхний элемент. Удаляемый элемент выделяется цветом, надпись `top` перемещается на его левого соседа. 

Если в стеке всего один элемент, то после нажатия «Удалить» на странице не отображаются никакие элементы стека. 

По клику на кнопку «Очистить» из стека удаляются все элементы сразу.

---

## Очередь

На этом экране визуализируются удаление и добавление элементов в структуру данных «очередь».

**Компоненты**

![Начальное состояние страницы](README_static/Untitled%207.png)

Начальное состояние страницы

**Визуализация**

Если ввести в инпут значение 2 и нажать «Добавить», элемент отобразиться под индексом 0. Инпут при этом очищается.

![Очередь с одним элементом](README_static/Untitled%208.png)

Очередь с одним элементом

При добавлении элементов в очередь позиция tail смещаеться.

![Очередь из трёх элементов в момент добавления](README_static/Untitled%209.png)

Очередь из трёх элементов в момент добавления

Теперь если нажать «Удалить», из очереди извлекается элемент под индексом 0, a `head` будет перемещён на элемент с индексом 1.

![Очередь после `dequeue();`](README_static/Untitled%2010.png)

Очередь после `dequeue();`

---

## Связный список

На этом экране необходимо реализовать удаление и добавлениеэлементов в связный список. 

**Компоненты**

![Начальное состояние страницы](README_static/Untitled%2011.png)

Начальное состояние страницы

### Визуализация

**При добавлении в head** элемент появиться над первым элементом вместо надписи head.

![Добавление в head](README_static/Untitled%2012.png)

Добавление в head

Затем он занимает первое место в списке и на долю секунды выделяется зелёным цветом. Теперь над новым элементом написано head, и он указывает на предыдущий head-элемент.

![Отображение нового элемента в head](README_static/Untitled%2013.png)

Отображение нового элемента в head

**При добавлении в tail** элемент появиться в хвосте над элементом с надписью tail. Затем он занимает последнее место в списке и на долю секунды выделяется зелёным цветом. Теперь под новым элементом написано tail.

**При добавлении элемента по индексу** должны быть заполнены два поля: «Введите значение» и «Введите индекс». Вся анимация выполняется поэтапно: 

- По клику на «Добавить по индексу» новый элемент отобразиться над первым элементом.
- Пока ищем нужный индекс, поочерёдно подсвечиваем элементы. Добавляемый элемент перепрыгивает по списку до искомого индекса.
- Когда индекс найден, отображается новый элемент над ним и добавляется.

В этом примере число 10 должно занимать индекс 2.

![Добавление по индексу. Поиск индекса](README_static/Untitled%2014.png)

Добавление по индексу. Поиск индекса

После успешного добавления 10 стоит под порядковым номером 2 и указывает на 34. Новый добавленный элемент выделяется цветом. Через долю секунды убераются все цветовые выделения и лоадер на кнопке — вставка завершена.

![Добавление по индексу. Новый элемент в списке](README_static/Untitled%2015.png)

Добавление по индексу. Новый элемент в списке

**При удалении элемента по индексу** сначала выделяются цветом элементы, пока не достигнем нужного индекса. Затем очищается значение в элементе и снизу отобразится маленький кружок с удаляемым значением.

Например, вы ввели индекс 2 и нажали «Удалить по индексу». Сначала цветом выделяется элемент с индексом 0, потом с индексом 1, и когда мы дошли до нужного индекса, то удаляем элемент из связного списка:

![Удаление элемента под индексом 2](README_static/Untitled%2016.png)

Удаление элемента под индексом 2

**При удалении элемента из tail** кружок замещает надпись tail.

![Удаление элемента из tail](README_static/Untitled%2017.png)

Удаление элемента из tail

При добавлении новый элемент отображается над элементами списка, а при удалении — под ними.
