const $main_gnb = $("#main_gnb");
const $main_menu_list = $main_gnb.children("li").find("a");
// const h1 = $("h1")

letter($main_menu_list, 0.1);
// letter(item, 0.05);

function letter(el ,interval){
    if(el === undefined) {
        console.error("첫번째 인수로 선택자를 지정해주세요.")
        return;
    }

    if(interval === undefined) interval = 0;
    const txt = el.text();
    el.text("");

    let num = 0;
    for(let letter of txt){
        el
            .append(
                $("<span>")
                    .text(letter)
                    .css({
                        transitionDelay: `${num*interval}s`,
                        display: "inline-block"
                    })
            )
        num++;
    };
};






/*
const item = document.querySelector("div");
const txt = item.innerText;
console.log(txt);

//부모요소.innerHTML = "특정태그"


for(let letter of txt){
    console.log(letter);
};
*/