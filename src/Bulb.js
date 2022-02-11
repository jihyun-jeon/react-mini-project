import { useState } from "react";
import styled from "styled-components";

// 자식 컴포넌트
function Bulb({ isOn, onClickBulb }) {
  return <BlubStyle isOn={isOn} onClick={() => onClickBulb()}></BlubStyle>;
}

const BlubStyle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${({ isOn }) => (isOn ? "yellow" : "gray")};
`;

// 부모 컴포넌트
function BlubPage() {
  const [bulbs, setBulbs] = useState([
    { id: 1, isOn: false, connectedBulbs: [2] },
    { id: 2, isOn: false },
  ]);

  return (
    <div>
      {bulbs.map((obj, idx) => {
        return (
          <Bulb
            isOn={obj.isOn}
            onClickBulb={() => {
              setBulbs((prev) => {
                const update = [...prev];
                let currentBlub = update[idx];

                currentBlub = update[idx] = {
                  ...currentBlub,
                  isOn: !currentBlub.isOn,
                };
                /* ison프로퍼티만 수정하는게 아니라 새로운 객체를 통채로 덮어써줘야 함. 
                     객체는 레퍼런스 타입이여서 객체안의 프로퍼티값만 바꾸는게 아니라, 객체 자체를 통쨰로 수정해줘야 함
                  */

                /*연결된 bulb */
                if (currentBlub.connectedBulbs) {
                  // connectedBulbs 있을때만 연결시키기위해
                  currentBlub.connectedBulbs.forEach((id) => {
                    const index = update.findIndex((obj) => obj.id === id);

                    if (index >= 0) {
                      update[index] = {
                        ...update[index],
                        isOn: currentBlub.isOn,
                      };
                    }
                  });
                }

                return update;
              });
            }}
            key={obj.id}
          />
        );
      })}
    </div>
  );
}

export default BlubPage;
