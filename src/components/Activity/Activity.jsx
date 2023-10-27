import styled from "styled-components"
import {IoEnterOutline} from "react-icons/io5"
import {AiOutlineCloseCircle} from "react-icons/ai"
import { toast } from "react-toastify"


export default function Activity({activityInfo}){

    function formatTime(time){
        const hours = Math.floor(time/100)
        let minutes = time % 100
        if(minutes < 10) minutes = `0${minutes}`
        if(time < 1000){
            return `0${hours}:${minutes}`
        }
        return `${hours}:${minutes}`
    }

    function clickHandler(){
        if(vagas === 0) return toast("As vagas dessa atividade já forma preenchidas!")
        
    }

    const vagas = activityInfo.capacity - activityInfo._count.ActivityEnrollment
    const formatedEndTime = formatTime(activityInfo.endTime)
    const formatedStartTime = formatTime(activityInfo.startTime)

    return(
        <ActivityContainer $heightMultiplier={(activityInfo.endTime - activityInfo.startTime)/100}>
            <Info>
                <Titulo>{activityInfo.name}</Titulo>
                <Horario>{formatedStartTime} - {formatedEndTime}</Horario>
            </Info>
            <Vagas onClick={clickHandler} vagas={vagas}>
                {vagas === 0 ? (
                    <>
                        <AiOutlineCloseCircle size="25px" color="#CC6666"/>
                        <p>Esgotado</p>
                    </>
                ) : (
                <>
                    <IoEnterOutline size="25px" color="#078632"/>
                    <p>{vagas} vagas</p>
                </>
                )}
            </Vagas>
        </ActivityContainer>
    )
}

const ActivityContainer = styled.div`
    width: 90%;
    height: ${(props)=> `${props.$heightMultiplier * 80}px`};
    border-radius: 5px;
    background: #F1F1F1;
    flex-shrink: 0;
    display: flex;
    padding-left: 10px;
    align-items: center;
    justify-content: space-between;
`

const Info = styled.div`
    text-align: start;
    height: 100%;
`

const Titulo = styled.p`
    margin-top: 12px;
    color: #343434;
    font-family: 'Roboto', sans-serif;
    font-size: 12px;
    font-weight: 700;
`

const Horario = styled.p`
    margin-top: 5px;
    color: #343434;
    font-family: 'Roboto', sans-serif;
    font-size: 12px;
    font-weight: 400;
`

const Vagas = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 25%;
    height: 75%;
    border-left: 1px solid #d7d7d7;
    p{
        color: ${(props)=> props.vagas === 0 ? "#CC6666" :"#078632"};
        font-family: 'Roboto', sans-serif;
        font-size: 9px;
        font-weight: 400;
    }
`