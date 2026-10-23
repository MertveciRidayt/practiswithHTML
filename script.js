
const darkSide = document.getElementById("darkSide");
const noButton = document.getElementById("noButton");

if (darkSide && noButton) {
    let lastMoveTime = 0;

    function moveNoButton(pointerX, pointerY) {
        const now = Date.now();

        // Не перемещаем кнопку слишком часто
        if (now - lastMoveTime < 180) return;
        lastMoveTime = now;

        const area = darkSide.getBoundingClientRect();

        const buttonWidth = noButton.offsetWidth;
        const buttonHeight = noButton.offsetHeight;

        const padding = 18;
        const halfWidth = buttonWidth / 2;
        const halfHeight = buttonHeight / 2;

        // Координаты центра кнопки относительно правой половины
        const minX = padding + halfWidth;
        const maxX = area.width - padding - halfWidth;

        const minY = padding + halfHeight;
        const maxY = area.height - padding - halfHeight - 65;

        if (maxX < minX || maxY < minY) return;

        let x;
        let y;

        // Ищем позицию подальше от курсора
        for (let i = 0; i < 20; i++) {
            x = minX + Math.random() * (maxX - minX);
            y = minY + Math.random() * (maxY - minY);

            const screenX = area.left + x;
            const screenY = area.top + y;

            const distance = Math.hypot(
                screenX - pointerX,
                screenY - pointerY
            );

            if (distance > 140) break;
        }

        noButton.style.left = `${x}px`;
        noButton.style.top = `${y}px`;
    }

    // Кнопка убегает, когда курсор приближается
    darkSide.addEventListener("pointermove", (event) => {
        const buttonRect = noButton.getBoundingClientRect();

        const centerX = buttonRect.left + buttonRect.width / 2;
        const centerY = buttonRect.top + buttonRect.height / 2;

        const distance = Math.hypot(
            event.clientX - centerX,
            event.clientY - centerY
        );

        if (distance < 100) {
            moveNoButton(event.clientX, event.clientY);
        }
    });

    // Дополнительная поддержка сенсорных экранов
    noButton.addEventListener("pointerenter", (event) => {
        if (event.pointerType === "mouse") {
            moveNoButton(event.clientX, event.clientY);
        }
    });

    noButton.addEventListener("touchstart", (event) => {
        const touch = event.touches[0];

        if (touch) {
            moveNoButton(touch.clientX, touch.clientY);
        }
    }, { passive: true });
}
