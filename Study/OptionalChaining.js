//옵셔널 체이닝 , null의 속성에 ?.로 접근하면 undefined가 됨.
const a= {};
a.b;    //a가 객체이므로 문제x

const c= null;
try{
    c.d;    //객체가 아닌걸 접근하려하면 문제 o
}
catch(error){
    console.error(error);
}
c?.d;   //문제없음

try{
    c.f();  //문제o
}
catch(e){
    console.error(e);
}
c?.f(); //문제없음

try{
    c[0];
}
catch(e){
    console.error(e);
}
c?.[0]; //문제없음

