/**
 * Created by Administrator on 2016/3/21.
 */

function clickBtn(){

    console.log("-----------------------");
}

show();

function show(){

    console.log("---------show--------------",window.document.getElementById('lab'));


    document.getElementById('lab').addEventListener('mouseover', function (event) {

        console.log("---------show--------------",event);

        document.getElementById('div1').style.display = 'none';
    });
    document.getElementById('lab').addEventListener('mouseout', function (event) {

        console.log("---------show--------------",event);

        document.getElementById('div1').style.display = 'none';
    })

}