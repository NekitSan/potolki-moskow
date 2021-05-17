class Webp
{
    eventsAttach()
    {
        this.testWebP(function (support) {

            if (support == true) {
                document.querySelector('body').classList.add('webp');
            } else {
                document.querySelector('body').classList.add('no-webp');
            }
        });
    }
    testWebP(callback) {

        var webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    init()
    {
        this.eventsAttach();
    }
}

const WEBP_TRUE = new Webp();
WEBP_TRUE.init();;

$(document).ready( function() {
    const popUp = document.querySelector(".pop_up");

const containerStages = popUp.querySelector(".pop_up__stages");
const containerStagesArr = containerStages.children;
const containerStagesNumb = containerStagesArr.length;
const completed = popUp.querySelector("#stage_completed");

const buttonOpenPopUp = document.querySelector(".pop_up__button");
const buttonLeft = popUp.querySelector(".button--left");
const buttonNext = popUp.querySelector(".button--next");
const buttonCompleted = popUp.querySelector(".completed__button");
const buttonClosePopUp = popUp.querySelector(".close");

;
    buttonLeft.addEventListener("click", ()=>{
    for(let i = 0; i < containerStagesNumb; i++)
    {
        if(!containerStagesArr[i].classList.contains("hidden"))
        {
            if(i <= 6)
            {
                if(i != 0)
                {
                    containerStagesArr[i].classList.add("hidden");
                    containerStagesArr[i-1].classList.remove("hidden");
                }
                if(i == 1)
                {
                    buttonLeft.classList.add("hidden");
                }
            }

        }
    }
});
buttonNext.addEventListener("click", ()=>{
    for(let i = 0; i < containerStagesNumb; i++)
    {
        if(!containerStagesArr[i].classList.contains("hidden"))
        {

            if(i <= 6)
            {
                containerStagesArr[i].classList.add("hidden");
                containerStagesArr[i+1].classList.remove("hidden");
                if(i == 6)
                {
                    // final
                    document.querySelector(".close").classList.add("hidden");
                    document.querySelector(".pop_up__control").classList.add("hidden");
                    formData();
                }
            }
            break;
        }
    }
    buttonLeft.classList.remove("hidden");
});

buttonCompleted.addEventListener("click", () => {
    document.body.classList.remove("unscroll");
    popUp.classList.remove("fixed");
    document.querySelector(".testing").classList.add("hidden");

    popUp.querySelector("#stage_completed").classList.add("hidden");
    document.querySelector(".pop_up__button--text").innerHTML = "Изменить тест";

    containerStagesArr[0].classList.remove("hidden");
    document.querySelector(".close").classList.remove("hidden");
    document.querySelector(".pop_up__control").classList.remove("hidden");
});

buttonOpenPopUp.addEventListener("click", () => {
    document.querySelector(".testing").classList.remove("hidden");

    popUp.classList.add("fixed");
    document.body.classList.add("unscroll");
    document.querySelector(".close").classList.remove("hidden");
});
buttonClosePopUp.addEventListener("click", () => {
    popUp.classList.remove("fixed");
    document.body.classList.remove("unscroll");
    document.querySelector(".close").classList.add("hidden");
});

function pushData(stages)
{
    let checkbox = [];
    for(let i = 0; i < stages.length; i++)
    {
        if(stages[i].checked)
            checkbox.push(stages[i].value);
    }
    return checkbox;
}

function valData(stages)
{
    return stages.value;
}

function formData()
{
    let singlForm = {
        "size": stage_2.elements['size'],
        "name": stage_data.elements['username'],
        "phone": stage_data.elements['userphone'],
    }

    let moreForm = {
        "zona": stage_1.elements['zona'],
        "view": stage_3.elements['view'],
        "material": stage_4.elements['material'],
        "extra": stage_5.elements['extra'],
        "bonus": stage_6.elements['bonus'],
    }

    let bigData = {
        "zona": pushData(moreForm.zona),
        "size": valData(singlForm.size),
        "view": pushData(moreForm.view),
        "material": pushData(moreForm.material),
        "extra": pushData(moreForm.extra),
        "bonus": pushData(moreForm.bonus),
        "name": valData(singlForm.name),
        "phone": valData(singlForm.phone),
    }

    // console.log(bigData);
    console.log(`
        "Помещение": ${bigData.zona},
        "Размеры": ${bigData.size} м²,
        "Вид потолка": ${bigData.view},
        "Материал": ${bigData.material},
        "Дополнительный конструктив": ${bigData.extra},
        "Подарок": ${bigData.bonus},
        "Имя клиента": ${bigData.name},
        "Телефон клиента": ${bigData.phone}
    `);
};
});;