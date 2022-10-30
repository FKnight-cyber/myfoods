import { useState } from "react";
import styled from "styled-components";

export default function Checkbox({price}) {
    const [isChecked, setIsChecked] = useState(false);
    const [selectEdge, setSelectedEdge] = useState('');
    return (
      <Container className="checkbox-wrapper">
        {
            isChecked ?
            ''
            :
            <label>
                <input 
                    type="checkbox"
                    onChange={() => setIsChecked(!isChecked)}
                 />
                <span>Com borda?</span>
            </label>
        }
        {
            isChecked ?
            <>
                <label>
                    <input type="checkbox" />
                    <div>
                        <h6>Chocolate</h6>
                        <h6>R$ 2,00</h6>
                    </div>
                </label>
                <label>
                    <input type="checkbox" />
                    <div>
                        <h6>Cheddar</h6>
                        <h6>R$ 2,00</h6>
                    </div>
                </label>
                <label>
                    <input type="checkbox" />
                    <div>
                        <h6>Catupiry</h6>
                        <h6>R$ 2,00</h6>
                    </div>
                </label>
            </>
            :
            ''
        }
      </Container>
    );
}

const Container = styled.div`
    display: flex;
    overflow-y: scroll;

    label{
        display: flex;
        align-items: center;
        height: 36px;
    }
`

  