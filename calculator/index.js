function calculate(){
    var selection = document.getElementById("select").value;
    var num1 = Number(document.getElementById("n1").value);
    var num2 = Number(document.getElementById("n2").value);
    var res = 0;

    if(num1 != null & num2 != null)
        switch(selection){
            case "add":
                res = num1 + num2;
                break;
            case "subtract":
                res = num1 - num2;
                break;
            case "multiply":
                res = num1 * num2;
                break;
            case "divide":
                if(num2 != 0)
                    res = num1 / num2;
                break;
            default:
                break;
        }
    document.getElementById("res").innerHTML = "Das Ergebnis lautet: " + res;
    console.log(num1, num2, selection, res)
}