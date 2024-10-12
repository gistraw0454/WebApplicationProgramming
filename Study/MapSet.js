//Map : 순서 보장, size메서드로 속성 수를 쉽게 알 수 있음 !
const m = new Map();
m.set('a','b');
m.set(3,'c');
const d = {};
m.set(d,'e');
console.log(m.get(d));   //속성값 조회 결과는 e
console.log(m.size);    //속성 수 조회 결과는 3
for (const [k,v] of m){
    console.log(k,v);   //a,b,3,c,{},e 순서 보장
}
m.forEach((v,k)=>{
    console.log(k,v);   //a,b,3,c,{},e
});
console.log(m.has(d))   //있나?
m.delete(d);    //키를 대입해 속성 제거
m.clear();  //전부 제거


//Set : 중복허용 X, new Set(arr) 로 중복없애고 Array.from(s);하면 다시 배열로 돌릴 수 있음 !
const s = new Set();
s.add(false);
s.add(1);
s.add('1');
s.add(1);   //중복 무시
s.add(2);

console.log(s.size) //4

console.log(s.has(1));    //있나?

for (const a of s){
    console.log(a);
}
s.forEach((a)=>{
    console.log(a);
})
s.delete(2);
s.clear()


// arr -> set -> arr 변환하여 중복을 없애보자 !!
const arr = [1,4,2,3,2,5,1,3];

const s_set = new Set(arr);
const result = Array.from(s_set);
console.log(result);