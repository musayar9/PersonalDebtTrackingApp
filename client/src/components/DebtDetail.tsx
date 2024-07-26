import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const DebtDetail = () => {

const {id} = useParams();
const [debt, setDebt] = useState([]);
const [loading, setLoading ] = useState(false);
const [errMsg, setErrMsg] = useState("");




useEffect(()=>{
    const fetchDebtId = async()=>{
        setLoading(true);
        try {
            const res = await axios.get(`/api/v1/debt/getDebt/${id}`);
            const data = await res.data;
            setDebt(data);
            setLoading(false)
        } catch (error) {
            if(axios.isAxiosError(error)){
                setErrMsg(error.response?.data.msg)
            }else{
            setErrMsg("Request failed")
            }
        }
    }
    
    fetchDebtId();
}, [])








  return (
    <div>DebtDetail - {id}</div>
  )
}

export default DebtDetail