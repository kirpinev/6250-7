# 🔧 Исправление проблемы с rectangle + thin

## 🎯 Проблема
При выборе формы `rectangle` и толщины `thin`:
- Не менялся цвет стикера
- Не менялась картинка стикера
- Отображался `small-rectangle` вместо `rectangle`

## 🔍 Причина
В функции `getStickerClassification` была ошибка в `shapeThicknessMap`:

```javascript
// ПРОБЛЕМА: ключ 0 вместо 10
const shapeThicknessMap = {
    1: { shape: 'small-rectangle', thickness: 'thick' },
    2: { shape: 'square', thickness: 'thick' },
    3: { shape: 'rectangle', thickness: 'thick' },
    4: { shape: 'cutout', thickness: 'thick' },
    5: { shape: 'cutout', thickness: 'thin' },
    6: { shape: 'circle', thickness: 'thick' },
    7: { shape: 'circle', thickness: 'thin' },
    8: { shape: 'small-rectangle', thickness: 'thin' },
    9: { shape: 'square', thickness: 'thin' },
    0: { shape: 'rectangle', thickness: 'thin' }  // ❌ ОШИБКА!
};
```

**Логика вычисления позиции:**
```javascript
const position = stickerNumber % 10 || 10;
```

Когда `stickerNumber` кратен 10 (10, 20, 30, ...), то:
- `stickerNumber % 10` = `0`
- `position` = `0 || 10` = `10`

Но в `shapeThicknessMap` был ключ `0`, а не `10`!

## ✅ Решение
Исправлен `shapeThicknessMap`:

```javascript
// ИСПРАВЛЕНО: ключ 10 вместо 0
const shapeThicknessMap = {
    1: { shape: 'small-rectangle', thickness: 'thick' },
    2: { shape: 'square', thickness: 'thick' },
    3: { shape: 'rectangle', thickness: 'thick' },
    4: { shape: 'cutout', thickness: 'thick' },
    5: { shape: 'cutout', thickness: 'thin' },
    6: { shape: 'circle', thickness: 'thick' },
    7: { shape: 'circle', thickness: 'thin' },
    8: { shape: 'small-rectangle', thickness: 'thin' },
    9: { shape: 'square', thickness: 'thin' },
    10: { shape: 'rectangle', thickness: 'thin' }  // ✅ ИСПРАВЛЕНО!
};
```

## 🔍 Добавлена отладка
Добавлено логирование для позиции 10:
```javascript
if (position === 10) {
    console.log(`Sticker ${stickerNumber}: decade=${decade}, position=${position}, shapeThickness=`, shapeThickness);
}
```

## 🎉 Результат
Теперь при выборе `rectangle` + `thin`:
- ✅ Корректно меняется цвет
- ✅ Корректно меняется картинка
- ✅ Отображается правильная форма `rectangle`

## 🚀 Тестирование
Откройте: http://localhost:8004/designer-advanced.html

**Протестируйте:**
1. Выберите форму `rectangle`
2. Выберите толщину `thin`
3. Меняйте цвет и картинку
4. Проверьте, что стикер обновляется корректно
