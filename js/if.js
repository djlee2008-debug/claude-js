// let num = 10

// if (num >= 15) {
//     console.log("15이상")
// }else {
//     console.log("15미만")
// }

let score = 80

// if (score >= 90){
//     console.log("A")
// } else if (score >= 80){
//     console.log("B")
// } else if (score >= 70){
//     console.log("C")
// } else {
//     console.log("D")
// }

// 학생 이름과 세 과목 점수
// let: 변수
// =: 대입 연산자
let name = "김철수"
let koreanScore = 85
let mathScore = 92
let englishScore = 78

// 평균 계산
// /: 나누기 연산자
let average = (koreanScore + mathScore + englishScore) / 3

// 합격/불합격 판정
if (average >= 60) {
    console.log(name + "학생의 평균: " + average.toFixed(2) + " - 합격")
} else {
    console.log(name + "학생의 평균: " + average.toFixed(2) + " - 불합격")
}

