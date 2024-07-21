import React from "react";
import { Wheel } from "react-custom-roulette"; // 룰렛 import
import { useState } from "react";
import { Container } from "react-bootstrap";

const Event = () => {
    //룰렛 데이터
    const data = [
        {
            option: "1점",
            percentage: 25,
        },
        {
            option: "100점",
            percentage: 25,
        },
        {
            option: "1000점",
            percentage: 25,
        },
        {
            option: "200점",
            percentage: 25,
        },
    ];

    //룰렛이 회전 애니메이션을 시작
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0); //당첨 인덱스
    const [resultMsg, setResultMsg] = useState("");
    // 룰렛 애니메이션을 실행시킬 함수
    const handleSpinClick = () => {
        setResultMsg("");
        if (!mustSpin) {
            // 가중치 랜덤 알고리즘(Weighted Random Picker) 적용
            // 1. 랜덤 기준점 설정
            const pivot = Math.floor(Math.random() * 99 + 1);
            let stack = 0; // 가중치

            let percentage = data.map((row, idx) => {
                {
                    return row.percentage;
                }
            });

            let newPrizeNumber = null; //당첨 인덱스

            percentage.some((row, idx) => {
                //2. 가중치 누적
                stack += row;

                // 3. 누적 가중치 값이 기준점 이상이면 종료
                if (pivot <= stack) {
                    newPrizeNumber = idx;
                    return true;
                }
            });
            // 당첨 인덱스를 가리킴
            setPrizeNumber(newPrizeNumber);
            setMustSpin(true);
        }
    };

    // 룰렛 애니메이션이 멈출 때 실행되는 함수
    const StopSpinning = () => {
        setMustSpin(false);
        setResultMsg(`🎉 ${data[prizeNumber].option} 이 당첨되셨습니다! 🎉`);
    };
    return (
        <Container className="roulette_wrap">
            <h2>100% 당첨 룰렛 이벤트</h2>

            <div className="roulette_box">
                <Wheel
                    spinDuration={0.2} // spin속도
                    //디폴트 위치 랜덤으로
                    startingOptionIndex={Math.floor(
                        Math.random() * data.length
                    )}
                    mustStartSpinning={mustSpin}
                    prizeNumber={prizeNumber}
                    data={data}
                    onStopSpinning={StopSpinning}
                    outerBorderColor={["#ccc"]}
                    outerBorderWidth={[5]}
                    innerBorderColor={["#f2f2f2"]}
                    radiusLineColor={["tranparent"]}
                    radiusLineWidth={[1]}
                    textColors={["#f5f5f5"]}
                    textDistance={55}
                    fontSize={[15]}
                    backgroundColors={[
                        "#3f297e",
                        "#175fa9",
                        "#169ed8",
                        "#239b63",
                    ]}
                />

                <button onClick={handleSpinClick} className="btn_spin">
                    Go✨
                </button>
            </div>

            <div className="roulette_result">{resultMsg}</div>
            <div className="roulett_info">
                <h3>
                    누적 포인트 : <u>1000점</u>
                </h3>
                <p>하루 한번 이벤트에 도전하세요!</p>
            </div>
        </Container>
    );
};

export default Event;
