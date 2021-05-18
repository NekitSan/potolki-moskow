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
    const popUp = document.querySelector("#pop_up");

const containerStages = popUp.querySelector(".pop_up__stages");
const containerStagesArr = containerStages.children;
const containerStagesNumb = containerStagesArr.length;

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
                    overflowY(popUp);
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
buttonNext.addEventListener("click", (e)=>{
    let arrData = [];

    for(let i = 0; i < containerStagesNumb; i++)
    {
        let temp = formData(i);
        arrData.push( temp );
        
        if(!containerStagesArr[i].classList.contains("hidden"))
        {
            overflowY(popUp);
            let nameStage = containerStagesArr[i].elements[0].getAttribute("name");
            
            if(nameStage == "size" || nameStage == "username")
            {
                if( valData( containerStagesArr[i].elements[nameStage] ) != "")
                {
                    if(i <= 6)
                    {

                        if(popUp.querySelector(".pop_up__networks__pointer").children.length == 0 && nameStage == "size")
                        {
                            stageNext(i);
                            
                            complited(i, arrData);
                        }
                        else if(popUp.querySelector(".pop_up__networks__pointer").children.length == 0 && containerStagesArr[i].elements["username"].value != "" && containerStagesArr[i].elements["userphone"].value != "")
                        {
                            stageNext(i);
                            
                            complited(i, arrData);
                        }
                        else if(popUp.querySelector(".pop_up__networks__pointer").children.length != 0 && containerStagesArr[i].elements["soc-network"].value != "")
                        {
                            stageNext(i);
                            
                            complited(i, arrData);
                        }
                        else
                        {
                            canse(containerStagesArr[i]);
                        }
                    }
                }
                else
                {
                    canse(containerStagesArr[i]);
                }
            }
            else
            {
                if( pushData( containerStagesArr[i].elements[nameStage] ).length != 0 )
                {
                    if(i < 6)
                    {
                        stageNext(i);
                        buttonLeft.classList.remove("hidden");
                    }
                }
                else
                {
                    canse(containerStagesArr[i]);
                }
            }
            
            break;
        }
    }
});

buttonCompleted.addEventListener("click", () => {
    document.body.classList.remove("unscroll");
    popUp.classList.remove("fixed");
    document.querySelector(".testing").classList.add("hidden");

    popUp.querySelector("#stage_completed").classList.add("hidden");
    document.querySelector(".pop_up__button--text").innerHTML = "Изменить тест";

    containerStagesArr[0].classList.remove("hidden");
    document.querySelector("#pop_up .close").classList.remove("hidden");
    document.querySelector(".pop_up__control").classList.remove("hidden");
});

buttonOpenPopUp.addEventListener("click", () => {
    document.querySelector(".testing").classList.remove("hidden");
    document.querySelector("#pop_up .close").classList.remove("hidden");

    popUp.classList.add("fixed");
    document.body.classList.add("unscroll");
    overflowY(popUp);
});
buttonClosePopUp.addEventListener("click", () => {
    popUp.classList.remove("fixed");
    document.body.classList.remove("unscroll");
    document.querySelector("#pop_up .close").classList.add("hidden");
});

$('#stage_6 input:checkbox').click(function(){
	if ($(this).is(':checked')) {
		$('#stage_6 input:checkbox').not(this).prop('checked', false);
	}
});

function complited(i, arrData)
{
    if(i == 6)
    {
        document.querySelector("#pop_up .close").classList.add("hidden");
        document.querySelector(".pop_up__control").classList.add("hidden");

        buttonLeft.classList.add("hidden");

        console.log(arrData); // сборка
    } 
}

function stageNext(index)
{
    containerStagesArr[index].classList.add("hidden");
    containerStagesArr[index+1].classList.remove("hidden");

    buttonLeft.classList.remove("hidden");
}

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

function formData(keys)
{
    let mixData = {};

    switch (keys) {
        case 0:
            mixData.zona = pushData( stage_1.elements['zona'] )
            break;
        case 1:
            mixData.size = valData( stage_2.elements['size'] )
            break;
        case 2:
            mixData.view = pushData( stage_3.elements['view'] )
            break;
        case 3:
            mixData.material = pushData( stage_4.elements['material'] )
            break;
        case 4:
            mixData.extra = pushData( stage_5.elements['extra'] )
            break;
        case 5:
            mixData.bonus = pushData( stage_6.elements['bonus'] )
            break;
        case 6:
            if(popUp.querySelector(".pop_up__networks__pointer").children.length != 0)
                mixData.scnetw = valData( stage_data.elements['soc-network'] )
            else
                mixData.phone = valData( stage_data.elements['userphone'] )
            mixData.name = valData( stage_data.elements['username'] )
        break;
    }

    return mixData;
}

function canse(stage)
{
    $(stage).addClass("wiggle");
    setTimeout(() => {
        $(stage).removeClass("wiggle");
    }, 500);
}

function overflowY(block)
{
    if( !popUp.classList.contains("fixed") )
    {
        block.classList.remove("overflow--scroll-y");
        popUp.scrollIntoView();
    }
    else
    {
        block.classList.add("overflow--scroll-y");
        block.scrollTop = 0;
    }
};
    const buttonReturn = {
    "phone__return": {
        "tile": "Нужна помощь специалиста?",
        "text": "Оставьте свой номер и Вам в течении нескольких минут перезвонит консультант. Он ответит на все вопросы о нашей продукции",
    },
    "phone__measurer": {
        "tile": "Вызвать замерщика‍",
        "text": "Перезвоним через 5 минут, чтобы уточнить удобное для вас время замера",
    }
}
const keysReturn = Object.keys(buttonReturn);

$("#phone__measurer").click( function() {
    for(let i = 0; i < keysReturn.length; i++)
    {
        if($(this).attr("id") == keysReturn[i])
        {
            $("#pop_up__phone--call_tile").text(buttonReturn[keysReturn[i]].tile);
            $("#pop_up__phone--call_text").text(buttonReturn[keysReturn[i]].text);
        }
    }

    $(".pop_up__phone--call").removeClass("hidden");
    $(".pop_up__phone--call .close").removeClass("hidden");
    $("body").addClass("unscroll");
});
$("#phone__return").click( function() {
    for(let i = 0; i < keysReturn.length; i++)
    {
        if($(this).attr("id") == keysReturn[i])
        {
            $("#pop_up__phone--call_tile").text(buttonReturn[keysReturn[i]].tile);
            $("#pop_up__phone--call_text").text(buttonReturn[keysReturn[i]].text);
        }
    }


    $(".pop_up__phone--call").removeClass("hidden");
    $(".pop_up__phone--call .close").removeClass("hidden");
    $("body").addClass("unscroll");
});

$(".whats .extra__button").click( function() {
    for(let i = 0; i < keysReturn.length; i++)
    {
        if($(this).data("id") == keysReturn[i])
        {
            $("#pop_up__phone--call_tile").text(buttonReturn[keysReturn[i]].tile);
            $("#pop_up__phone--call_text").text(buttonReturn[keysReturn[i]].text);
        }
    }


    $(".pop_up__phone--call").removeClass("hidden");
    $(".pop_up__phone--call .close").removeClass("hidden");
    $("body").addClass("unscroll");
});

$(".pop_up__phone--call .pop_up__button").click( function(event) {
    event.preventDefault();
    if( $("#masseg input[name='phoneUsername']").val().length != 0 && $("#masseg input[name='phoneUserphone']").val().length != 0 )
    {
        console.log( $("#masseg input[name='phoneUsername']").val() );
        console.log( $("#masseg input[name='phoneUserphone']").val() );

        $("body").removeClass("unscroll");
        $(".pop_up__phone--call").addClass("hidden");
        $(".pop_up__phone--call .close").addClass("hidden");
    }
    else
    {
        alert("Заполните обязательные поля!");
    }

    return false;
});

$(".pop_up__phone--call .close").click( function() {
    $(".pop_up__phone--call").addClass("hidden");
    $("body").removeClass("unscroll");
    $(this).addClass("hidden");
});

$(".button--add_dontkinow").click( function() {
    $("#sizeArea").val( $(this).html() );
});;
    const ntPlus = document.querySelector(".pop_up__networks__plus");

const addNT = {
    "vk": `<input type="text" name="soc-network" placeholder="id профиля">`,
    "inst": `<input type="text" name="soc-network" placeholder="@id профиля">`,
    "ok": `<input type="text" name="soc-network" placeholder="Ссылка на профиль">`,
    "faceb": `<input type="text" name="soc-network" placeholder="id профиля">`,
    "tel": `<input type="text" name="soc-network" placeholder="@id профиля">`,
};
const deleteButton = `<div id="netw--delete"></div>`;
const keysAddNT = Object.keys(addNT);

$('#container__netw input:checkbox').click(function(){
	if ($(this).is(':checked')) {
		$('#container__netw input:checkbox').not(this).prop('checked', false);
	}

    for(let i = 0; i < keysAddNT.length; i++)
    {
        if($(this).attr("id") == keysAddNT[i])
        {
            let temp = $(this).siblings(".soc-network__icon");

            $('.pop_up__networks__pointer').html(addNT[keysAddNT[i]] + deleteButton);
            $(temp).clone().appendTo('.pop_up__networks__pointer');

            
        }
    }
    $("#required--phone").addClass("hidden");
});

$("#stage_data").mouseover( function() {
    if($("#netw--delete"))
    {
        $("#netw--delete").click( function() {
            $("#required--phone").removeClass("hidden");
            $(".pop_up__networks__pointer").empty();
        });
    }
});;
    function showRating() {
    let arrBlock = document.querySelector('.reviews__container').children;
    let temp = [];

    for(let i = 0; i < arrBlock.length; i++)
    {
        for(let k = 0; k < $(arrBlock[i].children[2]).attr("value"); k++)
        {
            $($(arrBlock[i].children[2]).children()[k]).addClass("active");
        }
    }
}

showRating();;
});;