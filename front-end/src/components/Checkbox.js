import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { formatPrice } from "../utils/utilityFunctions";
import axios from "axios";
import UserContext from "../context/UserContext";

export default function Checkbox({setEdgeValue, setEdgeId, id, isChecked, setIsChecked}) {
    const [edges, setEdges] = useState([]);

    const { token } = useContext(UserContext);

    useEffect(() => {

        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/edges`,{
            headers:{'x-access-token': `${token}`}
        });

        promise.then(res => {
            setEdges(res.data);
        });

        promise.catch(Error => {
            console.log(Error.response.data)
        });

    },[]);

    function renderEdges(edges){
        return edges.map((edge, index) => 
            <label key={index}>
                <input 
                type="radio"
                name={`edge+${id}`}
                value={[edge.id, edge.price]}
                onChange={(e) => {
                    const result = e.target.value.split(',')
                    setEdgeId(Number(result[0]))
                    setEdgeValue(Number(result[1])) 
                }} />
                <div>
                    <h6>{edge.name}</h6>
                    <h6>{formatPrice(edge.price)}</h6>
                </div>
            </label>
        )
    }

    return (
      <Container>
        {
            isChecked ?
            ''
            :
            <label className="checkEdge">
                <input 
                    type="checkbox"
                    onChange={() => setIsChecked(!isChecked)}
                 />
                <span>Com borda?</span>
            </label>
        }
        {
            isChecked ?
            renderEdges(edges)
            :
            ''
        }
      </Container>
    );
}

const Container = styled.div`
    display: flex;
    overflow-y: scroll;
    flex-wrap: wrap;
    height: 40px;

    .checkEdge{
        width: 200px;
    }

    label{
        display: flex;
        align-items: center;
        margin-right: 4px;
        width: 114px;
        margin-bottom: 8px;
        font-size: 16px;
    }
`

  