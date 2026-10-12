// 나이는 임의로 설정, 삼항 연산자
// ** 중요 ** 값을 모두 변수에 담아보기 
// 나이가 19살 이상이면 "입장 가능" 출력
// 19살 미만이면 "입장 불가" 출력

// 나이가 짝수면 "짝수" 출력
// 나이가 홀수면 "홀수" 출력

// 나이가 16살이면 "당첨" 출력
// 아니면 "꽝입니다" 출력	

// 콘솔 결과: [본인이름]님은 [입장 가능]
// [나이], [홀수], [꽝입니다].  
const age = 17
const name = "홍길동"
const baseAge = 19
const pass = "입장 가능"
const notPass = "입장 불가"
const luckyAge = 16
const lucky = "당첨"
const unLucky = "꽝"
const odd = "홀수"
const even = "짝수"
const passResult = age >= baseAge ? pass : notPass
const evenResult = age % 2 === 0 ? even : odd
const luckyResult = age === luckyAge ? lucky : unLucky

// console.log(name, "님은 ", passResult, age, evenResult, luckyResult)
// 문자열의 연결
// console.log(name + "님은 " + passResult + " " + age + "살 " + evenResult + " " + luckyResult) 

// es6 `${}`: 템플릿 리터럴은 문자열 안에서 변수를 사용하는 문법
console.log(`${name}님은 ${passResult} ${age}살이고, ${evenResult}, ${luckyResult}`)






