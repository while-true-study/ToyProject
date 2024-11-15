const buttons = document.querySelectorAll('.MBTI-content');

buttons.forEach(function(btn) {
    btn.addEventListener("click", function() {
        // 해당 버튼이 속한 그룹 클래스 찾기
        const groupClass = [...btn.classList].find(cls => cls.startsWith('line-'));
        
        // 해당 그룹의 모든 버튼 가져오기
        const groupButtons = document.querySelectorAll(`.${groupClass}`);
        
        // 같은 그룹 내의 다른 버튼에서 select 클래스 제거
        groupButtons.forEach(function(groupBtn) {
            groupBtn.classList.remove('select');
        });

        // 현재 클릭한 버튼에 select 클래스 추가
        btn.classList.add('select');
    });
});

function getRandomColor() {
    const letter = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letter[Math.floor(Math.random() * 16)];
    }
    return color
}

const repeatImg = document.querySelector('.repeat-img');
const colorText = document.querySelector('.color-body-text');
const colorBox = document.querySelector('.color-box');
let prevcolor = document.colorText;

repeatImg.addEventListener('click', function() {
    const randomColor = getRandomColor();
    colorText.value = randomColor;
    colorBox.style.backgroundColor = randomColor;
    prevcolor = randomColor;
});

colorText.addEventListener('input', function() {
    let color = colorText.value;

    if (!color.startsWith('#')) {
        color = '#' + color.replace('#', '');
    }

    if (/^#[0-9A-F]{0,6}$/i.test(color)) {
        colorText.value = color;
        if (color.length === 7) {
            colorBox.style.backgroundColor = color;
            prevcolor = color;
        }
    } else {
        alert("유효한 16진수 색상 코드를 입력하세요.");
        colorBox.style.backgroundColor = prevcolor;
    }
})
