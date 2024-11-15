const choice = document.querySelector('.choice-box');
const Xbutton = document.querySelector('.X-img');
const temp = document.querySelector('.choice-bar');
const boxitems = document.querySelectorAll('.gird-box-item');


choice.addEventListener("click", function() {
    temp.style.visibility='visible';
});

Xbutton.addEventListener("click", function() {
    console.log(1);
    temp.style.visibility='hidden';
});

boxitems.forEach(function(item) {
    item.addEventListener("click", function() {
        item.classList.toggle('select');
    });
});

const mbtilis = document.querySelectorAll(".no-dot li");

mbtilis.forEach(function(mli) {
    mli.addEventListener("click", function() {
        mli.remove(); // li 태그 삭제
    });
});

// const mbtiGroup = document.querySelector(".mbti-group");

// mbtiGroup.addEventListener("click", function(e) {
//     if (e.target && e.target.tagName === "LI") {
//         e.target.remove(); // 클릭된 li 요소 삭제
//     } else if (e.target && e.target.classList.contains("remove-icon")) {
//         // 만약 x 아이콘이 클릭된 경우 그 부모 li를 삭제
//         e.target.closest("li").remove();
//     }
// });
