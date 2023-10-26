import dayjs from "dayjs"
import styled from "styled-components"

export default function Day(props){
    const {data, selected, setSelected, index} = props
    const diasDaSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

    function clickHandler(index){
        setSelected(index)
    }

    return(
    <DayContainer onClick={()=> clickHandler(index)} $selected={selected === index}>
        {diasDaSemana[dayjs(data).day()]}, {dayjs(data).date()}/{dayjs(data).month() + 1}
    </DayContainer>
    )
}

const DayContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 131px;
    height: 37px;
    flex-shrink: 0;
    border-radius: 4px;
    background-color: ${props => props.$selected ? "#FFD37D": "#E0E0E0"};
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
    color: #000;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 400;
`