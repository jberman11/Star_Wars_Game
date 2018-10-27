var characters = {
    luke: {
        name: "Luke Skywalker",
        image: "assets/images/luke.jpg",
        health: 65,
        attack: 5,
        power: 5,
        counter: 2,

    },
    han: {
        name: "Han Solo",
        image: "assets/images/han.jpg",
        health: 45,
        attack: 4,
        power: 4,
        counter: 6,
    },
    rey: {
        name: "Rey",
        image: "assets/images/rey.jpg",
        health: 55,
        attack: 6,
        power: 6,
        counter: 4,
    },
    obi: {
        name: "Obi Wan Kenobi",
        image: "assets/images/obi.jpg",
        health: 40,
        attack: 8,
        power: 8,
        counter: 7,
    },
    vader: {
        name: "Darth Vader" ,   
        image: "assets/images/vader.jpg",     
        health: 50,
        attack: 7,
        power: 7,
        counter: 8,
    },



}



fighterSwitch = false
defenderSwitch = false
gameSwitch = false
battleSwitch = false

$(document).ready(function(){
    generate(characters)
})

function reset (object){
    object.luke.health = 65
    object.luke.attack = 5
    object.han.health =45
    object.han.attack =4
    object.rey.health =55
    object.rey.attack =6
    object.obi.health =40
    object.obi.attack = 8
    object.vader.health =50
    object.vader.attack =7
    console.log (this)}


function generate(obj) {
            let arr = Object.keys(obj)
            
            for (key in obj){
                
                $("#choices").append("<div>")

            }
            $("div","#choices").each(function(){
                let name = arr.pop()
                $(this).data("name", name)
                console.log($(this).data("name"))
                $(this).addClass("char")
                $(this).attr("id", name)
                
                $(this).append("<div class = 'name'>")
                    $(".name",this).text(obj[name].name)
                $(this).append("<img>")
                    $("img", this).attr("src", obj[name].image)
                $(this).append("<div class = 'health'>")
                    $(".health",this).text(obj[name].health)
                
            })


            $(".char").each(function(){


                $(this).on("click", function(){
                    if(!fighterSwitch){
                        $("#fighter").append(this)
                        fighterSwitch = true
                        $(this).data("me", 1).addClass("me")
                        $(".char", "#choices").each(function(){
                            $("#challengers").append(this)
                        })
                    }
                    if(fighterSwitch && !defenderSwitch && !$(this).data("me")){
                        $("#defender").append(this)
                        $(this).addClass("villian")
                        $(".health", this).addClass("villianText")
                        $(".name", this).addClass("villianText")
                        defenderSwitch = true;
                        
                    }
                    if(fighterSwitch && defenderSwitch && !gameSwitch){
                        gameStart()
                    }
                    
                })
                    
                
                

            })
}

//letting battle begin
var gameStart = function(){
    $("#damage").removeClass("hidden")
    if (!battleSwitch){
        $("#message").text("May the force be with you!!!")
        battleSwitch = true
    } 
}



//play Again button
$("#again").on("click",function(){
    
    $(this).addClass("hidden")
    defenderSwitch = false
    gameSwitch = false
    fighterSwitch = false
    battleSwitch = false
    reset(characters)
    $("#choices").empty()
    $("#fighter").empty()
    $("#defender").empty()
    $("#challengers").empty()
    $("#message").empty()
    generate(characters)
})


//Attack Button
$("#damage").on("click",function(){

    
    //battle continues
   if( (characters[$(".char","#defender").data("name")].health > 0) && (characters[$(".char","#fighter").data("name")].health > 0)){
        characters[$(".char","#defender").data("name")].health -= characters[$(".char","#fighter").data("name")].attack
        characters[$(".char","#fighter").data("name")].attack += characters[$(".char","#fighter").data("name")].power
        characters[$(".char","#fighter").data("name")].health -= characters[$(".char","#defender").data("name")].counter
    
        //damage message
        $("#message").html(
            "You did " + characters[$(".char","#fighter").data("name")].attack + " to " + characters[$(".char","#defender").data("name")].name + ". <br> " +
            "You took " + characters[$(".char","#defender").data("name")].counter + " damage back!"
        )

        //health updates
        $(".health", "#defender").text(characters[$(".char","#defender").data("name")].health)
        $(".health", "#fighter").text(characters[$(".char","#fighter").data("name")].health)
    }


    //your health drops to 0
    if(characters[$(".char","#fighter").data("name")].health <= 0){
        $("#message").text("You lose! Want to play again?")
        $("#again").removeClass("hidden").text("Again!")
        return

    }
    //opponents health drops to 0
    if(characters[$(".char","#defender").data("name")].health <= 0){

        //no opponents left
        if(!$("#challengers").html()){
            $("#message").html("You are a Master! Try a new Characater!")
            $("#again").removeClass("hidden").text("Again!")
                       
            return
        }

        $("#message").text ("You beat your opponent, you may choose a new opponent.")
        $("#defender").empty()
        $("#damage").addClass("hidden")
        defenderSwitch = false
        gameSwitch = false
        battleSwitch = false
    }
    


    console.log(characters[$(".char","#fighter").data("name")])
    console.log(characters[$(".char","#defender").data("name")])
})
