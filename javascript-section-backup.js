    <script>
        // Current selections - simplified for 6250-1
        
        // Переменная для отслеживания состояния кнопки
        let isOrderProcessing = false;
        
        let currentSelections = {
            thickness: 'thin'
        };
        
        // Debug function to log current selections
        function debugSelections() {
            console.log('Current selections:', currentSelections);
        }
        
        // Update order button price based on thickness
        function updateOrderButton() {
            const button = document.getElementById('orderButton');
            const price = currentSelections.thickness === 'thin' ? '990' : '690';
            button.textContent = `Заказать за ${price} ₽`;
        }
        
        // Simple sticker update for 6250-1 - only thickness selection
        function updateStickerPreview() {
            const preview = document.getElementById('stickerPreview');
            if (!preview) return;
            
            // Show specific stickers based on thickness
            let stickerNumber, stickerName, shape;
            if (currentSelections.thickness === 'thin') {
                stickerNumber = 15;
                stickerName = 'sticker-15-stick.png';
                shape = 'cutout'; // Тонкий как cut
            } else {
                stickerNumber = 11;
                stickerName = 'sticker-11-stick.png';
                shape = 'small-rectangle'; // Толстый как small rectangle
            }
            
            const imageSrc = `images/${stickerName}`;
            preview.innerHTML = `<img src="${imageSrc}" alt="Стикер ${stickerNumber}" style="width: 100%; height: 100%; object-fit: contain;">`;
            positionSticker(preview, shape);
        }

        // Sticker classification system
        function getStickerClassification(stickerNumber) {
            if (stickerNumber < 1 || stickerNumber > 880) {
                return null;
            }
            
            const decade = Math.ceil(stickerNumber / 10);
            const position = stickerNumber % 10 || 10;
            
            const designColorMap = {
                1: { design: 'empty', color: 'red' },
                2: { design: 'cat', color: 'red' },
                3: { design: 'slider-smile', color: 'red' },
                4: { design: 'robot-cat', color: 'red' },
                5: { design: 'smile-hearts', color: 'red' },
                6: { design: 'smile-hearts', color: 'green' },
                7: { design: 'robot-cat', color: 'green' },
                8: { design: 'slider-smile', color: 'green' },
                9: { design: 'cat', color: 'green' },
                10: { design: 'custom', color: 'red' },
                11: { design: 'custom', color: 'green' },
                12: { design: 'gingerbread', color: 'red' },
                13: { design: 'donut', color: 'red' },
                14: { design: 'ribbon', color: 'green' },
                15: { design: 'gingerbread', color: 'green' },
                16: { design: 'donut', color: 'green' },
                17: { design: 'empty', color: 'green' },
                18: { design: 'empty', color: 'gradient' },
                19: { design: 'slider-smile', color: 'gradient' },
                20: { design: 'smile-hearts', color: 'gradient' },
                21: { design: 'custom', color: 'gradient' },
                22: { design: 'gingerbread', color: 'gradient' },
                23: { design: 'donut', color: 'gradient' },
                24: { design: 'ribbon', color: 'gradient' },
                25: { design: 'cat', color: 'gradient' },
                26: { design: 'ribbon', color: 'red' },
                27: { design: 'empty', color: 'white' },
                28: { design: 'empty', color: 'black' },
                29: { design: 'slider-smile', color: 'white' },
                30: { design: 'cat', color: 'white' },
                31: { design: 'slider-smile', color: 'black' },
                32: { design: 'smile-hearts', color: 'white' },
                33: { design: 'robot-cat', color: 'white' },
                34: { design: 'custom', color: 'white' },
                35: { design: 'gingerbread', color: 'white' },
                36: { design: 'donut', color: 'white' },
                37: { design: 'ribbon', color: 'white' },
                38: { design: 'smile-hearts', color: 'black' },
                39: { design: 'cat', color: 'black' },
                40: { design: 'robot-cat', color: 'black' },
                41: { design: 'custom', color: 'black' },
                42: { design: 'gingerbread', color: 'black' },
                43: { design: 'donut', color: 'black' },
                44: { design: 'ribbon', color: 'black' }
            };
            
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
                10: { shape: 'rectangle', thickness: 'thin' }
            };
            
            const designColor = designColorMap[decade];
            const shapeThickness = shapeThicknessMap[position];
            
            // Debug logging for position 10
            if (position === 10) {
                console.log(`Sticker ${stickerNumber}: decade=${decade}, position=${position}, shapeThickness=`, shapeThickness);
            }
            
            if (!designColor || !shapeThickness) {
                console.log(`Missing data for sticker ${stickerNumber}: decade=${decade}, position=${position}`);
                return null;
            }
            
            return {
                number: stickerNumber,
                decade: decade,
                position: position,
                design: designColor.design,
                color: designColor.color,
                shape: shapeThickness.shape,
                thickness: shapeThickness.thickness,
                filename: `sticker-${stickerNumber}-stick.png`
            };
        }

        // Find sticker by parameters
        function findStickerByParams(picture, color, thickness, shape) {
            for (let i = 1; i <= 880; i++) {
                const classification = getStickerClassification(i);
                if (classification && 
                    classification.design === picture &&
                    classification.color === color &&
                    classification.thickness === thickness &&
                    classification.shape === shape) {
                    console.log('Found exact match:', classification);
                    return classification;
                }
            }
            console.log('No exact match found');
            return null;
        }

        // Initialize carousels - simplified for 6250-1
        function initCarousels() {
            const thicknessCarousel = document.getElementById('thicknessCarousel');
            
            if (thicknessCarousel) {
                thicknessCarousel.addEventListener('click', (e) => {
                    const item = e.target.closest('.carousel-item');
                    if (item) {
                        // Remove selection from siblings
                        const siblings = thicknessCarousel.querySelectorAll('.carousel-item');
                        siblings.forEach(sibling => sibling.classList.remove('selected'));
                        
                        // Add selection to clicked item
                        item.classList.add('selected');
                        
                        // Update current selection
                        const value = item.dataset.value;
                        currentSelections.thickness = value;
                        
                        console.log('Thickness selected:', value);
                        
                        // Update sticker preview and button
                        updateStickerPreview();
                        updateOrderButton();
                    }
                });
            }
        }



        // Update only sticker position
        function updateStickerPosition() {
            const preview = document.getElementById('stickerPreview');
            if (preview && preview.innerHTML) {
                positionSticker(preview, currentSelections.shape);
            }
        }

        // Position sticker on iPhone based on shape
        function positionSticker(preview, shape) {
            const positions = {
                'rectangle': { top: '75%', left: '50%', transform: 'translate(-50%, -50%)', width: '280px', height: '80px' },
                'square': { top: '75%', left: '50%', transform: 'translate(-50%, -50%)', width: '100px', height: '100px' },
                'circle': { top: '75%', left: '50%', transform: 'translate(-50%, -50%)', width: '100px', height: '100px' },
                'small-rectangle': { top: '15%', left: '75%', transform: 'translate(-50%, -50%)', width: '300px', height: '80px' },
                'cutout': { top: '80%', left: '50%', transform: 'translate(-50%, -50%)', width: '350px', height: '110px' }
            };
            
            const position = positions[shape] || positions['rectangle'];
            Object.assign(preview.style, position);
        }

        // Navigation functions
        function goBack() {
            window.location.href = 'landing.html';
        }

        // Функция для получения названия формы по значению
        function getShapeName(shapeValue) {
            const shapeNames = {
                'rectangle': 'Прямоугольник',
                'square': 'Квадрат', 
                'circle': 'Круг',
                'small-rectangle': 'Маленький прямоугольник',
                'cutout': 'С вырезом',
                'dzen': 'Дзынь стикер',
                'potato': 'Картошка'
            };
            return shapeNames[shapeValue] || shapeValue;
        }

        // Функция для получения названия цвета по значению
        function getColorName(colorValue) {
            const colorNames = {
                'red': 'Красный',
                'green': 'Зеленый',
                'gradient': 'Градиент',
                'white': 'Белый',
                'black': 'Черный'
            };
            return colorNames[colorValue] || colorValue;
        }

        // Функция для получения названия картинки по значению
        function getPictureName(pictureValue) {
            const pictureNames = {
                'empty': 'Пустой',
                'cat': 'Кот',
                'slider-smile': 'Слайдер-смайл',
                'robot-cat': 'Робокот',
                'heart-smile': 'Смайл с сердцами',
                'custom': 'Свой вариант',
                'gingerbread': 'Пряничный человек',
                'donut': 'Пончик',
                'tape': 'Лента'
            };
            return pictureNames[pictureValue] || pictureValue;
        }

        // Функция для получения цены в зависимости от варианта и толщины
        function getPrice(variant, thickness) {
            const prices = {
                1: 199,
                2: 299,
                3: 499,
                4: 199,
                5: 299,
                6: 499,
                7: 199,
                8: 299,
                9: 499,
                10: thickness === 'thin' ? 990 : 690
            };
            return prices[variant] || 0;
        }

        // Функция для получения номера варианта
        

        // Функция для сбора всех данных пользователя
        
        // Функция для получения номера варианта
        function getVariantNumber() {
            return 10;
        }
        
        function collectUserData() {
            const variant = getVariantNumber();
            
            const data = {
                timestamp: new Date().toISOString(),
                variant: variant,
                thickness: currentSelections.thickness || 'thick',
                shape: 'Нет выбора',
                color: 'Нет выбора',
                picture: 'Нет выбора',
                price: getPrice(variant, currentSelections.thickness || 'thick')
            };
            
            return data;
        }

        // Функция для отправки данных в Google Таблицу
        // Функция для отправки данных в Google Таблицу
        
        document.addEventListener('DOMContentLoaded', () => {
            initCarousels();
            updateStickerPreview();
            updateOrderButton();
        });
    
        // Функция для отправки данных через JSONP (обход CORS)
        function sendDataToGoogleSheets(data) {
            return new Promise((resolve, reject) => {
                try {
                    console.log('Отправляем данные через JSONP:', data);
                    
                    // Создаем уникальное имя функции для JSONP
                    const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
                    
                    // Создаем глобальную функцию для обработки ответа
                    window[callbackName] = function(response) {
                        // Удаляем функцию после использования
                        delete window[callbackName];
                        if (document.getElementById('jsonp_script')) {
                            document.head.removeChild(document.getElementById('jsonp_script'));
                        }
                        
                        if (response.success) {
                            console.log('Данные успешно отправлены в Google Таблицу');
                            resolve(true);
                        } else {
                            console.error('Ошибка при отправке данных:', response.error);
                            reject(new Error(response.error));
                        }
                    };
                    
                    // Создаем script тег для JSONP запроса
                    const script = document.createElement('script');
                    script.id = 'jsonp_script';
                    
                    // URL Google Apps Script с параметрами
                    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxenb1I-6wje2xrnrbHsfbYpyxxEJ65zodB2Gqhfek6rcb0A_IAyM-VsbGa08o3tc9M/exec';
                    const params = new URLSearchParams({
                        callback: callbackName,
                        data: JSON.stringify(data)
                    });
                    
                    script.src = GOOGLE_SCRIPT_URL + '?' + params.toString();
                    script.onerror = function() {
                        delete window[callbackName];
                        if (document.getElementById('jsonp_script')) {
                            document.head.removeChild(document.getElementById('jsonp_script'));
                        }
                        reject(new Error('Ошибка загрузки JSONP скрипта'));
                    };
                    
                    document.head.appendChild(script);
                    
                } catch (error) {
                    console.error('Ошибка при создании JSONP запроса:', error);
                    reject(error);
                }
            });
        }

        // Функция для получения названия формы
        function getShapeName(shape) {
            const shapeNames = {
                'small-rectangle': 'Маленький прямоугольник',
                'square': 'Квадрат',
                'rectangle': 'Прямоугольник',
                'cutout': 'С вырезом',
                'circle': 'Круг',
                'dzen': 'Дзынь стикер',
                'potato': 'Картошка'
            };
            return shapeNames[shape] || shape;
        }

        // Функция для получения названия цвета
        function getColorName(color) {
            const colorNames = {
                'red': 'Красный',
                'green': 'Зеленый',
                'gradient': 'Градиент',
                'white': 'Белый',
                'black': 'Черный'
            };
            return colorNames[color] || color;
        }

        // Функция для получения названия картинки
        function getPictureName(picture) {
            const pictureNames = {
                'empty': 'Пустой',
                'cat': 'Кот',
                'slider-smile': 'Слайдер-смайл',
                'robot-cat': 'Робокот',
                'heart-smile': 'Смайл с сердцами',
                'custom': 'Своя картинка',
                'gingerbread': 'Пряничный человек',
                'donut': 'Пончик',
                'ribbon': 'Лента'
            };
            return pictureNames[picture] || picture;
        }

        // Функция для получения цены
        function getPrice(variant, thickness) {
            const prices = {
                1: 199, 4: 199, 7: 199,
                2: 299, 5: 299, 8: 299,
                3: 499, 6: 499, 9: 499,
                10: thickness === 'thin' ? 990 : 690
            };
            return prices[variant] || 199;
        }

        // Функция для получения номера варианта
        

        // Функция для сбора данных пользователя
        function collectUserData() {
            const variant = getVariantNumber();
            const price = getPrice(variant, currentSelections.thickness);
            
            return {
                timestamp: new Date().toISOString(),
                variant: variant,
                thickness: currentSelections.thickness === 'thin' ? 'thin' : 'thick',
                shape: 'Нет выбора',
                color: 'Нет выбора',
                picture: 'Нет выбора',
                price: price
            };
        }

        // Функция для обработки выбора дизайна
        
        // Функция для обработки выбора дизайна с защитой от повторных нажатий
        async function selectDesign() {
            // Проверяем, не обрабатывается ли уже заказ
            if (isOrderProcessing) {
                console.log('Заказ уже обрабатывается, повторное нажатие игнорируется');
                return;
            }
            
            // Блокируем кнопку и устанавливаем флаг обработки
            isOrderProcessing = true;
            const orderButton = document.getElementById('orderButton');
            const originalText = orderButton.textContent;
            
            try {
                console.log('Начинаем процесс заказа...');
                
                // Обновляем текст кнопки
                orderButton.textContent = 'Обрабатываем заказ...';
                orderButton.disabled = true;
                orderButton.style.opacity = '0.6';
                orderButton.style.cursor = 'not-allowed';
                
                // Собираем данные пользователя
                const userData = collectUserData();
                console.log('Собранные данные:', userData);
                
                // Отправляем данные в Google Таблицу
                const success = await sendDataToGoogleSheets(userData);
                
                if (success) {
                    console.log('Данные успешно отправлены, перенаправляем на страницу благодарности');
                    // Обновляем текст кнопки перед перенаправлением
                    orderButton.textContent = 'Заказ принят!';
                    // Небольшая задержка для показа пользователю
                    setTimeout(() => {
                        window.location.href = 'thank-you.html';
                    }, 1000);
                } else {
                    console.error('Ошибка при отправке данных, но заказ принят');
                    // Обновляем текст кнопки
                    orderButton.textContent = 'Заказ принят!';
                    // Небольшая задержка для показа пользователю
                    setTimeout(() => {
                        window.location.href = 'thank-you.html';
                    }, 1000);
                }
            } catch (error) {
                console.error('Ошибка при обработке заказа:', error);
                // В случае ошибки все равно перенаправляем на страницу благодарности
                orderButton.textContent = 'Заказ принят!';
                setTimeout(() => {
                    window.location.href = 'thank-you.html';
                }, 1000);
            }
            // Не сбрасываем флаг isOrderProcessing, чтобы кнопка оставалась заблокированной
        }
    </script>

